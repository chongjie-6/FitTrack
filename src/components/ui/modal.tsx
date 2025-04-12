import React, { FormEvent } from "react";
import { Tables } from "../../../database.types";
import { Label } from "./label";
export function Modal({
  modalRef,
  checkClick,
  handleFormSubmit,
  allExercises,
  setNewSessionExercise,
}: {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  checkClick: (e: React.MouseEvent<HTMLDialogElement>) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  allExercises: Array<Tables<"exercises">>;
  setNewSessionExercise: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
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
      <form
        className="space-y-2 mt-2 font-medium"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        {allExercises.map((exercise) => {
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
  );
}
