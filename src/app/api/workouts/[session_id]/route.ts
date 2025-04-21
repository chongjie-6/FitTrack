import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function GET(request: Request,  { params }: { params: Promise<{ session_id: string }> }) {
  // Get session info associated with this session 

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
  // Modify this session 

  const {session_id} = await params
  
  // Make sure the user is logged in 
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }
  const {field, value} = await req.json()
  
  // If the user is logged in, then we can post to database
  const {data: session_data, error: workoutError} = await supabase.from("sessions").update({[field]: value}).eq("session_id",session_id).select("*").single()
  console.log(session_data)
  // Error response
  if (workoutError){
      return Response.json({message: "There was an error ending your session"}, {status: 500})
  }
  return Response.json({sucess: true, data: session_data}, {status: 200})

}

export async function DELETE(req: Request, { params }: { params: Promise<{ session_id: string }> }) {
  // Delete a session 
  const {session_id} = await params
  
  // Make sure the user is logged in 
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  // First get all the exercises associated with this session 
  const {data: data} = await supabase.from("session_exercises").select("session_exercise_id").eq("session_id",session_id).select("session_exercise_id")

  // Now we get all the sets for all exercises associated with this session
  const session_exercises = data ? Object.values(data).map(exercise => exercise.session_exercise_id) : [];
  const {data: setData} = await supabase.from("session_sets").select("set_weight, set_reps").in("session_exercise_id", session_exercises);
  
  // Now we can delete from database
  const {data:session_data, error: deleteError} = await supabase.from("sessions").delete().eq("session_id",session_id).select("session_id, session_start_date, session_end_date").single()
  // Error response
  if (deleteError){
      return Response.json({message: "There was an error deleting your session"}, {status: 500})
  }
  return Response.json({sucess: true, data: {session_data: session_data, sets:setData}}, {status: 200})

}