"use client";
import { User } from "@supabase/supabase-js";
import { AllSessionInfo } from "./all_session_info";
import { Summary } from "./summary";
import { Tables } from "../../../database.types";
import { useState } from "react";
import { createWorkoutAction } from "@/app/dashboard/page";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  createWorkoutAction: () => void;
  initialWorkoutsThisMonth: number;
  initialHoursThisMonth: number;
  initialWeightsThisMonth: number | undefined;
  user: User;
  initialSessions: Array<Tables<"sessions">>;
}

export default function DashboardPage({
  initialWorkoutsThisMonth,
  initialHoursThisMonth,
  initialWeightsThisMonth,
  user,
  initialSessions,
}: DashboardPageProps) {
  const [sessions, setAllSessions] =
    useState<Array<Tables<"sessions">>>(initialSessions);
  const [workoutsThisMonth, setWorkoutsThisMonth] = useState<
    null | number | undefined
  >(initialWorkoutsThisMonth);
  const [weightsThisMonth, setWeightsThisMonth] = useState<
    null | number | undefined
  >(initialWeightsThisMonth);
  const [hoursThisMonth, setHoursThisMonth] = useState<
    null | number | undefined
  >(initialHoursThisMonth);
  let loading = false;
  const onWorkoutCreateClick = async () => {
    if (!loading) {
      loading = true;
      const path = await createWorkoutAction();
      if (path) {
        redirect(path);
      }
    }
  };
  return (
    <div className="p-5 sm:p-10 flex flex-col justify-center max-w-3xl mx-auto">
      <section className="w-full mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex justify-between items-center text-gray-300 text-sm">
          <h1 className="text-sm">
            Welcome Back {user && user.user_metadata.first_name}! Here&apos;s
            your monthly summary!
          </h1>
          <button
            onClick={onWorkoutCreateClick}
            disabled={loading}
            className="p-3 bg-gray-500 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            Start Workout
          </button>
        </div>

        <Summary
          workoutsThisMonth={workoutsThisMonth}
          hoursThisMonth={hoursThisMonth}
          weightsThisMonth={weightsThisMonth}
        />
      </section>

      <section>
        <h1 className="text-3xl font-semibold mb-4">Workouts</h1>
        <div className="space-y-3">
          {sessions && (
            <AllSessionInfo
              sessions={sessions}
              setWeightsThisMonth={setWeightsThisMonth}
              setWorkoutsThisMonth={setWorkoutsThisMonth}
              setHoursThisMonth={setHoursThisMonth}
              setSessionInfo={setAllSessions}
            />
          )}
          {sessions && sessions?.length <= 0 && "You have no workouts."}
        </div>
      </section>
    </div>
  );
}
