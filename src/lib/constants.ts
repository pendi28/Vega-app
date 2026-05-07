import * as RNFS from '@dr.pogodin/react-native-fs';

export const FLAGS = {
  GLOBAL: 'https://utfs.io/f/ImOWJajUmXfyRKHTpylsELpB6QlYA4OdG9Jfr3hagoCN5Mzt',
  INDIA: 'https://utfs.io/f/ImOWJajUmXfyYCEwdELCDZIMxNG5H27Bouwvb4fyVJrdqj3X',
  ENGLISH: 'https://utfs.io/f/ImOWJajUmXfyN1E0dlnILrEMR3DJQX7OUvixCSHp6YWGNVPc',
  ITALY: 'https://utfs.io/f/ImOWJajUmXfynpGlTaXrTMAELcs2W76PyY4IRJVBXCHOofa5',
};

// ─── OWNER CONFIG ────────────────────────────────────────────────────────────
// Nilai-nilai di bawah ini di-generate otomatis oleh change-owner.js
// Jangan edit manual — edit owner.config.js lalu jalankan: node change-owner.js
export const OWNER = {
  github_username:     'Pendi28',
  repo_name:           'vega-app',
  providers_repo_name: 'vega-providers',
  android_package:     'com.cinescope',
  download_folder:     'vega',
};
// ─────────────────────────────────────────────────────────────────────────────

export const downloadFolder = RNFS.DownloadDirectoryPath + '/' + OWNER.download_folder;

export const themes: {name: string; color: string}[] = [
  {name: 'Vega',      color: '#FF6347'},
  {name: 'Hayasaka',  color: '#00e6e6'},
  {name: 'Lavender',  color: '#B2A4D4'},
  {name: 'Sky',       color: '#87CEEB'},
  {name: 'Mint',      color: '#98FB98'},
  {name: 'Sunset',    color: '#FFA07A'},
  {name: 'Flix',      color: '#E50914'},
  {name: 'Material',  color: '#2196F3'},
  {name: 'Custom',    color: '#FFFFFF'},
];

export const socialLinks = {
  github:  `https://github.com/${OWNER.github_username}/${OWNER.repo_name}`,
  discord: 'undefined',
  sponsor: `https://github.com/sponsors/${OWNER.github_username}`,
};
