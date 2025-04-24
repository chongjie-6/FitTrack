"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createWorkoutAction(session_id: string) {
  "use server"
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
    const { error: insertError } = await supabase
      .from("sessions")
      .insert({ session_id: session_id, user_id: user.id })
      .select("session_id")
      .single();
    
    if (insertError) {
      throw new Error("Could not create your workout. Please try again later.");
    }

  } catch (e) {
    console.log(e);
  }
}