import React, { SetStateAction } from "react";
import { Tables } from "../../../database.types";
import Link from "next/link";

export function AllSessionInfo({
  sessions,
  setSessionInfo,
  setWeightsThisMonth,
}: {
  sessions: Array<Tables<"sessions">>;
  setSessionInfo: React.Dispatch<SetStateAction<Array<Tables<"sessions">>>>;
  setWeightsThisMonth: React.Dispatch<
    SetStateAction<number | null | undefined>
  >;
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
  const handleDropDown = async (session_id: string) => {
    const controller = new AbortController();
    try {
      const response = await fetch(`/api/workouts/${session_id}`, {
        method: "DELETE",
        signal: controller.signal,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Could not delete your exercise.");
      }

      const deletedSession = await response.json();
      console.log(deletedSession.data);
      // Now we have to update our sessions
      setSessionInfo((prev) =>
        prev.filter(
          (session) => session.session_id != deletedSession.data.session_id
        )
      );

      // Now find the sum of all deleted sets
      setWeightsThisMonth((prev) =>
        prev
          ? prev -
            deletedSession.data.sets.reduce(
              (sum: number, set: Tables<"session_sets">) =>
                sum + set.set_weight * set.set_reps,
              0
            )
          : prev
      );
    } catch (e) {
      console.log(e);
    }

    return () => controller.abort();
  };
  return (
    <>
      {sessions.map((session) => (
        <div key={session.session_id} className="relative">
          <Link
            prefetch={true}
            className="block border rounded-lg bg-gray-200 shadow-sm text-black cursor-pointer p-3 hover:bg-gray-400 transition-colors duration-200"
            href={`/workouts/${session.session_id}`}
          >
            <div className="flex justify-between font-medium pr-8 items-center">
              <div>
                <h2>
                  {session.session_name ||
                    determineWorkoutTime(
                      new Date(session.session_start_date).getHours()
                    )}
                </h2>
                <h3 className="text-gray-700 font-medium">
                  {new Date(session.session_start_date).toDateString()}
                </h3>
              </div>
              <div className="text-nowrap">
                <h2>
                  {session.session_end_date
                    ? `${Math.round(
                        (new Date(session.session_end_date).getTime() -
                          new Date(session.session_start_date).getTime()) /
                          60000
                      )} min`
                    : ""}
                </h2>
              </div>
            </div>
          </Link>
          <div
            className="absolute top-6 right-3 cursor-pointer hover:border border-black rounded-xl hover:bg-gray-400 transition-colors"
            onClick={() => {
              handleDropDown(session.session_id);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              aria-label="Options"
            >
              <circle cx="12" cy="6" r="2" fill="black" />
              <circle cx="12" cy="12" r="2" fill="black" />
              <circle cx="12" cy="18" r="2" fill="black" />
            </svg>
          </div>
        </div>
      ))}
    </>
  );
}
