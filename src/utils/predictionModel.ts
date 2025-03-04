import { CricketGround } from './supabaseClient';

interface PredictionInput {
  team1: string;
  team2: string;
  venue: string;
  matchFormat: string;
  weather: {
    temperature: number;
    humidity: number;
    condition: string;
  };
  team1Stats: {
    recentWins: number;
    battingAvg: number;
    bowlingAvg: number;
  };
  team2Stats: {
    recentWins: number;
    battingAvg: number;
    bowlingAvg: number;
  };
  venueDetails?: CricketGround | null;
}

// Simulate a machine learning model for cricket match prediction
export const predictMatchOutcome = async (input: PredictionInput) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract values from input
  const { team1, team2, venue, matchFormat, weather, team1Stats, team2Stats, venueDetails } = input;
  
  // Calculate team strengths based on provided stats
  const team1Strength = calculateTeamStrength(team1Stats, weather);
  const team2Strength = calculateTeamStrength(team2Stats, weather);
  
  // Add venue advantage (10% boost for certain venues that might favor certain teams)
  const venueAdvantage = calculateVenueAdvantage(team1, team2, venue);
  
  // Calculate final team scores
  let team1Score = team1Strength + (venueAdvantage === team1 ? 10 : 0);
  let team2Score = team2Strength + (venueAdvantage === team2 ? 10 : 0);
  
  // Apply venue-specific scoring advantages based on real ground data
  if (venueDetails) {
    const venueFactors = calculateVenueFactors(venueDetails, team1, team2, matchFormat);
    team1Score += venueFactors.team1Bonus;
    team2Score += venueFactors.team2Bonus;
  }
  
  // Adjust for match format
  if (matchFormat === 'test' && team1Stats.bowlingAvg < team2Stats.bowlingAvg) {
    team1Score += 5; // Better bowling teams have advantage in test matches
  } else if (matchFormat === 't20' && team1Stats.battingAvg > 35) {
    team1Score += 5; // High batting average teams do better in T20
  }
  
  if (matchFormat === 'test' && team2Stats.bowlingAvg < team1Stats.bowlingAvg) {
    team2Score += 5;
  } else if (matchFormat === 't20' && team2Stats.battingAvg > 35) {
    team2Score += 5;
  }
  
  // Determine winner and calculate probability
  const totalScore = team1Score + team2Score;
  const team1Probability = Math.round((team1Score / totalScore) * 100);
  const winner = team1Probability > 50 ? team1 : team2;
  const probability = team1Probability > 50 ? team1Probability : 100 - team1Probability;
  
  // Generate key factors that influenced the prediction
  const factors = generateFactors(team1, team2, input, winner);
  
  return {
    winner,
    probability,
    team1,
    team2,
    venue,
    matchFormat,
    factors,
    venueDetails
  };
};

const calculateTeamStrength = (stats: any, weather: any) => {
  // Base strength from batting and bowling averages
  let strength = (stats.battingAvg * 1.5) - (stats.bowlingAvg * 0.8);
  
  // Add recent form impact (5 points per recent win)
  strength += stats.recentWins * 5;
  
  // Weather impact
  if (weather.condition === 'Rainy' || weather.condition === 'Overcast') {
    // If bowling average is good (lower is better), team does better in overcast conditions
    if (stats.bowlingAvg < 25) strength += 5;
  } else if (weather.condition === 'Sunny') {
    // Batting teams do better in sunny conditions
    if (stats.battingAvg > 30) strength += 5;
  }
  
  // Cap the strength to keep it within reasonable bounds
  return Math.max(30, Math.min(strength, 100));
};

const calculateVenueAdvantage = (team1: string, team2: string, venue: string) => {
  // This is a simplified model - in a real app, you would have actual venue advantage data
  
  // Some dummy venue advantages
  const venueAdvantages: Record<string, string> = {
    "Melbourne Cricket Ground": "Australia",
    "Eden Gardens, Kolkata": "India",
    "Lord's, London": "England",
    "Wankhede Stadium, Mumbai": "India",
    "Wanderers Stadium, Johannesburg": "South Africa"
  };
  
  if (venueAdvantages[venue] === team1) return team1;
  if (venueAdvantages[venue] === team2) return team2;
  
  return "";
};

const calculateVenueFactors = (venue: CricketGround, team1: string, team2: string, matchFormat: string) => {
  let team1Bonus = 0;
  let team2Bonus = 0;
  
  // Check if venue is in same country as any team
  if (getTeamCountry(team1) === venue.country) {
    team1Bonus += 3; // Home ground advantage
  }
  
  if (getTeamCountry(team2) === venue.country) {
    team2Bonus += 3; // Home ground advantage
  }
  
  // ODI-only grounds might favor teams with better ODI record
  if (venue.odi_only && matchFormat === 'odi') {
    // This would be expanded with real data about team's ODI performance
    if (team1 === 'New Zealand' || team1 === 'England') team1Bonus += 2;
    if (team2 === 'New Zealand' || team2 === 'England') team2Bonus += 2;
  }
  
  // Ground size affects teams differently
  const groundSize = venue.width * venue.height;
  
  // Larger grounds favor teams with strong bowling
  if (groundSize > 22000) { // Arbitrary threshold for "large" grounds
    if (team1 === 'Australia' || team1 === 'South Africa') team1Bonus += 2;
    if (team2 === 'Australia' || team2 === 'South Africa') team2Bonus += 2;
  } 
  // Smaller grounds favor teams with aggressive batting
  else if (groundSize < 18000) { // Arbitrary threshold for "small" grounds
    if (team1 === 'West Indies' || team1 === 'India') team1Bonus += 2;
    if (team2 === 'West Indies' || team2 === 'India') team2Bonus += 2;
  }
  
  return { team1Bonus, team2Bonus };
};

const getTeamCountry = (team: string): string => {
  const teamCountryMap: {[key: string]: string} = {
    'India': 'Ind',
    'Australia': 'Aus',
    'England': 'UK',
    'South Africa': 'SA',
    'New Zealand': 'NZ',
    'Pakistan': 'Pak',
    'Sri Lanka': 'SL',
    'West Indies': 'WI',
    'Bangladesh': 'Ban',
    'Afghanistan': 'Afg',
    'Zimbabwe': 'Zim'
  };
  
  return teamCountryMap[team] || '';
};

const generateFactors = (team1: string, team2: string, input: PredictionInput, winner: string) => {
  const { team1Stats, team2Stats, venue, weather, matchFormat, venueDetails } = input;
  const factors = [];
  const winnerStats = winner === team1 ? team1Stats : team2Stats;
  const loserStats = winner === team1 ? team2Stats : team1Stats;
  
  // Recent form factor
  if (winnerStats.recentWins > loserStats.recentWins) {
    factors.push({
      factor: `${winner} has better recent form (${winnerStats.recentWins} vs ${loserStats.recentWins} wins)`,
      weight: 25
    });
  }
  
  // Batting strength
  if (winnerStats.battingAvg > loserStats.battingAvg) {
    factors.push({
      factor: `${winner} has stronger batting lineup`,
      weight: 20
    });
  }
  
  // Bowling strength
  if (winnerStats.bowlingAvg < loserStats.bowlingAvg) {
    factors.push({
      factor: `${winner} has more effective bowling attack`,
      weight: 18
    });
  }
  
  // Venue advantage
  const venueAdvantage = calculateVenueAdvantage(team1, team2, venue);
  if (venueAdvantage === winner) {
    factors.push({
      factor: `${venue} historically favors ${winner}`,
      weight: 15
    });
  }
  
  // Venue country advantage
  if (venueDetails && getTeamCountry(winner) === venueDetails.country) {
    factors.push({
      factor: `Home advantage at ${venueDetails.ground_long}`,
      weight: 17
    });
  }
  
  // Ground size factor
  if (venueDetails) {
    const groundSize = venueDetails.width * venueDetails.height;
    if ((groundSize > 22000 && (winner === 'Australia' || winner === 'South Africa')) ||
        (groundSize < 18000 && (winner === 'West Indies' || winner === 'India'))) {
      factors.push({
        factor: `${venueDetails.ground_long}'s dimensions (${venueDetails.width}m × ${venueDetails.height}m) favor ${winner}'s playing style`,
        weight: 13
      });
    }
  }
  
  // Weather conditions
  if (weather.condition === 'Rainy' || weather.condition === 'Overcast') {
    if (winnerStats.bowlingAvg < 28) {
      factors.push({
        factor: `${weather.condition} conditions favor ${winner}'s bowling attack`,
        weight: 12
      });
    }
  } else if (weather.condition === 'Sunny' && winnerStats.battingAvg > 32) {
    factors.push({
      factor: `${weather.condition} conditions favor ${winner}'s batting lineup`,
      weight: 10
    });
  }
  
  // Match format specific
  if (matchFormat === 'test' && winnerStats.bowlingAvg < 30) {
    factors.push({
      factor: `${winner}'s bowling strength is well-suited for Test matches`,
      weight: 14
    });
  } else if (matchFormat === 't20' && winnerStats.battingAvg > 30) {
    factors.push({
      factor: `${winner}'s batting aggression is ideal for T20 format`,
      weight: 16
    });
  }
  
  // If we don't have enough factors, add a generic one
  if (factors.length < 3) {
    factors.push({
      factor: `Historical matchup statistics favor ${winner}`,
      weight: 10
    });
  }
  
  // Sort by weight (highest first)
  return factors.sort((a, b) => b.weight - a.weight).slice(0, 5);
};
