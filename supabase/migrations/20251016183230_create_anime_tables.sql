-- Create Anime Streaming Database Schema
-- 
-- New Tables:
--   - anime: Main anime information
--   - episodes: Individual episode data
--   - genres: Genre categories
-- 
-- Security: RLS enabled with public read access

CREATE TABLE IF NOT EXISTS anime (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  thumbnail_url text DEFAULT '',
  hero_image_url text DEFAULT '',
  genre text[] DEFAULT '{}',
  status text DEFAULT 'Ongoing',
  rating numeric DEFAULT 0,
  episodes integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_trending boolean DEFAULT false,
  view_count integer DEFAULT 0,
  release_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  anime_id uuid REFERENCES anime(id) ON DELETE CASCADE,
  episode_number integer NOT NULL,
  title text DEFAULT '',
  video_url text DEFAULT '',
  thumbnail_url text DEFAULT '',
  duration integer DEFAULT 0,
  release_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS genres (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_anime_featured ON anime(is_featured);
CREATE INDEX IF NOT EXISTS idx_anime_trending ON anime(is_trending);
CREATE INDEX IF NOT EXISTS idx_anime_view_count ON anime(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_episodes_anime_id ON episodes(anime_id);

-- Enable RLS
ALTER TABLE anime ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can read anime"
  ON anime FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read episodes"
  ON episodes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read genres"
  ON genres FOR SELECT
  USING (true);