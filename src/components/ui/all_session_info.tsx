import React from "react";
import { Tables } from "../../../database.types";
import Link from "next/link";

export function AllSessionInfo({
  sessions,
}: {
  sessions: Array<Tables<"sessions">>;
}) {
  const determineWorkoutTime = (hour: number) => {
    if (hour < 12) {
      return "Morning Workout";
    } else if (hour < 4) {
      return "Midday Workout";
    } else {
      return "Night Workout";
    }
  };
  return (
    <>
      {sessions.map((session) => (
        <Link
          prefetch={true}
          key={session.session_id}
          className="border rounded-lg bg-gray-200 shadow-sm text-black cursor-pointer p-3 hover:bg-gray-300 transition-colors duration-200"
          href={`/workouts/${session.session_id}`}
        >
          <div className="flex justify-between font-medium w-full">
            <h2>
              {session.session_name ||
                determineWorkoutTime(
                  new Date(session.session_start_date).getHours()
                )}
            </h2>
            <h2>
              {session.session_end_date
                ? Math.round(
                    (new Date(session.session_end_date).getTime() -
                      new Date(session.session_start_date).getTime()) /
                      60000
                  ) + " min"
                : ""}
            </h2>
          </div>
          <h3 className="text-gray-700 font-medium">
            {new Date(session.session_start_date).toDateString()}
          </h3>
        </Link>
      ))}
    </>
  );
}
