"use client";
import { createClient } from "@/utils/supabase/client";
import { Session, SessionInfo } from "@/utils/types/types";
import { User } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SessionPage() {
  const router = useRouter();
  const [, setUser] = useState<User | null>();
  const { session_id } = useParams();
  const [sessionInfo, setSessionInfo] = useState<Session & SessionInfo>();

  // Use effect to validate user
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

  // Use Effect to fetch workout session corresponding to session_id
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
  }, [session_id]);
  return (
    <div className="mt-20 w-full mx-auto max-w-xl p-5 sm:p-10">
      <section className="w-full">
        <h1
          className={`workout_page_labels ${
            sessionInfo ? "text-white" : "text-gray-500"
          }`}
        >
          {sessionInfo ? sessionInfo.session_name : "Name"}
        </h1>
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
      <section className="w-full">
        {sessionInfo &&
          sessionInfo.session_exercises.map((exercise) => {
            return (
              // Map over all of our exercises for this sessions
              <div
                key={exercise.exercise_id}
                className="flex flex-col workout_page_labels"
              >
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
