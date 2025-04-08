"use client";
import React, { useEffect, useState } from "react";
import { Session } from "@/utils/types/types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Skeleton from "@/components/ui/skeleton";

export default function Dashboard() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Array<Session>>();
  const [workoutsThisMonth, setWorkoutsThisMonth] = useState<null | number>();
  const [weightsThisMonth, setWeightsThisMonth] = useState<null | number>();
  const [hoursThisMonth, setHoursThisMonth] = useState<null | number>();
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  const determineWorkoutTime = (hour: number) => {
    if (hour < 12) {
      return "Morning Workout";
    } else if (hour < 4) {
      return "Midday Workout";
    } else {
      return "Night Workout";
    }
  };
  const handleCardClick = (session_id: string) => {
    router.push(`/workouts/${session_id}`);
  };
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
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    const fetchWorkoutsThisMonth = async () => {
      try {
        const response = await fetch("/api/workouts/workouts_this_month", {
          method: "GET",
          credentials: "include",
        });
        const workouts = await response.json();

        if (!response.ok) {
          throw new Error("Could not fetch your workouts for this month.");
        }
        setWorkoutsThisMonth(workouts.data);
      } catch (e) {
        console.log("Error: ", e);
      }
    };
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
            return (
              sum +
              (new Date(workout.session_end_date).getTime() -
                new Date(workout.session_start_date).getTime()) /
                60000
            );
          },
          0
        );
        setHoursThisMonth(total / 60);
      } catch (e) {
        console.log("Error: ", e);
      }
    };

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
          (session: { session_sets: { set_weight: number }[] }) => {
            session.session_sets.forEach((set) => {
              totalWeight += set.set_weight || 0;
            });
          }
        );

        setWeightsThisMonth(totalWeight);
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    fetchWorkouts();
    fetchWorkoutsThisMonth();
    fetchMinutesThisMonth();
    fetchWeightsLifted();
    setIsLoading(false);
  }, []);
  return (
    <div className="p-5 sm:p-10 flex flex-col justify-center w-full max-w-3xl mx-auto">
      <section className="w-full mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex justify-between items-center text-gray-300 text-sm w-full">
          <h1 className="text-sm">
            Welcome Back {user && user.user_metadata.first_name}! Here&apos;s
            your monthly summary!
          </h1>
          <button className="p-3 bg-gray-500 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
            Start Workout
          </button>
        </div>
        <div className="summary_layout">
          <div className="summary_box">
            <h2 className="font-medium">Workouts</h2>
            <div>
              <span className="summary_main_text">{workoutsThisMonth}</span>
              <span>This Month</span>
            </div>
          </div>
          <div className="summary_box">
            <h2 className="font-medium">Training Time</h2>
            <div>
              <span className="summary_main_text">{hoursThisMonth}h</span>
              <span>This Month</span>
            </div>
          </div>
          <div className="summary_box">
            <h2 className="font-medium">Weight</h2>
            <div>
              <span className="summary_main_text">{weightsThisMonth}</span>
              <span>Kgs Lifted</span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <h1 className="text-3xl font-semibold mb-4">Workouts</h1>
        <div className="space-y-3">
          {sessions && !isLoading ? (
            sessions.map((session) => (
              <div
                key={session.session_id}
                className="border rounded-lg bg-gray-200 shadow-sm text-black cursor-pointer p-3 hover:bg-gray-300 transition-colors duration-200"
                onClick={() => handleCardClick(session.session_id)}
              >
                <div className="flex justify-between font-medium w-full">
                  <h2>
                    {session.session_name === ""
                      ? determineWorkoutTime(
                          new Date(session.session_start_date).getHours()
                        )
                      : session.session_name}
                  </h2>
                  <h2>
                    {session.session_end_date
                      ? (new Date(session.session_end_date).getTime() -
                          new Date(session.session_start_date).getTime()) /
                          60000 +
                        " min"
                      : ""}
                  </h2>
                </div>
                <h3 className="text-gray-700 font-medium">
                  {new Date(session.session_end_date).toDateString()}
                </h3>
              </div>
            ))
          ) : (
            <div className="space-y-3">
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
