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
      const { data: weights, error } = await supabase
        .from("sessions")
        .select("session_weight_lifted")
        .eq("user_id", user.id)
        .gte("session_start_date", month);

      console.log(weights);
      if (error) {
        throw new Error("Could not fetch your workouts weights this month.");
      }
      const totalWeights = (weights ?? []).reduce(
        (sum, session) => sum + (session.session_weight_lifted ?? 0),
        0
      );
      return totalWeights;
    };
    const data = unstable_cache(fetchData, [], {
      tags: ["weightLifted"],
      revalidate: 3600,
    });
    return data();
  } catch (e) {
    throw new Error(e as string);
  }
}
