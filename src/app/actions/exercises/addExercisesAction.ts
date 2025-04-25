"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addExercisesAction(
  exercise_name: string,
  exercise_description: string
) {
  try{
    const supabase = await createClient();
  
    // Get the current user from the session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error("Not authenticated. Please log in to add exercises.");
    }
    
    const { data, error: workoutError } = await supabase
      .from("exercises")
      .insert({ 
        exercise_name: exercise_name, 
        exercise_description: exercise_description, 
        user_id: user.id 
      })
      .select()
      .single();
    
    if (workoutError) {
      throw new Error("There was an error adding your exercise.");
    }
    revalidatePath("/workouts")
    return data;
  }
  catch(e){
    console.log(e)
  }
}