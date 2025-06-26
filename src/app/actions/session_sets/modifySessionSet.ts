"use server";
import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { revalidatePath, revalidateTag } from "next/cache";

export async function modifySetAction(
  session_id: string,
  set_id: string,
  value: number,
  field: "set_weight" | "set_reps" | "set_rest_time"
) {
  // Verify user
  await getUser();

  try {
    const supabase = await createClient();
    const { error: updateError } = await supabase
      .from("session_sets")
      .update({ [field]: value })
      .eq("set_id", set_id);
    if (updateError) {
      throw new Error("There was an error modifying your set");
    }
    revalidatePath(`/workouts/${session_id}`);
    revalidateTag("totalWeights");
  } catch (e) {
    throw new Error(e as string);
  }
}
