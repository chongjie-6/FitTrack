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
  // Now we can create a session row in the database
  const {data, error: insertError } = await supabase.from("sessions").insert({user_id: user.id}).select("session_id").single()
  // Error response
  if (insertError){
      return Response.json({message: "There was an error creating your workout"}, {status: 500})
  }
  return Response.json({sucess: true, data: data.session_id}, {status: 200})

}