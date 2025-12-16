import { Skeleton } from "@/components/ui/skeleton";

const SkeletonMovie = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />

      <Skeleton className="h-4 w-3/4" />

      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  );
};
export default SkeletonMovie;
