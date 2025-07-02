import { createWorkoutAction } from "@/app/actions/sessions/createWorkout";
import { Tables } from "../../../database.types";
import { AllSessionInfo } from "./all_session_info";
import { WorkOutBtn } from "./workoutBtn";

export default function AllWorkouts({
  sessions,
}: {
  sessions: Array<Tables<"sessions">>;
}) {
  const totalSessions = sessions?.length || 0;
  const hasWorkouts = sessions && sessions.length > 0;
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">Recent Workouts</h2>
        {hasWorkouts && (
          <div className="text-sm text-slate-400">
            {totalSessions} workout{totalSessions !== 1 ? "s" : ""} total
          </div>
        )}
      </div>

      {hasWorkouts ? (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 space-y-2">
          <AllSessionInfo sessions={sessions} />
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-700/50 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Your Fitness Journey!
            </h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              You haven&apos;t logged any workouts yet. Ready to begin your
              transformation?
            </p>
            <WorkOutBtn onWorkoutCreateClick={createWorkoutAction} />
          </div>
        </div>
      )}
    </section>
  );
}
