import { useEffect, useState } from "react";
import apiMovie from "@/services/apiMovie";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

const HERO_LIMIT = 5;

const HeroSliderSkeleton = () => {
  return (
    <div className="relative flex justify-center mb-12">
      <Skeleton className="w-[300px] h-[450px] rounded-lg" />

      <Skeleton className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full" />
      <Skeleton className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full" />

      <div className="absolute bottom-6 space-y-2 text-center">
        <Skeleton className="h-5 w-48 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    </div>
  );
};

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  if (loading) return <HeroSliderSkeleton />;
  if (!movies.length) return null;

  const next = () => {
    setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const movie = movies[index];
  const directedToMovies = (id) => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="relative flex justify-center mb-12">
      <div
        onClick={() => {
          directedToMovies(movie.id);
        }}
      >
        <img
          src={movie.image}
          alt={movie.title}
          className="w-[300px] cursor-pointer rounded-lg shadow-lg"
        />
      </div>

      <button
        onClick={prev}
        className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-white"
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
