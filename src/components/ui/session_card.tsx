import { Tables } from "../../../database.types";

export default function SessionCard(
  exercise: Tables<"session_exercises"> & {
    exercises: Tables<"exercises">;
    session_sets: Array<Tables<"session_sets">>;
  },
  addSet: (session_exercise_id: string, set_number: number) => void
) {
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
          addSet(exercise.session_exercise_id, exercise.session_sets.length + 1)
        }
      >
        Add Set
      </button>
    </div>
  );
}
