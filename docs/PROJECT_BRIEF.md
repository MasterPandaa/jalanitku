# JalanITku — Project Brief

> Platform untuk membantu teman-teman IT (mahasiswa, fresh graduate, career switcher) yang bingung memilih arah karier kerja di dunia IT.

---

## 1. Identitas Produk
- **Nama Produk**: JalanITku
- **Gaya Desain**: Neo-brutalism (border tebal 3–4px hitam, hard shadow offset tanpa blur, palet warna berani & kontras, tipografi tegas)
- **Model Bisnis**: 100% Gratis, tanpa iklan mengganggu, tanpa paywall
- **Target Pengguna**: Mahasiswa IT/Informatika, Fresh graduate, Career switcher non-IT ke IT, Siswa SMK/SMA IT

---

## 2. Fitur Utama
1. **Fitur A — JalanKarir**:
   - Mengarahkan pengguna menemukan role IT yang cocok dari **19 role IT**.
   - Tes 5 level (Minat Umum, Gaya Kerja, Skenario, Ketertarikan Teknis, Prioritas Karier).
   - Minimal 10 soal per level dari bank soal acak (total 50 soal inti).
   - Pertanyaan tipe skala 1–5 dan preferensi skenario (a–e). Tidak ada jawaban benar/salah.
   - Algoritma: Pembobotan vektor role (normalisasi persentase 0–100%).
   - Soal adaptif / tie-breaker jika selisih Top-N role ≤ 3 poin.
   - Hasil: **JalanID** (kartu nama digital berisi role utama + Top 3 + persentase kecocokan + mascot).
2. **Fitur B — JalanRapor**:
   - Menguji kecocokan pengguna dengan role IT incaran lewat tes teknis 5 level kesulitan (Dasar, Pemula, Menengah, Lanjut, Ahli).
   - 10 soal acak per level (total 50 soal). Semua berupa pilihan ganda (4–5 opsi, tepat 1 jawaban benar).
   - Penilaian server-side berbobot per level (L1=1, L2=1.5, L3=2, L4=2.5, L5=3) dan per kompetensi.
   - Hasil: **Cocoklogiku** (Rapor lengkap berisi skor akhir, label kecocokan, bar chart per level, radar chart per kompetensi, narasi reason deterministik, dan rekomendasi topik belajar).
3. **Fitur C — JalanLoker** *(Tahap lanjut, DITUNDA saat ini)*:
   - Kurasi lowongan IT sesuai role dan hasil rapor. Di UI ditandai dengan label "Segera Hadir".

---

## 3. Keputusan Final & Aturan Kunci
- **Bahasa**: Default Bahasa Indonesia (`id`). Seluruh teks harus melalui lapisan i18n (`id.json`) tanpa teks ter-hardcode agar Bahasa Inggris (`en.json`) dapat ditambahkan tanpa refaktor.
- **Autentikasi**: Google OAuth 2.0. Pengguna baru wajib melengkapi username unik (3–20 karakter, huruf/angka/_/., bisa diganti kapan saja).
- **Kepemilikan Hasil**: Satu pengguna hanya memiliki **1 JalanID aktif** dan **1 Cocoklogiku aktif** (1 role). Tes ulang atau berganti role akan menimpa hasil sebelumnya (upsert) dengan konfirmasi dialog peringatan.
- **Berbagi Hasil**: Dibagikan sebagai file gambar/dokumen (PNG 3 rasio: kartu, 1:1, 9:16, dan PDF) menggunakan Web Share API / unduh langsung. **TIDAK ADA** halaman publik, link share publik, atau Open Graph per pengguna.
- **Keamanan Bank Soal**: Kunci jawaban dan bobot role **TIDAK PERNAH** dikirim ke klien. Soal diambil bertahap per level dengan ID acak/sementara per sesi.
- **Tanpa Batas Waktu**: Tidak ada countdown timer per soal atau level di JalanKarir maupun JalanRapor.
- **Tanpa Leaderboard**: Tidak ada persaingan skor atau komparasi antar-pengguna.
