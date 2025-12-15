import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

const ActorInfo = ({ actor }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info" className="flex gap-2">
              <Info className="w-4 h-4" />
              Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-2 text-sm">
            {actor.birth_date && <p>Birth date: {actor.birth_date}</p>}

            {actor.death_date && <p>Death date: {actor.death_date}</p>}

            {actor.height && <p>Height: {actor.height}</p>}

            {actor.awards && <p>Awards: {actor.awards}</p>}

            {!actor.birth_date &&
              !actor.death_date &&
              !actor.height &&
              !actor.awards && (
                <p className="text-muted-foreground">
                  No additional personal information available.
                </p>
              )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActorInfo;
