"use client";
import React, { useEffect, useState } from "react";
export default function Dashboard() {
  const [data, setData] = useState();
  // fetch workouts
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
        setData(workouts);
      } catch (e) {
        console.log("Error: ", e);
      }
    };
    fetchWorkouts();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="space-y-2">
        {/* {data.map((workout) => {
          return (
            <div
              key={workout.id}
              className="p-3 border rounded bg-gray-200 shadow-sm text-black w-xs sm:w-md"
            >
              <div className="inline-flex justify-between font-medium w-full">
                <h2>{workout.name}</h2>
                <h2>{workout.date}</h2>
              </div>

              <h3 className="text-gray-700 font-light">
                {workout.description}
              </h3>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
