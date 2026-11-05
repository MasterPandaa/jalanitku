# GEMINI.md — Rules Proyek JalanITku

> Aturan teknis spesifik, konvensi visual, dan standar arsitektur proyek JalanITku.
> File ini berlaku untuk seluruh agen (Main Agent & 10 Rekan Bijuu + Gamabunta).

---

## 🎨 ATURAN BAKU PEMBUATAN MASKOT JALANITKU (MASCOT DESIGN RULES)

Setiap pembuatan, modifikasi, atau refactor maskot role IT JalanITku (komponen React `.tsx` maupun berkas `.svg`) **WAJIB MEMATUHI 4 ATURAN BAKU** berikut tanpa kompromi:

### 1. Konsistensi Ukuran & Geometri Badan (Base Body Standard)
- **Ukuran Badan Wajib Seragam**: Semua maskot menggunakan siluet badan rambu pintar JalanMin dengan dimensi baku:
  * **Kanvas**: `viewBox="0 0 200 200"`
  * **Dimensi Badan**: `width="106"` dan `height="94"` (posisi dasar `x="42" y="50"` dengan `rx="4"` atau `rx="6"`).
  * **Hard Drop Shadow**: `x="48" y="56" width="106" height="94" rx="4"` berwarna hitam pekat `#0A0A0A` murni tanpa blur.
  * **Outline / Stroke**: Solid `#0A0A0A` dengan ketebalan `4px` hingga `4.5px`.
- **Warna Badan Wajib Kuning Base**: Warna badan utama **WAJIB KUNING RAMBU (`#FFD60A`)**. Dilarang mengganti warna dasar badan menjadi warna lain (biru, merah karmin, hijau, dll.). Busana, rompi, jaket, tunic, atau kokpit kendaraan dipasang di atas badan kuning ini.
- **Larangan Ketidakkonsistenan Geometri**: **DILARANG KERAS** membuat badan yang ukurannya acak—tidak boleh ada yang terlalu kecil, terlalu besar, persegi panjang vertikal memanjang, atau lonjong. Proporsi kotak presisi harus identik di semua 21 role!

### 2. Larangan Aksesoris Mengambang Tanpa Instruksi (Anti-Clutter / Zero-Float Rule)
- **Zero-Float Policy**: **DILARANG MENAMBAHKAN** aksesoris atau ornamen mengambang liar (*floating badges, floating mini clouds, particle sparkles, 4-point stars, HUD text panels, status badges 99.9%, orbs*) di atas kepala atau di sekeliling karakter KECUALI jika pengguna secara eksplisit menginstruksikannya di dalam prompt.
- **Fokus Desain**: Setiap elemen visual harus melekat secara fungsional pada karakter (dikenakan di tubuh, digenggam di tangan, atau wahana pijakan/kendaraan di bawah badan).

### 3. Konsistensi Bentuk Mata & Riasan Pipi (Base Facial Anchor)
- **Bentuk Mata Baku**:
  * Sklera mata putih berbentuk persegi rounded (`width="22" height="24" rx="4"` dengan `stroke="#0A0A0A"` 3.5px, posisi `x="58" y="76"` untuk mata kiri dan `x="102" y="76"` untuk mata kanan).
  * Pupil hitam persegi rounded (`width="11" height="13" rx="2"`) dengan titik kilau putih utama (`circle r="1.5" fill="#FFFFFF"`) dan kilau sekunder cyan cerdas (`circle r="1.2" fill="#00F0FF"`).
- **Riasan Pipi Merona (*Blush*) Baku**:
  * Dua persegi panjang pink merona `#FF5C8A` (`width="12" height="7-8" rx="2"`) wajib terpasang di pelipis bawah mata kiri dan kanan (`y ≈ 104-106`).
- **Brand Identity**: Mata kotak rounded dan pipi pink ini adalah jangkar visual utama JalanMin yang menyatukan seluruh 21 maskot dalam satu keluarga besar.

### 4. Kebebasan Karakterisasi Mimik Wajah, Alis, & Mulut (Expressive Freedom)
- **Ekspresi Boleh Unik**: Mimik wajah, bentuk alis, dan bentuk mulut **bebas dan dianjurkan bervariasi** untuk mencerminkan kepribadian profesi:
  * **Alis**: Boleh tegas arsitektur, alis tajam menukik licik (*evil mastermind*), alis pendekar heroik, alis pilot gagah petualang, atau alis simetris perfeksionis.
  * **Mulut**: Boleh senyum ramah terbuka, seringai percaya diri (*smirk*), senyum seringai jahat bertaring (*fangs*), senyum tawa lebar, atau ekspresi gigih.
  * **Detail Wajah Karakter**: Boleh menambahkan kerut dahi, garis tawa, atau aksesoris wajah (kacamata kerja, eyepatch, dll.) selama bentuk dasar mata dan pipi tetap mematuhi Aturan 3.

### 5. Protokol Bedah Selektif Maskot (Surgical Edit Only — Anti-Rewrite)
- **Larangan Keras Full-Rewrite**: Untuk berkas maskot yang sudah ada (`src/components/mascot/roles/[Role]Mascot.tsx` dan `public/assets/mascot/roles/[role].svg`), **DILARANG MENULIS ULANG SELURUH BERKAS** jika hanya melakukan perbaikan minor (menghapus aksesoris, membetulkan posisi tangan, menyesuaikan mimik, atau tuning animasi). Menulis ulang seluruh berkas terbukti memicu pergeseran koordinat spasial dan merusak rig visual!
- **Prosedur Bedah Presisi**:
  1. `read_file` pada rentang baris spesifik tempat elemen target berada.
  2. Gunakan `edit_file` **HANYA** pada blok tag `<g id="...">` atau deklarasi `@keyframes` target.
  3. **Titik Engsel Animasi (Pivot Anchor)**: Saat tangan/lengan dipindahkan posisinya, selalu sesuaikan `transform-origin` dengan koordinat pangkal sendi baru dan pastikan ada `transform-box: fill-box;` agar gerakan tangan tidak melayang atau patah.
  4. **Sintaks React TSX**: Jaga atribut SVG dalam camelCase (`strokeWidth`, `strokeLinecap`, `fillRule`) dan jangan merusak interface props.
  5. **Bebas Birokrasi**: Tugas perbaikan maskot dieksekusi langsung oleh Main Agent secara mandiri (Solo Execution) tanpa perlu mendelegasikan ke subagent atau membaca template SVG eksternal.

---

## 🛠️ KONVENSI TEKNIS WORKSPACE JALANITKU
- **Framework**: Next.js 15 (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS + Standar Neo-Brutalism (border hitam tebal `border-ink`, hard shadow `shadow-nb`, font `Archivo Black` & `Space Grotesk`).
- **Lokasi Komponen Maskot**: `src/components/mascot/roles/[RoleName]Mascot.tsx`.
- **Lokasi Standalone SVG**: `public/assets/mascot/roles/[role-slug].svg`.
- **Lokasi Dokumentasi**: `docs/MASCOT_ROLES_ROADMAP.md` & `docs/DESIGN_SYSTEM.md`.
- **Data Seed Roles**: `src/data/seed/roles.json`.
- **Verifikasi & Quality Gate**: Wajib lolos `npx tsc --noEmit` dengan 0 error. **MANDATORY LIVE BROWSER VERIFICATION**: Untuk setiap perubahan UI (Navbar, Layout, Komponen, Halaman), agent DILARANG menyerahkan pekerjaan hanya berdasarkan status `tsc`. Wajib verifikasi runtime di browser, pastikan 0 React hydration error di browser console (misal: dilarang menyarangkan `<button>` di dalam `<Link>`), periksa responsivitas drawer mobile/desktop, dan pastikan 4 UI states (loading, empty, error, success) tampil sempurna.
