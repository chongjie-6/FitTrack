"use client";
import { DeleteDropdown } from "./deleteDropdown";
import { Tables } from "../../../database.types";
import Link from "next/link";
import { deleteWorkoutAction } from "@/app/actions/sessions/deleteWorkout";
import { Dispatch, SetStateAction, useState } from "react";

export function AllSessionInfo({
  sessions,
  setHoursThisMonthState,
  setWeightsThisMonthState,
  setWorkoutsThisMonthState,
}: {
  sessions: Array<Tables<"sessions">>;
  setHoursThisMonthState: Dispatch<SetStateAction<number>>;
  setWeightsThisMonthState: Dispatch<SetStateAction<number>>;
  setWorkoutsThisMonthState: Dispatch<SetStateAction<number>>;
}) {
  const [sessionsInfo, setSessionsInfo] = useState(sessions);
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
      {sessionsInfo.map((session) => (
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
          <DeleteDropdown
            handleDropDown={deleteWorkoutAction}
            session_id={session.session_id}
            setSessionsInfo={setSessionsInfo}
            setHoursThisMonthState={setHoursThisMonthState}
            setWeightsThisMonthState={setWeightsThisMonthState}
            setWorkoutsThisMonthState={setWorkoutsThisMonthState}
          />
        </div>
      ))}
    </>
  );
}
