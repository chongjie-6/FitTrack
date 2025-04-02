import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function GET() {

    // Make sure the user is logged in 
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      redirect('/login')
    }

    // If the user is logged in, then we can fetch from database
    const {data: workouts, error: workoutError} = await supabase.from("sessions").select("*").eq("user_id", user.id).order("session_end_date", {ascending:false})

    // Error response
    if (workoutError){
        return Response.json({message: "There was an error fetching your workouts"}, {status: 500})
    }
    return Response.json({sucess: true, data: workouts}, {status: 200})

}