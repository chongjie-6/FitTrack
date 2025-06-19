import { SessionInfoHeader } from "@/components/ui/session_info_header";
import getUser from "@/app/actions/getUser";
import { SessionExercises } from "@/components/ui/session_exercises";
import { addSessionExerciseAction } from "@/app/actions/session_exercise/addSessionExercise";
import { Modal } from "@/components/ui/modal";
import { addExercisesAction } from "@/app/actions/exercises/addExercisesAction";
import { fetchWorkoutSession } from "@/app/actions/sessions/getSession";
import { fetchAllExercises } from "@/app/actions/user/getUserExercises";
import { fetchSessionExercises } from "@/app/actions/session_exercise/getSessionExercises";
export default async function SessionPage({
  params,
}: {
  params: Promise<{ session_id: string }>;
}) {
  // Get user and session_id through params
  await getUser();
  const { session_id } = await params;

  // Create promises to fetch data
  const sessionData = fetchWorkoutSession(session_id);
  const exerciseData = fetchAllExercises();
  const sessionSetsData = fetchSessionExercises(session_id);

  // Resolve promises
  const [sessionInfo, allExercises, sessionExercises] = await Promise.all([
    sessionData,
    exerciseData,
    sessionSetsData,
  ]);

  return (
    <div className="sm:mt-20 sm:mb-10 mx-auto max-w-3xl p-5 pt-10 sm:p-10 bg-gray-900 sm:rounded-lg shadow-lg h-full min-h-screen">
      {/* Section showing session info */}
      <SessionInfoHeader
        sessionInfo={sessionInfo}
      />
      {/* Section showing all exercises and their sets */}
      <SessionExercises sessionExercises={sessionExercises || []} />

      {/* Button and modal components */}
      <Modal
        session_id={sessionInfo.session_id}
        allExercises={allExercises || []}
        addSessionExerciseAction={addSessionExerciseAction}
        addExercisesAction={addExercisesAction}
      />
    </div>
  );
}
