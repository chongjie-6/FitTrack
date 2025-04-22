"use server";
import { redirect } from "next/navigation";
import { Tables } from "../../../database.types";
import getUser from "../api/auth/route";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import DashboardPage from "@/components/ui/dashboard_page_info";

export async function fetchSessions(user: User) {
  try {
    const supabase = await createClient();
    const { data: sessions, error: workoutError } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("session_start_date", { ascending: false });

    if (workoutError) {
      throw new Error("Could not fetch your workouts, Please try again later.");
    }
    return sessions;
  } catch (e) {
    console.log("Error: ", e);
  }
}

export async function fetchMonthlyData(sessions: Array<Tables<"sessions">>) {
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

export async function fetchWeightLifted(user: User) {
  try {
    const supabase = await createClient();
    const { data: weights, error } = await supabase
      .from("session_sets")
      .select(
        `
      set_weight,
      set_reps,
      session_exercises!inner(
        session_id,
        sessions!inner(
          user_id
        )
      )
    `
      )
      .eq("session_exercises.sessions.user_id", user.id)
      .gte(
        "session_exercises.sessions.session_start_date",
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString()
      );

    const totalWeight =
      weights?.reduce((sum, set) => {
        return sum + set.set_reps * set.set_weight;
      }, 0) || 0;
    if (error) {
      throw new Error("Could not fetch your workouts weights this month.");
    }
    return totalWeight;
  } catch (e) {
    console.log("Error: ", e);
  }
}

export async function createWorkoutAction() {
  "use server";
  try {
    // Create session for user
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // Now we can create a session row in the database
    const { data: session_id, error: insertError } = await supabase
      .from("sessions")
      .insert({ user_id: user.id })
      .select("session_id")
      .single();

    if (insertError) {
      throw new Error("Could not create your workout. Please try again later.");
    }

    // Successfully created workout, navigate to newly created workout
    return `/workouts/${session_id.session_id}`;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteWorkoutAction(session_id: string) {
  "use server";
  try {
    // Delete a workout
    // Make sure the user is logged in
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // First get all the exercises associated with this session
    const { data: data } = await supabase
      .from("session_exercises")
      .select("session_exercise_id")
      .eq("session_id", session_id)
      .select("session_exercise_id");

    // Now we get all the sets for all exercises associated with this session
    const session_exercises = data
      ? Object.values(data).map((exercise) => exercise.session_exercise_id)
      : [];

    const { data: setData } = await supabase
      .from("session_sets")
      .select("set_weight, set_reps")
      .in("session_exercise_id", session_exercises);

    // Now we can delete from database
    const { data: session_data, error: deleteError } = await supabase
      .from("sessions")
      .delete()
      .eq("session_id", session_id)
      .select("session_id, session_start_date, session_end_date")
      .single();

    if (!setData || !session_data || deleteError) {
      throw new Error("Could not delete your exercise.");
    }

    return { session_data: session_data, sets: setData };
  } catch (e) {
    console.log(e);
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
      initialWorkoutsThisMonth={workoutsThisMonth}
      initialHoursThisMonth={hoursThisMonth}
      initialWeightsThisMonth={weightsThisMonth}
      user={user}
      initialSessions={sessions || []}
    ></DashboardPage>
  );
}
