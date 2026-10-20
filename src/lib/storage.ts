import fs from "fs";
import path from "path";

const RUNTIME_DIR = path.join(process.cwd(), "src", "data", "runtime");

export interface PersistentStoreOptions<V> {
  serialize?: (val: V) => any;
  deserialize?: (raw: any) => V;
}

/**
 * PersistentStore extends native Map<string, V> to provide:
 * 1. Synchronous disk persistence (atomic file writing in JSON)
 * 2. Cross-worker/re-evaluation staleness checks via mtime
 * 3. Custom serializer/deserializer for complex nested structures (e.g., inner Maps)
 */
export class PersistentStore<V> extends Map<string, V> {
  public readonly filePath: string;
  private lastMtime: number = 0;
  private serializer?: (val: V) => any;
  private deserializer?: (raw: any) => V;

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

    this.ensureDirectory();
    this.loadFromDisk();

    // Jika disk kosong dan disediakan initialEntries, inisialisasi data
    if (super.size === 0 && initialEntries && initialEntries.length > 0) {
      for (const [k, v] of initialEntries) {
        super.set(k, v);
      }
      this.saveToDisk();
    }
  }

  private ensureDirectory() {
    try {
      if (!fs.existsSync(RUNTIME_DIR)) {
        fs.mkdirSync(RUNTIME_DIR, { recursive: true });
      }
    } catch (err) {
      console.error(`[PersistentStore] Gagal membuat direktori ${RUNTIME_DIR}:`, err);
    }
  }

  private loadFromDisk() {
    try {
      if (!this.filePath) return;
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
    } catch (err) {
      console.error(`[PersistentStore] Gagal memuat data dari ${this.filePath}:`, err);
    }
  }

  public syncCheck() {
    try {
      if (!this.filePath) return;
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
    try {
      if (!this.filePath) return;
      this.ensureDirectory();
      const obj: Record<string, any> = {};
      for (const [k, v] of super.entries()) {
        obj[k] = this.serializer ? this.serializer(v) : v;
      }

      const tempFile = `${this.filePath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 6)}`;
      fs.writeFileSync(tempFile, JSON.stringify(obj, null, 2), "utf-8");
      fs.renameSync(tempFile, this.filePath);

      const stat = fs.statSync(this.filePath);
      this.lastMtime = stat.mtimeMs;
    } catch (err) {
      console.error(`[PersistentStore] Gagal menyimpan ke ${this.filePath}:`, err);
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
    return this;
  }

  override delete(key: string): boolean {
    const deleted = super.delete(key);
    if (deleted) {
      this.saveToDisk();
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
