import {cacheStorageService} from '../storage';

// ─── OWNER CONFIG (di-generate oleh change-owner.js) ─────────────────────────
const GITHUB_USERNAME = 'Pendi28';
const GITHUB_REPO     = 'vega-app';
const PROVIDERS_JSON_URL = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO}/modflix.json`;
// ─────────────────────────────────────────────────────────────────────────────

// Cache selama 1 jam
const expireTime = 60 * 60 * 1000;

export const getBaseUrl = async (providerValue: string) => {
  try {
    let baseUrl = '';
    const cacheKey = 'CacheBaseUrl' + providerValue;
    const timeKey = 'baseUrlTime' + providerValue;

    const cachedUrl = cacheStorageService.getString(cacheKey);
    const cachedTime = cacheStorageService.getObject<number>(timeKey);

    if (cachedUrl && cachedTime && Date.now() - cachedTime < expireTime) {
      baseUrl = cachedUrl;
    } else {
      const baseUrlRes = await fetch(PROVIDERS_JSON_URL);
      const baseUrlData = await baseUrlRes.json();
      baseUrl = baseUrlData[providerValue].url;
      cacheStorageService.setString(cacheKey, baseUrl);
      cacheStorageService.setObject(timeKey, Date.now());
    }
    return baseUrl;
  } catch (error) {
    console.error(`Error fetching baseUrl: ${providerValue}`, error);
    return '';
  }
};
