import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Genre } from '../lib/supabase';

interface NavbarProps {
  genres: Genre[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGenreSelect: (genre: string | null) => void;
}

export default function Navbar({ genres, searchQuery, onSearchChange, onGenreSelect }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                WIBU<span className="text-red-600">FLIX</span>
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Daftar Anime
              </a>
              <div className="relative">
                <button
                  onClick={() => setIsGenreOpen(!isGenreOpen)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  <span>Genre</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isGenreOpen && (
                  <div className="absolute top-full mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl py-2">
                    <button
                      onClick={() => {
                        onGenreSelect(null);
                        setIsGenreOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-red-600/10 hover:text-white transition-colors"
                    >
                      All Genres
                    </button>
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => {
                          onGenreSelect(genre.name);
                          setIsGenreOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-red-600/10 hover:text-white transition-colors"
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Jadwal Rilis
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            <button className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Login
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/5 py-4">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>
            <div className="space-y-3">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Home
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Daftar Anime
              </a>
              <div>
                <button
                  onClick={() => setIsGenreOpen(!isGenreOpen)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  <span>Genre</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isGenreOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <button
                      onClick={() => {
                        onGenreSelect(null);
                        setIsGenreOpen(false);
                      }}
                      className="block text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      All Genres
                    </button>
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => {
                          onGenreSelect(genre.name);
                          setIsGenreOpen(false);
                        }}
                        className="block text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Jadwal Rilis
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
