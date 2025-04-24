"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Tables } from "../../../database.types";
export function DeleteDropdown({
  handleDropDown,
  session_id,
  setSessionsInfo,
  setHoursThisMonthState,
  setWeightsThisMonthState,
  setWorkoutsThisMonthState,
}: {
  handleDropDown: (session_id: string) => void;
  session_id: string;
  setSessionsInfo: React.Dispatch<
    React.SetStateAction<Array<Tables<"sessions">>>
  >;
  setHoursThisMonthState: Dispatch<SetStateAction<number>>;
  setWeightsThisMonthState: Dispatch<SetStateAction<number>>;
  setWorkoutsThisMonthState: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      className="absolute top-6 right-3 cursor-pointer hover:border border-black rounded-xl hover:bg-gray-400 transition-colors"
      onClick={() => {
        setSessionsInfo((prev) => {
          // Find the deleted session
          const sessionToDelete = prev.find((s) => s.session_id === session_id);

          // If we find the deleted session and session affects our stats, then set our stats
          if (
            sessionToDelete &&
            new Date(sessionToDelete?.session_start_date).getMonth() ===
              new Date().getMonth()
          ) {
            // If our deleted session has an end date
            if (sessionToDelete.session_end_date) {

              const start = new Date(
                sessionToDelete.session_start_date
              ).getTime();

              const end = new Date(sessionToDelete.session_end_date).getTime();
              
              const durationInHours =
                Math.round(((end - start) / (1000 * 60 * 60)) * 100) / 100;
              setHoursThisMonthState(
                (prevHours) => prevHours - durationInHours
              );
            }

            setWeightsThisMonthState(
              (prevWeight) => prevWeight - sessionToDelete.session_weight_lifted
            );

            setWorkoutsThisMonthState((prevCount) => prevCount - 1);
          }

          return prev.filter((session) => session.session_id !== session_id);
        });

        handleDropDown(session_id);
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
  );
}
