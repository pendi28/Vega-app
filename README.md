# Vega App — dengan Providers (All-in-One Repo)

Aplikasi Android streaming media gratis tanpa iklan, lengkap dengan 42 providers yang dibundel langsung dalam satu repo.

---

## Ganti Owner / Kustomisasi

> Semua data owner cukup diubah di **satu file** saja: `owner.config.js`

### Langkah ganti owner:

1. **Edit file `owner.config.js`** — isi semua data kamu:
   ```js
   github_username:      'NamaGitHubKamu',   // satu repo untuk app + providers
   repo_name:            'vega-app',
   android_package:      'com.namakamu.vega', // unik di Play Store
   app_name:             'NamaAppKamu',
   discord_url:          'https://discord.gg/xxxxx',
   // ... (lihat owner.config.js untuk daftar lengkap)
   ```

2. **Jalankan script ganti owner:**
   ```bash
   node change-owner.js
   ```
   Script otomatis mengganti semua referensi di seluruh file kode.

---

## Prasyarat Build

Pastikan sudah terinstall:

| Software | Versi |
|----------|-------|
| Node.js | ≥ 18 |
| JDK | 17 (disarankan) |
| Android Studio | Terbaru |
| Android SDK | API Level 24+ |
| Expo CLI | `npm install -g expo-cli` |

Setup React Native environment lengkap:
[https://reactnative.dev/docs/set-up-your-environment](https://reactnative.dev/docs/set-up-your-environment)

---

## Langkah Build (Expo Dev Client)

### 1. Clone & Install

```bash
git clone https://github.com/Pendi28/vega-app.git
cd vega-app
npm install
```

### 2. Build Providers

Build providers harus dilakukan sebelum menjalankan app:

```bash
npm run providers:build
```

Hasil build ada di folder `dist/`.

### 3. Prebuild Android (generate folder android/)

```bash
npx expo prebuild -p android --clean
```

> Lakukan ulang setiap kali ada perubahan di `app.config.js` atau plugin native.

### 4. Jalankan di Device / Emulator

Pastikan device terhubung (USB Debugging aktif) atau emulator berjalan:

```bash
npm run android
```

---

## Build APK — Otomatis via GitHub Actions (Direkomendasikan)

Cukup push ke GitHub, APK otomatis ter-build tanpa perlu Android Studio!

### Langkah setup (sekali saja):

**1. Buat keystore:**
```bash
keytool -genkey -v \
  -keystore release.keystore \
  -alias vegakey \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass PASSWORD_KAMU -keypass PASSWORD_KAMU \
  -dname "CN=Vega App, OU=App, O=Pendi28, L=ID, S=ID, C=ID"
```

**2. Encode keystore ke base64:**
```bash
# Linux/Mac:
base64 -i release.keystore | tr -d '\n'
```

**3. Tambahkan 4 GitHub Secrets** di repo → Settings → Secrets → Actions:

| Secret | Value |
|--------|-------|
| `KEYSTORE_BASE64` | output base64 di atas |
| `KEYSTORE_PASSWORD` | password keystore |
| `KEY_ALIAS` | `vegakey` |
| `KEY_PASSWORD` | password key |

> Panduan lengkap ada di file `.github/SECRETS_SETUP.md`

**4. Push ke GitHub:**
```bash
git push origin main          # → APK tersimpan di tab Actions (Artifacts)
git tag v3.3.5                # → APK muncul di tab Releases (bisa didownload publik)
git push origin v3.3.5
```

---

## Build APK Lokal (tanpa GitHub Actions)

```bash
npx expo prebuild -p android --clean
cd android
# Set env vars signing:
export MYAPP_UPLOAD_STORE_FILE=/path/ke/release.keystore
export MYAPP_UPLOAD_STORE_PASSWORD=PASSWORD_KAMU
export MYAPP_UPLOAD_KEY_ALIAS=vegakey
export MYAPP_UPLOAD_KEY_PASSWORD=PASSWORD_KAMU
./gradlew assembleRelease
```

APK output: `android/app/build/outputs/apk/release/`

---

## Deploy Providers ke GitHub Pages (1 Repo)

Semua ada di **satu repo**: `vega-app`. Providers di-host via branch `gh-pages`.

### URL providers setelah deploy:
```
https://NamaGitHubKamu.github.io/vega-app/modflix.json
```

### Cara deploy providers ke GitHub Pages (sekali saja):

```bash
# 1. Build providers
npm run providers:build
# Hasil ada di folder dist/

# 2. Aktifkan GitHub Pages di repo kamu:
#    GitHub → repo vega-app → Settings → Pages
#    Source: "Deploy from a branch" → Branch: gh-pages → /root

# 3. Push modflix.json + dist ke branch gh-pages:
git checkout --orphan gh-pages         # buat branch gh-pages kosong
git reset --hard
cp dist/modflix.json ./modflix.json    # salin manifest
git add modflix.json
git commit -m "deploy providers"
git push origin gh-pages --force

# 4. Setelah GitHub Pages aktif, URL modflix.json tersedia di:
#    https://NamaGitHubKamu.github.io/vega-app/modflix.json
```

> Untuk update providers: edit source di `providers/`, build ulang, push ke `gh-pages` lagi.

---

## Script Tersedia

| Script | Fungsi |
|--------|--------|
| `npm run android` | Jalankan app di Android |
| `npm run start` | Expo dev server |
| `npm run providers:build` | Build semua providers (minified) |
| `npm run providers:build:dev` | Build tanpa minifikasi (debug) |
| `npm run providers:dev` | Dev server providers lokal (port 3001) |
| `npm run providers:test` | Test semua providers |
| `npm run providers:test:provider` | Test satu provider |
| `node change-owner.js` | Ganti semua owner ID sekaligus |

---

## Struktur Folder

```
vega-app/
├── src/                        ← Source code React Native
│   ├── lib/
│   │   ├── constants.ts        ← OWNER config & socialLinks
│   │   ├── providers/
│   │   │   ├── getBaseUrl.ts   ← Fetch base URL dari GitHub Pages
│   │   │   └── ...
│   │   └── services/
│   │       └── Notification.ts ← APK installer & notif
│   └── screens/
│       └── settings/
│           └── About.tsx       ← Cek update dari GitHub Releases
├── providers/                  ← Source 42 providers (TypeScript)
│   ├── vega/
│   ├── drive/
│   ├── hdhub4u/
│   └── ... (42 total)
├── dist/                       ← Hasil build providers (gitignored)
├── app.config.js               ← Expo config (baca dari owner.config.js)
├── owner.config.js             ← ⭐ SATU-SATUNYA FILE YANG PERLU DIEDIT
├── change-owner.js             ← Script otomatis ganti owner
├── build-bundled.js            ← Build script providers
├── dev-server.js               ← Dev server providers lokal
├── manifest.json               ← Daftar semua providers
└── package.json                ← Dependencies gabungan app + providers
```

---

## Providers Bundled (42)

| Nama | ID | Tipe |
|------|----|------|
| VegaMovies | `vega` | global |
| MultiStream | `autoEmbed` | global |
| MoviesDrive | `drive` | global |
| MultiMovies | `multi` | global |
| 4khdHub | `4khdhub` | global |
| Cinewood | `1cinevood` | global |
| World4uFree | `world4u` | global |
| KatMoviesHd | `katmovies` | global |
| MoviesMod | `mod` | global |
| UHDMovies | `uhd` | global |
| ProtonMovies | `protonMovies` | global |
| FilmyFly | `filmyfly` | global |
| Movies4U | `movies4u` | global |
| KmMovies | `kmMovies` | global |
| Zeefliz | `zeefliz` | global |
| HdHub4u | `hdhub4u` | global |
| Ringz | `ringz` | global |
| RogMovies | `luxMovies` | india |
| TopMovies | `topmovies` | india |
| GuardaHD | `guardahd` | italy |
| Joya9tv | `Joya9tv` | india |
| MoviezWap | `moviezwap` | india |
| ShowBox | `showbox` | english |
| RidoMovies | `ridoMovies` | english |
| FlixHQ | `flixhq` | english |
| Primewire | `primewire` | english |
| TokyoInsider | `tokyoInsider` | english |
| KissKh | `kissKh` | english |
| ... dan lainnya | | |

---

## Firebase (Opsional)

Firebase Analytics & Crashlytics bersifat opsional. Jika tidak dibutuhkan, **lewati langkah ini**.

Jika ingin mengaktifkan:
1. Buat project di [Firebase Console](https://console.firebase.google.com)
2. Download `google-services.json` → letakkan di root folder
3. Jalankan ulang `npx expo prebuild -p android --clean`

---

## Catatan Penting

- `dist/` di-gitignore — selalu jalankan `npm run providers:build` setelah clone
- Setiap ganti `app.config.js`, jalankan ulang `npx expo prebuild -p android --clean`
- Untuk Play Store: ganti `android_package` di `owner.config.js` menjadi ID unik (contoh: `com.namakamu.vegaapp`)
- `debug.keystore` sudah ada di repo untuk development — ganti dengan keystore sendiri untuk production

---

## Disclaimer

> Vega App tidak menyimpan file media di server manapun. Semua media di-host oleh pihak ketiga. App ini hanya menyediakan tool pencarian dan web scraping dari data yang tersedia secara publik.
# Vega-app
