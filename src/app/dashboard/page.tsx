"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Tables } from "../../../database.types";
import { Summary } from "@/components/ui/summary";
import { AllSessionInfo } from "@/components/ui/all_session_info";

export default function Dashboard() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Array<Tables<"sessions">>>();
  const [workoutsThisMonth, setWorkoutsThisMonth] = useState<null | number>();
  const [weightsThisMonth, setWeightsThisMonth] = useState<null | number>();
  const [hoursThisMonth, setHoursThisMonth] = useState<null | number>();
  const [user, setUser] = useState<User | null>();
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [isExerciseLoading, setIsExerciseLoading] = useState(true);
  const [, setCreateError] = useState("");
  useEffect(() => {
    const userValidation = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
          router.push("/login");
        }
        setUser(data.user);
      } catch (e) {
        console.log(e);
      }
    };
    userValidation();
  }, [router]);

  // fetch all sessions
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts", {
          method: "GET",
          credentials: "include",
        });
        const workouts = await response.json();

        if (!response.ok) {
          throw new Error(
            "Could not fetch your workouts, Please try again later."
          );
        }
        setSessions(workouts.data);
        setIsExerciseLoading(false);
      } catch (e) {
        console.log("Error: ", e);
      }
    };
    fetchWorkouts();
  }, []);

  // fetch minutes this month
  useEffect(() => {
    const fetchMinutesThisMonth = async () => {
      try {
        const response = await fetch("/api/workouts/minutes_this_month", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        const workouts = data.data;

        if (!response.ok) {
          throw new Error("Could not fetch your minutes for this month.");
        }

        // for each workout this month calculate the duration
        const total = workouts.reduce(
          (
            sum: number,
            workout: { session_start_date: string; session_end_date: string }
          ) => {
            if (workout.session_end_date) {
              return (
                sum +
                (new Date(workout.session_end_date).getTime() -
                  new Date(workout.session_start_date).getTime()) /
                  60000
              );
            } else {
              return sum;
            }
          },
          0
        );
        setHoursThisMonth(Math.round((total / 60) * 100) / 100);
        setWorkoutsThisMonth(workouts.length);
      } catch (e) {
        console.log("Error: ", e);
      }
    };
    fetchMinutesThisMonth();
  }, []);

  // fetch weights lifted this month
  useEffect(() => {
    const fetchWeightsLifted = async () => {
      try {
        const response = await fetch("/api/workouts/weight_lifted_this_month", {
          method: "GET",
          credentials: "include",
        });
        const workouts = await response.json();

        if (!response.ok) {
          throw new Error("Could not fetch your workouts weights this month.");
        }

        const session_sets = workouts.data;
        let totalWeight = 0;
        // Loop through each session and sum up the weights
        session_sets.forEach(
          (session: {
            session_sets: { set_weight: number; set_reps: number }[];
          }) => {
            session.session_sets.forEach((set) => {
              totalWeight += set.set_weight * set.set_reps || 0;
            });
          }
        );
        setWeightsThisMonth(totalWeight);
        setIsSummaryLoading(false);
      } catch (e) {
        console.log("Error: ", e);
      }
    };
    fetchWeightsLifted();
  }, []);

  const createWorkout = async () => {
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        setCreateError(
          "Could not create your workout. Please try again later."
        );
      }
      const data = await response.json();
      // Successfully created workout, navigate to newly created workout
      router.push(`/workouts/${data.data}`);
    } catch (e) {
      console.log(e);
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
            onClick={createWorkout}
            className="p-3 bg-gray-500 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            Start Workout
          </button>
        </div>

        {isSummaryLoading ? (
          <div className="summary_layout">
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <Skeleton className="h-[100px] w-full rounded-xl" />
          </div>
        ) : (
          <Summary
            workoutsThisMonth={workoutsThisMonth}
            hoursThisMonth={hoursThisMonth}
            weightsThisMonth={weightsThisMonth}
          />
        )}
      </section>

      <section>
        <h1 className="text-3xl font-semibold mb-4">Workouts</h1>
        <div className="space-y-3">
          {isExerciseLoading && (
            <div className="space-y-5">
              <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
              <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
              <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
            </div>
          )}

          {sessions && <AllSessionInfo sessions={sessions} />}
          {!isExerciseLoading &&
            sessions &&
            sessions?.length <= 0 &&
            "You have no workouts."}
        </div>
      </section>
    </div>
  );
}
