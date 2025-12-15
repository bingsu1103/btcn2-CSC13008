import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Star, Film } from "lucide-react";

const MovieHero = ({ movie }) => {
  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row gap-6 p-6">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-[220px] rounded-lg shadow"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{movie.full_title}</h1>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
              <Badge key={g} variant="secondary">
                <Film className="w-3 h-3 mr-1" />
                {g}
              </Badge>
            ))}
          </div>

          <Separator />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              IMDb {movie.ratings.imDb}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              RT {movie.ratings.rottenTomatoes}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              Meta {movie.ratings.metacritic}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              TMDB {movie.ratings.theMovieDb}
            </div>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {movie.runtime} • {movie.countries.join(", ")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieHero;
