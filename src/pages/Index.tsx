
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import PredictionForm from '@/components/PredictionForm';
import ResultDisplay from '@/components/ResultDisplay';

const Index = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleReset = () => {
    setPredictionResult(null);
    
    // Smooth scroll back to the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <HeroSection onScrollToForm={handleScrollToForm} />
      
      {/* Main Content */}
      <div 
        ref={formRef}
        className="container px-4 py-16 mx-auto"
      >
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Match Prediction Tool
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Enter the match details below to get an AI-powered prediction on which team is likely to win.
          </motion.p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {!predictionResult ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <PredictionForm onPredictionResult={setPredictionResult} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResultDisplay result={predictionResult} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Cricket Match Prediction uses advanced analytics to provide match predictions.
            <br />
            For educational purposes only. Not intended for gambling.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            {["About", "Privacy", "Terms", "Contact"].map((item, index) => (
              <a 
                key={index}
                href="#" 
                className="text-xs text-cricket-600 dark:text-cricket-400 hover:underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
