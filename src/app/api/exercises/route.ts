import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  // Get all the exercises that have been created by the user

    // Make sure the user is logged in 
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      redirect('/login')
    }

    // If the user is logged in, then we can fetch from database
    const {data, error: workoutError} = await supabase.from("exercises").select("exercise_id, exercise_description, exercise_name").eq("user_id", user.id)
    // Error response
    if (workoutError){
        return Response.json({message: "There was an error fetching your exercises."}, {status: 500})
    }
    return Response.json({sucess: true, data: data}, {status: 200})

}