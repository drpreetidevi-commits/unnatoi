import React, { useState } from 'react';
import { useNavigation, SCREENS } from '../../hooks/useNavigation';
import { analyzePalmImage } from '../../services/aiService'; // Direct AI service call
import { useToast } from '../../hooks/useToast';
import Button from '../ui/Button';
import HandSelector from './HandSelector';
import ScanGuide from './ScanGuide';
import ImageUploader from './ImageUploader';
import Loader from '../ui/Loader';
import GlassCard from '../ui/GlassCard';

// Steps constant
const STEPS = {
  HAND_SELECT: 0,
  GUIDE: 1,
  UPLOAD: 2,
  ANALYZING: 3
};

const PalmScanner = () => {
  const { navigate, pushParams } = useNavigation();
  const { showToast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(STEPS.HAND_SELECT);
  const [selectedHand, setSelectedHand] = useState(null); // 'left' | 'right'
  const [imageData, setImageData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Step 1: Handle Hand Selection
  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
    setTimeout(() => setCurrentStep(STEPS.GUIDE), 300);
  };

  // Step 2: Confirm Guide
  const handleGuideConfirm = () => {
    setCurrentStep(STEPS.UPLOAD);
  };

  // Step 3: Handle Image Upload & Analysis
  const handleImageCapture = async (fileBase64) => {
    setImageData(fileBase64);
    setCurrentStep(STEPS.ANALYZING);
    setIsAnalyzing(true);

    try {
      // Call AI Vision Service
      const result = await analyzePalmImage(fileBase64);
      
      // Navigate to Result Screen with data
      pushParams({
        hand: selectedHand,
        image: fileBase64,
        analysis: result
      });
      navigate(SCREENS.PALM_RESULT);

    } catch (error) {
      console.error('Palm Analysis Failed:', error);
      showToast('Could not analyze image. Please try again.', 'error');
      setIsAnalyzing(false);
      setCurrentStep(STEPS.UPLOAD); // Go back to upload
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(SCREENS.HOME);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-4 relative">
      
      {/* Progress Indicator */}
      {currentStep < STEPS.ANALYZING && (
        <div className="flex justify-center mb-6 gap-2">
          {[0, 1, 2].map(step => (
            <div 
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'w-8 bg-violet-500 shadow-[0_0_10px_#8b5cf6]' : 'w-2 bg-white/10'
              }`}
            />
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
        
        {/* STEP 1: Hand Selection */}
        {currentStep === STEPS.HAND_SELECT && (
          <HandSelector 
            onSelect={handleHandSelect} 
            selected={selectedHand} 
          />
        )}

        {/* STEP 2: Scanning Guide */}
        {currentStep === STEPS.GUIDE && (
          <GlassCard className="p-6 text-center animate-slide-up">
            <ScanGuide onReady={handleGuideConfirm} />
          </GlassCard>
        )}

        {/* STEP 3: Image Upload */}
        {currentStep === STEPS.UPLOAD && (
          <ImageUploader 
            onImageSelected={handleImageCapture}
            label={selectedHand === 'left' ? 'Scan Left Hand' : 'Scan Right Hand'}
          />
        )}

        {/* STEP 4: Analyzing State */}
        {currentStep === STEPS.ANALYZING && (
          <div className="flex flex-col items-center text-center space-y-6 animate-pulse-slow">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
              <Loader size="lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Reading the Stars...</h3>
              <p className="text-violet-200/80">Analyzing your {selectedHand} palm lines...</p>
            </div>
          </div>
        )}
      </div>

      {/* Back Button (Hidden during analysis) */}
      {!isAnalyzing && (
        <div className="mt-6 flex justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
          >
            {currentStep === STEPS.HAND_SELECT ? 'Cancel' : 'Back'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PalmScanner;
