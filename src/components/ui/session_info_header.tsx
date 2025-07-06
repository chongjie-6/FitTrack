import { Tables } from "../../../database.types";
import Link from "next/link";
import EndWorkoutBtn from "./end_workout_btn";
import SessionNameInput from "./session_name_input";
import SessionDescriptionInput from "./session_description_input";
import DuplicateWorkoutButton from "./duplicateWorkoutButton";
export function SessionInfoHeader({
  sessionInfo,
}: {
  sessionInfo: Tables<"sessions">;
}) {
  return (
    <>
      <div className="flex flex-row justify-between">
        <Link
          href={"/dashboard"}
          prefetch={true}
          className="text-blue-500 hover:text-blue-400 font-bold hidden sm:block w-fit"
        >
          &lt; Back to Dashboard
        </Link>
        <DuplicateWorkoutButton sessionId={sessionInfo.session_id} />
      </div>
      {sessionInfo && (
        <>
          <SessionNameInput
            session_name={sessionInfo.session_name || ""}
            session_id={sessionInfo.session_id}
          />
          <SessionDescriptionInput
            session_notes={sessionInfo.session_notes || ""}
            session_id={sessionInfo.session_id}
          />
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
              <EndWorkoutBtn
                session_id={sessionInfo.session_id}
              ></EndWorkoutBtn>
            )}
          </>
        )}
      </div>
    </>
  );
}
