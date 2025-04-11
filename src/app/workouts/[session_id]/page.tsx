"use client";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Tables } from "../../../../database.types";
import SessionCard from "@/components/ui/session_card";

export default function SessionPage() {
  const router = useRouter();
  const [, setUser] = useState<User | null>();
  const { session_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [allExercises, setAllExercises] = useState([]);
  const [newSessionExercise, setNewSessionExercise] = useState("");
  const modalRef = useRef<HTMLDialogElement>(null);
  const prevExercisesLengthRef = useRef<null | number>(null);

  // Store the session info in a variable
  const [sessionInfo, setSessionInfo] = useState<Tables<"sessions">>();

  // Store the exercises performed in this session
  // For each of these exercises performed, join all the corresponding sets
  const [sessionExercises, setSessionExercises] = useState<
    Array<
      Tables<"session_exercises"> & {
        exercises: Tables<"exercises">;
        session_sets: Array<Tables<"session_sets">>;
      }
    >
  >();

  // UseEffect to scroll to the newly created exercise when it detects a change in the number of exercises
  useEffect(() => {
    if (
      prevExercisesLengthRef.current &&
      sessionExercises &&
      sessionExercises.length > prevExercisesLengthRef.current
    ) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }

    // Update the ref with current length for next comparison
    prevExercisesLengthRef.current = sessionExercises?.length || null;
  }, [sessionExercises]);

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
      } catch (e) {
        console.log(e);
      }
    };
    fetchWorkoutSession();
  }, [session_id]);

  useEffect(() => {
    // Use Effect to fetch all the exercises
    const fetchAllExercise = async () => {
      try {
        const response = await fetch("/api/exercises", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setAllExercises(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllExercise();
  }, []);

  useEffect(() => {
    // Use Effect to fetch all the exercises and their corresponding sets for this session
    const fetchAllExercise = async () => {
      try {
        const response = await fetch(
          `/api/workouts/${session_id}/session_exercises`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setSessionExercises(data.data);
        console.log(data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllExercise();
  }, [session_id]);

  const addSet = async (session_exercise_id: string, set_number: number) => {
    try {
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

      if (sessionExercises) {
        setSessionExercises(
          sessionExercises.map((exercise) => {
            if (
              exercise.session_exercise_id === updatedSet.session_exercise_id
            ) {
              return {
                ...exercise,
                session_sets: [...exercise.session_sets, updatedSet],
              };
            }
            return exercise;
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleModalOpen = ()=>{
    document.body.style.overflow = 'hidden';
    modalRef.current?.showModal();
  }
  const checkClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal = document.querySelector("dialog");
    if (!modal) {
      return;
    }
    // Check if mouse click was outside the modal
    const dialogDimensions = modal?.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY > dialogDimensions?.bottom ||
      e.clientY < dialogDimensions?.top
    ) {
      modal.close();
      document.body.style.overflow = ''
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.close();
    document.body.style.overflow = ''
    // Prevent default refreshing behaviour
    e.preventDefault();

    const exercise_count = sessionExercises?.length;

    // When we submit the form, we create an exercise
    const response = await fetch("/api/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id,
        exercise_id: newSessionExercise,
        exercise_count,
      }),
    });
    const data = await response.json();
    console.log(data.data);

    // Now we have to update the elements on the screen
    if (sessionExercises) {
      setSessionExercises([...sessionExercises, data.data]);
    }
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
        {sessionExercises && !isLoading ? (
          sessionExercises.map((exercise) => SessionCard(exercise, addSet))
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
      </section>

      <button className="btn" onClick={handleModalOpen}>
        Add Exercise
      </button>
      <dialog
        ref={modalRef}
        data-modal
        id="modal"
        onClick={(e) => {
          checkClick(e);
        }}
        className="modal_container animate-fadeIn overflow-y-auto"
      >
        <Label className="text-3xl text-shadow-amber-50 shadow-2xl text-gray-200">
          Select an exercise.
        </Label>
        <div className=" bg-white h-0.5 rounded-4xl"></div>
        <form
          className="space-y-2 mt-2 font-medium"
          onSubmit={(e) => handleFormSubmit(e)} 
        >
          {allExercises.map((exercise: Tables<"exercises">) => {
            return (
              <button
                type="submit"
                key={exercise.exercise_id}
                onClick={() => setNewSessionExercise(exercise.exercise_id)}
                className="modal_items"
              >
                {exercise.exercise_name}
              </button>
            );
          })}
        </form>
      </dialog>
    </div>
  );
}
