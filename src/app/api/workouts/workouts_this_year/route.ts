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
    const { count, error } = await supabase
    .from("sessions")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .gte("session_start_date", new Date(new Date().getFullYear(), 1, 1).toISOString());

    // Error response
    if (error){
        return Response.json({message: "Error fetching count"}, {status: 500})
    }
    return Response.json({sucess: true, data: count}, {status: 200})
}