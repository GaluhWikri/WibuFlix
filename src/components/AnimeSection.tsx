import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Anime } from '../lib/supabase';
import AnimeCard from './AnimeCard';

interface AnimeSectionProps {
  title: string;
  animes: Anime[];
}

export default function AnimeSection({ title, animes }: AnimeSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (animes.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {animes.map((anime) => (
            <div key={anime.id} className="flex-none w-[200px] md:w-[240px]">
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
