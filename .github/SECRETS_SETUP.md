# Setup GitHub Secrets untuk Build APK Otomatis

Buka repo GitHub kamu → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

---

## 4 Secret yang Wajib Ditambahkan

### 1. `KEYSTORE_BASE64`

Isi dengan keystore kamu yang sudah di-encode ke base64.

**Langkah 1 — Buat keystore baru (sekali saja, simpan file-nya!):**
```bash
keytool -genkey -v \
  -keystore release.keystore \
  -alias vegakey \
  -keyalg RSA -keysize 2048 \
  -validity 10000 \
  -storepass PASSWORD_KAMU \
  -keypass PASSWORD_KAMU \
  -dname "CN=Vega App, OU=App, O=Pendi28, L=ID, S=ID, C=ID"
```

**Langkah 2 — Encode ke base64:**
```bash
# Linux / Mac:
base64 -i release.keystore | tr -d '\n'

# Windows (PowerShell):
[Convert]::ToBase64String([IO.File]::ReadAllBytes("release.keystore"))
```
Salin output-nya → paste sebagai value secret `KEYSTORE_BASE64`.

---

### 2. `KEYSTORE_PASSWORD`

Password yang kamu tulis saat buat keystore di `-storepass`

Contoh: `PASSWORD_KAMU`

---

### 3. `KEY_ALIAS`

Alias key yang kamu tulis saat buat keystore di `-alias`

Contoh: `vegakey`

---

### 4. `KEY_PASSWORD`

Password key yang kamu tulis saat buat keystore di `-keypass`
(biasanya sama dengan `KEYSTORE_PASSWORD`)

---

## Ringkasan

| Secret Name | Contoh Value | Keterangan |
|---|---|---|
| `KEYSTORE_BASE64` | `MIIKuAIBAzCCCnA...` | Output base64 dari file release.keystore |
| `KEYSTORE_PASSWORD` | `PASSWORD_KAMU` | `-storepass` saat buat keystore |
| `KEY_ALIAS` | `vegakey` | `-alias` saat buat keystore |
| `KEY_PASSWORD` | `PASSWORD_KAMU` | `-keypass` saat buat keystore |

> `GITHUB_TOKEN` sudah otomatis tersedia — tidak perlu ditambahkan.

---

## Cara Trigger Build APK

### Otomatis (setiap push ke main):
```bash
git push origin main
```
APK tersedia di: **GitHub → Actions → Build APK Release → Artifacts**

### Buat Release publik + APK bisa didownload orang lain:
```bash
git tag v3.3.5
git push origin v3.3.5
```
APK otomatis muncul di tab **Releases** repo kamu.

### Manual (tanpa push):
GitHub → **Actions** → **Build APK Release** → **Run workflow**

---

## Hasil 2 Workflow

| Workflow | Kapan Berjalan | Hasilnya |
|---|---|---|
| **Build APK Release** | Setiap push ke `main` atau tag `v*` | File APK siap install |
| **Deploy Providers** | Push ke `main` jika ada perubahan di `providers/` | providers live di GitHub Pages |
