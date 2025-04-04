CREATE TABLE session_exercises (
    session_exercise_id uuid DEFAULT gen_random_uuid(),
    session_id uuid NOT NULL REFERENCES SESSIONS ON DELETE CASCADE,
    exercise_id uuid NOT NULL REFERENCES EXERCISES ON DELETE CASCADE,
    session_exercise_order INTEGER NOT NULL,
    PRIMARY KEY(session_exercise_id)
);

ALTER TABLE
    session_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access their session exercises" ON session_exercises 
FOR ALL TO authenticated
USING (
    session_id IN (
        SELECT session_id FROM sessions WHERE user_id = auth.uid()
    )
) 
WITH CHECK (
    session_id IN (
        SELECT session_id FROM sessions WHERE user_id = auth.uid()
    )
);