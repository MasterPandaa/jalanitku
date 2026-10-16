# JalanITku — API Contract

> Spesifikasi antarmuka API antara Frontend dan Backend JalanITku.

---

## 1. Format Respons Standar
Semua API mengembalikan format JSON standar:
```json
{
  "success": true,
  "data": {},
  "message": "Operasi berhasil"
}
```
Jika terjadi kegagalan/error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Username sudah digunakan"
  }
}
```

---

## 2. Autentikasi & Profil Pengguna

### 2.1 Cek Ketersediaan Username
- **Method**: `GET`
- **Path**: `/api/username/check?q={username}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "available": true,
    "username": "coder_pro"
  }
}
```

### 2.2 Set / Ubah Username
- **Method**: `POST` / `PATCH`
- **Path**: `/api/me/username`
- **Headers**: `Cookie` (Session auth)
- **Body**: `{ "username": "pro_coder" }`
- **Response**: `{ "success": true, "data": { "user": { "id": "...", "username": "pro_coder" } } }`

### 2.3 Profil Pengguna (Me)
- **Method**: `GET`
- **Path**: `/api/me`
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "username": "pro_coder",
    "display_name": "Pro Coder",
    "avatar_url": "https://...",
    "has_jalan_id": true,
    "has_cocoklogiku": true,
    "active_role_slug": "software-engineer"
  }
}
```

---

## 3. Fitur A — JalanKarir

### 3.1 Mulai Sesi Tes
- **Method**: `POST`
- **Path**: `/api/karir/sessions`
- **Body**: `{ "force_new": true }` (jika mengulang dan bersedia menimpa JalanID lama)
- **Response**:
```json
{
  "success": true,
  "data": {
    "session_id": "sess-karir-123",
    "level": 1,
    "total_levels": 5,
    "warning_overwrite": false
  }
}
```

### 3.2 Ambil Soal Level
- **Method**: `GET`
- **Path**: `/api/karir/sessions/:id/questions`
- **Response**:
```json
{
  "success": true,
  "data": {
    "level": 1,
    "theme": "Minat Umum",
    "questions": [
      {
        "id": "q-temp-hash-1",
        "type": "likert",
        "text": "Saya senang memecahkan teka-teki logika yang rumit.",
        "scale_min": 1,
        "scale_max": 5
      }
    ]
  }
}
```
*(Catatan: Bobot role tidak pernah dikirim ke klien).*

### 3.3 Kirim Jawaban Level
- **Method**: `POST`
- **Path**: `/api/karir/sessions/:id/answers`
- **Body**:
```json
{
  "level": 1,
  "answers": [
    { "question_id": "q-temp-hash-1", "answer": "4", "duration_ms": 3200 }
  ]
}
```

### 3.4 Selesaikan Sesi & Dapatkan Hasil (JalanID)
- **Method**: `POST`
- **Path**: `/api/karir/sessions/:id/finish`
- **Response**:
```json
{
  "success": true,
  "data": {
    "is_tie": false,
    "jalan_id": {
      "card_code": "JID-189201",
      "username": "pro_coder",
      "top_role": {
        "slug": "software-engineer",
        "name": "Software Engineer",
        "match_percentage": 92.5,
        "tagline": "Membangun sistem dan logika digital dunia nyata."
      },
      "secondary_roles": [
        { "slug": "devops-engineer", "name": "DevOps Engineer", "match_percentage": 88.0 },
        { "slug": "cloud-engineer", "name": "Cloud Engineer", "match_percentage": 84.5 }
      ],
      "issued_at": "2026-10-16"
    }
  }
}
```

---

## 4. Fitur B — JalanRapor

### 4.1 Daftar Role & Ketersediaan Bank Soal
- **Method**: `GET`
- **Path**: `/api/roles`
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "slug": "software-engineer",
      "name": "Software Engineer",
      "description": "Fokus pada pembuatan arsitektur dan kode aplikasi.",
      "color": "#FFD60A",
      "mascot_key": "software-engineer",
      "has_rapor_bank": true
    }
  ]
}
```

### 4.2 Mulai Sesi Tes Teknis
- **Method**: `POST`
- **Path**: `/api/rapor/sessions`
- **Body**: `{ "role_slug": "software-engineer", "force_overwrite": true }`
- **Response**: `{ "success": true, "data": { "session_id": "sess-rapor-456", "level": 1 } }`

### 4.3 Ambil 10 Soal Acak Level Teknis
- **Method**: `GET`
- **Path**: `/api/rapor/sessions/:id/level/:n`
- **Response**:
```json
{
  "success": true,
  "data": {
    "level": 1,
    "level_name": "Dasar",
    "questions": [
      {
        "id": "q-tech-temp-1",
        "text": "Struktur data mana yang bekerja dengan prinsip First-In, First-Out (FIFO)?",
        "options": [
          { "key": "a", "text": "Stack" },
          { "key": "b", "text": "Queue" },
          { "key": "c", "text": "Tree" },
          { "key": "d", "text": "Graph" }
        ]
      }
    ]
  }
}
```

### 4.4 Kirim Jawaban Level
- **Method**: `POST`
- **Path**: `/api/rapor/sessions/:id/level/:n/answers`
- **Body**:
```json
{
  "answers": [
    { "question_id": "q-tech-temp-1", "selected_key": "b", "duration_ms": 4200 }
  ]
}
```

### 4.5 Selesaikan & Terbitkan Cocoklogiku
- **Method**: `POST`
- **Path**: `/api/rapor/sessions/:id/finish`
- **Response**:
```json
{
  "success": true,
  "data": {
    "rapor": {
      "role": "Software Engineer",
      "username": "pro_coder",
      "final_score": 86.4,
      "label": "Sangat Cocok",
      "level_scores": [
        { "level": 1, "name": "Dasar", "score": 100 },
        { "level": 2, "name": "Pemula", "score": 90 },
        { "level": 3, "name": "Menengah", "score": 85 },
        { "level": 4, "name": "Lanjut", "score": 80 },
        { "level": 5, "name": "Ahli", "score": 77 }
      ],
      "competency_scores": [
        { "competency": "Algoritma & Struktur Data", "score": 90 },
        { "competency": "System Design", "score": 82 }
      ],
      "reason": {
        "summary": "Kamu menunjukkan pemahaman dasar yang sangat solid...",
        "strengths": ["Logika Algoritma kuat", "Konsep OOP & Paradigma matang"],
        "growth_areas": ["Pengalaman perancangan skala sistem terdistribusi"]
      },
      "recommendations": [
        "Pelajari pattern Microservices dan Message Broker",
        "Tingkatkan pemahaman trade-off Database indexing"
      ]
    }
  }
}
```
