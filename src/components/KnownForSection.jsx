import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Film } from "lucide-react";

const KnownForSection = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Film className="w-5 h-5" />
        Known For
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((m) => (
          <Link key={m.id} to={`/movies/${m.id}`}>
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-3 space-y-2">
                <img src={m.image} alt={m.title} className="rounded-md" />

                <p className="font-medium text-sm">{m.title}</p>

                <p className="text-xs text-muted-foreground">{m.year}</p>

                {m.character && (
                  <p className="text-xs">Character: {m.character}</p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default KnownForSection;
