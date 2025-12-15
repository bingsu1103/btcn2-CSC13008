import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const MovieCard = ({ movie }) => {
  return (
    <Card className="hover:shadow-lg transition">
      <CardContent className="p-2">
        <img
          src={movie.image}
          alt={movie.title}
          className="rounded-md aspect-[2/3] object-cover"
        />
        <h3 className="mt-2 font-semibold line-clamp-1">{movie.title}</h3>
        <p className="text-sm text-muted-foreground">{movie.year}</p>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-1">
        {movie.genres?.slice(0, 2).map((g) => (
          <Badge key={g} variant="secondary">
            {g}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
