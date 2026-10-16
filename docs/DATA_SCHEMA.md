# JalanITku — Data Schema

> Spesifikasi skema database untuk JalanITku.
> Konten teks disimpan ekstensibel untuk multi-bahasa (default: objek JSON `{ "id": "..." }`, siap diisi `{ "id": "...", "en": "..." }` kelak).

---

## 1. Entitas & Tabel Utama

### 1.1 `users`
Tabel pengguna hasil autentikasi Google.
- `id`: VARCHAR(36) / UUID (Primary Key)
- `google_sub`: VARCHAR(255) (UNIQUE, Google OAuth identifier)
- `email`: VARCHAR(255) (Email Google, TIDAK PERNAH dipublikasikan)
- `username`: VARCHAR(30) (UNIQUE, case-insensitive, 3-20 karakter valid)
- `display_name`: VARCHAR(255)
- `avatar_url`: TEXT (opsional)
- `locale`: VARCHAR(5) (default: `id`)
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `updated_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

### 1.2 `roles`
Daftar 19 role IT.
- `id`: VARCHAR(36) (Primary Key)
- `slug`: VARCHAR(50) (UNIQUE, misal `software-engineer`, `data-analyst`)
- `nama`: JSONB / JSON (`{"id": "Software Engineer"}`)
- `tagline`: JSONB / JSON (`{"id": "Membangun sistem dan logika digital..."}`)
- `deskripsi`: JSONB / JSON (`{"id": "Fokus pada pembuatan, pemeliharaan..."}`)
- `warna`: VARCHAR(20) (Hex warna role, misal `#FFD60A`)
- `mascot_key`: VARCHAR(50) (Key mascot role)
- `aktif`: BOOLEAN DEFAULT TRUE
- `urutan`: INT DEFAULT 0

### 1.3 `competencies`
Kompetensi per role (5–7 kompetensi per role, digunakan untuk sumbu radar chart Cocoklogiku).
- `id`: VARCHAR(36) (Primary Key)
- `role_id`: VARCHAR(36) (Foreign Key -> `roles.id`)
- `nama`: JSONB / JSON (`{"id": "SQL & Querying"}`)
- `deskripsi`: JSONB / JSON
- `urutan`: INT DEFAULT 0

### 1.4 `career_questions` (JalanKarir)
Bank soal untuk Fitur A.
- `id`: VARCHAR(36) (Primary Key)
- `level`: INT (1 s/d 5)
- `tipe`: VARCHAR(20) (`likert` [1-5] atau `preference` [opsi a-e])
- `teks`: JSONB / JSON (`{"id": "Saya lebih suka memecahkan masalah logika..."}`)
- `opsi`: JSONB / JSON (Array opsi teks `{ "id": "...", "bobot": {...} }`)
- `variants`: JSONB / JSON (Variasi kalimat untuk anti-scraping)
- `tag`: VARCHAR(50)
- `aktif`: BOOLEAN DEFAULT TRUE
- `versi`: INT DEFAULT 1

### 1.5 `question_role_weights`
Bobot soal terhadap 19 role (disimpan server-side, tidak pernah dikirim ke klien).
- `id`: VARCHAR(36) (Primary Key)
- `question_id`: VARCHAR(36) (Foreign Key -> `career_questions.id`)
- `role_id`: VARCHAR(36) (Foreign Key -> `roles.id`)
- `opsi_key`: VARCHAR(10) (Misal `1`, `2`, `3`, `4`, `5` atau `a`, `b`, `c`, `d`, `e`)
- `bobot`: FLOAT (Rentang -1.0 s/d +3.0)

### 1.6 `career_sessions`
Sesi pengerjaan tes JalanKarir.
- `id`: VARCHAR(36) (Primary Key)
- `user_id`: VARCHAR(36) (Foreign Key -> `users.id`)
- `status`: VARCHAR(20) (`in_progress`, `completed`, `abandoned`)
- `level_sekarang`: INT DEFAULT 1
- `seed_acak`: VARCHAR(64) (Seed randomisasi soal & opsi)
- `soal_terpilih`: JSONB / JSON (Daftar ID soal ter-hash yang di-generate)
- `mulai`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `selesai`: TIMESTAMP WITH TIME ZONE
- `hasil_skor`: JSONB / JSON (Hasil kalkulasi semua role)

### 1.7 `career_answers`
Detail jawaban tiap soal di sesi JalanKarir.
- `id`: VARCHAR(36) (Primary Key)
- `session_id`: VARCHAR(36) (Foreign Key -> `career_sessions.id`)
- `question_id`: VARCHAR(36) (Foreign Key -> `career_questions.id`)
- `jawaban`: VARCHAR(50)
- `waktu_jawab_ms`: INT
- `urutan`: INT

### 1.8 `jalan_ids`
Kartu JalanID aktif milik pengguna (Aturan: Satu pengguna = Tepat 1 JalanID aktif).
- `id`: VARCHAR(36) (Primary Key)
- `user_id`: VARCHAR(36) (UNIQUE, Foreign Key -> `users.id`) — *Upsert saat tes ulang*
- `session_id`: VARCHAR(36) (Foreign Key -> `career_sessions.id`)
- `role_utama`: VARCHAR(50) (Slug role peringkat 1)
- `persen_utama`: FLOAT (Persentase kecocokan 0-100%)
- `role_sekunder`: JSONB / JSON (Array Top 2 dan Top 3 role beserta persen)
- `kode_kartu`: VARCHAR(20) (Identifier unik kartu, misal `JID-892401`)
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `updated_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

### 1.9 `rapor_questions` (JalanRapor)
Bank soal teknis pilihan ganda untuk Fitur B.
- `id`: VARCHAR(36) (Primary Key)
- `role_id`: VARCHAR(36) (Foreign Key -> `roles.id`)
- `level`: INT (1 s/d 5)
- `tipe`: VARCHAR(20) (Default `multiple_choice`)
- `teks`: JSONB / JSON
- `opsi`: JSONB / JSON (Array 4-5 opsi pilihan)
- `kunci_jawaban`: VARCHAR(10) (Server-only, TIDAK PERNAH dikirim ke klien)
- `kompetensi_id`: VARCHAR(36) (Foreign Key -> `competencies.id`)
- `poin`: INT DEFAULT 1
- `penjelasan`: JSONB / JSON (Pembahasan jawaban benar)
- `aktif`: BOOLEAN DEFAULT TRUE

### 1.10 `rapor_sessions`
Sesi pengerjaan tes JalanRapor.
- `id`: VARCHAR(36) (Primary Key)
- `user_id`: VARCHAR(36) (Foreign Key -> `users.id`)
- `role_id`: VARCHAR(36) (Foreign Key -> `roles.id`)
- `status`: VARCHAR(20) (`in_progress`, `completed`)
- `level_sekarang`: INT DEFAULT 1
- `seed_acak`: VARCHAR(64)
- `mulai`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `selesai`: TIMESTAMP WITH TIME ZONE

### 1.11 `rapor_answers`
- `id`: VARCHAR(36) (Primary Key)
- `session_id`: VARCHAR(36) (Foreign Key -> `rapor_sessions.id`)
- `question_id`: VARCHAR(36) (Foreign Key -> `rapor_questions.id`)
- `jawaban`: VARCHAR(10)
- `benar`: BOOLEAN
- `poin_didapat`: FLOAT
- `waktu_jawab_ms`: INT

### 1.12 `cocoklogiku`
Rapor hasil evaluasi kecocokan role (Aturan: Satu pengguna = Tepat 1 Cocoklogiku aktif).
- `id`: VARCHAR(36) (Primary Key)
- `user_id`: VARCHAR(36) (UNIQUE, Foreign Key -> `users.id`) — *Upsert saat tes ulang / ganti role*
- `role_id`: VARCHAR(36) (Foreign Key -> `roles.id`)
- `session_id`: VARCHAR(36) (Foreign Key -> `rapor_sessions.id`)
- `nilai_akhir`: FLOAT (0-100)
- `label`: VARCHAR(30) (`Belum Cocok`, `Cukup Cocok`, `Cocok`, `Sangat Cocok`)
- `nilai_per_level`: JSONB / JSON (`[{"level": 1, "nilai": 90}, ...]`)
- `skor_kompetensi`: JSONB / JSON (`[{"kompetensi": "SQL", "skor": 85}, ...]`)
- `reason`: JSONB / JSON (Narasi penjelasan kekuatan, kelemahan, dan justifikasi skor)
- `rekomendasi`: JSONB / JSON (Daftar topik belajar & alternatif role)
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
- `updated_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
