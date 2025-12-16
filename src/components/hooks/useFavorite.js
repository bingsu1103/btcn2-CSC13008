import { useEffect, useState, useCallback, useMemo } from "react";
import apiUser from "@/services/apiUser";
import { toast } from "sonner";

export default function useFavoriteMovies() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((m) => m.id)),
    [favorites]
  );

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiUser.getFavoriteMovies();
      setFavorites(res);
    } catch (e) {
      console.error("Get favorite movies failed", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = useCallback(
    (movieId) => favoriteIds.has(movieId),
    [favoriteIds]
  );

  const addFavorite = useCallback(async (movie) => {
    setFavorites((prev) => [...prev, movie]);

    try {
      await apiUser.addFavoriteMovie(movie.id);
    } catch (e) {
      setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
      console.error("Add favorite failed", e);
    }
  }, []);

  const removeFavorite = useCallback(
    async (movieId) => {
      const removedMovie = favorites.find((m) => m.id === movieId);

      setFavorites((prev) => prev.filter((m) => m.id !== movieId));

      try {
        await apiUser.removeFavoriteMovie(movieId);
      } catch (e) {
        if (removedMovie) {
          setFavorites((prev) => [...prev, removedMovie]);
        }
        console.error("Remove favorite failed", e);
      }
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      if (favoriteIds.has(movie.id)) {
        removeFavorite(movie.id);
        toast.error("Đã xoá khỏi danh sách phim yêu thích");
      } else {
        toast.success("Đã thêm vào danh sách phim yêu thích");
        addFavorite(movie);
      }
    },
    [favoriteIds, addFavorite, removeFavorite]
  );

  return {
    favorites,
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    loading,
    refetchFavorites: fetchFavorites,
  };
}
