
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TeamStatsInputProps {
  team1: string;
  team2: string;
  team1RecentWins: string;
  setTeam1RecentWins: (value: string) => void;
  team1BattingAvg: string;
  setTeam1BattingAvg: (value: string) => void;
  team1BowlingAvg: string;
  setTeam1BowlingAvg: (value: string) => void;
  team2RecentWins: string;
  setTeam2RecentWins: (value: string) => void;
  team2BattingAvg: string;
  setTeam2BattingAvg: (value: string) => void;
  team2BowlingAvg: string;
  setTeam2BowlingAvg: (value: string) => void;
}

const TeamStatsInput: React.FC<TeamStatsInputProps> = ({
  team1,
  team2,
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
  setTeam2BowlingAvg
}) => {
  return (
    <Tabs defaultValue="team1" className="w-full">
      <TabsList className="w-full bg-gray-100 dark:bg-gray-800">
        <TabsTrigger value="team1" className="flex-1">
          {team1 ? team1 : "Team 1"} Stats
        </TabsTrigger>
        <TabsTrigger value="team2" className="flex-1">
          {team2 ? team2 : "Team 2"} Stats
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="team1" className="space-y-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-b-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="team1-recent-wins" className="font-medium text-gray-700 dark:text-gray-300">
              Recent Wins (Last 5 Matches)
            </Label>
            <Input
              id="team1-recent-wins"
              type="number"
              min="0"
              max="5"
              value={team1RecentWins}
              onChange={(e) => setTeam1RecentWins(e.target.value)}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team1-batting-avg" className="font-medium text-gray-700 dark:text-gray-300">
              Batting Average
            </Label>
            <Input
              id="team1-batting-avg"
              type="number"
              min="0"
              step="0.01"
              value={team1BattingAvg}
              onChange={(e) => setTeam1BattingAvg(e.target.value)}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team1-bowling-avg" className="font-medium text-gray-700 dark:text-gray-300">
              Bowling Average
            </Label>
            <Input
              id="team1-bowling-avg"
              type="number"
              min="0"
              step="0.01"
              value={team1BowlingAvg}
              onChange={(e) => setTeam1BowlingAvg(e.target.value)}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="team2" className="space-y-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-b-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="team2-recent-wins" className="font-medium text-gray-700 dark:text-gray-300">
              Recent Wins (Last 5 Matches)
            </Label>
            <Input
              id="team2-recent-wins"
              type="number"
              min="0"
              max="5"
              value={team2RecentWins}
              onChange={(e) => setTeam2RecentWins(e.target.value)}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team2-batting-avg" className="font-medium text-gray-700 dark:text-gray-300">
              Batting Average
            </Label>
            <Input
              id="team2-batting-avg"
              type="number"
              min="0"
              step="0.01"
              value={team2BattingAvg}
              onChange={(e) => setTeam2BattingAvg(e.target.value)}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team2-bowling-avg" className="font-medium text-gray-700 dark:text-gray-300">
              Bowling Average
            </Label>
            <Input
              id="team2-bowling-avg"
              type="number"
              min="0"
              step="0.01"
              value={team2BowlingAvg}
              onChange={(e) => setTeam2BowlingAvg(e.target.value)}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TeamStatsInput;
