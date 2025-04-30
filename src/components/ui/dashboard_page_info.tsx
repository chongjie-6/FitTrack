"use client";
import { User } from "@supabase/supabase-js";
import { AllSessionInfo } from "./all_session_info";
import { Summary } from "./summary";
import { Tables } from "../../../database.types";
import { createWorkoutAction } from "@/app/actions/sessions/createWorkout";
import { WorkOutBtn } from "./workoutBtn";
import { useState } from "react";
import { deleteWorkoutAction } from "@/app/actions/sessions/deleteWorkout";

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
  const [sessionInfo, setSessionsInfo] = useState(sessions);
  const [hoursThisMonthState, setHoursThisMonthState] =
    useState(hoursThisMonth);
  const [weightsThisMonthState, setWeightsThisMonthState] =
    useState(weightsThisMonth);
  const [workoutsThisMonthState, setWorkoutsThisMonthState] =
    useState(workoutsThisMonth);

  const handleSessionInfoChange = (session_id: string) => {
    // Find the deleted session
    const sessionToDelete = sessionInfo.find(
      (s) => s.session_id === session_id
    );

    if (!sessionToDelete) {
      return;
    }

    // If we find the deleted session and session affects our stats, then set our stats
    const deletedSessionStartDate = new Date(
      sessionToDelete?.session_start_date
    );
    const currentDate = new Date();
    if (
      deletedSessionStartDate.getMonth() === currentDate.getMonth() &&
      deletedSessionStartDate.getFullYear() === currentDate.getFullYear()
    ) {
      // If our deleted session has an end date
      if (sessionToDelete.session_end_date) {
        const start = new Date(sessionToDelete.session_start_date).getTime();

        const end = new Date(sessionToDelete.session_end_date).getTime();

        const durationInHours = (end - start) / (1000 * 60);

        setHoursThisMonthState((prevHours) => prevHours - durationInHours);
      }

      setWeightsThisMonthState(
        (prevWeight) => prevWeight - sessionToDelete.session_weight_lifted
      );

      setWorkoutsThisMonthState((prevCount) => prevCount - 1);
    }

    setSessionsInfo((prev) =>
      prev.filter((session) => session.session_id !== session_id)
    );

    deleteWorkoutAction(session_id);
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
          {sessionInfo && (
            <AllSessionInfo
              sessions={sessionInfo}
              handleSessionInfoChange={handleSessionInfoChange}
            />
          )}
          {sessionInfo && sessionInfo?.length <= 0 && "You have no workouts."}
        </div>
      </section>
    </div>
  );
}
