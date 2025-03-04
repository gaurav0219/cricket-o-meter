
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { CricketGround } from '@/utils/supabaseClient';

interface VenueDetailsProps {
  venue: CricketGround;
}

const VenueDetails: React.FC<VenueDetailsProps> = ({ venue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4"
    >
      <Card className="overflow-hidden border-cricket-100 dark:border-cricket-800">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{venue.ground_long}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Located in <span className="font-medium">{venue.country}</span>
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                  <span className="font-medium">{venue.width}m × {venue.height}m</span>
                </div>
                {venue.odi_only && (
                  <div className="text-xs bg-cricket-50 dark:bg-cricket-900 text-cricket-800 dark:text-cricket-200 px-2 py-1 rounded inline-block">
                    ODI Only
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-4 md:pt-0 md:pl-4">
              <h4 className="text-sm font-medium mb-2">Notable Records</h4>
              <div className="space-y-3">
                {venue.batting_record_name && (
                  <div className="text-xs">
                    <span className="block text-cricket-600 dark:text-cricket-400 font-medium">Batting Record</span>
                    <p>
                      {venue.batting_record_name} ({venue.batting_record_country}) - {venue.batting_record_score} vs {venue.batting_record_against} ({venue.batting_record_date})
                    </p>
                  </div>
                )}
                
                {venue.bowling_record_name && (
                  <div className="text-xs">
                    <span className="block text-cricket-600 dark:text-cricket-400 font-medium">Bowling Record</span>
                    <p>
                      {venue.bowling_record_name} ({venue.bowling_record_country}) - {venue.bowling_record_figures} vs {venue.bowling_record_against} ({venue.bowling_record_date})
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {venue.notes && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
              <p>{venue.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VenueDetails;
