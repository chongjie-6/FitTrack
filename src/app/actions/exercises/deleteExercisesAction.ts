"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addExercisesAction(
  exercise_id: string
) {
  const supabase = await createClient();
  
  // Get the current user from the session
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error("Not authenticated. Please log in to delete exercises.");
  }
  
  const { data, error: workoutError } = await supabase
    .from("exercises")
    .delete()
    .eq("exercise_id" ,exercise_id)
    .select()
    .single();
    
  if (workoutError) {
    throw new Error("There was an error adding your exercise.");
  }
  revalidatePath("/workouts")
  return data;
}