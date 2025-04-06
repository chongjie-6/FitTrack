// User related types
export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

// Exercise related types
export type Exercise = {
  exercise_id: string;
  exercise_name: string;
  exercise_description: string;
  user_id: string;
};

// Session related types
export type Session = {
  session_id: string;
  session_name: string;
  session_start_date: Date;
  session_end_date: Date;
  session_notes: string | null;
  user_id: string;
  workout_id: string;
};

// Set related types
export type SessionSet = {
  set_id: string;
  set_number: number;
  set_weight: number | null; // Can be null for bodyweight exercises like plank
  set_reps: number;
  set_rest_time: number;
  session_exercise_id: string;
};

export type SessionExercises = {
  session_exercise_id: string;
  session_id: string;
  exercise_id: string;
  session_exercise_order: number;
};

export type Workouts = {
  workout_id: string;
  workout_name: string;
  workout_description: string;
  user_id: string;
};

export type SessionInfo = {
  session_exercises: Array<
    SessionExercises & { exercises: Exercise } & {session_sets: Array<SessionSet>}
  >;
};
