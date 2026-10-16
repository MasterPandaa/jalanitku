# JalanITku — Progress Tracker

> Log tahapan produksi JalanITku berdasarkan dokumen breakdown `JalanITku-Breakdown-Produksi-AI.md`.

---

## Ringkasan Tahap

| Tahap | Deskripsi | Status | Tanggal | Catatan |
|---|---|---|---|---|
| **T0** | Fondasi Proyek & Dokumen Konteks | Selesai | 2026-10-16 | Setup Next.js 15, Tailwind, TypeScript, i18n, docs/* lengkap |
| **T1** | Design System & Komponen UI | Selesai | 2026-10-16 | Komponen Neo-brutalism, Logo, JalanMin Mascot & /dev/components |
| **T2** | Landing Page | Pending | - | Halaman publik responsif & ramah anak IT |
| **T3** | Autentikasi & Profil | Pending | - | Google OAuth & username unik |
| **T4** | Data Layer & Seed Role | Pending | - | 19 role & kompetensi |
| **T5** | Bank Soal JalanKarir | Pending | - | 5 level × 25 soal + validator |
| **T6** | Engine & UI JalanKarir | Pending | - | Flow tes, scoring engine & tie-breaker |
| **T7** | JalanID | Pending | - | Kartu hasil, render PNG/PDF, Web Share API |
| **T8** | Sistem Mascot | Pending | - | 19 mascot role SVG + animasi 5 state |
| **T9** | Bank Soal JalanRapor | Pending | - | Soal pilihan ganda per role |
| **T10** | Engine & UI JalanRapor | Pending | - | Flow 5 level tanpa timer |
| **T11** | Cocoklogiku | Pending | - | Rapor hasil, radar chart, reason & rekomendasi |
| **T12** | Anti-Bot & Keamanan | Pending | - | Rate limit, captcha, randomisasi |
| **T13** | Polish, QA & Verifikasi | Pending | - | Audit visual, aksesibilitas, end-to-end test |
| **T14** | JalanLoker | Pending | - | Ditunda (tahap lanjut) |
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
