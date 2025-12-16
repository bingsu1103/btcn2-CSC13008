import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUser from "@/services/apiUser";
import MovieCard from "@/components/MovieCard";
import { toast } from "sonner";
import SkeletonMovie from "@/components/SkeletonMovie";

const PAGE_SIZE = 10;

const FavoriteMovies = () => {
  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Tổng số trang
  const totalPages = Math.ceil(allMovies.length / PAGE_SIZE);

  // Movies theo trang hiện tại
  const movies = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return allMovies.slice(start, end);
  }, [allMovies, page]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await apiUser.getFavoriteMovies();
      setAllMovies(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (movieId) => {
    try {
      await apiUser.removeFavoriteMovie(movieId);

      setAllMovies((prev) => {
        const updated = prev.filter((m) => m.id !== movieId);

        // Nếu xoá item cuối trang → lùi page
        const newTotalPages = Math.ceil(updated.length / PAGE_SIZE);
        if (page > newTotalPages && newTotalPages > 0) {
          setPage(newTotalPages);
        }

        return updated;
      });

      toast.success("Đã xoá khỏi danh sách yêu thích");
    } catch (err) {
      console.error(err);
      toast.error("Xoá phim yêu thích thất bại");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        🎬 <span className="text-red-500">Film yêu thích</span>
      </h2>

      {/* Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <SkeletonMovie key={index} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && allMovies.length === 0 && (
        <p>Bạn chưa có film yêu thích nào.</p>
      )}

      {/* List */}
      {!loading && movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="space-y-2">
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/movies/${movie.id}`)}
                >
                  <MovieCard
                    movie={{
                      id: movie.id,
                      title: movie.title,
                      image: movie.image_url,
                      year: movie.release_year,
                    }}
                  />
                </div>

                <button
                  onClick={() => handleRemoveFavorite(movie.id)}
                  className="w-full text-sm py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Xoá khỏi yêu thích
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Trước
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded border ${
                    page === i + 1
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteMovies;
