CREATE INDEX exercises_user_id_idx ON public.exercises (user_id);
CREATE INDEX session_exercises_exercise_id_idx ON public.session_exercises (exercise_id);
CREATE INDEX session_exercises_session_id_idx ON public.session_exercises(session_id);
CREATE INDEX session_sets_session_exercise_id_idx ON public.session_sets(session_exercise_id);
CREATE INDEX sessions_user_id_idx ON public.sessions (user_id);
CREATE INDEX sessions_workout_id_idx ON public.sessions (workout_id);
CREATE INDEX workouts_user_id_idx ON public.workouts (user_id);