"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function removeSetAction(delete_set_id: string) {
  try {
    const supabase = await createClient();
    const { error: deleteError } = await supabase
      .from("session_sets")
      .delete()
      .eq("set_id", delete_set_id);

    if (deleteError) {
      throw new Error("Could not delete your set.");
    }
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
}
