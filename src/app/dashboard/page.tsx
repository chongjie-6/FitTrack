"use client";
import React, { useEffect, useState } from "react";
import { Session } from "@/utils/types/types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Array<Session>>();
  const [workoutsThisMonth, setWorkoutsThisMonth] = useState<null | number>();
  const [weightsThisMonth, setWeightsThisMonth] = useState<null | number>();
  const [workoutsThisYear, setWorkoutsThisYear] = useState<null | number>();
  const [user, setUser] = useState<User | null>();
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
    const fetchWorkoutsThisYear = async () => {
      try {
        const response = await fetch("/api/workouts/workouts_this_year", {
          method: "GET",
          credentials: "include",
        });
        const workouts = await response.json();

        if (!response.ok) {
          throw new Error("Could not fetch your workouts for this year.");
        }
        setWorkoutsThisYear(workouts.data);
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
        console.log(workouts.data);
        const totalWeight = workouts.data.reduce(
          (
            sum: number,
            item: {
              set_weight: number;
              sessions: { session_start_date: string };
            }
          ) => sum + item.set_weight,
          0
        );
        setWeightsThisMonth(totalWeight);
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    fetchWorkouts();
    fetchWorkoutsThisMonth();
    fetchWorkoutsThisYear();
    fetchWeightsLifted();
  }, []);
  return (
    <div className="flex flex-col mt-20 items-center">
      <section className="items-start flex-col mb-10 space-y-2 w-xs sm:w-xl">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="inline-flex justify-between items-center w-full text-gray-300 text-sm">
          <h1 className="block sm:hidden">
            Welcome Back {user && user.user_metadata.first_name}!
          </h1>
          <h1 className="hidden sm:block w-2xs">
            Welcome Back {user && user.user_metadata.first_name}! Ready to start
            another workout?
          </h1>
          <button className="p-3 bg-gray-500 rounded-2xl hover:bg-gray-700">
            Start Workout
          </button>
        </div>
        <div className="grid grid-cols-3 text-sm sm:text-md gap-x-1 sm:gap-x-5">
          <div className="border-2 p-5 rounded-3xl">
            <h2 className="font-medium">Workouts</h2>
            <h3>
              <span className="text-2xl sm:text-4xl font-bold pr-2">
                {workoutsThisMonth}
              </span>
              This Month
            </h3>
          </div>
          <div className="border-2 p-5 rounded-3xl">
            <h2 className="font-medium">Workouts</h2>
            <h3>
              <span className="text-2xl sm:text-4xl font-bold pr-2">
                {workoutsThisYear}
              </span>
              This Year
            </h3>
          </div>
          <div className="border-2 p-5 rounded-3xl">
            <h2 className="font-medium">Weight</h2>
            <h3>
              <span className="text-2xl sm:text-4xl font-bold pr-2">
                {weightsThisMonth}
              </span>
              Kgs Lifted
            </h3>
          </div>
        </div>
      </section>

      <section>
        <div className="space-y-3 w-xs sm:w-xl">
          <h1 className="text-3xl font-semibold">Workouts</h1>
          {sessions
            ? sessions.map((sessions) => {
                return (
                  <div
                    key={sessions.session_id}
                    className="p-4 border rounded bg-gray-200 shadow-sm text-black "
                  >
                    <div className="inline-flex justify-between font-medium w-full">
                      <h2>{sessions.session_name}</h2>
                      <h2>
                        {sessions.session_start_date
                          ? (new Date(sessions.session_end_date).getTime() -
                              new Date(sessions.session_start_date).getTime()) /
                              60000 +
                            " mins"
                          : ""}
                      </h2>
                    </div>

                    <h3 className="text-gray-700 font-medium text-sm w-2xs">
                      {new Date(sessions.session_end_date).toDateString()}
                    </h3>
                  </div>
                );
              })
            : ""}
        </div>
      </section>
    </div>
  );
}
