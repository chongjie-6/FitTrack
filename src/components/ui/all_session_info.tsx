import React, { SetStateAction } from "react";
import { Tables } from "../../../database.types";
import Link from "next/link";
import { deleteWorkoutAction } from "@/app/dashboard/page";

export function AllSessionInfo({
  sessions,
  setSessionInfo,
  setWeightsThisMonth,
  setHoursThisMonth,
  setWorkoutsThisMonth,
}: {
  sessions: Array<Tables<"sessions">>;
  setSessionInfo: React.Dispatch<SetStateAction<Array<Tables<"sessions">>>>;
  setWeightsThisMonth: React.Dispatch<
    SetStateAction<number | null | undefined>
  >;
  setHoursThisMonth: React.Dispatch<SetStateAction<number | null | undefined>>;
  setWorkoutsThisMonth: React.Dispatch<
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
    try {
      const response = deleteWorkoutAction(session_id);
      const deletedSession = await response;
      if (!deletedSession) {
        return;
      }

      const session_data = deletedSession.session_data;
      // Now we have to update our sessions
      setSessionInfo((prev) =>
        prev.filter((session) => session.session_id != session_data.session_id)
      );

      // Now find the sum of all deleted sets
      setWeightsThisMonth((prev) =>
        prev
          ? prev -
            deletedSession.sets.reduce(
              (sum: number, set: { set_weight: number; set_reps: number }) => {
                return sum + set.set_weight * set.set_reps;
              },
              0
            )
          : prev
      );

      setWorkoutsThisMonth((prev) =>
        prev &&
        new Date().getMonth ===
          new Date(session_data.session_start_date).getMonth
          ? prev - 1
          : prev
      );

      setHoursThisMonth((prev) => {
        if (!prev || !session_data.session_end_date) {
          return prev;
        }

        const durationInHours =
          (new Date(session_data.session_end_date).getTime() -
            new Date(session_data.session_start_date).getTime()) /
          3600000;

        const updated = prev - durationInHours;

        // Round to 2 decimal places
        return Math.round(updated * 100) / 100;
      });
    } catch (e) {
      console.log(e);
    }
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
