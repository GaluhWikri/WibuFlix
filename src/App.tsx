import { useEffect, useState } from 'react';
import { supabase, Anime, Genre } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AnimeSection from './components/AnimeSection';

function App() {
  const [featuredAnime, setFeaturedAnime] = useState<Anime | null>(null);
  const [trendingAnimes, setTrendingAnimes] = useState<Anime[]>([]);
  const [latestAnimes, setLatestAnimes] = useState<Anime[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAnimes();
  }, [searchQuery, selectedGenre, trendingAnimes, latestAnimes]);

  const fetchData = async () => {
    try {
      const [featuredResult, trendingResult, latestResult, genresResult] = await Promise.all([
        supabase
          .from('anime')
          .select('*')
          .eq('is_featured', true)
          .maybeSingle(),
        supabase
          .from('anime')
          .select('*')
          .eq('is_trending', true)
          .order('view_count', { ascending: false })
          .limit(10),
        supabase
          .from('anime')
          .select('*')
          .order('release_date', { ascending: false })
          .limit(10),
        supabase
          .from('genres')
          .select('*')
          .order('name', { ascending: true }),
      ]);

      if (featuredResult.data) {
        setFeaturedAnime(featuredResult.data);
      }

      if (trendingResult.data) {
        setTrendingAnimes(trendingResult.data);
      }

      if (latestResult.data) {
        setLatestAnimes(latestResult.data);
      }

      if (genresResult.data) {
        setGenres(genresResult.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const filterAnimes = () => {
    let allAnimes = [...trendingAnimes, ...latestAnimes];
    const uniqueAnimes = allAnimes.filter(
      (anime, index, self) => index === self.findIndex((a) => a.id === anime.id)
    );

    let filtered = uniqueAnimes;

    if (searchQuery) {
      filtered = filtered.filter((anime) =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((anime) => anime.genre.includes(selectedGenre));
    }

    setFilteredAnimes(filtered);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  const displayAnimes = searchQuery || selectedGenre ? filteredAnimes : trendingAnimes;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        genres={genres}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onGenreSelect={handleGenreSelect}
      />

      <div className="pt-16">
        {!searchQuery && !selectedGenre && <Hero anime={featuredAnime} />}

        {/* Perubahan utama untuk membuat tampilan seperti Netflix: -mt-[80px] */}
        <div className="pb-12 -mt-[80px] relative z-10">
          {searchQuery || selectedGenre ? (
            <section className="py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : `Genre: ${selectedGenre}`}
                </h2>
                {filteredAnimes.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredAnimes.map((anime) => (
                      <div key={anime.id}>
                        <div className="group relative bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer">
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                              src={anime.thumbnail_url}
                              alt={anime.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-3">
                            <h3 className="text-white text-sm font-semibold line-clamp-1 group-hover:text-red-600 transition-colors">
                              {anime.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                              <span>★ {anime.rating}</span>
                              <span>{anime.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No anime found</p>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <>
              <AnimeSection title="Trending Now" animes={displayAnimes} />
              <AnimeSection title="Latest Releases" animes={latestAnimes} />

              {/* Perubahan: Menggunakan mt-12 untuk konsistensi jarak */}
              <section className="mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    Browse by Genre
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => handleGenreSelect(genre.name)}
                        className="group relative bg-zinc-900 rounded-lg p-6 hover:bg-zinc-800 transition-all duration-300 border border-white/5 hover:border-red-600/50 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-red-600/5 transition-all duration-300" />
                        <h3 className="relative text-white font-semibold text-lg group-hover:text-red-600 transition-colors">
                          {genre.name}
                        </h3>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        <footer className="bg-zinc-900 border-t border-white/5 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-gray-400 text-sm">
              <p>© 2025 AnimeStream. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;