import React from "react";
import { Skeleton } from "./skeleton";
export function Skeleton_page({}) {
  return (
    <div className="text-center py-10 text-gray-500 space-y-5">
      <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
      <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
      <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
      <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
      <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
      <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
      <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
    </div>
  );
}
