
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import TeamSelector from './TeamSelector';
import WeatherInput from './WeatherInput';
import VenueDetails from './VenueDetails';
import TeamStatsInput from './TeamStatsInput';
import MatchFormatSelector from './MatchFormatSelector';
import VenueSelector from './VenueSelector';
import { fetchCricketGrounds } from '@/utils/supabaseClient';
import { predictMatchOutcome } from '@/utils/predictionModel';
import { usePredictionForm } from '@/hooks/usePredictionForm';
import { useQuery } from '@tanstack/react-query';

interface PredictionFormProps {
  onPredictionResult: (result: any) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredictionResult }) => {
  const { toast } = useToast();
  const {
    team1,
    setTeam1,
    team2,
    setTeam2,
    venue,
    setVenue,
    matchFormat,
    setMatchFormat,
    selectedVenue,
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    weatherCondition,
    setWeatherCondition,
    team1RecentWins,
    setTeam1RecentWins,
    team1BattingAvg,
    setTeam1BattingAvg,
    team1BowlingAvg,
    setTeam1BowlingAvg,
    team2RecentWins,
    setTeam2RecentWins,
    team2BattingAvg,
    setTeam2BattingAvg,
    team2BowlingAvg,
    setTeam2BowlingAvg,
    isLoading,
    setIsLoading,
    validateForm,
    getFormData
  } = usePredictionForm(onPredictionResult);
  
  // Fetch cricket grounds from Supabase
  const { data: venueList = [] } = useQuery({
    queryKey: ['cricket-grounds'],
    queryFn: fetchCricketGrounds,
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to get the prediction
      const predictionData = getFormData();
      const result = await predictMatchOutcome(predictionData);
      
      onPredictionResult(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate prediction",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="form-container border-0">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TeamSelector teamType="team1" value={team1} onChange={setTeam1} />
              <TeamSelector teamType="team2" value={team2} onChange={setTeam2} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VenueSelector 
                venue={venue} 
                setVenue={setVenue} 
                venueList={venueList}
              />
              
              <MatchFormatSelector 
                matchFormat={matchFormat} 
                setMatchFormat={setMatchFormat} 
              />
            </div>
            
            {/* Display venue details when a venue is selected */}
            {selectedVenue && <VenueDetails venue={selectedVenue} />}
            
            <WeatherInput
              temperature={temperature}
              setTemperature={setTemperature}
              humidity={humidity}
              setHumidity={setHumidity}
              weatherCondition={weatherCondition}
              setWeatherCondition={setWeatherCondition}
            />
            
            <TeamStatsInput
              team1={team1}
              team2={team2}
              team1RecentWins={team1RecentWins}
              setTeam1RecentWins={setTeam1RecentWins}
              team1BattingAvg={team1BattingAvg}
              setTeam1BattingAvg={setTeam1BattingAvg}
              team1BowlingAvg={team1BowlingAvg}
              setTeam1BowlingAvg={setTeam1BowlingAvg}
              team2RecentWins={team2RecentWins}
              setTeam2RecentWins={setTeam2RecentWins}
              team2BattingAvg={team2BattingAvg}
              setTeam2BattingAvg={setTeam2BattingAvg}
              team2BowlingAvg={team2BowlingAvg}
              setTeam2BowlingAvg={setTeam2BowlingAvg}
            />
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-cricket-500 hover:bg-cricket-600 font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? "Analyzing Match Data..." : "Predict Match Outcome"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PredictionForm;
