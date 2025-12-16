import { useEffect, useState } from "react";
import apiMovie from "@/services/apiMovie";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import MovieRowSkeleton from "./MovieRowSkeleton";

const PAGE_SIZE = 30;
const SLIDE_STEP = 3;

const TopRatingFilm = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMovies = async (pageToLoad) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await apiMovie.getTopRatingMovie(pageToLoad, PAGE_SIZE);
      setMovies((prev) => [...prev, ...res.data]);
      setPage(pageToLoad);
    } catch (err) {
      console.error("MostPopularFilm error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    const nextIndex = currentIndex + SLIDE_STEP;

    if (nextIndex + SLIDE_STEP > movies.length) {
      loadMovies(page + 1);
    }

    setCurrentIndex(nextIndex);
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - SLIDE_STEP, 0));
  };

  const visibleMovies = movies.slice(currentIndex, currentIndex + SLIDE_STEP);

  const directedToMovies = (id) => {
    navigate(`/movies/${id}`);
  };
  if (!movies.length && isLoading) {
    return <MovieRowSkeleton />;
  }

  return (
    <section className="mb-10">
      <h3 className="text-lg font-semibold mb-4">Top Rating</h3>

      <div className="flex justify-center items-center w-full">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="cursor-pointer text-2xl text-gray-400 disabled:opacity-30"
        >
          ‹
        </button>

        <div className="grid grid-cols-3 gap-4 mx-4">
          {visibleMovies.map((movie) => (
            <div
              className="relative group"
              onClick={() => {
                directedToMovies(movie.id);
              }}
            >
              <img
                key={movie.id}
                src={movie.image}
                alt={movie.title}
                className="w-60 rounded-md hover:scale-120 transition"
              />
              <h2
                className="
      absolute bottom--2 left-1/2 -translate-x-1/2
      hidden group-hover:block
      text-center w-full
       text-xl font-bold bg-accent truncate text-accent-foreground px-2 py-1
      rounded hover: scale-120
    "
              >
                {movie.title}
              </h2>
            </div>
          ))}
        </div>

        <button
          onClick={next}
          className="cursor-pointer text-2xl text-gray-400"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default TopRatingFilm;
