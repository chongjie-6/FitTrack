import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function GET(request: Request,  { params }: { params: Promise<{ session_id: string }> }) {
    const {session_id} = await params
    
    // Make sure the user is logged in 
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      redirect('/login')
    }
    
    // If the user is logged in, then we can fetch from database
    // Get all the exercises for this workout
    const {data: workouts, error: workoutError} = await supabase.from("sessions")
    .select("session_name, session_notes, session_start_date, session_end_date, session_exercises(*,exercises(*), session_sets(*))")
    .eq("session_id", session_id)


    // Error response
    if (workoutError){
        return Response.json({message: "There was an error fetching your workouts"}, {status: 500})
    }
    return Response.json({sucess: true, data: workouts}, {status: 200})

}