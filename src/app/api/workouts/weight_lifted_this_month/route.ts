import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function GET() {
// Get all sets performed by this user across all sessions this month 
  // Make sure the user is logged in 
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect('/login')
  }

  const { data, error } = await supabase
  .from("session_sets")
  .select(`
    set_weight,
    set_reps,
    session_exercises!inner(
      session_id,
      sessions!inner(
        user_id
      )
    )
  `)
  .eq("session_exercises.sessions.user_id", user.id)
  .gte("session_exercises.sessions.session_start_date", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());
  
  // Error response
  if (error) {
    return Response.json({ message: "Error fetching count" }, { status: 500 });
  }

  let totalWeight = 0;
  data.forEach(set => {
    totalWeight += (set.set_weight || 0) * (set.set_reps || 0);
  });
  
  return Response.json({ 
    success: true, 
    data: {
      totalWeight
    }
  }, { status: 200 });
}