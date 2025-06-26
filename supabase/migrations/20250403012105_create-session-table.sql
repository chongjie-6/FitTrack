BEGIN;

CREATE TABLE sessions (
    session_id uuid DEFAULT gen_random_uuid(),
    workout_id uuid NULL REFERENCES workouts ON DELETE CASCADE,
    session_name text NULL DEFAULT '',
    session_start_date timestamptz NOT NULL DEFAULT now(),
    session_end_date timestamptz NULL,
    session_notes text NULL,
    user_id uuid NOT NULL REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY(session_id)
);

ALTER TABLE
    sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create or modify their sessions" ON sessions FOR ALL TO authenticated USING ((auth.uid()) = user_id) WITH CHECK ((auth.uid()) = user_id);

COMMIT;