import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { unstable_cache } from "next/cache";

export async function fetchWeightLifted() {
  const user = await getUser();

  try {
    const supabase = await createClient();
    const fetchData = async () => {
      const month = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toISOString();

      // Get all sessions that have been started from this month
      const { data: sessions, error } = await supabase
        .from("sessions")
        .select("session_exercises(session_sets(set_weight, set_reps))")
        .eq("user_id", user.id)
        .gte("session_end_date", month);

      // Now that we have all the sessions associated with their sets and exercises, we need to map and sum up the total
      // Sum up each of the sets
      const setWeights = sessions?.flatMap((sessions) =>
        sessions.session_exercises.flatMap((exercise) =>
          exercise.session_sets.map((set) => set.set_reps * set.set_weight)
        )
      );

      const totalWeights =
        setWeights?.reduce((sum, weight) => sum + weight, 0) || 0;
      if (error) {
        throw new Error("Could not fetch your workouts weights this month.");
      }

      return totalWeights;
    };
    const data = unstable_cache(fetchData, [], {
      tags: ["summary", "totalWeights"],
      revalidate: 3600,
    });
    return data();
  } catch (e) {
    throw new Error(e as string);
  }
}
