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
    const { data, error } = await supabase
    .from("sessions")
    .select("session_end_date, session_start_date")
    .eq("user_id", user.id)
    .not("session_start_date", "is", null)
    .gte("session_start_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    // Error response
    if (error){
        return Response.json({message: "Error fetching minutes"}, {status: 500})
    }
    return Response.json({sucess: true, data: data}, {status: 200})
}