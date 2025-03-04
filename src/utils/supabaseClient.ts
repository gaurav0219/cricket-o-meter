
import { supabase } from "@/integrations/supabase/client";

export interface CricketGround {
  id: string;
  ground: string;
  ground_long: string;
  country: string;
  height: number;
  width: number;
  rounded_rect: boolean;
  batting_record_name: string | null;
  batting_record_country: string | null;
  batting_record_against: string | null;
  batting_record_score: string | null;
  batting_record_date: string | null;
  bowling_record_name: string | null;
  bowling_record_country: string | null;
  bowling_record_against: string | null;
  bowling_record_figures: string | null;
  bowling_record_date: string | null;
  odi_only: boolean;
  measurement_url: string | null;
  notes: string | null;
}

export const fetchCricketGrounds = async (): Promise<CricketGround[]> => {
  const { data, error } = await supabase
    .from('cricket_grounds')
    .select('*')
    .order('ground', { ascending: true });
  
  if (error) {
    console.error('Error fetching cricket grounds:', error);
    return [];
  }
  
  return data || [];
};

export const fetchCricketGroundByName = async (groundName: string): Promise<CricketGround | null> => {
  const { data, error } = await supabase
    .from('cricket_grounds')
    .select('*')
    .ilike('ground', `%${groundName}%`)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching cricket ground:', error);
    return null;
  }
  
  return data;
};
