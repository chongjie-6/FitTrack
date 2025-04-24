"use server";
import { Tables } from "../../../database.types";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import DashboardPage from "@/components/ui/dashboard_page_info";
import getUser from "../actions/getUser";

async function fetchSessions(user: User) {
  try {
    const supabase = await createClient();
    const { data: sessions, error: workoutError } = await supabase
      .from("sessions")
      .select("session_id, session_name, session_start_date, session_end_date")
      .eq("user_id", user.id)
      .order("session_start_date", { ascending: false })
      .select();

    if (workoutError) {
      throw new Error("Could not fetch your workouts, Please try again later.");
    }
    return sessions;
  } catch (e) {
    console.log("Error: ", e);
  }
}

async function fetchMonthlyData(sessions: Array<Tables<"sessions">>) {
  // Once we have fetched all data, we can run a function to update the training time
  const currentMonth = new Date().getMonth();

  // Filter only the workouts that are started this month
  const workoutsThisMonth = sessions.filter(
    (workout: Tables<"sessions">) =>
      workout.session_start_date &&
      new Date(workout.session_start_date).getMonth() === currentMonth
  );

  // Sum up the total training time for this month
  const totalTrainingTime = workoutsThisMonth.reduce(
    (sum: number, workout: Tables<"sessions">) => {
      if (!workout.session_end_date) {
        return sum;
      }
      return (
        sum +
        (new Date(workout.session_end_date).getTime() -
          new Date(workout.session_start_date).getTime()) /
          60000
      );
    },
    0
  );
  const hoursThisMonth = Math.round((totalTrainingTime / 60) * 100) / 100;
  return {
    hoursThisMonth: hoursThisMonth,
    workoutsThisMonth: workoutsThisMonth.length,
  };
}

async function fetchWeightLifted(user: User) {
  try {
    const supabase = await createClient();
    const { data: weights, error } = await supabase.rpc(
      "weight_lifted_this_month",
      {
        user_uuid: user.id,
        month_start: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString(),
      }
    );
    if (error) {
      throw new Error("Could not fetch your workouts weights this month.");
    }
    return weights;
  } catch (e) {
    console.log("Error: ", e);
  }
}

export default async function Dashboard() {
  const user = await getUser();
  const sessions = await fetchSessions(user);
  const timeAndWorkoutsThisMonthData = fetchMonthlyData(sessions || []);
  const weightsThisMonthData = fetchWeightLifted(user);
  const [weightsThisMonth, timeAndWorkoutsThisMonth] = await Promise.all([
    weightsThisMonthData,
    timeAndWorkoutsThisMonthData,
  ]);

  const { hoursThisMonth, workoutsThisMonth } = timeAndWorkoutsThisMonth;
  return (
    <DashboardPage
      workoutsThisMonth={workoutsThisMonth}
      hoursThisMonth={hoursThisMonth}
      weightsThisMonth={weightsThisMonth}
      user={user}
      sessions={sessions || []}
    ></DashboardPage>
  );
}
