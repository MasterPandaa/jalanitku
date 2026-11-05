import { MascotState } from "@/components/mascot/JalanMin";

export interface HttpStatusDetail {
  code: number;
  series: "3xx" | "4xx" | "5xx";
  name: string;
  titleId: string;
  description: string;
  technicalContext: string;
  recommendedAction: string;
  responsibleRole: {
    name: string;
    slug: string;
  };
  mascotState: MascotState;
  colorVariant: "blue" | "yellow" | "orange" | "pink" | "green";
  isIdempotent: boolean;
  isCacheable: boolean;
  sampleHeaders: Record<string, string>;
  sampleResponse: Record<string, any>;
}

export const HTTP_STATUS_CATALOG: HttpStatusDetail[] = [
  // ==========================================
  // 3xx: REDIRECTION (PENGALIHAN)
  // ==========================================
  {
    code: 301,
    series: "3xx",
    name: "Moved Permanently",
    titleId: "Rute Dialihkan Permanen",
    description: "Halaman atau endpoint API ini telah dipindahkan selamanya ke alamat URL baru.",
    technicalContext: "Browser dan mesin pencari (SEO) akan meng-cache pengalihan ini dan secara otomatis memperbarui bookmark serta indeks tautan.",
    recommendedAction: "Perbarui tautan atau bookmark ke alamat URL tujuan yang tertera di header Location.",
    responsibleRole: {
      name: "Software Engineer",
      slug: "software-engineer",
    },
    mascotState: "encourage",
    colorVariant: "blue",
    isIdempotent: true,
    isCacheable: true,
    sampleHeaders: {
      "Location": "https://jalanitku.id/status/301",
      "Cache-Control": "public, max-age=86400",
    },
    sampleResponse: {
      statusCode: 301,
      message: "Resource permanently moved to new destination URL.",
      newLocation: "https://jalanitku.id/status/301",
    },
  },
  {
    code: 302,
    series: "3xx",
    name: "Found (Temporary Redirect)",
    titleId: "Pengalihan Sementara",
    description: "Halaman ini untuk sementara dipindahkan ke URL lain, tetapi alamat aslinya tetap berlaku di masa depan.",
    technicalContext: "Klien diarahkan ke URL lain untuk permintaan ini saja; mesin pencari tidak akan memperbarui URL indeks aslinya.",
    recommendedAction: "Ikuti pengalihan otomatis browser menuju URL target sementara.",
    responsibleRole: {
      name: "Software Engineer",
      slug: "software-engineer",
    },
    mascotState: "idle",
    colorVariant: "blue",
    isIdempotent: false,
    isCacheable: false,
    sampleHeaders: {
      "Location": "https://jalanitku.id/dashboard",
      "Cache-Control": "no-cache",
    },
    sampleResponse: {
      statusCode: 302,
      message: "Resource temporarily found at another location.",
      redirectUrl: "https://jalanitku.id/dashboard",
    },
  },
  {
    code: 304,
    series: "3xx",
    name: "Not Modified",
    titleId: "Konten Belum Berubah (Cache Aktif)",
    description: "Konten yang kamu minta belum mengalami perubahan sejak pengunduhan terakhir, sehingga versi cache lokal yang digunakan.",
    technicalContext: "Menghemat bandwidth jaringan. Server tidak mengirimkan ulang body respon karena ETag atau If-Modified-Since klien masih cocok.",
    recommendedAction: "Tidak ada aksi yang diperlukan; browser memanfaatkan cache lokal dengan kecepatan instan.",
    responsibleRole: {
      name: "DevOps Engineer",
      slug: "devops-engineer",
    },
    mascotState: "happy",
    colorVariant: "green",
    isIdempotent: true,
    isCacheable: true,
    sampleHeaders: {
      "ETag": '"33a64df551425fcc55e4d42a148795d9f25f89d4"',
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
    sampleResponse: {
      statusCode: 304,
      message: "Content not modified since previous fetch.",
    },
  },
  {
    code: 307,
    series: "3xx",
    name: "Temporary Redirect (Strict Method)",
    titleId: "Pengalihan Sementara (Metode Tetap)",
    description: "Pengalihan sementara yang menjamin metode HTTP (misal POST/PUT) tidak diubah menjadi GET saat proses pengalihan.",
    technicalContext: "Berbeda dengan 302 klasik yang sering kali diubah menjadi GET oleh browser, 307 secara tegas mempertahankan body dan metode HTTP aslinya.",
    recommendedAction: "Lanjutkan pengiriman data payload ke endpoint baru tanpa khawatir metode berubah.",
    responsibleRole: {
      name: "Software Engineer",
      slug: "software-engineer",
    },
    mascotState: "neutral",
    colorVariant: "blue",
    isIdempotent: false,
    isCacheable: false,
    sampleHeaders: {
      "Location": "https://jalanitku.id/api/karir/sessions/v2",
    },
    sampleResponse: {
      statusCode: 307,
      message: "Please repeat request using the same method at new endpoint.",
    },
  },
  {
    code: 308,
    series: "3xx",
    name: "Permanent Redirect (Strict Method)",
    titleId: "Pengalihan Permanen (Metode Tetap)",
    description: "Pengalihan permanen dengan jaminan bahwa metode HTTP (seperti POST) tidak akan diubah ke GET.",
    technicalContext: "Kombinasi antara sifat permanen 301 dan ketegasan metode 307. Sangat ideal untuk migrasi versi REST API modern.",
    recommendedAction: "Perbarui konfigurasi base URL API klien secara permanen ke endpoint baru.",
    responsibleRole: {
      name: "Cloud Engineer",
      slug: "cloud-engineer",
    },
    mascotState: "encourage",
    colorVariant: "blue",
    isIdempotent: true,
    isCacheable: true,
    sampleHeaders: {
      "Location": "https://api.jalanitku.id/v2",
      "Cache-Control": "public, max-age=604800",
    },
    sampleResponse: {
      statusCode: 308,
      message: "Endpoint permanently migrated with preserved HTTP verb.",
    },
  },

  // ==========================================
  // 4xx: CLIENT ERRORS (KESALAHAN KLIEN)
  // ==========================================
  {
    code: 400,
    series: "4xx",
    name: "Bad Request",
    titleId: "Permintaan Tidak Valid",
    description: "Format permintaan yang dikirim oleh browsermu tidak dapat dipahami atau ditolak oleh server karena sintaks tidak sesuai.",
    technicalContext: "Biasanya dipicu oleh payload JSON yang malformed, validasi skema data gagal (misal validasi Zod), atau header yang tidak lengkap.",
    recommendedAction: "Periksa kembali format input formulir, parameter URL, atau isi payload JSON yang dikirimkan.",
    responsibleRole: {
      name: "Quality Assurance",
      slug: "quality-assurance",
    },
    mascotState: "neutral",
    colorVariant: "orange",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Content-Type": "application/json; charset=utf-8",
    },
    sampleResponse: {
      statusCode: 400,
      error: "Bad Request",
      message: "Payload validasi gagal: 'username' wajib memiliki minimal 3 karakter.",
    },
  },
  {
    code: 401,
    series: "4xx",
    name: "Unauthorized",
    titleId: "Autentikasi Diperlukan",
    description: "Kamu belum masuk ke akun atau sesi autentikasimu telah kedaluwarsa. Silakan login terlebih dahulu.",
    technicalContext: "Server memerlukan kredensial autentikasi yang valid (cookie sesi HTTP-only, token Bearer JWT, atau OAuth session).",
    recommendedAction: "Klik tombol Masuk dengan Google untuk mengautentikasi akunmu kembali.",
    responsibleRole: {
      name: "Security Analyst",
      slug: "security-analyst",
    },
    mascotState: "idle",
    colorVariant: "yellow",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "WWW-Authenticate": "Bearer realm='jalanitku_auth'",
      "Content-Type": "application/json",
    },
    sampleResponse: {
      statusCode: 401,
      error: "Unauthorized",
      message: "Sesi telah berakhir atau token tidak ditemukan. Harap masuk kembali.",
    },
  },
  {
    code: 403,
    series: "4xx",
    name: "Forbidden",
    titleId: "Akses Ditolak",
    description: "Identitasmu terverifikasi, tetapi kamu tidak memiliki hak izin (*permissions*) untuk mengakses halaman atau data ini.",
    technicalContext: "Autentikasi berhasil, namun otorisasi peran (RBAC) membatasi akses klien terhadap sumber daya ini.",
    recommendedAction: "Pastikan akunmu memiliki wewenang atau kembali ke halaman dashboard utama.",
    responsibleRole: {
      name: "Security Analyst",
      slug: "security-analyst",
    },
    mascotState: "neutral",
    colorVariant: "orange",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Content-Type": "application/json",
    },
    sampleResponse: {
      statusCode: 403,
      error: "Forbidden",
      message: "Kamu tidak memiliki izin yang cukup untuk mengakses endpoint administratif ini.",
    },
  },
  {
    code: 404,
    series: "4xx",
    name: "Not Found",
    titleId: "Halaman Tidak Ditemukan",
    description: "Detektif JalanMin sudah mencari ke setiap sudut, namun rute atau data yang kamu cari tidak terdaftar di sistem JalanITku.",
    technicalContext: "Server tidak menemukan representasi aktif untuk URL target. Dapat disebabkan oleh salah ketik URL atau halaman yang telah dihapus.",
    recommendedAction: "Periksa kembali ejaan URL atau klik tombol kembali ke halaman beranda.",
    responsibleRole: {
      name: "IT Support",
      slug: "it-support",
    },
    mascotState: "neutral",
    colorVariant: "pink",
    isIdempotent: true,
    isCacheable: true,
    sampleHeaders: {
      "Content-Type": "text/html; charset=utf-8",
    },
    sampleResponse: {
      statusCode: 404,
      error: "Not Found",
      message: "Rute URL '/halaman-rahasia' tidak ditemukan dalam peta situs JalanITku.",
    },
  },
  {
    code: 405,
    series: "4xx",
    name: "Method Not Allowed",
    titleId: "Metode HTTP Tidak Diizinkan",
    description: "Metode permintaan HTTP yang digunakan (misal POST pada rute baca saja) tidak didukung oleh endpoint ini.",
    technicalContext: "Server mengetahui resource target, tetapi menolak metode HTTP yang digunakan. Server wajib mengembalikan header Allow.",
    recommendedAction: "Gunakan metode HTTP yang sesuai (misal GET alih-alih POST) seperti yang ditentukan pada kontrak API.",
    responsibleRole: {
      name: "Software Engineer",
      slug: "software-engineer",
    },
    mascotState: "neutral",
    colorVariant: "orange",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Allow": "GET, HEAD, OPTIONS",
    },
    sampleResponse: {
      statusCode: 405,
      error: "Method Not Allowed",
      message: "Metode POST tidak didukung pada rute publik ini. Gunakan metode GET.",
    },
  },
  {
    code: 408,
    series: "4xx",
    name: "Request Timeout",
    titleId: "Waktu Permintaan Habis",
    description: "Koneksi internet klien memakan waktu terlalu lama saat mengirimkan data sehingga server menutup sambungan.",
    technicalContext: "Server memutuskan sambungan yang menganggur karena klien tidak mengirimkan permintaan lengkap dalam batas waktu toleransi.",
    recommendedAction: "Periksa kestabilan jaringan internetmu, lalu coba kirimkan kembali permintaan.",
    responsibleRole: {
      name: "Network Engineer",
      slug: "network-engineer",
    },
    mascotState: "idle",
    colorVariant: "orange",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Connection": "close",
    },
    sampleResponse: {
      statusCode: 408,
      error: "Request Timeout",
      message: "Server menghentikan koneksi karena tidak ada aktivitas pengiriman data dari klien.",
    },
  },
  {
    code: 409,
    series: "4xx",
    name: "Conflict",
    titleId: "Konflik Status Sumber Daya",
    description: "Permintaanmu bertabrakan dengan data yang sudah ada di sistem (contoh: username unik sudah diambil orang lain).",
    technicalContext: "Sering terjadi saat mutasi konkurensi (optimistic locking), atau pelanggaran batasan unik (unique constraint) pada database.",
    recommendedAction: "Ubah nilai yang bertabrakan (misalnya coba kombinasi username lain) lalu ulangi penyimpanan.",
    responsibleRole: {
      name: "Software Engineer",
      slug: "software-engineer",
    },
    mascotState: "neutral",
    colorVariant: "orange",
    isIdempotent: false,
    isCacheable: false,
    sampleHeaders: {
      "Content-Type": "application/json",
    },
    sampleResponse: {
      statusCode: 409,
      error: "Conflict",
      message: "Username 'budi_santoso' sudah digunakan pengguna lain. Silakan pilih username alternatif.",
    },
  },
  {
    code: 422,
    series: "4xx",
    name: "Unprocessable Entity",
    titleId: "Semantik Data Tidak Dapat Diproses",
    description: "Sintaks permintaan sudah benar, tetapi isi data di dalamnya tidak masuk akal atau melanggar aturan logika bisnis.",
    technicalContext: "Banyak digunakan pada API modern (WebDAV, Laravel, FastAPI, Rails) saat format JSON valid namun validasi semantik bisnis ditolak.",
    recommendedAction: "Periksa kembali aturan isian kolom (misalnya skor tidak boleh bernilai negatif).",
    responsibleRole: {
      name: "Quality Assurance",
      slug: "quality-assurance",
    },
    mascotState: "neutral",
    colorVariant: "orange",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Content-Type": "application/json",
    },
    sampleResponse: {
      statusCode: 422,
      error: "Unprocessable Entity",
      errors: {
        score: ["Skor kompetensi harus berada di antara angka 0 hingga 100."],
      },
    },
  },
  {
    code: 429,
    series: "4xx",
    name: "Too Many Requests",
    titleId: "Batas Frekuensi Terlampaui (Rate Limit)",
    description: "Kamu mengirimkan terlalu banyak permintaan dalam waktu singkat. Sistem membatasi demi keamanan dan keadilan pemakaian.",
    technicalContext: "Diterapkan oleh API Gateway, CDN (Cloudflare), atau reverse proxy menggunakan algoritma Token Bucket / Leaky Bucket untuk mencegah abuse dan DDoS.",
    recommendedAction: "Tunggu beberapa saat sesuai durasi penalti sebelum melakukan permintaan berikutnya.",
    responsibleRole: {
      name: "DevOps Engineer",
      slug: "devops-engineer",
    },
    mascotState: "neutral",
    colorVariant: "pink",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Retry-After": "60",
      "X-RateLimit-Limit": "100",
      "X-RateLimit-Remaining": "0",
    },
    sampleResponse: {
      statusCode: 429,
      error: "Too Many Requests",
      message: "Batas frekuensi permintaan tercapai. Harap tunggu 60 detik.",
    },
  },

  // ==========================================
  // 5xx: SERVER ERRORS (GANGGUAN SERVER)
  // ==========================================
  {
    code: 500,
    series: "5xx",
    name: "Internal Server Error",
    titleId: "Gangguan Internal Server",
    description: "Terjadi kondisi tak terduga pada sistem backend kami saat memproses permintaanmu. Tim teknis sedang menanganinya.",
    technicalContext: "Kesalahan tak tertangani (*unhandled exception*) pada kode server, kegagalan database query, atau crash pada proses runtime Node.js/Go.",
    recommendedAction: "Muat ulang halaman dalam beberapa saat atau hubungi tim bantuan JalanITku jika kendala berlanjut.",
    responsibleRole: {
      name: "Software Engineer",
      slug: "software-engineer",
    },
    mascotState: "neutral",
    colorVariant: "pink",
    isIdempotent: false,
    isCacheable: false,
    sampleHeaders: {
      "Content-Type": "application/json",
    },
    sampleResponse: {
      statusCode: 500,
      error: "Internal Server Error",
      message: "Terjadi kegagalan pemrosesan tak terduga pada server.",
    },
  },
  {
    code: 502,
    series: "5xx",
    name: "Bad Gateway",
    titleId: "Pintu Gerbang Gagal Menerima Respon",
    description: "Server proxy gerbang utama (seperti Nginx atau Cloudflare) menerima respons tidak valid dari server backend aplikasi.",
    technicalContext: "Reverse proxy tidak dapat terhubung ke upstream container/aplikasi karena proses backend mati, crash, atau salah konfigurasi port socket.",
    recommendedAction: "Coba segarkan halaman kembali dalam 1-2 menit setelah layanan upstream pulih.",
    responsibleRole: {
      name: "DevOps Engineer",
      slug: "devops-engineer",
    },
    mascotState: "neutral",
    colorVariant: "orange",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Server": "cloudflare / nginx",
      "Content-Type": "text/html",
    },
    sampleResponse: {
      statusCode: 502,
      error: "Bad Gateway",
      message: "Upstream application server failed to respond properly.",
    },
  },
  {
    code: 503,
    series: "5xx",
    name: "Service Unavailable",
    titleId: "Layanan Sedang Pemeliharaan / Sibuk",
    description: "Server saat ini sedang tidak dapat melayani permintaan karena sedang dalam masa pemeliharaan rutin atau kelebihan beban trafik.",
    technicalContext: "Kondisi sementara saat server sengaja dipasang mode maintenance, atau saat CPU/Memory server mencapai 100% sehingga menolak koneksi baru.",
    recommendedAction: "Tunggu sebentar dan muat ulang halaman saat masa pemeliharaan selesai.",
    responsibleRole: {
      name: "Cloud Engineer",
      slug: "cloud-engineer",
    },
    mascotState: "encourage",
    colorVariant: "yellow",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Retry-After": "120",
    },
    sampleResponse: {
      statusCode: 503,
      error: "Service Unavailable",
      message: "Layanan sedang dalam pemeliharaan terjadwal. Silakan coba kembali dalam 2 menit.",
    },
  },
  {
    code: 504,
    series: "5xx",
    name: "Gateway Timeout",
    titleId: "Waktu Tunggu Server Hulu Habis",
    description: "Server gerbang perantara tidak mendapatkan balasan tepat waktu dari server database atau microservice internal.",
    technicalContext: "Koneksi antara reverse proxy dan backend upstream terputus karena query SQL berat yang terkunci (*deadlock*) atau operasi komputasi lambat.",
    recommendedAction: "Periksa kembali kestabilan koneksi atau coba lakukan aksi dengan parameter pencarian yang lebih spesifik.",
    responsibleRole: {
      name: "Network Engineer",
      slug: "network-engineer",
    },
    mascotState: "idle",
    colorVariant: "orange",
    isIdempotent: true,
    isCacheable: false,
    sampleHeaders: {
      "Server": "gateway-proxy",
    },
    sampleResponse: {
      statusCode: 504,
      error: "Gateway Timeout",
      message: "The upstream server took too long to complete execution.",
    },
  },
];

export function getHttpStatusByCode(code: number | string): HttpStatusDetail | undefined {
  const num = typeof code === "string" ? parseInt(code, 10) : code;
  return HTTP_STATUS_CATALOG.find((item) => item.code === num);
}

export function getHttpStatusesBySeries(series: "3xx" | "4xx" | "5xx"): HttpStatusDetail[] {
  return HTTP_STATUS_CATALOG.filter((item) => item.series === series);
}
