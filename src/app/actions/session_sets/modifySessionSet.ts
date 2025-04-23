"use server";
import { createClient } from "@/utils/supabase/server";

export async function modifySetAction(
  set_id: string,
  value: number,
  field: "set_weight" | "set_reps" | "set_rest_time"
) {
  try {
    const supabase = await createClient();
    const { error: updateError } = await supabase
      .from("session_sets")
      .update({ [field]: value })
      .eq("set_id", set_id);
    if (updateError) {
      throw new Error("There was an error modifying your set");
    }
  } catch (e) {
    console.log(e);
  }
}
