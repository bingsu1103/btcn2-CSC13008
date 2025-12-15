import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiMovie from "@/services/apiMovie";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/MoviePagination";

const PAGE_SIZE = 10;

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiMovie.searchMovie(query, page, PAGE_SIZE);
        setMovies(res.data);
        setPagination(res.pagination);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const onPageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Search result for: <span className="text-green-500">{query}</span>
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && movies.length === 0 && <p>No movies found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Movies;
