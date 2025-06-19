import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { unstable_cache } from "next/cache";

export async function fetchAllExercises() {
  const user = await getUser();
  try {
    const supabase = await createClient();

    const fetchData = async () => {
      const { data, error: workoutError } = await supabase
        .from("exercises")
        .select("*")
        .eq("user_id", user.id);
      // Error response
      if (workoutError) {
        throw new Error("There was an error fetching your exercises.");
      }
      return data;
    };

    const data = unstable_cache(fetchData, [], {
      revalidate: 3600,
      tags: ["exercises"],
    });
    return data();
  } catch (e) {
    throw new Error(e as string);
  }
}
