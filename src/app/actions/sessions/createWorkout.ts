"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import getUser from "../getUser";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createWorkoutAction() {
  // Verify user
  await getUser();

  try {
    // Create session for user
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // Now we can create a session row in the database
    const { data: session_id, error: insertError } = await supabase
      .from("sessions")
      .insert({ user_id: user.id })
      .select("session_id")
      .single();

    if (insertError) {
      throw new Error("Could not create your workout. Please try again later.");
    }
    // Successfully created workout, navigate to newly created workout
    revalidateTag("userSessions")
    return `/workouts/${session_id.session_id}`;
    
  } catch (e) {
    throw new Error(e as string);
  }
}
