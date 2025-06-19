import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { unstable_cache } from "next/cache";

export async function fetchSessionExercises(session_id: string) {
  await getUser();
  try {
    const supabase = await createClient();

    const fetchData = async () => {
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
    };
    const data = unstable_cache(fetchData, [session_id], {
      revalidate: 3600,
    });
    return data();
  } catch (e) {
    throw new Error(e as string);
  }
}
