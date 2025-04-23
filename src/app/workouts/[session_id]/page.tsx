import { SessionInfoHeader } from "@/components/ui/session_info_header";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import getUser from "@/app/actions/getUser";
import { modifyWorkoutAction } from "@/app/actions/sessions/modifyWorkout";
import { SessionExercises } from "@/components/ui/session_exercises";
import { addSessionExerciseAction } from "@/app/actions/session_exercise/addSessionExercise";
import { endWorkoutAction } from "@/app/actions/sessions/endWorkout";
import { Modal } from "@/components/ui/modal";
import { addExercisesAction } from "@/app/actions/exercises/addExercisesAction";

async function fetchWorkoutSession(session_id: string) {
  try {
    const supabase = await createClient();
    const { data: workouts, error: workoutError } = await supabase
      .from("sessions")
      .select(
        "session_id, session_name, session_notes, session_start_date, session_end_date"
      )
      .eq("session_id", session_id)
      .select()
      .single();

    // Error response
    if (workoutError) {
      throw new Error("Unable to get your session");
    }
    return workouts;
  } catch (e) {
    console.log(e);
  }
}

async function fetchSessionExercises(session_id: string) {
  try {
    const supabase = await createClient();
    const { data: workouts, error: workoutError } = await supabase
      .from("session_exercises")
      .select(`*, exercises (*),session_sets (*)`)
      .eq("session_id", session_id)
      .order("set_number", {
        ascending: true,
        referencedTable: "session_sets",
      });
    // Error response
    if (workoutError) {
      throw new Error(
        "There was an error getting your exercises for this session."
      );
    }
    return workouts;
  } catch (e) {
    console.log(e);
  }
}

async function fetchAllExercises(user: User) {
  try {
    const supabase = await createClient();
    const { data, error: workoutError } = await supabase
      .from("exercises")
      .select("*")
      .eq("user_id", user.id);
    // Error response
    if (workoutError) {
      throw new Error("There was an error fetching your exercises.");
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}
export default async function SessionPage({
  params,
}: {
  params: Promise<{ session_id: string }>;
}) {
  // Get user and session_id through params
  const user = await getUser();
  const { session_id } = await params;

  // Create promises to fetch data
  const sessionData = fetchWorkoutSession(session_id);
  const exerciseData = fetchAllExercises(user);
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
        modifyWorkoutAction={modifyWorkoutAction}
        endWorkoutAction={endWorkoutAction}
      />
      {/* Section showing all exercises and their sets */}
      <section>
        <SessionExercises sessionExercises={sessionExercises || []} />
      </section>

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
