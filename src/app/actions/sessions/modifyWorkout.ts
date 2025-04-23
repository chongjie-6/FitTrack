"use server";
import { createClient } from "@/utils/supabase/server";

export async function modifyWorkoutAction(value: string, field: string, session_id: string) {
    try{
        const supabase = await createClient();
        const {error: workoutError } = await supabase
          .from("sessions")
          .update({ [field]: value })
          .eq("session_id", session_id)

        if (workoutError){
            throw new Error("Could not modify your session.")
        }
    }
    catch(e){
        console.log(e)
    }
}
