import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Exercise } from "@/utils/types/types";

function DialogBtn({ allExercisesProp }: { allExercisesProp: Exercise[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mb-6 bg-gray-800 rounded-lg shadow btn p-3 mt-1 w-full text-start">
          Add Exercise
        </button>
      </DialogTrigger>
      <DialogContent className="w-full h-full max-w-2/3 max-h-2/3">
        <DialogHeader>
          <DialogTitle>Select Exercise</DialogTitle>
          <DialogDescription>
            Select which exercise you would like to add.
          </DialogDescription>
          {allExercisesProp.map((exercise) => (
            <div
              key={exercise.exercise_id}
              className="border-b-2 border-t-2 p-2 pl-4 rounded-xl hover:bg-gray-800 transition-all duration-200"
            >
              {exercise.exercise_name}
            </div>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export { DialogBtn };
