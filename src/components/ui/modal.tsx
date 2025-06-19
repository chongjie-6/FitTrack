"use client";
import React, { useRef } from "react";
import { Tables } from "../../../database.types";
import { Label } from "./label";
import { ExerciseModal } from "./exercise_modal";
import { addSessionExerciseAction } from "@/app/actions/session_exercise/addSessionExercise";

export function Modal({
  allExercises,
  session_id,
}: {
  session_id: string;
  allExercises: Array<Tables<"exercises">>;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModalOpen = () => {
    modalRef.current?.close();
    document.body.style.overflow = "hidden";
    modalRef.current?.showModal();
  };

  const checkClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!modalRef.current) {
      return;
    }
    // Check if mouse click was outside the modal
    const dialogDimensions = modalRef.current?.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY > dialogDimensions?.bottom ||
      e.clientY < dialogDimensions?.top
    ) {
      modalRef.current.close();
      document.body.style.overflow = "";
    }
  };

  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exercise_id: string
  ) => {
    e.preventDefault();
    if (!modalRef.current) {
      return;
    }
    modalRef.current.close();
    document.body.style.overflow = "";

    // When we submit the form, we create an exercise
    addSessionExerciseAction(session_id, exercise_id);
  };

  return (
    <>
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
        <Label className="text-3xl text-shadow-amber-50 shadow-2xl text-gray-200 border-white">
          Select an exercise.
        </Label>

        <form className="space-y-2 font-medium border-t-2 border-white py-2">
          {allExercises.map((exercise) => {
            return (
              <button
                type="submit"
                key={exercise.exercise_id}
                onClick={(e) => handleFormSubmit(e, exercise.exercise_id)}
                className="modal_items"
              >
                {exercise.exercise_name}
              </button>
            );
          })}
        </form>
        <ExerciseModal></ExerciseModal>
      </dialog>
    </>
  );
}
