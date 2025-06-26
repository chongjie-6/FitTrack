"use server";
import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { revalidatePath, revalidateTag } from "next/cache";

export async function removeSetAction(
  delete_set_id: string,
  session_id: string
) {
  // Verify user
  await getUser();

  try {
    const supabase = await createClient();
    const { error: deleteError } = await supabase
      .from("session_sets")
      .delete()
      .eq("set_id", delete_set_id);

    if (deleteError) {
      throw new Error("Could not delete your set.");
    }
    revalidatePath(`/workouts/${session_id}`);
    revalidateTag("totalWeights")
  } catch (e) {
    throw new Error(e as string);
  }
}
