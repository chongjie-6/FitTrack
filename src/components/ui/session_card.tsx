"use client";
import { modifySetAction } from "@/app/actions/session_sets/modifySessionSet";
import { Tables } from "../../../database.types";
import { deleteSessionExerciseAction } from "@/app/actions/session_exercise/deleteSessionExercise";
import { removeSetAction } from "@/app/actions/session_sets/removeSessionSet";
import { addSetAction } from "@/app/actions/session_sets/addSessionSets";

export default function SessionCard({
  exercise,
}: {
  exercise: Tables<"session_exercises"> & {
    exercises: Tables<"exercises">;
    session_sets: Array<Tables<"session_sets">>;
  };
}) {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: Tables<"session_sets">,
    field: "set_weight" | "set_reps" | "set_rest_time"
  ) => {
    modifySetAction(set.set_id || "", Number(e.target.value), field);
  };
  return (
    <div
      key={exercise.session_exercise_id}
      className="mb-6 bg-gray-800 rounded-lg p-4 shadow"
    >
      <div className="border-b border-gray-700 pb-2 mb-3">
        <div className="inline-flex w-full justify-between">
          <h3 className="text-xl font-medium text-white">
            {exercise.exercises.exercise_name}
          </h3>
          <svg
            onClick={() =>
              deleteSessionExerciseAction(exercise.session_exercise_id)
            }
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="red"
            className="bi bi-x cursor-pointer"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
        {exercise.exercises.exercise_description && (
          <p className="text-gray-400 text-sm mt-1">
            {exercise.exercises.exercise_description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-8 text-gray-500 text-sm font-medium mb-2 px-2">
        <span className="col-span-1">Set</span>
        <span className="col-span-2">Weight</span>
        <span className="col-span-2">Reps</span>
        <span className="col-span-2">Rest</span>
      </div>

      <div className="space-y-2">
        {exercise &&
          exercise.session_sets.map((set, index) => (
            <div
              className="grid grid-cols-8 bg-gray-700 bg-opacity-30 p-2 rounded text-white font-semibold font-mono"
              key={set.set_id}
            >
              <span className="col-span-1">{index + 1}</span>
              <input
                onChange={(e) => onChange(e, set, "set_weight")}
                type="number"
                className="col-span-2"
                defaultValue={set.set_weight || ""}
                placeholder="0"
              ></input>
              <input
                onChange={(e) => onChange(e, set, "set_reps")}
                type="number"
                className="col-span-2"
                defaultValue={set.set_reps || ""}
                placeholder="0"
              ></input>
              <input
                onChange={(e) => onChange(e, set, "set_rest_time")}
                type="number"
                className="col-span-2"
                defaultValue={set.set_rest_time || ""}
                placeholder="0"
              ></input>
              <svg
                onClick={() => removeSetAction(set.set_id || "")}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="red"
                className="bi bi-x cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
          ))}
      </div>
      <button
        className="btn"
        onClick={() =>
          addSetAction(
            exercise.session_exercise_id,
            exercise.session_sets.length + 1
          )
        }
      >
        Add Set
      </button>
    </div>
  );
}
