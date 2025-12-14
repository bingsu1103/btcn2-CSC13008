import { useEffect, useState } from "react";
import apiMovie from "@/services/apiMovie";

const HERO_LIMIT = 5;

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHeroMovies = async () => {
      try {
        setLoading(true);
        const res = await apiMovie.getMostPopularMovie(1, HERO_LIMIT);
        setMovies(res.data.slice(0, HERO_LIMIT));
      } catch (err) {
        console.error("HeroSlider error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHeroMovies();
  }, []);

  if (loading) return <div className="mb-12 text-gray-400">Loading hero…</div>;
  if (!movies.length) return null;

  const next = () => {
    setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const movie = movies[index];

  return (
    <div className="relative flex justify-center mb-12">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-[300px] rounded-lg shadow-lg"
      />

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-white"
      >
        ›
      </button>

      <div className="absolute bottom-6 text-center">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-300">{movie.genres.join(", ")}</p>
      </div>
    </div>
  );
};

export default HeroSlider;
