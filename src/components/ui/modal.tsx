"use client";
import React, { useRef } from "react";
import { Tables } from "../../../database.types";
import { Label } from "./label";

export function Modal({
  allExercises,
  session_id,
  addSessionExerciseAction,
}: {
  session_id: string;
  allExercises: Array<Tables<"exercises">>;
  addSessionExerciseAction: (session_id: string, exercise_id: string) => void;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

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
        <Label className="text-3xl text-shadow-amber-50 shadow-2xl text-gray-200 border-b-2 border-white">
          Select an exercise.
        </Label>
        <form className="space-y-2 mt-2 font-medium">
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
      </dialog>
    </>
  );
}
