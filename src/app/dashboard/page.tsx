import React from "react";
export default function Dashboard() {
  // random data for now, we will update with actual database entries
  const workouts = [
    {
      id: 1,
      name: "Push Workout",
      description: "This is my Push workout",
      date: new Date().toLocaleDateString(),
      exercises: {},
    },
    {
      id: 2,
      name: "Pull Workout",
      description: "This is my Pull workout",
      date: new Date().toLocaleDateString(),
      exercises: {},
    },
    {
      id: 3,
      name: "Leg Workout",
      description: "This is my Leg workout",
      date: new Date().toLocaleDateString(),
      exercises: {},
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="space-y-2">
        {workouts.map((workout) => {
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
        })}
      </div>
    </div>
  );
}
