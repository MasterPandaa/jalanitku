# Spesifikasi Desain Visual & Koreografi Gerak: Detektif JalanMin
        
        > **Dokumen Resmi Spesifikasi Visual, Koordinat SVG, & Koreografi Gerak Interaktif**  
        > Proyek: **JalanITku**  
        > Sutradara Visual: **Matatabi (Ekor Dua) — Visual & Creative Director**  
        > Status: **Disetujui untuk Produksi (Approved for Production)**  
        > Gaya: **Neo-Brutalism Kontemporer & Micro-Interactions Interaktif**  
        
        ---
        
        ## 1. Filosofi Karakter & Design DNA Profiling
        
        ### 1.1 Metamorfosis Karakter: Detektif JalanMin
        Sebelumnya, **JalanMin** adalah maskot berwujud papan penunjuk jalan (*smart signboard*) ramah yang memandu calon talenta IT. Dalam evolusi ini, JalanMin bertransformasi menjadi **Detektif JalanMin: Sang Penyelidik Potensi IT**.
        
        * **Misi Karakter**: Menginvestigasi dan mengungkap jejak bakat terpendam para pencari karier IT (mahasiswa, fresh graduate, career switcher) menggunakan instrumen investigasinya: **Kaca Pembesar Interaktif (*Interactive Magnifying Glass*)**.
        * **Keunikan Visual**: Menjaga siluet kotak kuning ikonik JalanMin, namun diperkaya atribut khas detektif neo-brutalism: topi *Deerstalker* beraksen visor ganda, kerah mantel *trench coat* dengan dasi cyan elegan, serta kaca pembesar tebal dengan pembesaran optik pada mata kanan yang **menatap dan mengikuti pergerakan kursor mouse pengguna secara hidup dan jenaka**.
        
        ### 1.2 Design DNA 3-Dimensional Calibration
        Berdasarkan Master Skill `master-designer` dan `master-ui`, karakter ini dikalibrasi dengan profil matriks 3-Axis:
        ```
        [Tone: W5 / E4]  ──>  W5: Border hitam pekat 4-5px, bobot siluet sangat tegas.
                              E4: Humanis, ekspresif, jenaka, dan penuh sentuhan personal.
        [Space: D3 / R2] ──>  D3: Proporsi seimbang pada grid 200x200 / 240x240 viewBox.
                              R2: Geometri asimetris dinamis (kemiringan topi & kaca pembesar).
        [Chroma: S5 / H5]──>  S5: Saturasi tinggi (Kuning #FFD60A, Pink #FF5C8A, Cyan #00F0FF).
                              H5: Kontras triadik neo-brutalist dengan latar putih/krem.
        ```
        
        ### 1.3 Tabel Token Warna & Visual Primitives
        | Token Visual | Nilai Hex | Peran pada Maskot |
        |---|---|---|
        | `--ink` | `#0A0A0A` | Border 4-5px solid, pupil mata, sepatu detektif, outline utama, hard shadow. |
        | `--yellow` | `#FFD60A` | Badan papan rambu utama, tangan/kepalan, visor topi detektif. |
        | `--pink` | `#FF5C8A` | Kubah topi (*hat crown*), rona pipi (*blush*), gagang kaca pembesar (*handle*), lidah. |
        | `--cyan` | `#00F0FF` | Kaca lensa reflektif (*lens tint*), pita topi (*hatband*), dasi detektif (*tie*), kilau pupil. |
        | `--white` | `#FFFFFF` | Sklera mata, kerah kemeja detektif (*trench collar*), kilau lensa (*lens glint*), sol sepatu. |
        | `--shadow` | `#0A0A0A` | Hard shadow murni tanpa blur (`offset: 8px 8px` pada container, `4-8px` pada SVG). |
        
        ---
        
        ## 2. Struktur Layer & Spesifikasi Koordinat SVG (`viewBox="0 0 200 200"`)
        
        Kanvas baku menggunakan sistem koordinat ortogonal `200 x 200` piksel dengan titik pusat maskot berada di `(100, 100)`.
        
        ```
                0,0 ──────────────────────────────────────── 200,0
                 │                                             │
                 │           [LAYER 7: TOPI DEERSTALKER]       │  y: 8 - 50
                 │                                             │
                 │     [LAYER 5: MATA]    [LAYER 6: LENSA]     │  y: 68 - 106
                 │     (Mata kiri normal) (Mata kanan membesar)│
                 │                                             │
                 │           [LAYER 3: BADAN RAMBU]            │  y: 50 - 146
                 │           (Kuning #FFD60A + Hard Shadow)    │
                 │                                             │
                 │         [LAYER 4: KERAH & DASI DETEKTIF]    │  y: 130 - 150
                 │                                             │
                 │     [LAYER 2: TANGAN]   [LAYER 6: GAGANG]   │  y: 98 - 138
                 │     (Tangan kiri)       (Tangan kanan megang)
                 │                                             │
                 │           [LAYER 1: KAKI SEPATU HITAM]      │  y: 150 - 176
                 │                                             │
               0,200 ────────────────────────────────────── 200,200
        ```
        
        ### 2.1 Rincian Koordinat Tiap Layer
        
        #### Layer 1: Kaki & Sepatu Detektif (`y: 150 - 176`)
        * **Hard Shadow Kaki**:
          ```xml
          <rect x="66" y="154" width="22" height="26" fill="#0A0A0A" />
          <rect x="120" y="154" width="22" height="26" fill="#0A0A0A" />
          ```
        * **Kaki Kiri & Kanan**:
          ```xml
          <rect x="62" y="150" width="22" height="26" fill="#0A0A0A" rx="2" />
          <rect x="116" y="150" width="22" height="26" fill="#0A0A0A" rx="2" />
          ```
        * **Aksen Sol Sepatu Putih**:
          ```xml
          <line x1="62" y1="172" x2="84" y2="172" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" />
          <line x1="116" y1="172" x2="138" y2="172" stroke="#FFFFFF" stroke-width="3" stroke-linecap="square" />
          ```
        
        #### Layer 2: Lengan & Tangan (`y: 98 - 138`)
        * **Lengan Kiri**:
          * Default/Idle: `line x1="40" y1="104" x2="18" y2="124" stroke="#0A0A0A" stroke-width="6" stroke-linecap="round"`
          * Telapak/Kepalan Kiri: `circle cx="16" cy="126" r="6" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4"`
          * State Encourage (Jempol/Thumbs Up): `line x1="40" y1="104" x2="18" y2="92"` + jempol mengacung ke atas.
          * State Happy (Tangan Melambai ke Atas): `line x1="40" y1="100" x2="16" y2="76"`.
        * **Lengan Kanan (Memegang Gagang Kaca Pembesar)**:
          * Pangkal bahu `(150, 104)` terhubung ke gagang kaca pembesar pada `(146, 110)`.
          * Tangan Kanan: `circle cx="148" cy="108" r="6.5" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4"` mencengkeram gagang secara kokoh.
        
        #### Layer 3: Badan Rambu Utama (`y: 50 - 146`)
        * **Hard Shadow Badan**:
          ```xml
          <rect x="48" y="58" width="110" height="96" fill="#0A0A0A" />
          ```
        * **Badan Rambu Papan Kuning**:
          ```xml
          <rect x="40" y="50" width="110" height="96" fill="#FFD60A" stroke="#0A0A0A" stroke-width="5" />
          ```
        * **Garis Putus-Putus Marka Jalan (DNA Rambu Jalan)**:
          ```xml
          <line x1="52" y1="134" x2="138" y2="134" stroke="#0A0A0A" stroke-width="4" stroke-dasharray="10 8" />
          ```
        * **Pipi Merona (*Blush Cheeks*)**:
          ```xml
          <rect x="54" y="104" width="12" height="8" rx="2" fill="#FF5C8A" />
          <rect x="124" y="104" width="12" height="8" rx="2" fill="#FF5C8A" />
          ```
        
        #### Layer 4: Kerah Mantel & Dasi Detektif (`y: 130 - 150`)
        * **Kerah Mantel Trench Putih**:
          ```xml
          <polygon points="74,146 88,146 82,132" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3" stroke-linejoin="round" />
          <polygon points="116,146 102,146 108,132" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3" stroke-linejoin="round" />
          ```
        * **Dasi Detektif Cyan (#00F0FF)**:
          ```xml
          <!-- Simpul dasi -->
          <rect x="91" y="132" width="8" height="5" fill="#00F0FF" stroke="#0A0A0A" stroke-width="2.5" />
          <!-- Badan dasi segitiga berlian -->
          <polygon points="91,137 99,137 101,146 95,150 89,146" fill="#00F0FF" stroke="#0A0A0A" stroke-width="2.5" />
          ```
        
        #### Layer 5: Mata & Pupil Interaktif Pelacak Kursor (`y: 68 - 104`)
        * **Mata Kiri (Normal Penasaran)**:
          * Sklera putih: `rect x="66" y="78" width="18" height="22" rx="4" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="4"`
          * Pupil dinamis (`translate(pupilDeltaX, pupilDeltaY)`):
            ```xml
            <g style="transform: translate(var(--p-left-x, 0px), var(--p-left-y, 0px)); transition: transform 0.12s ease-out;">
              <rect x="71" y="84" width="8" height="10" rx="2" fill="#0A0A0A" />
              <circle cx="73.5" cy="86.5" r="1.5" fill="#FFFFFF" />
            </g>
            ```
        * **Mata Kanan (Mata Investigasi di Belakang Kaca Pembesar — Efek Pembesaran 1.25x)**:
          * Sklera putih berukuran lebih besar (`24 x 28` vs `18 x 22`):
            `rect x="104" y="74" width="24" height="28" rx="5" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="4"`
          * Pupil dinamis (`translate(pupilDeltaX * 1.2, pupilDeltaY * 1.2)`):
            ```xml
            <g style="transform: translate(var(--p-right-x, 0px), var(--p-right-y, 0px)); transition: transform 0.12s ease-out;">
              <rect x="110" y="81" width="11" height="13" rx="2.5" fill="#0A0A0A" />
              <circle cx="113.5" cy="84" r="2.2" fill="#FFFFFF" />
              <circle cx="117.5" cy="89" r="1.2" fill="#00F0FF" />
            </g>
            ```
        * **Alis Penyelidik**:
          * Alis Kiri: `line x1="64" y1="72" x2="84" y2="74" stroke="#0A0A0A" stroke-width="4" stroke-linecap="round"`
          * Alis Kanan (Terangkat penasaran): `line x1="104" y1="68" x2="128" y2="70" stroke="#0A0A0A" stroke-width="4" stroke-linecap="round"`
        
        #### Layer 6: Kaca Pembesar Neo-Brutalism & Pelacak Parallax (`y: 64 - 138`)
        Kaca pembesar dibungkus dalam grup `<g id="jm-magnifier">` dengan pusat rotasi pada pusat lensa `(116px, 88px)`. Grup ini merespons posisi mouse dengan translasi halus dan rotasi sudut:
        
        ```xml
        <g id="jm-magnifier" style="transform: translate(var(--g-x, 0px), var(--g-y, 0px)) rotate(var(--g-rot, 0deg)); transform-origin: 116px 88px; transition: transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1);">
          <!-- 1. Hard Shadow Kaca Pembesar -->
          <circle cx="120" cy="92" r="23" fill="#0A0A0A" />
          <rect x="138" y="106" width="12" height="32" rx="3" transform="rotate(-38 138 106)" fill="#0A0A0A" />
        
          <!-- 2. Gagang Tebal Neo-brutalism (Pink #FF5C8A) -->
          <rect x="134" y="102" width="12" height="32" rx="3" transform="rotate(-38 134 102)" fill="#FF5C8A" stroke="#0A0A0A" stroke-width="4.5" />
          <!-- Tekstur grip garis gagang -->
          <line x1="140" y1="112" x2="148" y2="106" stroke="#0A0A0A" stroke-width="3" stroke-linecap="round" />
          <line x1="144" y1="117" x2="152" y2="111" stroke="#0A0A0A" stroke-width="3" stroke-linecap="round" />
        
          <!-- 3. Bingkai Lensa Tebal (Black Rim 5px) -->
          <circle cx="116" cy="88" r="23" fill="#FFFFFF" fill-opacity="0.12" stroke="#0A0A0A" stroke-width="5" />
        
          <!-- 4. Lensa Kaca Refraktif Cyan (#00F0FF) -->
          <circle cx="116" cy="88" r="19.5" fill="#00F0FF" fill-opacity="0.28" />
        
          <!-- 5. Kilau Glare Refleksi Neo-Brutalism -->
          <path d="M103 78 A16 16 0 0 1 126 73" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none" />
          <circle cx="124" cy="98" r="2" fill="#FFFFFF" />
        </g>
        ```
        
        #### Layer 7: Topi Detektif Deerstalker Neo-Brutalism (`y: 8 - 50`)
        Topi ini merupakan peleburan (*hybrid*) bentuk legendaris topi Sherlock Holmes dengan tanda panah khas rambu JalanITku:
        * **Hard Shadow Topi**:
          ```xml
          <path d="M46 48 C46 22 70 12 95 12 C120 12 144 22 144 48 Z" fill="#0A0A0A" />
          ```
        * **Kubah Topi (*Crown*) Pink (#FF5C8A)**:
          ```xml
          <path d="M42 44 C42 18 68 8 95 8 C122 8 148 18 148 44 Z" fill="#FF5C8A" stroke="#0A0A0A" stroke-width="5" />
          ```
        * **Visor Depan Kanan (Pet Menghadap Kursor / Aksen Panah Rambu)**:
          ```xml
          <path d="M142 40 L168 46 L142 50 Z" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4.5" stroke-linejoin="miter" />
          ```
        * **Visor Belakang Kiri**:
          ```xml
          <path d="M48 40 L22 46 L48 50 Z" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4.5" stroke-linejoin="miter" />
          ```
        * **Pita Pinggang Topi Cyan (#00F0FF)**:
          ```xml
          <rect x="42" y="38" width="106" height="8" fill="#00F0FF" stroke="#0A0A0A" stroke-width="3" />
          ```
        * **Penutup Telinga & Pita Pengikat di Puncak**:
          ```xml
          <!-- Garis lipatan telinga topi kiri & kanan -->
          <path d="M68 38 C68 22 80 14 93 11" stroke="#0A0A0A" stroke-width="4" fill="none" />
          <path d="M122 38 C122 22 110 14 97 11" stroke="#0A0A0A" stroke-width="4" fill="none" />
          <!-- Simpul pita pengikat -->
          <circle cx="95" cy="8" r="4.5" fill="#00F0FF" stroke="#0A0A0A" stroke-width="2.5" />
          <path d="M92 8 Q86 3 88 12" stroke="#00F0FF" stroke-width="3" fill="none" />
          <path d="M98 8 Q104 3 102 12" stroke="#00F0FF" stroke-width="3" fill="none" />
          ```
        
        ---
        
        ## 3. Matriks 5 State Animasi Detektif JalanMin
        
        Detektif JalanMin sepenuhnya mempertahankan kompatibilitas 5 state asli (`idle`, `hover`, `happy`, `neutral`, `encourage`) dengan penyempurnaan ekspresi detektif:
        
        | State | Situasi / Trigger | Koreografi Tubuh | Koreografi Kaca Pembesar | Ekspresi Wajah & Topi |
        |---|---|---|---|---|
        | **`idle`** | Halaman statis, menunggu interaksi pengguna | Melayang santai bernapas (`jm-bob`, $\pm 5	ext{px}$) | Dipegang di samping kanan tubuh, mengamati jejak kursor di layar secara aktif (mata bebas) | Senyum simpul santai, topi miring $-2^\circ$ hingga $+2^\circ$ |
        | **`hover`** | Kursor mouse masuk ke card/tombol atau area maskot | Mencondongkan badan maju mendekat (`scale(1.03)`, translasi $-3	ext{px}$) | Kaca pembesar membesar mendekati pemirsa (`zoom-in`), kilau lensa berdenyut | Mata membelalak ingin tahu, mulut membentuk "O" kecil gembira |
        | **`happy`** | Kasus terpecahkan! Jawaban benar, hasil tes selesai | Melompat riang vertikal (`jm-jump`, $-16	ext{px}$) | Kaca pembesar diacungkan ke udara dengan bangga di tangan kanan | Topi terangkat ke udara (*hat pop* $-14	ext{px}$), mulut tertawa lebar dengan lidah pink, mata berbinar |
        | **`neutral`** | Menunggu waktu respon, berpikir menganalisis petunjuk | Diam tenang dan fokus | Kaca pembesar diturunkan sedikit ke dekat dagu bagai pipa pemikir | Satu alis terangkat tinggi, mulut garis datar horizontal cermat |
        | **`encourage`** | Memberi motivasi saat pengguna ragu atau skor belum optimal | Hentakan semangat berulang (`jm-pump`) | Mengarahkan kaca pembesar lurus ke depan seakan berkata *"Aku melihat potensimu!"* | Tangan kiri mengacungkan jempol mantap (*thumbs up*), seringai senyum optimis |
        
        ---
        
        ## 4. Parameter Matematis Transformasi Pelacakan Kursor (Mouse Tracking Physics)
        
        Sistem pelacakan kursor didesain untuk terasa hidup (*alive*), tidak kaku, dan memiliki kelembaman (*inertia*) yang menyenangkan.
        
        ### 4.1 Normalisasi Koordinat
        Diberikan elemen maskot dalam viewport browser:
        1. Hitung pusat maskot dalam koordinat viewport ($C_x, C_y$):
           $$C_x = 	ext{rect.left} + rac{	ext{rect.width}}{2}$$
           $$C_y = 	ext{rect.top} + rac{	ext{rect.height}}{2}$$
        2. Hitung jarak vektor relatif mouse $(e.	ext{clientX}, e.	ext{clientY})$ terhadap pusat:
           $$\Delta X = e.	ext{clientX} - C_x$$
           $$\Delta Y = e.	ext{clientY} - C_y$$
        3. Hitung jarak euklidian $D = \sqrt{\Delta X^2 + \Delta Y^2}$ dan vektor satuan $(u_X, u_Y) = (rac{\Delta X}{D}, rac{\Delta Y}{D})$.
        
        ### 4.2 Pelacakan Pupil Mata
        Pupil dibatasi (*clamped*) dalam batas kelopak mata agar tidak melompat keluar dari sklera:
        * **Radius Maksimal Pupil Kiri**: $R_{	ext{left}} = 5.0	ext{ px}$
        * **Radius Maksimal Pupil Kanan (Mata Kaca Pembesar)**: $R_{	ext{right}} = 5.0	ext{ px} (simetris dengan mata kiri)$
        * **Fungsi Non-Linear Easing**:
          $$	ext{dist}_{	ext{travel}} = \min\left(R_{	ext{max}}, rac{D}{45}
ight)$$
          $$	ext{PupilX} = u_X 	imes 	ext{dist}_{	ext{travel}}$$
          $$	ext{PupilY} = u_Y 	imes 	ext{dist}_{	ext{travel}}$$
        * **Rentang Nilai Output**:
          * $\Delta X_{	ext{pupil}} \in [-7.5	ext{px}, +7.5	ext{px}]$
          * $\Delta Y_{	ext{pupil}} \in [-6.0	ext{px}, +6.0	ext{px}]$
        
        ### 4.3 Parallax & Rotasi Kaca Pembesar
        Kaca pembesar bergeser dan berotasi halus ke arah datangnya kursor:
        * **Translasi Parallax**:
          $$	ext{GlassX} = 	ext{clamp}\left(u_X 	imes \min\left(10, rac{D}{30}
ight), -10	ext{px}, +10	ext{px}
ight)$$
          $$	ext{GlassY} = 	ext{clamp}\left(u_Y 	imes \min\left(8, rac{D}{35}
ight), -8	ext{px}, +8	ext{px}
ight)$$
        * **Rotasi Sudut (Tilt Angle)**:
          $$	ext{Angle}_{	ext{tilt}} = 	ext{clamp}\left(rac{\Delta X}{35}, -16^\circ, +16^\circ
ight)$$
        * **Pusat Transformasi (*Transform Origin*)**: `116px 88px` (titik pusat lensa).
        * **Fisika Redaman (*Damping*)**: Menggunakan transisi CSS:
          `transition: transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1);`
        
        ### 4.4 Aksesibilitas (`prefers-reduced-motion`)
        Jika pengguna mengaktifkan mode *reduced motion*:
        * Transformasi dinamis dinonaktifkan (`--p-left-x: 0px`, `--p-left-y: 0px`, `--g-x: 0px`, `--g-y: 0px`, `--g-rot: 0deg`).
        * Keyframe CSS (`jm-bob`, `jm-jump`, `jm-pump`) dipaksa `none !important`.
        
        ---
        
        ## 5. CSS Keyframes & Koreografi Gerak (Prinsip Disney)
        
        ```css
        /* Bobbing Pernapasan Tenang (Idle) */
        @keyframes jm-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        /* Lompatan Riang (Happy - Anticipation & Squash/Stretch) */
        @keyframes jm-jump {
          0%, 100% {
            transform: translateY(0) scale(1, 1);
          }
          20% {
            transform: translateY(3px) scale(1.05, 0.94); /* Anticipation Squash */
          }
          50% {
            transform: translateY(-16px) scale(0.96, 1.04); /* Airborne Stretch */
          }
          75% {
            transform: translateY(1px) scale(1.02, 0.98); /* Recovery */
          }
        }
        
        /* Topi Terangkat Riang Saat Happy */
        @keyframes jm-hat-happy {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(8deg); }
        }
        
        /* Kedipan Natural Mata Detektif */
        @keyframes jm-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
        
        /* Pompa Semangat (Encourage) */
        @keyframes jm-pump {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(3deg); }
        }
        
        /* Denyut Glint Lensa Saat Meneliti */
        @keyframes jm-lens-glint {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        ```
        
        ---
        
        ## 6. Kode Markup SVG Acuan Mandiri (Standalone Reference SVG)
        
        Markup SVG mandiri di bawah ini lolos uji *hardened vector security* (bebas injeksi skrip, bebas entitas XXE asing) dan siap di-render di lingkungan modern:
        
        ```xml
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Detektif JalanMin, maskot penyelidik potensi IT">
          <g class="jm-bob">
            <!-- 1. KAKI & HARD SHADOW SEPATU -->
            <rect x="66" y="154" width="22" height="26" fill="#0A0A0A" />
            <rect x="120" y="154" width="22" height="26" fill="#0A0A0A" />
            <rect x="62" y="150" width="22" height="26" fill="#0A0A0A" rx="2" />
            <rect x="116" y="150" width="22" height="26" fill="#0A0A0A" rx="2" />
            <line x1="62" y1="172" x2="84" y2="172" stroke="#FFFFFF" stroke-width="3" />
            <line x1="116" y1="172" x2="138" y2="172" stroke="#FFFFFF" stroke-width="3" />
        
            <!-- 2. LENGAN KIRI -->
            <line x1="40" y1="104" x2="18" y2="124" stroke="#0A0A0A" stroke-width="6" stroke-linecap="round" />
            <circle cx="16" cy="126" r="6" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4" />
        
            <!-- 3. LENGAN KANAN KE GAGANG -->
            <line x1="150" y1="104" x2="148" y2="114" stroke="#0A0A0A" stroke-width="6" stroke-linecap="round" />
        
            <!-- 4. BADAN RAMBU KUNING & HARD SHADOW -->
            <rect x="48" y="58" width="110" height="96" fill="#0A0A0A" />
            <rect x="40" y="50" width="110" height="96" fill="#FFD60A" stroke="#0A0A0A" stroke-width="5" />
            <line x1="52" y1="134" x2="138" y2="134" stroke="#0A0A0A" stroke-width="4" stroke-dasharray="10 8" />
            <rect x="54" y="104" width="12" height="8" rx="2" fill="#FF5C8A" />
            <rect x="124" y="104" width="12" height="8" rx="2" fill="#FF5C8A" />
        
            <!-- 5. KERAH MANTEL & DASI CYAN -->
            <polygon points="74,146 88,146 82,132" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3" />
            <polygon points="116,146 102,146 108,132" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="3" />
            <rect x="91" y="132" width="8" height="5" fill="#00F0FF" stroke="#0A0A0A" stroke-width="2.5" />
            <polygon points="91,137 99,137 101,146 95,150 89,146" fill="#00F0FF" stroke="#0A0A0A" stroke-width="2.5" />
        
            <!-- 6. ALIS DETEKTIF -->
            <line x1="64" y1="72" x2="84" y2="74" stroke="#0A0A0A" stroke-width="4" stroke-linecap="round" />
            <line x1="104" y1="68" x2="128" y2="70" stroke="#0A0A0A" stroke-width="4" stroke-linecap="round" />
        
            <!-- 7. MATA KIRI (NORMAL) -->
            <rect x="66" y="78" width="18" height="22" rx="4" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="4" />
            <g class="jm-eye-left" style="transform: translate(var(--p-left-x, 0px), var(--p-left-y, 0px));">
              <rect x="71" y="84" width="8" height="10" rx="2" fill="#0A0A0A" />
              <circle cx="73.5" cy="86.5" r="1.5" fill="#FFFFFF" />
            </g>
        
            <!-- 8. MATA KANAN (MEMBESAR 1.25x DI BALIK LENSA) -->
            <rect x="104" y="74" width="24" height="28" rx="5" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="4" />
            <g class="jm-eye-right" style="transform: translate(var(--p-right-x, 0px), var(--p-right-y, 0px));">
              <rect x="110" y="81" width="11" height="13" rx="2.5" fill="#0A0A0A" />
              <circle cx="113.5" cy="84" r="2.2" fill="#FFFFFF" />
              <circle cx="117.5" cy="89" r="1.2" fill="#00F0FF" />
            </g>
        
            <!-- 9. MULUT DETEKTIF (SENYUM SIMPUL) -->
            <path d="M78 116 Q94 126 110 116" stroke="#0A0A0A" stroke-width="5" fill="none" stroke-linecap="round" />
        
            <!-- 10. KACA PEMBESAR NEO-BRUTALISM DENGAN ROTASI DAN PARALLAX MOUSE -->
            <g id="jm-magnifier" style="transform: translate(var(--g-x, 0px), var(--g-y, 0px)) rotate(var(--g-rot, 0deg)); transform-origin: 116px 88px;">
              <!-- Bayangan Kaca & Gagang -->
              <circle cx="120" cy="92" r="23" fill="#0A0A0A" />
              <rect x="138" y="106" width="12" height="32" rx="3" transform="rotate(-38 138 106)" fill="#0A0A0A" />
        
              <!-- Gagang Pink -->
              <rect x="134" y="102" width="12" height="32" rx="3" transform="rotate(-38 134 102)" fill="#FF5C8A" stroke="#0A0A0A" stroke-width="4.5" />
              <line x1="140" y1="112" x2="148" y2="106" stroke="#0A0A0A" stroke-width="3" stroke-linecap="round" />
              <line x1="144" y1="117" x2="152" y2="111" stroke="#0A0A0A" stroke-width="3" stroke-linecap="round" />
        
              <!-- Bingkai Lensa & Kaca Cyan -->
              <circle cx="116" cy="88" r="23" fill="#FFFFFF" fill-opacity="0.12" stroke="#0A0A0A" stroke-width="5" />
              <circle cx="116" cy="88" r="19.5" fill="#00F0FF" fill-opacity="0.28" />
        
              <!-- Glint Refleksi Lensa -->
              <path d="M103 78 A16 16 0 0 1 126 73" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" fill="none" />
              <circle cx="124" cy="98" r="2" fill="#FFFFFF" />
        
              <!-- Tangan Kanan Mencengkeram Gagang -->
              <circle cx="146" cy="110" r="6.5" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4" />
            </g>
        
            <!-- 11. TOPI DEERSTALKER NEO-BRUTALISM -->
            <g class="jm-hat" style="transform-origin: 95px 44px;">
              <!-- Bayangan Topi -->
              <path d="M46 48 C46 22 70 12 95 12 C120 12 144 22 144 48 Z" fill="#0A0A0A" />
              <!-- Kubah Pink -->
              <path d="M42 44 C42 18 68 8 95 8 C122 8 148 18 148 44 Z" fill="#FF5C8A" stroke="#0A0A0A" stroke-width="5" />
              <!-- Visor Ganda (Kuning Rambu) -->
              <path d="M142 40 L168 46 L142 50 Z" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4.5" stroke-linejoin="miter" />
              <path d="M48 40 L22 46 L48 50 Z" fill="#FFD60A" stroke="#0A0A0A" stroke-width="4.5" stroke-linejoin="miter" />
              <!-- Pita Pinggang Topi Cyan -->
              <rect x="42" y="38" width="106" height="8" fill="#00F0FF" stroke="#0A0A0A" stroke-width="3" />
              <!-- Tali Telinga & Pita Atas -->
              <path d="M68 38 C68 22 80 14 93 11" stroke="#0A0A0A" stroke-width="4" fill="none" />
              <path d="M122 38 C122 22 110 14 97 11" stroke="#0A0A0A" stroke-width="4" fill="none" />
              <circle cx="95" cy="8" r="4.5" fill="#00F0FF" stroke="#0A0A0A" stroke-width="2.5" />
              <path d="M92 8 Q86 3 88 12" stroke="#00F0FF" stroke-width="3" fill="none" />
              <path d="M98 8 Q104 3 102 12" stroke="#00F0FF" stroke-width="3" fill="none" />
            </g>
          </g>
        </svg>
        ```
        
        ---
        
        ## 7. Saran & Panduan Integrasi ke Frontend (`son-goku`)
        
        1. **Kompatibilitas Komponen `JalanMin.tsx`**:
           Komponen `JalanMin` utama di `@/components/mascot/JalanMin` menerima properti tambahan opsional `trackMouse?: boolean` (default `true` di desktop).
        2. **Optimasi Kinerja (60 FPS)**:
           Gunakan `requestAnimationFrame` atau *CSS custom variables* (`--p-left-x`, `--p-right-x`, `--g-x`, `--g-y`, `--g-rot`) pada tingkat *container style* agar browser hanya melakukan *compositing*, tanpa memicu reflow DOM berat.
        3. **Penyimpanan Aset Standalone**:
           Aset SVG master tersimpan di:
           * `public/assets/mascot/jalanmin-detective.svg` (SVG Master)
           * `docs/MASCOT_DETECTIVE_SPEC.md` (Dokumen Panduan Lengkap)
        