import { SessionInfoHeader } from "@/components/ui/session_info_header";
import getUser from "@/app/actions/getUser";
import { SessionExercises } from "@/components/ui/session_exercises";
import { Modal } from "@/components/ui/modal";
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
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className=" sm:mb-10 mx-auto max-w-3xl p-5 pt-10 sm:p-10 bg-gray-800/90 backdrop-blur-sm sm:rounded-lg shadow-lg h-full min-h-screen animate-fade-in">
        {/* Section showing session info */}
        <SessionInfoHeader sessionInfo={sessionInfo} />
        {/* Section showing all exercises and their sets */}
        <SessionExercises sessionExercises={sessionExercises || []} />

        {/* Button and modal components */}
        <Modal
          session_id={sessionInfo.session_id}
          allExercises={allExercises || []}
        />
      </div>
    </div>
  );
}
