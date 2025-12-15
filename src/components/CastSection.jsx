import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

const CastSection = ({ actors }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        Cast
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {actors.map((actor) => (
          <Link key={actor.id} to={`/actors/${actor.id}`}>
            <Card className="hover:shadow-lg transition">
              <CardContent className="flex flex-col items-center p-4 gap-2">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={actor.image} />
                  <AvatarFallback>{actor.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <p className="text-sm font-medium text-center">{actor.name}</p>
                <p className="text-xs text-muted-foreground text-center">
                  {actor.character}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CastSection;
