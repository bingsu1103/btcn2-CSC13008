import { Skeleton } from "./ui/skeleton";

const MovieRowSkeleton = () => {
  return (
    <section className="mb-10">
      <Skeleton className="h-6 w-40 mb-4" />

      <div className="flex justify-center items-center w-full">
        <Skeleton className="w-6 h-6 rounded-full" />

        <div className="grid grid-cols-3 gap-4 mx-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-60 h-[360px] rounded-md" />
          ))}
        </div>

        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
    </section>
  );
};

export default MovieRowSkeleton;
