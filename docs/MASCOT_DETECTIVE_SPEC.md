# Spesifikasi Desain Visual & Koreografi Gerak: Detektif JalanMin (Master Vector Edition)

> **Dokumen Resmi Spesifikasi Visual, Koordinat SVG 1000×1000, Filter Comic Shadow, & Koreografi Gerak Interaktif**  
> Proyek: **JalanITku**  
> Status: **Disetujui untuk Produksi (Approved for Production — Master Vector)**  
> Gaya: **Neo-Brutalism Kontemporer, Comic/Cartoon Sticker Hybrid & 60 FPS CSS Keyframe Micro-Interactions**  

---

## 1. Filosofi Karakter & Design DNA Profiling

### 1.1 Karakter Utama: Detektif JalanMin
**Detektif JalanMin: Sang Penyelidik Potensi IT** hadir dalam format ilustrasi vektor presisi tinggi (*Master Vector Art 1000×1000*) dengan siluet organik bulat telur/buah pir yang menggemaskan (*pear/bean silhouette*), diperkaya atribut detektif neo-brutalism dan efek stiker komik real-time.

* **Misi Karakter**: Menginvestigasi dan mengungkap jejak bakat terpendam para pencari karier IT menggunakan instrumen investigasinya: **Kaca Pembesar Interaktif (*Interactive Magnifying Glass*)**.
* **Keunikan Visual**:
  1. **Siluet Badan Organik & Gemuk**: Siluet badan kuning emas cerah (`#FFD21E`) dengan perut kuning muda lembut (`#FFF24B`).
  2. **Topi Deerstalker Pink Ikonik**: Topi pink (`#FF4B72`) dengan visor depan, pet pelindung leher belakang, jahitan lengkung tengah, dan simpul pita membal (*bow wiggle*) di puncak topi.
  3. **Mantel Jubah & Capelet Polkadot**: Kerah tegak ganda (`#D96B1B` & `#FF7E26`), mantel polkadot sisi kiri dan kanan (`#DE6C18` dengan bintik kuning emas `#FFD21E`), serta mantel jubah belakang pink bergelombang rapi (`#FF4B72`).
  4. **Sepatu Boots Oranye Tebal**: Sepatu boots detektif oranye tebal (`#F26419`) dengan garis lipatan pergelangan kaki.
  5. **Mata Besar Berkedip & Kaca Pembesar**: Mata bulat ekspresif dengan animasi kedip alami (*natural blink*), lirikan otomatis / pelacakan kursor kustom, dan kaca pembesar cokelat kayu (`#9A4B1A`) bersumbu radial lurus sempurna dengan rotasi `-15°`.
  6. **Filter Bayangan Blok Hitam Komik**: Efek bayangan stiker komik murni `feDropShadow` hitam solid `#080808` (`dx="18" dy="18"` arah kanan bawah / 45°).

### 1.2 Design DNA 3-Dimensional Calibration
```
[Tone: W5 / E5]  ──>  W5: Garis tepi kartun tebal 14px solid (#080808), bobot siluet sangat tegas.
                      E5: Sangat humanis, ekspresif, jenaka, dan ramah pemula.
[Space: D4 / R3] ──>  D4: Grid presisi tinggi 1000×1000 viewBox dengan pusat karakter (505, 550).
                      R3: Pose asimetris hidup (tangan kanan mengangkat instrumen investigasi).
[Chroma: S5 / H5]──>  S5: Warna triadik saturasi tinggi (Kuning #FFD21E, Pink #FF4B72, Oranye #F26419).
                      H5: Kontras komik maksimal dengan bayangan blok hitam #080808 tanpa blur.
```

### 1.3 Tabel Token Warna & Visual Primitives
| Token Visual | Nilai Hex | Peran pada Maskot |
|---|---|---|
| `--ink` | `#080808` | Border kartun tebal (14px & 12.5px), pupil mata, bayangan blok komik (drop shadow). |
| `--yellow` | `#FFD21E` | Badan utama, telapak tangan & lengan, kaki atas, bintik polkadot mantel. |
| `--yellow-light` | `#FFF24B` | Patch perut depan (*belly highlight*). |
| `--pink` | `#FF4B72` | Topi Deerstalker, mantel belakang (*back cape*), simpul pita topi, lidah. |
| `--orange` | `#F26419` | Sepatu bot detektif (*detective boots*). |
| `--orange-coat` | `#DE6C18` | Mantel luar berpolkadot sisi kiri dan kanan. |
| `--orange-cape` | `#FF7E26` | Jubah bahu (*shoulder capelet*). |
| `--orange-collar` | `#D96B1B` | Kerah tegak luar (*outer upright collar*). |
| `--brown-inner` | `#8F4012` | Lipatan dalam kerah (*inner collar fold*). |
| `--brown-tool` | `#9A4B1A` | Bingkai cincin dan gagang kayu kaca pembesar. |
| `--white` | `#FFFFFF` | Sklera mata, kaca lensa putih reflektif, kilau specular pupil. |

---

## 2. Struktur Layer & Spesifikasi Koordinat SVG (`viewBox="0 0 1000 1000"`)

Kanvas baku menggunakan sistem koordinat ortogonal `1000 x 1000` piksel dengan titik pusat maskot berada di `(505, 550)`.

```
        0,0 ──────────────────────────────────────── 1000,0
         │                                              │
         │           [LAYER 8: TOPI DETEKTIF PINK]      │  y: 78 - 398
         │           (Pita puncak, kubah, visor, pet)   │
         │                                              │
         │     [LAYER 4: WAJAH]    [LAYER 6: KACA]      │  y: 200 - 536
         │     (Mata kedip, lidah) (Kaca pembesar)      │
         │                                              │
         │     [LAYER 3: BADAN UTAMA TELUR/PIR]         │  y: 265 - 800
         │     (Kuning #FFD21E + Perut #FFF24B)         │
         │                                              │
         │     [LAYER 7: KERAH & JUBAH BAHU]            │  y: 400 - 584
         │     [LAYER 5/6: MANTEL POLKADOT KIRI/KANAN]  │  y: 462 - 726
         │                                              │
         │     [LAYER 1: JUBAH BELAKANG PINK]           │  y: 492 - 850
         │                                              │
         │     [LAYER 2: KAKI & SEPATU BOT ORANYE]      │  y: 755 - 922
         │                                              │
       0,1000 ────────────────────────────────────── 1000,1000
```

### 2.1 Rincian Layer

1. **Filter Bayangan Blok Hitam Komik (`#comic-shadow`)**
   ```xml
   <filter id="comic-shadow" x="-20%" y="-20%" width="140%" height="140%">
       <feDropShadow dx="18" dy="18" stdDeviation="0" flood-color="#080808" flood-opacity="1" />
   </filter>
   ```

2. **Layer 1: Jubah Belakang Pink (`#pinkBackCape` / `.anim-cape`)**
   * Gelombang scallop bawah rapi yang menjuntai di balik kedua kaki: `d="M 278,492 C 208,548 156,648 115,765 ..."`
   * Gelombang tengah di celah kaki: `M 476,775 C 488,850 536,850 548,775 Z`

3. **Layer 2: Kaki Kuning & Sepatu Bot Oranye (`#legsAndBoots`)**
   * Kaki kiri `(396, 755)` & kanan `(536, 755)` dimensi `88×72 rx=12`.
   * Sepatu bot kiri dan kanan melengkung gagah dengan garis pergelangan kaki.

4. **Layer 3: Badan Kuning Utama & Perut (`#yellowBody`)**
   * Siluet telur/buah pir membal: `M 312,445 C 326,315 395,265 505,265 C 615,265 656,325 674,448 ...`
   * Patch perut bawah cerah: `M 378,778 C 406,690 456,648 514,646 ...`

5. **Layer 4: Fitur Wajah (`#faceFeatures`)**
   * Mata simetris: sklera putih `cx=454, 574`, `cy=396`, `r=52`.
   * Pupil hitam `r=32` dengan catchlight putih `r=11`.
   * Mulut manis dengan lidah pink `#FF4B72`.

6. **Layer 5: Tangan Kiri & Mantel Polkadot Kiri (`.anim-left-arm` & `#coatLeft`)**
   * Tangan kuning santai di pinggul.
   * Mantel polkadot dengan `clipPath id="clipCoatLeft"`.

7. **Layer 6: Kaca Pembesar & Lengan Kanan (`#magnifierArmGroup` / `.anim-magnifier-arm`)**
   * Gagang kayu cokelat miring `-15°` sejajar dengan pusat lensa `(780, 275)`.
   * Cincin lensa `r=104`, kaca putih bersih `r=78`, kilau melengkung.
   * Telapak tangan dan ibu jari memeluk gagang dengan presisi.
   * Mantel polkadot kanan dengan `clipPath id="clipCoatRight"`.

8. **Layer 7: Kerah Jubah & Shoulder Capelet (`#collarAndCapelet`)**
   * Lipatan dalam cokelat `#8F4012`, capelet bahu `#FF7E26`, dan kerah tegak `#D96B1B`.

9. **Layer 8: Topi Deerstalker Pink (`#detectiveHat` / `.anim-hat`)**
   * Kubah topi pink `#FF4B72`, garis panel jahitan, visor depan, pet belakang, dan simpul pita atas (`.anim-bow`).

---

## 3. Matriks 5 State Interaktif

| State | Kondisi Penggunaan | Kecepatan Animasi | Modifier Class | Mulut | Kaca Pembesar / Aksi |
|---|---|---|---|---|---|
| **Idle** | Tampilan default halaman | `1.0x` | Standard | Senyum manis terbuka | Menyelidiki halus (`magnifySearch`) + eye blink |
| **Hover** | Mouse mendekati area maskot | `1.1x` | `.trigger-inspect` | Senyum manis terbuka | Zoom in inspeksi mendalam (`actionInspectZoom`) |
| **Happy** | Kuis selesai, form sukses | `1.25x` | `.trigger-jump` | Tawa lebar gembira | Melompat riang berturut-turut (`actionHappyJump`) |
| **Neutral** | 404 Not Found / Error | `0.8x` | Standard (tenang) | Senyum garis tenang | Gerakan stabil lambat menganalisis situasi |
| **Encourage** | CTA eksplorasi / Onboarding | `1.3x` | Standard (enerjik) | Senyum manis terbuka | Pumping ritmis cepat siap mendampingi user |

---

## 4. Standar Kode & Integrasi Komponen

Komponen React diimplementasikan di:
* `src/components/mascot/JalanMin.tsx`

Aset SVG mandiri (*standalone*) disimpan di:
* `public/assets/mascot/jalanmin-detective.svg` (Master Base)
* `public/assets/mascot/jalanmin-detective-idle.svg`
* `public/assets/mascot/jalanmin-detective-hover.svg`
* `public/assets/mascot/jalanmin-detective-happy.svg`
* `public/assets/mascot/jalanmin-detective-neutral.svg`
* `public/assets/mascot/jalanmin-detective-encourage.svg`

Interactive Visual Lab & Preview:
* `public/mascot-detective-preview.html`
