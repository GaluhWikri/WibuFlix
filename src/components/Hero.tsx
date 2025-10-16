import { Play, Info } from 'lucide-react';
import { Anime } from '../lib/supabase';

interface HeroProps {
  anime: Anime | null;
}

export default function Hero({ anime }: HeroProps) {
  if (!anime) {
    return (
      <div className="relative h-[80vh] bg-zinc-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={anime.hero_image_url}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded">
              Featured
            </span>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="font-semibold text-yellow-500">★ {anime.rating}</span>
              <span>•</span>
              <span>{anime.status}</span>
              <span>•</span>
              <span>{anime.episodes} Episodes</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            {anime.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {anime.genre.map((g) => (
              <span
                key={g}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20"
              >
                {g}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed line-clamp-3">
            {anime.description}
          </p>

          <div className="flex items-center space-x-4 pt-4">
            <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-red-600/20">
              <Play className="w-5 h-5 fill-current" />
              <span>Watch Now</span>
            </button>
            <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold transition-all border border-white/20">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}