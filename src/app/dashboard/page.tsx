"use server";
import getUser from "../actions/getUser";
import { fetchWeightLifted } from "../actions/user/getUserWeightLifted";
import { fetchTrainingTime } from "../actions/user/getUserTrainingTime";
import { fetchSessions } from "../actions/user/getUserSessions";
import { WorkOutBtn } from "@/components/ui/workoutBtn";
import { createWorkoutAction } from "../actions/sessions/createWorkout";
import { Summary } from "@/components/ui/summary";
import { LoggedInHeader } from "@/components/ui/loggedInHeader";
import AllWorkouts from "@/components/ui/allWorkouts";

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
            <AllWorkouts sessions={sessions}></AllWorkouts>
          </div>
        </div>
      </div>
    </>
  );
}
