"use client";
import React, { useRef } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { addExercisesAction } from "@/app/actions/exercises/addExercisesAction";

export function ExerciseModal() {
  const exerciseModalRef = useRef<HTMLDialogElement>(null);

  const handleExerciseModalOpen = () => {
    document.body.style.overflow = "hidden";
    exerciseModalRef.current?.showModal();
  };

  // Add this function to check if click was outside the modal
  const checkClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!exerciseModalRef.current) {
      return;
    }
    // Check if mouse click was outside the modal
    const dialogDimensions = exerciseModalRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY > dialogDimensions.bottom ||
      e.clientY < dialogDimensions.top
    ) {
      exerciseModalRef.current.close();
      document.body.style.overflow = "";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!exerciseModalRef.current) {
      return;
    }
    const formData = new FormData(e.currentTarget);
    const exercise_name = formData.get("exercise_name") as string;
    const exercise_description = formData.get("exercise_description") as string;
    exerciseModalRef.current.close();
    document.body.style.overflow = "";

    // When we submit the form, we create an exercise
    addExercisesAction(exercise_name, exercise_description);
  };

  return (
    <>
      <button className="btn" onClick={handleExerciseModalOpen}>
        Add Exercise
      </button>

      <dialog
        ref={exerciseModalRef}
        data-modal
        id="modal"
        onClick={(e) => checkClick(e)}
        className="modal_container animate-fadeIn overflow-y-auto"
      >
        <Label className="text-3xl text-shadow-amber-50 shadow-2xl text-gray-200 border-white">
          Add your exercise.
        </Label>

        <form
          onSubmit={handleFormSubmit}
          className="space-y-3 font-medium py-2 text-white border-t-2 border-white"
        >
          <Input
            className="mt-2"
            placeholder="Exercise Name"
            name="exercise_name"
            required
          ></Input>
          <textarea
            className="w-full field-sizing-content max-h-60 border rounded-md p-2"
            placeholder="Exercise Description"
            name="exercise_description"
          ></textarea>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                exerciseModalRef.current?.close();
                document.body.style.overflow = "";
              }}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
