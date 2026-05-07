/**
 * ============================================================
 *  OWNER CONFIG — Edit file ini untuk ganti semua data owner
 *  Setelah edit, jalankan:  node change-owner.js
 * ============================================================
 */

module.exports = {
  // ── GitHub (1 repo untuk segalanya) ───────────────────────
  github_username:      'Pendi28',          // Username GitHub kamu
  repo_name:            'vega-app',         // Nama repo (app + providers sekaligus)

  // ── Identitas App ──────────────────────────────────────────
  app_name:             'cine scope',             // Nama app (muncul di launcher)
  app_display_name:     'cine scope',             // Display name
  app_slug:             'cine scope',             // Expo slug (huruf kecil, tanpa spasi)
  app_scheme:           'com.cinescope',         // URL scheme deep link

  // ── Android Package ────────────────────────────────────────
  android_package:      'com.cinescope',         // Package ID Android (unik di Play Store)
  android_version_code: 164,                // Integer, naikkan setiap rilis
  app_version:          '3.3.5',            // Versi string (major.minor.patch)

  // ── Social Links ───────────────────────────────────────────
  facebook_url:          'https://www.facebook.com/share/18Kxx16CEs/',  // Discord server kamu

  // ── Download Folder ────────────────────────────────────────
  download_folder_name: 'vega',             // Folder download di storage Android
};
