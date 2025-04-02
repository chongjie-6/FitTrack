import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function GET() {

    // Make sure the user is logged in 
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      redirect('/login')
    }

    // If the user is logged in, then we can fetch from database
    // Select all sessions from this month and join session sets
    const { data, error } = await supabase
    .from("session_sets")
    .select("sessions!inner(session_start_date), set_weight")
    .eq("user_id", user.id)
    .gte("sessions.session_start_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

    // Error response
    if (error){
        return Response.json({message: "Error fetching count"}, {status: 500})
    }
    return Response.json({sucess: true, data: data}, {status: 200})
}