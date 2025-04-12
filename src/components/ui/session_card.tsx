import { Tables } from "../../../database.types";

export default function SessionCard({
  exercise,
  addSet,
  modifySet,
}: {
  exercise: Tables<"session_exercises"> & {
    exercises: Tables<"exercises">;
    session_sets: Array<Tables<"session_sets">>;
  };
  addSet: (session_exercise_id: string, set_number: number) => void;
  modifySet: (args: { set_id: string; value: number; field: string }) => void;
}) {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: Tables<"session_sets">,
    field: string
  ) => {
    modifySet({
      set_id: set.set_id || "",
      value: Number(e.target.value),
      field,
    });
  };

  return (
    <div
      key={exercise.session_exercise_id}
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
        {exercise &&
          exercise.session_sets.map((set) => (
            <div
              className="grid grid-cols-4 bg-gray-700 bg-opacity-30 p-2 rounded text-white font-semibold font-mono "
              key={set.set_id}
            >
              <span>{set.set_number}</span>
              <input
                onChange={(e) => onChange(e, set, "set_weight")}
                type="number"
                className="number_field"
                defaultValue={set.set_weight}
                placeholder="0"
              ></input>
              <input
                onChange={(e) => onChange(e, set, "set_reps")}
                type="number"
                className="number_field"
                defaultValue={set.set_reps}
                placeholder="0"
              ></input>
              <input
                onChange={(e) => onChange(e, set, "set_rest_time")}
                type="number"
                className="number_field"
                defaultValue={set.set_rest_time}
                placeholder="0"
              ></input>
            </div>
          ))}
      </div>
      <button
        className="btn"
        onClick={() =>
          addSet(exercise.session_exercise_id, exercise.session_sets.length + 1)
        }
      >
        Add Set
      </button>
    </div>
  );
}
