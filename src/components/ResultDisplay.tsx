
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Zap, Info, MapPin } from 'lucide-react';
import TeamMatchup from './TeamMatchup';
import FactorBar from './FactorBar';
import ConfettiEffect from './ConfettiEffect';
import { CricketGround } from '@/utils/supabaseClient';

interface PredictionResult {
  winner: string;
  probability: number;
  team1: string;
  team2: string;
  venue: string;
  matchFormat: string;
  factors: {
    factor: string;
    weight: number;
  }[];
  venueDetails?: CricketGround | null;
}

interface ResultDisplayProps {
  result: PredictionResult;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  const { winner, probability, team1, team2, venue, matchFormat, factors, venueDetails } = result;
  const [showConfetti, setShowConfetti] = React.useState(false);
  
  useEffect(() => {
    // Trigger confetti after component mounts
    setShowConfetti(true);
    
    // Hide confetti after some time
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getColorByProbability = (prob: number) => {
    if (prob > 75) return "bg-gradient-to-r from-blue-400 to-orange-300";
    if (prob > 50) return "bg-gradient-to-r from-blue-300 to-orange-200";
    return "bg-gradient-to-r from-blue-200 to-orange-100";
  };
  
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && <ConfettiEffect />}
      
      <Card className="overflow-hidden glass-panel border-0">
        <div className="bg-gradient-to-r from-blue-500 to-orange-400 p-4 text-white">
          <h2 className="text-xl font-bold text-center">Prediction Results</h2>
        </div>
        
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm font-medium"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span>{matchFormat.toUpperCase()} Match</span>
              {venueDetails ? (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="flex items-center gap-1">{venueDetails.ground_long}, {venueDetails.country}</span>
                </div>
              ) : (
                <span>at {venue}</span>
              )}
            </motion.div>
            
            {/* Team Matchup */}
            <TeamMatchup team1={team1} team2={team2} probability={probability} />
            
            <motion.div className="mt-8 mb-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-2"
              >
                <h3 className="text-xl font-semibold">Predicted Winner</h3>
                <motion.div 
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/40 dark:to-orange-900/40 px-6 py-3 rounded-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 0 rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                >
                  <Zap className="text-orange-500 h-5 w-5" />
                  <span className="text-3xl font-bold gradient-text">
                    {winner}
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <div className="max-w-md mx-auto mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Prediction Confidence</span>
                <span className="font-medium">{probability}%</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Progress 
                  value={probability} 
                  className="h-3 rounded-full" 
                  indicatorClassName={getColorByProbability(probability)}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Venue Info (if available) */}
          {venueDetails && (
            <motion.div 
              className="mb-6 p-4 bg-blue-50/50 dark:bg-blue-900/50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Ground Details</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Dimensions: {venueDetails.width}m × {venueDetails.height}m</p>
                  {venueDetails.rounded_rect && <p className="text-gray-600 dark:text-gray-400">Shape: Rounded Rectangle</p>}
                  {venueDetails.odi_only && <p className="text-gray-600 dark:text-gray-400">ODI Only Ground</p>}
                </div>
                {(venueDetails.batting_record_name || venueDetails.bowling_record_name) && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {venueDetails.batting_record_name && (
                      <p>Batting Record: {venueDetails.batting_record_name} - {venueDetails.batting_record_score}</p>
                    )}
                    {venueDetails.bowling_record_name && (
                      <p>Bowling Record: {venueDetails.bowling_record_name} - {venueDetails.bowling_record_figures}</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Info className="h-4 w-4 text-blue-500 mr-2" />
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Key Factors Influencing This Prediction</h4>
            </div>
            
            <div className="space-y-3">
              {factors.map((factor, index) => (
                <FactorBar 
                  key={factor.factor}
                  factor={factor.factor} 
                  weight={factor.weight}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onReset}
                variant="outline" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900 transition-all duration-300 btn-click-effect"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Make Another Prediction
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultDisplay;
