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
    // select all sessions that a user has done this month
    const {data, error} = await supabase.from("sessions").select("session_id").eq("user_id",user.id).gte("session_start_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    
    // convert into an array of values
    const session_ids = data?.map(session => session.session_id) || [];

    // select all set_weights for sets done in the last month 
    const session_data = await supabase.from("session_exercises").select("session_sets(set_weight)").in("session_id", session_ids)
    
    // Error response
    if (error){
        return Response.json({message: "Error fetching count"}, {status: 500})
    }
    return Response.json({sucess: true, data: session_data.data}, {status: 200})
}