import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function DELETE(request: Request,  { params }: { params: Promise<{ session_id: string, session_exercise_id: string }> }) {
  // Delete this session exercise from the session 

  // Make sure the user is logged in 
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

// If the user is logged in, then we can delete from database
const { session_exercise_id } = await params

// Now we can delete a session row in the database
const { data, error: deleteError } = await supabase.from("session_exercises").delete().eq("session_exercise_id", session_exercise_id).select("session_exercise_id").single()

// Error response
if (deleteError){
    return Response.json({message: "There was an error deleting your exercise"}, {status: 500})
}
return Response.json({sucess: true, data: data}, {status: 200})

}