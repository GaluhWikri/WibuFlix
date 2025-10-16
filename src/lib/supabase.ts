import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Anime = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  hero_image_url: string;
  genre: string[];
  status: string;
  rating: number;
  episodes: number;
  is_featured: boolean;
  is_trending: boolean;
  view_count: number;
  release_date: string;
  created_at: string;
  updated_at: string;
};

export type Genre = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};
