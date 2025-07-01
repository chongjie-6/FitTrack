"use server";
import getUser from "../actions/getUser";
import { fetchWeightLifted } from "../actions/user/getUserWeightLifted";
import { fetchTrainingTime } from "../actions/user/getUserTrainingTime";
import { fetchSessions } from "../actions/user/getUserSessions";
import { WorkOutBtn } from "@/components/ui/workoutBtn";
import { createWorkoutAction } from "../actions/sessions/createWorkout";
import { Summary } from "@/components/ui/summary";
import { AllSessionInfo } from "@/components/ui/all_session_info";
import { LoggedInHeader } from "@/components/ui/logged_in_header";

export default async function Dashboard() {
  // Verify user
  const user = await getUser();

  // Get all sessions and monthly summaries
  const sessions = await fetchSessions();
  const timeAndWorkoutsThisMonthData = fetchTrainingTime(sessions || []);
  const weightsThisMonthData = fetchWeightLifted();
  const [weightsThisMonth, timeAndWorkoutsThisMonth] = await Promise.all([
    weightsThisMonthData,
    timeAndWorkoutsThisMonthData,
  ]);
  const { hoursThisMonth, workoutsThisMonth } = timeAndWorkoutsThisMonth;

  const totalSessions = sessions?.length || 0;
  const hasWorkouts = sessions && sessions.length > 0;

  return (
    <>
      <LoggedInHeader user={user} />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="relative pt-20 pb-12 px-5 sm:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-12 ">
                  Welcome Back, {user?.user_metadata?.first_name || "Champion"}!
                </h1>
                <p className="text-xl text-slate-300 mb-8">
                  Ready to crush your fitness goals today?
                </p>
                <div className="flex justify-center">
                  <WorkOutBtn onWorkoutCreateClick={createWorkoutAction} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-5 sm:px-10 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Monthly Summary Cards */}
            <section className="my-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                  This Month&apos;s Progress
                </h2>
                <div className="text-sm text-slate-400">
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              <Summary
                workoutsThisMonth={workoutsThisMonth}
                hoursThisMonth={hoursThisMonth}
                weightsThisMonth={weightsThisMonth}
              />
            </section>

            {/* Workouts Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Recent Workouts
                </h2>
                {hasWorkouts && (
                  <div className="text-sm text-slate-400">
                    {totalSessions} workout{totalSessions !== 1 ? "s" : ""}{" "}
                    total
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
                      You haven&apos;t logged any workouts yet. Ready to begin
                      your transformation?
                    </p>
                    <WorkOutBtn onWorkoutCreateClick={createWorkoutAction} />
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
