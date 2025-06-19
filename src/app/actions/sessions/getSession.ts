import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import getUser from "../getUser";

export async function fetchWorkoutSession(session_id: string) {
  await getUser();
  try {
    const supabase = await createClient();

    const fetchData = async () => {
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
    };

    const data = unstable_cache(fetchData, [], {
      revalidate: 3600,
      tags: [`${session_id}`],
    });
    return data();
  } catch (e) {
    throw new Error(e as string);
  }
}
