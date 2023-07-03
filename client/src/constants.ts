import homeBanner from "./assets/images/banners/home.webp";
import londresBanner from "./assets/images/banners/londres.webp";
import quidditchBanner from "./assets/images/banners/quidditch.webp";
import traverseBanner from "./assets/images/banners/traverse.webp";
import poudlardBanner from "./assets/images/banners/poudlard.webp";

export const api_uri = import.meta.env.VITE_API_URI || 'https://api.poudlardrp.fr';

export const local_api_uri = window.location.origin;

export const storage_key = 'poudlard-state';

export const default_langage = 'fr';

export const ip = 'play.poudlardrp.fr';
export const youtube = 'https://www.youtube.com/c/PoudlardRP';
export const twitter = 'https://twitter.com/PoudlardRP';
export const discord = 'https://discord.gg/poudlardrp';

export const socialLinks = {
  discord: 'https://discord.gg/poudlardrp',
  youtube: 'https://www.youtube.com/c/PoudlardRP',
  twitter: 'https://twitter.com/PoudlardRP',
  instragram: 'https://www.instagram.com/poudlardrp_minecraft/'
}

export const homeBanners = [
  homeBanner,
  londresBanner,
  quidditchBanner,
  traverseBanner,
  poudlardBanner
]
