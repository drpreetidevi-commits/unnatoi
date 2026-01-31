import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

/**
 * useNavigation Hook
 * 
 * Provides access to the navigation system.
 * Usage:
 * const { currentScreen, navigate, goBack, pushParams } = useNavigation();
 * 
 * @returns {Object} Navigation context values
 * @throws {Error} If used outside of NavigationProvider
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }

  return context;
};

/**
 * Navigation Screens Constants
 * Centralized list of screen identifiers to prevent typos.
 */
export const SCREENS = {
  SPLASH: 'SPLASH',
  LANGUAGE: 'LANGUAGE',
  ONBOARDING: 'ONBOARDING',
  PROFILE_SETUP: 'PROFILE_SETUP',
  HOME: 'HOME',
  
  // Features
  PALM_SCAN: 'PALM_SCAN',
  PALM_RESULT: 'PALM_RESULT',
  AI_CHAT: 'AI_CHAT',
  
  // Tarot
  TAROT_CATEGORY: 'TAROT_CATEGORY',
  TAROT_READING: 'TAROT_READING',
  
  // Astrology
  HOROSCOPE: 'HOROSCOPE',
  HOROSCOPE_DETAIL: 'HOROSCOPE_DETAIL',
  
  // Others
  DAILY_GUIDANCE: 'DAILY_GUIDANCE',
  LOVE_READING: 'LOVE_READING',
  SETTINGS: 'SETTINGS',
  HISTORY: 'HISTORY',
  PRIVACY: 'PRIVACY'
};

export default useNavigation;
