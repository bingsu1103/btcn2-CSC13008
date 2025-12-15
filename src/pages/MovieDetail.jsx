import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMovie from "@/services/apiMovie";

import { Skeleton } from "@/components/ui/skeleton";
import MovieHero from "@/components/MovieHero";
import MovieOverview from "@/components/MovieOverview";
import CastSection from "@/components/CastSection";
// import ReviewSection from "@/components/ReviewSection";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await apiMovie.getAMovie(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 space-y-6">
        <Skeleton className="h-[260px] w-full" />
        <Skeleton className="h-[180px] w-full" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      <MovieHero movie={movie} />
      <MovieOverview movie={movie} />
      <CastSection actors={movie.actors} />
    </div>
  );
};

export default MovieDetail;
