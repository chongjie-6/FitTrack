"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { Session, SessionInfo } from "@/utils/types/types";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SessionPage() {
  const router = useRouter();
  const [, setUser] = useState<User | null>();
  const { session_id } = useParams();
  const [sessionInfo, setSessionInfo] = useState<Session & SessionInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);

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

  useEffect(() => {
    // Use Effect to fetch workout session corresponding to session_id
    const fetchWorkoutSession = async () => {
      try {
        const response = await fetch(`/api/workouts/${session_id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setSessionInfo(data.data);
        console.log(data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchWorkoutSession();
  }, [session_id]);

  const addSet = async (session_exercise_id: string, set_number: number) => {
    try {
      console.log(session_exercise_id);
      console.log(set_number);
      const response = await fetch(
        `/api/workouts/${session_id}/${session_exercise_id}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ set_number: set_number }),
        }
      );
      if (!response.ok) {
        console.log(response.json());
      }
      const data = await response.json();
      const updatedSet = data.data;

      if (sessionInfo) {
        setSessionInfo({
          ...sessionInfo,
          session_exercises: sessionInfo?.session_exercises.map((exercise) => {
            if (
              exercise.session_exercise_id === updatedSet.session_exercise_id
            ) {
              return {
                ...exercise,
                session_sets: [...exercise.session_sets, updatedSet],
              };
            }
            return exercise;
          }),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addExercise = () => {
    setIsModal(true);
    console.log("execute");
  };

  return (
    <div className="sm:mt-20 w-full mx-auto max-w-3xl p-5 sm:p-10 bg-gray-900 rounded-lg shadow-lg">
      <section className="w-full mb-8 border-b pb-4">
        <Link
          href={"/dashboard"}
          prefetch={true}
          className="text-blue-500 hover:text-blue-400 font-bold hidden sm:block"
        >
          &lt; Back to Dashboard
        </Link>
        <h1
          className={`text-2xl font-bold my-2 ${
            sessionInfo ? "text-white" : "text-gray-500"
          }`}
        >
          {sessionInfo ? sessionInfo.session_name : "Workout Session"}
        </h1>

        {sessionInfo?.session_notes && (
          <p className="text-gray-300 italic mb-4">
            {sessionInfo.session_notes}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-400">
          {sessionInfo && (
            <>
              <div className="flex items-center mb-2 sm:mb-0">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  Start Time:{" "}
                  {new Date(sessionInfo.session_start_date).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </span>
              </div>
              {sessionInfo.session_end_date && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    End Time:{" "}
                    {new Date(sessionInfo.session_end_date).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="w-full">
        {sessionInfo && !isLoading ? (
          sessionInfo.session_exercises.map((exercise) => (
            <div
              key={exercise.exercise_id}
              className="mb-6 bg-gray-800 rounded-lg p-4 shadow"
            >
              <div className="border-b border-gray-700 pb-2 mb-3">
                <h3 className="text-xl font-medium text-white">
                  {exercise.exercises.exercise_name}
                </h3>
                {exercise.exercises.exercise_description && (
                  <p className="text-gray-400 text-sm mt-1">
                    {exercise.exercises.exercise_description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 text-gray-500 text-sm font-medium mb-2 px-2">
                <span>Set</span>
                <span>Weight</span>
                <span>Reps</span>
                <span>Rest</span>
              </div>

              <div className="space-y-2">
                {exercise.session_sets.map((set) => (
                  <div
                    className="grid grid-cols-4 bg-gray-700 bg-opacity-30 p-2 rounded text-white"
                    key={set.set_id}
                  >
                    <span className="font-mono">{set.set_number}</span>
                    <span className="font-mono">{set.set_weight}</span>
                    <span className="font-mono">{set.set_reps}</span>
                    <span className="font-mono">{set.set_rest_time}s</span>
                  </div>
                ))}
              </div>
              <button
                className="btn"
                onClick={() =>
                  addSet(
                    exercise.session_exercise_id,
                    exercise.session_sets.length + 1
                  )
                }
              >
                Add Set
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 space-y-5">
            <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
            <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
            <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
            <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
            <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
            <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
            <Skeleton className="h-[75px] w-full rounded-xl"></Skeleton>
          </div>
        )}
        <button
          className="mb-6 bg-gray-800 rounded-lg shadow btn p-3 mt-1 w-full text-start"
          onClick={addExercise}
        >
          Add Exercise
        </button>
        {isModal && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </section>
    </div>
  );
}
