# JalanITku — Design System (Neo-Brutalism)

> Panduan token visual, tipografi, komponen, dan checklist styling neo-brutalism untuk JalanITku.

---

## 1. Design Tokens

### 1.1 Warna (Color Palette)
| Token | CSS Variable / Tailwind | Hex | Penggunaan Utama |
|---|---|---|---|
| `--ink` | `ink` | `#0A0A0A` | Border hitam solid, teks utama, shadow keras |
| `--paper` | `paper` | `#FFF8E7` | Background halaman utama (krem hangat) |
| `--white` | `white` | `#FFFFFF` | Background kartu, container elemen |
| `--yellow` | `yellow` | `#FFD60A` | Aksen utama, badge "IT" pada Logo, highlight |
| `--pink` | `pink` | `#FF5C8A` | Aksen sekunder, badge kategori, tag |
| `--blue` | `blue` | `#3D5AFE` | Tombol aksi primer, CTA, link utama |
| `--green` | `green` | `#2EE59D` | Status sukses, skor tinggi (Sangat Cocok) |
| `--orange` | `orange` | `#FF8A3D` | Peringatan ringan, aksen fitur |
| `--purple` | `purple` | `#9B5CFF` | Aksen tambahan, variasi badge |
| `--danger` | `danger` | `#FF3B3B` | Error, peringatan hapus/timpa hasil |

### 1.2 Border & Hard Shadow
| Token | Nilai CSS | Tailwind Utility / Custom Class |
|---|---|---|
| Border Standard | `3px solid #0A0A0A` | `border-3 border-ink` atau `border-[3px] border-[#0A0A0A]` |
| Border Thick | `4px solid #0A0A0A` / `5px` | `border-4 border-ink` atau `border-[5px] border-[#0A0A0A]` |
| Radius Default | `0px` (sharp) | `rounded-none` |
| Radius Accent | `6px` / `8px` (maksimal) | `rounded-md` (hanya untuk pill/tag kecil) |
| Shadow Small | `3px 3px 0 #0A0A0A` | `shadow-[3px_3px_0_#0A0A0A]` |
| Shadow Medium | `6px 6px 0 #0A0A0A` | `shadow-[6px_6px_0_#0A0A0A]` |
| Shadow Large | `10px 10px 0 #0A0A0A` | `shadow-[10px_10px_0_#0A0A0A]` |

### 1.3 Perilaku Interaksi Tombol (Micro-Interaction)
- **Normal**: memiliki offset shadow (misal `5px 5px 0 #0A0A0A` atau `6px 6px 0 #0A0A0A`).
- **Hover**: translasi negatif `transform: translate(-2px, -2px)` dengan shadow membesar `8px 8px 0 #0A0A0A`.
- **Active**: translasi positif `transform: translate(4px, 4px)` dengan shadow `0 0 0 #0A0A0A` (efek tertekan ke dasar).
- **Focus-visible**: outline tegas `4px solid #3D5AFE`, offset `3px`.

---

## 2. Tipografi
- **Headings & Logo**: `Archivo Black`, `Space Grotesk` (bold / black, line-height rapat 1.05 - 1.15, letter-spacing -0.03em).
- **Body & Teks Bacaan**: `DM Sans`, `Inter` (regular / medium / bold, 16px - 20px).
- **Elemen Teknis / Kode / Username**: `JetBrains Mono` (medium, monospace).

---

## 3. Komponen Logo
Logo teks JalanITku terdiri atas:
```
Jalan [ IT ] ku
```
- "Jalan" & "ku": font `Archivo Black`, warna `#0A0A0A`.
- "IT": font `Archivo Black`, dibungkus dalam kontainer kotak berlatar `#FFD60A`, berbingkai hitam tebal (`4px` - `7px`), bayangan offset keras (`4px 4px 0 #0A0A0A` - `9px 9px 0 #0A0A0A`), sedikit rotasi miring `-3deg`.

---

## 4. Checklist Kualitas Neo-Brutalism
- [ ] Semua elemen interaktif memiliki border hitam solid yang tegas.
- [ ] Seluruh shadow adalah hard shadow (offset tanpa blur).
- [ ] Dilarang memakai gradient halus, glassmorphism, atau blur drop shadow.
- [ ] Palet warna strictly dari design tokens yang didefinisikan.
- [ ] Rasio kontras teks memenuhi standar WCAG 2.1 AA.
- [ ] State hover, active, focus, dan disabled tersedia dan konsisten.
- [ ] Responsif sempurna mulai dari viewport 360px hingga layar desktop lebar.
- [ ] Mendukung `prefers-reduced-motion: reduce` (animasi dan transisi dinonaktifkan bila pengguna mengaktifkan pengaturan hemat gerak).
