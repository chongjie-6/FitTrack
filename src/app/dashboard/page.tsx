"use server";
import getUser from "../actions/getUser";
import { Header } from "@/components/ui/header";
import { fetchWeightLifted } from "../actions/user/getUserWeightLifted";
import { fetchTrainingTime } from "../actions/user/getUserTrainingTime";
import { fetchSessions } from "../actions/user/getUserSessions";
import { WorkOutBtn } from "@/components/ui/workoutBtn";
import { createWorkoutAction } from "../actions/sessions/createWorkout";
import { Summary } from "@/components/ui/summary";
import { AllSessionInfo } from "@/components/ui/all_session_info";

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
      <Header />
      <div className="mt-17 p-5 sm:p-10 flex flex-col justify-center max-w-3xl mx-auto">
        <section className="w-full mb-8">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex justify-between items-center text-gray-300 text-sm">
            <h2 className="text-sm">
              Welcome Back {user && user.user_metadata.first_name}! Here&apos;s
              your monthly summary!
            </h2>
            <WorkOutBtn onWorkoutCreateClick={createWorkoutAction} />
          </div>

          <Summary
            workoutsThisMonth={workoutsThisMonth}
            hoursThisMonth={hoursThisMonth}
            weightsThisMonth={weightsThisMonth}
          />
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Workouts</h2>
          <div className="space-y-3">
            {sessions && <AllSessionInfo sessions={sessions} />}
            {sessions && sessions?.length <= 0 && "You have no workouts."}
          </div>
        </section>
      </div>
    </>
  );
}
