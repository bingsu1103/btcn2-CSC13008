import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUser from "@/services/apiUser";
import MovieCard from "@/components/MovieCard";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await apiUser.getFavoriteMovies();
      setMovies(res || []);
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
    // log
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        🎬 <span className="text-red-500">Film yêu thích</span>
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && (
        <p>Bạn chưa có film yêu thích nào.</p>
      )}

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
              className="cursor-pointer w-full text-sm py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Xoá khỏi yêu thích
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
