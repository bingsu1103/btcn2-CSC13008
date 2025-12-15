import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import ActorHeader from "@/components/ActorHeader";

import apiPerson from "@/services/apiPerson";
import ActorInfo from "@/components/ActorInfo";

const ActorDetail = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const data = await apiPerson.getPerson(id);
        setActor(data);
      } catch (error) {
        console.error("Fetch actor failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 space-y-6">
        <Skeleton className="h-[240px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (!actor) return null;

  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      <ActorHeader actor={actor} />
      <ActorInfo actor={actor} />
      <KnownForSection movies={actor.known_for} />
    </div>
  );
};

export default ActorDetail;
