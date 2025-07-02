import { Skeleton } from "./skeleton";

export function SkeletonPage() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-10 py-10 space-y-6 w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="h-10 w-3/4 rounded-lg" />

        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />

        <div className="space-y-6 pt-8">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
