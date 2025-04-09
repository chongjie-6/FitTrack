CREATE TABLE session_sets (
    set_id uuid DEFAULT gen_random_uuid(),
    set_number INTEGER NOT NULL,
    set_weight INTEGER NOT NULL DEFAULT 0,
    set_reps INTEGER NULL,
    set_rest_time INTEGER NULL,
    session_exercise_id uuid references session_exercises ON DELETE CASCADE
);

ALTER TABLE
    session_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access their session sets" ON session_sets FOR ALL TO authenticated USING (
    session_exercise_id IN (
        SELECT
            session_exercise_id
        FROM
            sessions
        WHERE
            session_id IN (
                SELECT
                    session_id
                FROM
                    sessions
                WHERE
                    user_id = auth.uid()
            )
    )
) WITH CHECK (
    session_exercise_id IN (
        SELECT
            session_exercise_id
        FROM
            sessions
        WHERE
            session_id IN (
                SELECT
                    session_id
                FROM
                    sessions
                WHERE
                    user_id = auth.uid()
            )
    )
);