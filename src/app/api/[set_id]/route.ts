import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function PUT(request: Request) {
    // Make sure the user is logged in 
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      redirect('/login')
    }

  // If the user is logged in, then we can post to database
  const {set_id, value, field} = await request.json();

  // Now we can create a session row in the database
  const { data, error: updateError } = await supabase.from("session_sets").update({[field]:value}).eq("set_id", set_id).select("*").single()

  // Error response
  if (updateError){
      return Response.json({message: "There was an error modifying your set"}, {status: 500})
  }
  return Response.json({sucess: true, data: data}, {status: 200})

}