"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkoutAction() {
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
    revalidatePath("/");

    // Successfully created workout, navigate to newly created workout
    return `/workouts/${session_id.session_id}`;
  } catch (e) {
    console.log(e);
  }
}