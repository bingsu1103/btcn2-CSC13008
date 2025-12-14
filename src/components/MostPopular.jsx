import { useEffect, useState } from "react";
import apiMovie from "@/services/apiMovie";

const PAGE_SIZE = 30;
const SLIDE_STEP = 3;

const MostPopularFilm = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMovies(1);
  }, []);

  const loadMovies = async (pageToLoad) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await apiMovie.getMostPopularMovie(pageToLoad, PAGE_SIZE);
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

  return (
    <section className="mb-10">
      <h3 className="text-lg font-semibold mb-4">Most Popular</h3>

      <div className="flex justify-center items-center w-full">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="text-2xl text-gray-400 disabled:opacity-30"
        >
          ‹
        </button>

        <div className="grid grid-cols-3 gap-4 mx-4">
          {visibleMovies.map((movie) => (
            <img
              key={movie.id}
              src={movie.image}
              alt={movie.title}
              className="w-70 rounded-md hover:scale-105 transition"
            />
          ))}
        </div>

        <button onClick={next} className="text-2xl text-gray-400">
          ›
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-400 mt-2">Loading more movies...</p>
      )}
    </section>
  );
};

export default MostPopularFilm;
