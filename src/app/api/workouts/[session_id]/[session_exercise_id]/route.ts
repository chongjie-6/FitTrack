import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function POST(request: Request,  { params }: { params: Promise<{ session_id: string, session_exercise_id: string }> }) {
    // Make sure the user is logged in 
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      redirect('/login')
    }

  // If the user is logged in, then we can post to database
  const {set_number} = await request.json()
  const { session_exercise_id } = await params

  // Now we can create a session set row in the database
  const { data, error: insertError } = await supabase.from("session_sets").insert({session_exercise_id: session_exercise_id, set_number: set_number}).select().single()

  // Error response
  if (insertError){
      return Response.json({message: "There was an error creating your set"}, {status: 500})
  }
  return Response.json({sucess: true, data: data}, {status: 200})

}

export async function DELETE(request: Request,  { params }: { params: Promise<{ session_id: string, session_exercise_id: string }> }) {
  // Make sure the user is logged in 
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

// If the user is logged in, then we can delete from database
const { session_exercise_id } = await params

// Now we can create a session row in the database
const { data, error: deleteError } = await supabase.from("session_exercises").delete().eq("session_exercise_id", session_exercise_id)

// Error response
if (deleteError){
    return Response.json({message: "There was an error deleting your exercise"}, {status: 500})
}
return Response.json({sucess: true, data: data}, {status: 200})

}