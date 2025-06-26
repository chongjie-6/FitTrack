import { unstable_cache } from "next/cache";
import { Tables } from "../../../../database.types";
import getUser from "../getUser";

export async function fetchTrainingTime(sessions: Array<Tables<"sessions">>) {
  // Verify user
  await getUser();

  try {
    const fetchData = async () => {
      // Once we have fetched all data, we can run a function to update the training time
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      // Filter only the workouts that are started this month
      const workoutsThisMonth = sessions.filter(
        (workout: Tables<"sessions">) =>
          workout.session_start_date &&
          new Date(workout.session_start_date).getMonth() === currentMonth &&
          new Date(workout.session_start_date).getFullYear() === currentYear
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
      return {
        hoursThisMonth: totalTrainingTime,
        workoutsThisMonth: workoutsThisMonth.length,
      };
    };
    const data = unstable_cache(fetchData, [], {
      tags: ["summary"],
      revalidate: 3600,
    });
    return data();
  } catch (e) {
    throw new Error(e as string);
  }
}
