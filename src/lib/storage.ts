import fs from "fs";
import path from "path";

const RUNTIME_DIR = path.join(process.cwd(), "src", "data", "runtime");

// Deteksi lingkungan serverless/read-only (misal Vercel, AWS Lambda, Cloudflare)
const IS_SERVERLESS = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.NOW_REGION ||
  process.env.DISABLE_DISK_PERSISTENCE === "true"
);

export interface PersistentStoreOptions<V> {
  serialize?: (val: V) => any;
  deserialize?: (raw: any) => V;
  onSet?: (key: string, val: V) => void;
  onDelete?: (key: string) => void;
}

/**
 * PersistentStore extends native Map<string, V> to provide:
 * 1. Resilient in-memory caching with high-speed synchronous access
 * 2. Optional disk persistence in development/writable environments
 * 3. Graceful degradation in serverless/read-only environments (prevents EROFS crashes)
 * 4. Extensible onSet/onDelete hooks for real-time Supabase background synchronization
 */
export class PersistentStore<V> extends Map<string, V> {
  public readonly filePath: string;
  private lastMtime: number = 0;
  private serializer?: (val: V) => any;
  private deserializer?: (raw: any) => V;
  private onSet?: (key: string, val: V) => void;
  private onDelete?: (key: string) => void;
  private diskDisabled: boolean;

  constructor(
    filename: string,
    initialEntries?: [string, V][],
    options?: PersistentStoreOptions<V>
  ) {
    // Panggil super() kosong agar override set() tidak crash sebelum filePath terdefinisi
    super();

    this.filePath = path.join(RUNTIME_DIR, filename);
    this.serializer = options?.serialize;
    this.deserializer = options?.deserialize;
    this.onSet = options?.onSet;
    this.onDelete = options?.onDelete;
    this.diskDisabled = IS_SERVERLESS;

    if (!this.diskDisabled) {
      this.ensureDirectory();
      this.loadFromDisk();
    }

    // Jika disk kosong dan disediakan initialEntries, inisialisasi data
    if (super.size === 0 && initialEntries && initialEntries.length > 0) {
      for (const [k, v] of initialEntries) {
        super.set(k, v);
      }
      if (!this.diskDisabled) {
        this.saveToDisk();
      }
    }
  }

  private ensureDirectory() {
    if (this.diskDisabled) return;
    try {
      if (!fs.existsSync(RUNTIME_DIR)) {
        fs.mkdirSync(RUNTIME_DIR, { recursive: true });
      }
    } catch (err: any) {
      // Jika sistem read-only (EROFS), nonaktifkan disk persistence tanpa melempar error
      if (err?.code === "EROFS" || err?.code === "EACCES" || err?.code === "EPERM") {
        this.diskDisabled = true;
      } else {
        console.warn(`[PersistentStore] Warning direktori ${RUNTIME_DIR}:`, err?.message || err);
      }
    }
  }

  private loadFromDisk() {
    if (this.diskDisabled || !this.filePath) return;
    try {
      if (fs.existsSync(this.filePath)) {
        const stat = fs.statSync(this.filePath);
        this.lastMtime = stat.mtimeMs;
        const text = fs.readFileSync(this.filePath, "utf-8");
        if (text.trim()) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            for (const [k, v] of parsed) {
              super.set(k, this.deserializer ? this.deserializer(v) : v);
            }
          } else if (typeof parsed === "object" && parsed !== null) {
            for (const [k, v] of Object.entries(parsed)) {
              super.set(k, this.deserializer ? this.deserializer(v) : (v as V));
            }
          }
        }
      }
    } catch (err: any) {
      // Non-fatal, tetap gunakan memory cache
      console.warn(`[PersistentStore] Info: Fallback in-memory untuk ${path.basename(this.filePath)} (${err?.message || "read failed"})`);
    }
  }

  public syncCheck() {
    if (this.diskDisabled || !this.filePath) return;
    try {
      if (fs.existsSync(this.filePath)) {
        const stat = fs.statSync(this.filePath);
        if (stat.mtimeMs > this.lastMtime) {
          const text = fs.readFileSync(this.filePath, "utf-8");
          this.lastMtime = stat.mtimeMs;
          if (text.trim()) {
            const parsed = JSON.parse(text);
            super.clear();
            if (Array.isArray(parsed)) {
              for (const [k, v] of parsed) {
                super.set(k, this.deserializer ? this.deserializer(v) : v);
              }
            } else if (typeof parsed === "object" && parsed !== null) {
              for (const [k, v] of Object.entries(parsed)) {
                super.set(k, this.deserializer ? this.deserializer(v) : (v as V));
              }
            }
          }
        }
      }
    } catch {
      // Ignored non-fatal error during syncCheck
    }
  }

  public saveToDisk() {
    if (this.diskDisabled || !this.filePath) return;
    try {
      this.ensureDirectory();
      if (this.diskDisabled) return;

      const obj: Record<string, any> = {};
      for (const [k, v] of super.entries()) {
        obj[k] = this.serializer ? this.serializer(v) : v;
      }

      const tempFile = `${this.filePath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 6)}`;
      fs.writeFileSync(tempFile, JSON.stringify(obj, null, 2), "utf-8");
      fs.renameSync(tempFile, this.filePath);

      const stat = fs.statSync(this.filePath);
      this.lastMtime = stat.mtimeMs;
    } catch (err: any) {
      if (err?.code === "EROFS" || err?.code === "EACCES" || err?.code === "EPERM") {
        this.diskDisabled = true;
        console.warn(`[PersistentStore] Filesystem read-only terdeteksi. Beralih ke in-memory mode untuk ${path.basename(this.filePath)}.`);
      } else {
        console.warn(`[PersistentStore] Non-blocking write warning (${path.basename(this.filePath)}):`, err?.message || err);
      }
    }
  }

  override get(key: string): V | undefined {
    this.syncCheck();
    return super.get(key);
  }

  override has(key: string): boolean {
    this.syncCheck();
    return super.has(key);
  }

  override set(key: string, value: V): this {
    super.set(key, value);
    this.saveToDisk();
    if (this.onSet) {
      try {
        this.onSet(key, value);
      } catch (err) {
        console.warn(`[PersistentStore] onSet hook error for ${key}:`, err);
      }
    }
    return this;
  }

  override delete(key: string): boolean {
    const deleted = super.delete(key);
    if (deleted) {
      this.saveToDisk();
      if (this.onDelete) {
        try {
          this.onDelete(key);
        } catch (err) {
          console.warn(`[PersistentStore] onDelete hook error for ${key}:`, err);
        }
      }
    }
    return deleted;
  }

  override clear(): void {
    super.clear();
    this.saveToDisk();
  }

  override values() {
    this.syncCheck();
    return super.values();
  }

  override entries() {
    this.syncCheck();
    return super.entries();
  }

  override keys() {
    this.syncCheck();
    return super.keys();
  }

  override forEach(
    callbackfn: (value: V, key: string, map: Map<string, V>) => void,
    thisArg?: any
  ): void {
    this.syncCheck();
    super.forEach(callbackfn, thisArg);
  }

  override get size(): number {
    this.syncCheck();
    return super.size;
  }

  override [Symbol.iterator]() {
    this.syncCheck();
    return super[Symbol.iterator]();
  }
}

/**
 * Global singleton factory to avoid re-instantiation across Next.js webpack HMR re-evaluations
 */
export function getOrCreatePersistentStore<V>(
  storeName: string,
  filename: string,
  initialEntries?: [string, V][],
  options?: PersistentStoreOptions<V>
): PersistentStore<V> {
  const globalObj = globalThis as unknown as Record<string, any>;
  const key = `__jalanitku_store_${storeName}`;

  if (!globalObj[key]) {
    globalObj[key] = new PersistentStore<V>(filename, initialEntries, options);
  }

  return globalObj[key] as PersistentStore<V>;
}
