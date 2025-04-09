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
    const {data: workouts, error: workoutError} = await supabase.from("sessions").select("*").eq("user_id", user.id).order("session_start_date", {ascending:false})
    // Error response
    if (workoutError){
        return Response.json({message: "There was an error fetching your workouts"}, {status: 500})
    }
    return Response.json({sucess: true, data: workouts}, {status: 200})

}

export async function POST() {
  // Make sure the user is logged in 
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  // If the user is logged in, then we can post to database
  
  // First let's get the default name, this will be a predetermined name depending on when the session was created
  const determineWorkoutTime = (hour: number) => {
    if (hour < 12) {
      return "Morning Workout";
    } else if (hour < 4) {
      return "Midday Workout";
    } else {
      return "Night Workout";
    }
  };
  const session_name = determineWorkoutTime(new Date().getHours())

  // Now we can create a session row in the database
  const {data, error: insertError } = await supabase.from("sessions").insert({session_name: session_name, user_id: user.id}).select("session_id").single()
  // Error response
  if (insertError){
      return Response.json({message: "There was an error creating your workout"}, {status: 500})
  }
  return Response.json({sucess: true, data: data.session_id}, {status: 200})

}