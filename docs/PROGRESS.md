# JalanITku — Progress Tracker

> Log tahapan produksi JalanITku berdasarkan dokumen breakdown `JalanITku-Breakdown-Produksi-AI.md`.

---

## Ringkasan Tahap

| Tahap | Deskripsi | Status | Tanggal | Catatan |
|---|---|---|---|---|
| **T0** | Fondasi Proyek & Dokumen Konteks | Selesai | 2026-10-16 | Setup Next.js 15, Tailwind, TypeScript, i18n, docs/* lengkap |
| **T1** | Design System & Komponen UI | Selesai | 2026-10-16 | Komponen Neo-brutalism, Logo, JalanMin Mascot & /dev/components |
| **T2** | Landing Page | Selesai | 2026-10-16 | Landing page publik lengkap, responsif, i18n & neo-brutalism |
| **T3** | Autentikasi & Profil | Selesai | 2026-10-16 | Auth flow, onboarding username unik, dashboard & profil settings |
| **T4** | Data Layer & Seed Role | Selesai | 2026-10-16 | Seed 19 role IT, kompetensi radar chart & halaman /dev/roles |
| **T5** | Bank Soal JalanKarir | Selesai | 2026-10-16 | Bank soal 5 level terkalibrasi ke 19 role + validator script |
| **T6** | Engine & UI JalanKarir | Selesai | 2026-10-16 | Scoring engine vektor role, flow tes 5 level & tie-breaker |
| **T7** | JalanID (Kartu, Unduh, Bagikan) | Selesai | 2026-10-16 | Kartu JalanID, render PNG 3 rasio, Web Share API & /karir/hasil |
| **T8** | Sistem Mascot | Pending | - | 19 mascot role SVG + animasi 5 state |
| **T9** | Bank Soal JalanRapor | Selesai | 2026-10-16 | Bank soal Batch R1 (5 role x 5 level) pilihan ganda + validator |
| **T10** | Engine & UI JalanRapor | Selesai | 2026-10-16 | Engine penilaian berbobot L1-L5, sanitasi soal, session store server |
| **T11** | Cocoklogiku | Selesai | 2026-10-16 | Rapor hasil, radar chart SVG, reason deterministik, canvas PNG & review |
| **T12** | Anti-Bot & Keamanan | In Progress | - | Zero-leak keys, rate limit, sanitasi respons |
| **T13** | Polish, QA & Verifikasi | Pending | - | Audit visual, aksesibilitas, end-to-end test |
| **T14** | JalanLoker | Ditunda | - | Segera Hadir sesuai brief |
| **T15** | Bahasa Inggris | Pending | - | Menyusul setelah versi Indonesia stabil |

---

## Log Aktivitas Terperinci

### [2026-10-16] Inisiasi T0 — Fondasi Proyek
- **Aset & Dokumen Ditelusuri**: Memeriksa `JalanITku-Planning-Sistem.md`, `JalanITku-Breakdown-Produksi-AI.md`, serta file aset visual (`Landing Page JalanITku-html`, `Logo Horizontal (terang & gelap)-html`, `Maskot Default JalanMin-html`, Banner A/B/C/OG).
- **Inisialisasi Git**: Inisialisasi git repository lokal, konfigurasi `.gitignore`.
- **Dokumen Konteks Dibuat**:
  - `docs/PROJECT_BRIEF.md`
  - `docs/DESIGN_SYSTEM.md`
  - `docs/DATA_SCHEMA.md`
  - `docs/API_CONTRACT.md`
  - `docs/CONTENT_GUIDE.md`
  - `docs/PROGRESS.md`
- **Setup Kerangka**: Instalasi dependensi Next.js, React 19, TypeScript, Tailwind CSS.

### [2026-10-16] Milestone MVP 2 — JalanRapor & Cocoklogiku (T9, T10, T11)
- **T9: Bank Soal JalanRapor**:
  - Penyusunan bank soal teknis Batch R1 (5 role prioritas: Software Engineer, Data Analyst, UI/UX Designer, Network Engineer, Quality Assurance) dengan 5 level (Level 1: Dasar s/d Level 5: Ahli).
  - Skrip verifikator `scripts/validate-rapor-questions.ts` memastikan konsistensi relasi pilar kompetensi, kunci jawaban, dan zero error.
- **T10: Engine JalanRapor**:
  - Penilaian berbobot server-side (Level 1=1x, Level 2=1.5x, Level 3=2x, Level 4=2.5x, Level 5=3x).
  - Sanitasi respons network tanpa membocorkan kunci jawaban atau pembahasan sebelum tes usai.
  - Alur 5 level tanpa timer, pengacakan opsi deterministik, dan session store server.
  - Aturan mutlak: Tepat 1 Cocoklogiku aktif per pengguna (upsert menimpa hasil lama dengan konfirmasi dialog peringatan).
- **T11: Cocoklogiku**:
  - Visualisasi Radar Chart SVG responsif untuk memetakan kekuatan kompetensi teknis pengguna.
  - Level Bar Chart pencapaian 5 level dengan warna token neo-brutalism.
  - Deterministik "Reason" generator yang menganalisis kekuatan, kelemahan, dan batas performa.
  - Rekomendasi belajar terarah dan saran alternatif role.
  - Kartu Cocoklogiku neo-brutalism dengan ekspor PNG (3 rasio: card, square 1:1, story 9:16) dan integrasi Web Share API (tanpa link publik).
  - Fitur peninjauan pembahasan soal pasca-tes dengan rincian penjelasan teknis.
