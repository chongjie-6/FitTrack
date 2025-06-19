import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";
import getUser from "../getUser";

export async function fetchSessions() {
  // Verify user
  const user = await getUser();
  
  const supabase = await createClient();
  try {
    const fetchData = async () => {
      const { data: sessions, error: workoutError } = await supabase
        .from("sessions")
        .select(
          "session_id, session_name, session_start_date, session_end_date"
        )
        .eq("user_id", user.id)
        .order("session_start_date", { ascending: false })
        .select();

      if (workoutError) {
        throw new Error(
          "Could not fetch your workouts, Please try again later."
        );
      }
      return sessions;
    };

    const data = unstable_cache(fetchData, [], {
      tags: ["userSessions"],
      revalidate: 3600,
    });
    return data();
  } catch (e) {
    throw new Error(e as string);
  }
}
