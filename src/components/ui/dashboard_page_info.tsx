"use client";
import { User } from "@supabase/supabase-js";
import { AllSessionInfo } from "./all_session_info";
import { Summary } from "./summary";
import { Tables } from "../../../database.types";
import { createWorkoutAction } from "@/app/actions/sessions/createWorkout";
import { WorkOutBtn } from "./workoutBtn";
import { useState } from "react";

interface DashboardPageProps {
  workoutsThisMonth: number;
  hoursThisMonth: number;
  weightsThisMonth: number;
  user: User;
  sessions: Array<Tables<"sessions">>;
}

export default function DashboardPage({
  sessions,
  hoursThisMonth,
  weightsThisMonth,
  user,
  workoutsThisMonth,
}: DashboardPageProps) {
  const [hoursThisMonthState, setHoursThisMonthState] =
    useState(hoursThisMonth);
  const [weightsThisMonthState, setWeightsThisMonthState] =
    useState(weightsThisMonth);
  const [workoutsThisMonthState, setWorkoutsThisMonthState] =
    useState(workoutsThisMonth);
  return (
    <div className="p-5 sm:p-10 flex flex-col justify-center max-w-3xl mx-auto">
      <section className="w-full mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex justify-between items-center text-gray-300 text-sm">
          <h1 className="text-sm">
            Welcome Back {user && user.user_metadata.first_name}! Here&apos;s
            your monthly summary!
          </h1>
          <WorkOutBtn onWorkoutCreateClick={createWorkoutAction} />
        </div>

        <Summary
          workoutsThisMonth={workoutsThisMonthState}
          hoursThisMonth={hoursThisMonthState}
          weightsThisMonth={weightsThisMonthState}
        />
      </section>

      <section>
        <h1 className="text-3xl font-semibold mb-4">Workouts</h1>
        <div className="space-y-3">
          {sessions && (
            <AllSessionInfo
              sessions={sessions}
              setHoursThisMonthState={setHoursThisMonthState}
              setWeightsThisMonthState={setWeightsThisMonthState}
              setWorkoutsThisMonthState={setWorkoutsThisMonthState}
            />
          )}
          {sessions && sessions?.length <= 0 && "You have no workouts."}
        </div>
      </section>
    </div>
  );
}
