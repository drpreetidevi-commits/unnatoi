import en from './en';
import hi from './hi';
import es from './es';
import fr from './fr';
import it from './it';
import ko from './ko';

/**
 * 🌍 Translation Aggregator
 * 
 * Supported Languages:
 * 🇺🇸 English (en) - Default
 * 🇮🇳 Hindi (hi)
 * 🇪🇸 Spanish (es)
 * 🇫🇷 French (fr)
 * 🇮🇹 Italian (it)
 * 🇰🇷 Korean (ko)
 */
const translations = {
  en,
  hi,
  es,
  fr,
  it,
  ko
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ko', name: 'Korean', native: '한국어' }
];

export default translations;
