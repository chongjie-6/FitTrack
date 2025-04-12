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
    .select("*")
    .eq("session_id", session_id).single()

    // Error response
    if (workoutError){
        return Response.json({message: "There was an error fetching your workouts"}, {status: 500})
    }
    return Response.json({sucess: true, data: workouts}, {status: 200})

}

export async function PATCH(req: Request, { params }: { params: Promise<{ session_id: string }> }) {
  const {session_id} = await params
  
  // Make sure the user is logged in 
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }
  
  // If the user is logged in, then we can post to database
  const {data: session_end_date, error: workoutError} = await supabase.from("sessions").update({"session_end_date": new Date().toISOString()}).eq("session_id",session_id).select("session_end_date").single()
  // Error response
  if (workoutError){
      return Response.json({message: "There was an error ending your session"}, {status: 500})
  }
  return Response.json({sucess: true, data: session_end_date}, {status: 200})

}