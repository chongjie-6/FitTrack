"use client";
import { Session, SessionInfo, SessionSet } from "@/utils/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SessionPage() {
  const { session_id } = useParams();
  const [sessionInfo, setSessionInfo] = useState<Session & SessionInfo>();
  useEffect(() => {
    const fetchWorkoutSession = async () => {
      const response = await fetch(`/api/workouts/${session_id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data.data[0]);
      setSessionInfo(data.data[0]);
    };
    fetchWorkoutSession();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center ">
      <section>
        <h1 className="workout_page_labels">{sessionInfo?.session_name}</h1>
        <h2 className="workout_page_labels">{sessionInfo?.session_notes}</h2>
        <h2 className="workout_page_labels">
          {sessionInfo &&
            new Date(sessionInfo.session_end_date).toLocaleString()}
        </h2>
        <h2 className="workout_page_labels">
          {sessionInfo &&
            new Date(sessionInfo.session_start_date).toLocaleString()}
        </h2>
      </section>
      <section>
        {sessionInfo &&
          sessionInfo.session_exercises.map((exercise) => {
            return (
              // Map over all of our exercises for this sessions
              <div key={exercise.exercise_id} className="flex flex-col workout_page_labels">
                <h3>{exercise.exercises.exercise_name}</h3>
                <h3>{exercise.exercises.exercise_description}</h3>
                {exercise.session_sets.map((set) => {
                  // For each exercise, map over all of our sets
                  return (
                    <div className="inline-flex" key={set.set_id}>
                      <h4>{set.set_number}</h4>
                      <h4>{set.set_weight} kg</h4>
                      <h4> X {set.set_reps}</h4>
                      <h4> X {set.set_rest_time}</h4>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </section>
    </div>
  );
}
