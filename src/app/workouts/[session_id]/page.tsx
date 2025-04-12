"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Tables } from "../../../../database.types";
import SessionCard from "@/components/ui/session_card";
import { Modal } from "@/components/ui/modal";
import { SessionInfoHeader } from "@/components/ui/session_info_header";
import { useDebouncedCallback } from "use-debounce";

export default function SessionPage() {
  const router = useRouter();
  const [, setUser] = useState<User | null>();
  const { session_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [allExercises, setAllExercises] = useState([]);
  const [newSessionExercise, setNewSessionExercise] = useState<string>("");
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
        throw new Error("Could not add your set.");
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

  const modifySet = useDebouncedCallback(
    async ({
      set_id,
      value,
      field,
    }: {
      set_id: string;
      value: number;
      field: string;
    }) => {
      try {
        const response = await fetch(`/api/${set_id}`, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ set_id: set_id, value: value, field: field }),
        });
        if (!response.ok) {
          throw new Error("Could not update your set.");
        }
        const data = await response.json();
        const updatedSet = data.data;
        if (sessionExercises) {
          setSessionExercises(
            sessionExercises.map((exercise) => {
              exercise.session_sets.map((set) => {
                if (set.set_id === updatedSet.set_id) {
                  return updatedSet;
                }
              });
              return exercise;
            })
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    400
  );

  const modifySessionInfo = useDebouncedCallback(
    async ({ value, field }: { value: string; field: string }) => {
      try {
        const response = await fetch(`/api/workouts/${session_id}`, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ value: value, field: field }),
        });
        if (!response.ok) {
          throw new Error("Could not update your session.");
        }
        const data = await response.json();
        const updatedSession = data.data;
        if (sessionInfo) {
          setSessionInfo(updatedSession);
        }
      } catch (e) {
        console.log(e);
      }
    },
    400
  );

  const handleModalOpen = () => {
    document.body.style.overflow = "hidden";
    modalRef.current?.showModal();
  };
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
      document.body.style.overflow = "";
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.close();
    document.body.style.overflow = "";
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
    <div className="sm:mt-20 sm:mb-10 mx-auto max-w-3xl p-5 pt-10 sm:p-10 bg-gray-900 sm:rounded-lg shadow-lg h-screen">
      {/* Section showing session info */}
      <SessionInfoHeader
        sessionInfo={sessionInfo}
        modifySession={modifySessionInfo}
      />

      {/* Section showing all exercises their sets */}
      <section>
        {sessionExercises && !isLoading ? (
          sessionExercises.map((exercise) => (
            <SessionCard
              key={exercise.session_exercise_id}
              exercise={exercise}
              addSet={addSet}
              modifySet={modifySet}
            />
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
      </section>

      {/* Button and modal components */}
      <button className="btn" onClick={handleModalOpen}>
        Add Exercise
      </button>
      <Modal
        modalRef={modalRef}
        checkClick={checkClick}
        handleFormSubmit={handleFormSubmit}
        allExercises={allExercises}
        setNewSessionExercise={setNewSessionExercise}
      />
    </div>
  );
}
