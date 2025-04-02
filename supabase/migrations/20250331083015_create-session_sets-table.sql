CREATE TABLE session_sets (
    set_id uuid DEFAULT gen_random_uuid(),
    set_number INTEGER NOT NULL,
    set_weight INTEGER NULL,
    set_reps INTEGER NULL,
    set_rest_time INTEGER NULL,
    exercise_id uuid NOT NULL REFERENCES exercises ON DELETE
    SET
        NULL,
        session_id uuid NOT NULL REFERENCES sessions ON DELETE
    SET
        NULL,
        user_id uuid NOT NULL REFERENCES users ON DELETE CASCADE,
        PRIMARY KEY (set_id)
);

ALTER TABLE
    session_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can create sets for their sessions" ON session_sets FOR ALL TO AUTHENTICATED USING (
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