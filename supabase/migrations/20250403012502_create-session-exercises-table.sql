CREATE TABLE session_exercises (
    session_exercise_id uuid DEFAULT gen_random_uuid(),
    session_id uuid NOT NULL REFERENCES SESSIONS ON DELETE CASCADE,
    exercise_id uuid NOT NULL REFERENCES EXERCISES ON DELETE CASCADE,
    session_exercise_order INTEGER NOT NULL,
    PRIMARY KEY(session_exercise_id)
);

ALTER TABLE
    session_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access their session exercises" ON session_exercises FOR ALL TO authenticated USING (
    session_id IN (
        SELECT
            session_id
        FROM
            sessions
        WHERE
            user_id = (
                SELECT
                    auth.uid()
            )
    )
) WITH CHECK (
    session_id IN (
        SELECT
            session_id
        FROM
            sessions
        WHERE
            user_id = (
                SELECT
                    auth.uid()
            )
    )
);

CREATE
OR REPLACE FUNCTION public.set_exercise_order() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = " " AS $$ BEGIN NEW.session_exercise_order = COALESCE(
        (
            SELECT
                MAX(session_exercise_order) + 1
            FROM
                session_exercises
            WHERE
                session_id = NEW.session_id
        ),
        0
    );

RETURN NEW;

END;

$$;

CREATE
OR REPLACE TRIGGER set_exercise_order BEFORE
INSERT
    ON session_exercises FOR EACH ROW EXECUTE FUNCTION public.set_exercise_order();