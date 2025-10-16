import { Play, Star } from 'lucide-react';
import { Anime } from '../lib/supabase';

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="group relative bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={anime.thumbnail_url}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-semibold text-white">{anime.rating}</span>
        </div>

        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded">
            {anime.status}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-110 shadow-lg">
            <Play className="w-4 h-4 fill-current" />
            <span className="text-sm">Watch</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-white font-semibold line-clamp-1 group-hover:text-red-600 transition-colors">
          {anime.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {anime.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded border border-white/10"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{anime.episodes} Eps</span>
          <span>{(anime.view_count / 1000000).toFixed(1)}M views</span>
        </div>
      </div>
    </div>
  );
}
