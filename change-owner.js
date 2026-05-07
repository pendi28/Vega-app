/**
 * ============================================================
 *  SCRIPT GANTI OWNER — Jalankan setelah edit owner.config.js
 *
 *  Cara pakai:
 *    1. Edit owner.config.js → isi semua data kamu
 *    2. node change-owner.js
 *
 *  Script ini mengganti semua referensi owner lama di seluruh
 *  kode secara otomatis, termasuk:
 *    • GitHub username & repo name
 *    • Android package ID
 *    • Discord URL
 *    • URL providers GitHub Pages
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

// ── Load config baru ──────────────────────────────────────────
const cfg = require('./owner.config.js');

// ── Load config lama (dari cache) ─────────────────────────────
const CACHE_FILE = path.join(__dirname, '.owner-cache.json');
let old = {
  github_username:      'Pendi28',
  repo_name:            'vega-app',
  android_package:      'com.vega',
  discord_url:          'https://discord.gg/cr42m6maWy',
  download_folder_name: 'vega',
};

if (fs.existsSync(CACHE_FILE)) {
  try { Object.assign(old, JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))); } catch {}
}

const changed = Object.keys(cfg).some(k => cfg[k] !== old[k]);
if (!changed) {
  console.log('✓ Tidak ada perubahan pada owner.config.js.');
  process.exit(0);
}

console.log('\n=== GANTI OWNER ===');
console.log(`GitHub: ${old.github_username} → ${cfg.github_username}`);
console.log(`Repo  : ${old.repo_name} → ${cfg.repo_name}`);
console.log(`Pkg   : ${old.android_package} → ${cfg.android_package}`);
console.log('');

// ── Helper: replace dalam satu file ───────────────────────────
function replaceInFile(relPath, replacements) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`  [SKIP] ${relPath}`);
    return 0;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let count = 0;
  for (const [from, to] of replacements) {
    if (!from || from === to) continue;
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = content.match(new RegExp(escaped, 'g'));
    if (matches) {
      content = content.replace(new RegExp(escaped, 'g'), to);
      count += matches.length;
    }
  }
  if (count > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  [OK] ${relPath}  (${count} perubahan)`);
  } else {
    console.log(`  [--] ${relPath}`);
  }
  return count;
}

// ── Daftar penggantian global (username & repo) ───────────────
const globalReplacements = [
  [old.github_username,      cfg.github_username],
  [old.repo_name,            cfg.repo_name],
  [old.android_package,      cfg.android_package],
  [old.discord_url,          cfg.discord_url],
  [old.download_folder_name, cfg.download_folder_name],
];

// ── File yang diproses ─────────────────────────────────────────
const FILES = [
  // App source
  'src/lib/constants.ts',
  'src/lib/providers/getBaseUrl.ts',
  'src/lib/services/Notification.ts',
  'src/screens/settings/About.tsx',
  // Providers source
  'providers/getBaseUrl.ts',
  'providers/movieBox/meta.ts',
  'providers/movieBox/posts.ts',
  // Package
  'package.json',
  // Docs
  'README.md',
];

let total = 0;
for (const f of FILES) {
  total += replaceInFile(f, globalReplacements);
}

// ── Update src/lib/constants.ts — bagian OWNER object ─────────
// (sudah ikut global replacement di atas)

// ── Simpan cache ───────────────────────────────────────────────
fs.writeFileSync(CACHE_FILE, JSON.stringify(cfg, null, 2));

console.log(`\n✓ Selesai! ${total} total perubahan.`);
console.log('\nLangkah selanjutnya:');
console.log(`  1. Push repo → github.com/${cfg.github_username}/${cfg.repo_name}`);
console.log(`  2. Aktifkan GitHub Pages di repo "${cfg.repo_name}":`);
console.log(`     Settings → Pages → Source: Deploy from branch gh-pages`);
console.log(`  3. Build & push providers ke gh-pages:`);
console.log(`     npm run providers:build`);
console.log(`     git add dist/ && git stash`);
console.log(`     git checkout gh-pages`);
console.log(`     cp -r /tmp/dist/* . && git push origin gh-pages`);
console.log(`  4. URL providers aktif: https://${cfg.github_username}.github.io/${cfg.repo_name}/modflix.json`);
console.log(`  5. Build app: npx expo prebuild -p android --clean`);
console.log(`  6. Jalankan: npm run android`);
