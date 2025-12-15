import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Film, DollarSign } from "lucide-react";

const MovieOverview = ({ movie }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="plot">
          <TabsList>
            <TabsTrigger value="plot" className="flex gap-2">
              <Film className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="box" className="flex gap-2">
              <DollarSign className="w-4 h-4" />
              Box Office
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plot" className="mt-4">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: movie.plot_full }}
            />
          </TabsContent>

          <TabsContent value="box" className="mt-4 space-y-2 text-sm">
            <p>Budget: {movie.box_office.budget}</p>
            <p>Opening Weekend: {movie.box_office.openingWeekendUSA}</p>
            <p>Gross USA: {movie.box_office.grossUSA}</p>
            <p>Worldwide: {movie.box_office.cumulativeWorldwideGross}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MovieOverview;
