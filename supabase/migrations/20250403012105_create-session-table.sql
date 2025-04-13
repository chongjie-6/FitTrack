CREATE TABLE sessions (
    session_id uuid DEFAULT gen_random_uuid(),
    workout_id uuid NULL REFERENCES WORKOUTS ON DELETE CASCADE,
    session_name text NULL DEFAULT format(''),
    session_start_date timestamptz NOT NULL DEFAULT now(),
    session_end_date timestamptz NULL,
    session_notes text NULL,
    user_id uuid NOT NULL REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY(session_id)
);

ALTER TABLE
    PUBLIC.SESSIONS ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create or modify their sessions" ON SESSIONS FOR ALL TO AUTHENTICATED USING (
    (
        SELECT
            AUTH.UID()
    ) = USER_ID
) WITH CHECK (
    (
        SELECT
            AUTH.UID()
    ) = USER_ID
);