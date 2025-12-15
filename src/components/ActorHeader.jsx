import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const ActorHeader = ({ actor }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-6 p-6">
        <Avatar className="w-32 h-32">
          <AvatarImage src={actor.image} />
          <AvatarFallback>
            <User className="w-10 h-10" />
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{actor.name}</h1>

          {actor.role && (
            <p className="text-sm text-muted-foreground">{actor.role}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActorHeader;
