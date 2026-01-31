import React, { useEffect } from 'react';
import { useNavigation, SCREENS } from '../hooks/useNavigation';
import { useStorage } from '../hooks/useStorage';
import Logo from '../assets/images/Logo'; // Will be created later (File 177)
import Loader from '../components/ui/Loader'; // Will be created later (File 74)

const SplashScreen = () => {
  const { navigate } = useNavigation();
  const { getItem } = useStorage();

  useEffect(() => {
    // ⏳ Artificial delay for branding + checking onboarding status
    const initApp = async () => {
      // Allow the animation to play for at least 2.5 seconds
      const minDelay = new Promise(resolve => setTimeout(resolve, 2500));
      
      // Check if user has completed setup
      const hasCompletedOnboarding = getItem('hasCompletedOnboarding');
      const hasSelectedLanguage = getItem('appLanguage');

      await minDelay;

      if (!hasSelectedLanguage) {
        navigate(SCREENS.LANGUAGE);
      } else if (!hasCompletedOnboarding) {
        navigate(SCREENS.ONBOARDING);
      } else {
        navigate(SCREENS.HOME);
      }
    };

    initApp();
  }, [navigate, getItem]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#0f172a] relative overflow-hidden">
      
      {/* 🔮 Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] animate-pulse-slow delay-700" />

      {/* 🌀 Center Logo & Branding */}
      <div className="z-10 flex flex-col items-center animate-fade-in-up">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-violet-500/30 blur-xl rounded-full" />
          {/* Logo Component (Placeholder for now until File 177 is created) */}
          <Logo className="w-32 h-32 text-white relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
        </div>

        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-white to-cyan-200 tracking-wide mb-2 drop-shadow-sm">
          AI PALM
        </h1>
        <p className="text-violet-200/60 text-sm tracking-[0.2em] uppercase">
          Tarot & Astrology
        </p>
      </div>

      {/* ⏳ Bottom Loader */}
      <div className="absolute bottom-16">
        <Loader size="sm" color="white" />
      </div>

      {/* 📜 Legal / Footer Text */}
      <div className="absolute bottom-6 text-[10px] text-slate-500">
        v1.0.0 • Production Release
      </div>
    </div>
  );
};

export default SplashScreen;
