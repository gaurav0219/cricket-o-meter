
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CricketGround } from '@/utils/supabaseClient';
import { motion } from 'framer-motion';

interface VenueSelectorProps {
  venue: string;
  setVenue: (value: string) => void;
  venueList: CricketGround[];
}

const VenueSelector: React.FC<VenueSelectorProps> = ({ 
  venue, 
  setVenue, 
  venueList 
}) => {
  return (
    <motion.div 
      className="space-y-2"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Label htmlFor="venue" className="font-medium text-gray-700 dark:text-gray-300">Match Venue</Label>
      <Input
        id="venue"
        placeholder="Enter match venue"
        list="venue-list"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-400 focus:ring-blue-300 transition-all duration-300"
      />
      <datalist id="venue-list">
        {venueList.map((v) => (
          <option key={v.id} value={v.ground} />
        ))}
      </datalist>
    </motion.div>
  );
};

export default VenueSelector;
