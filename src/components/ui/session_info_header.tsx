import React from "react";
import { Tables } from "../../../database.types";
import Link from "next/link";
export function SessionInfoHeader({
  sessionInfo,
  modifySession,
}: {
  sessionInfo: Tables<"sessions"> | undefined;
  modifySession: (args: { value: string; field: string }) => void;
}) {
  const onChange = (
    field: string,
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (field === "session_end_date") {
      modifySession({
        value: new Date().toISOString(),
        field,
      });
    } else {
      modifySession({
        value: e?.target.value || "",
        field,
      });
    }
  };
  return (
    <>
      <Link
        href={"/dashboard"}
        prefetch={true}
        className="text-blue-500 hover:text-blue-400 font-bold hidden sm:block"
      >
        &lt; Back to Dashboard
      </Link>
      {sessionInfo && (
        <>
          <input
            defaultValue={sessionInfo?.session_name}
            onChange={(e) => onChange("session_name", e)}
            placeholder="Name"
            className="text-2xl font-bold input_field mt-5"
          ></input>
          <textarea
            placeholder="Notes"
            onChange={(e) => onChange("session_notes", e)}
            defaultValue={sessionInfo?.session_notes || ""}
            className="text-gray-300 italic my-2 input_field max-h-36 field-sizing-content"
          ></textarea>
        </>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-400 mb-5">
        {sessionInfo && (
          <>
            <div className="flex items-center mb-2 sm:mb-0">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                Start Time:{" "}
                {new Date(sessionInfo.session_start_date).toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </span>
            </div>
            {sessionInfo.session_end_date ? (
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  End Time:{" "}
                  {new Date(sessionInfo.session_end_date).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </span>
              </div>
            ) : (
              <button
                className="btn rounded-xl border-2 ring p-1"
                onClick={() => onChange("session_end_date")}
              >
                End Workout
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
