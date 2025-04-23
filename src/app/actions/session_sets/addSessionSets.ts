"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addSetAction(session_exercise_id: string, set_number: number) {
  "use server"
  try {
    const supabase = await createClient();
    const { error: insertError } = await supabase.from("session_sets").insert({
      session_exercise_id: session_exercise_id,
      set_number: set_number,
    });

    if (insertError) {
      throw new Error("Could not add your set.");
    }
    revalidatePath("/workouts")
  } catch (e) {
    console.log(e);
  }
}
