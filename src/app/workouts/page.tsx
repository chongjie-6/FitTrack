import AllWorkouts from "@/components/ui/allWorkouts";
import getUser from "../actions/getUser";
import { fetchSessions } from "../actions/user/getUserSessions";

export default async function Workout() {
  // Verify user
  await getUser();

  // Get all sessions and monthly summaries
  const sessions = await fetchSessions();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto py-20 px-5 sm:px-10">
        <AllWorkouts sessions={sessions}></AllWorkouts>
      </div>
    </div>
  );
}
