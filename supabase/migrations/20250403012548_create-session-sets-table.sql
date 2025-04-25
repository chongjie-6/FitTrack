CREATE TABLE session_sets (
    set_id uuid DEFAULT gen_random_uuid(),
    set_number INTEGER NOT NULL,
    set_weight INTEGER NULL,
    set_reps INTEGER NULL,
    set_rest_time INTEGER NULL,
    session_exercise_id uuid references session_exercises ON DELETE CASCADE,
    PRIMARY KEY(set_id)
);

ALTER TABLE
    session_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access their session sets" ON session_sets FOR ALL TO authenticated USING (
    session_exercise_id IN (
        SELECT
            se.session_exercise_id
        FROM
            session_exercises se
            JOIN sessions s ON se.session_id = s.session_id
        WHERE
            s.user_id = (SELECT auth.uid())
    )
) WITH CHECK (
    session_exercise_id IN (
        SELECT
            se.session_exercise_id
        FROM
            session_exercises se
            JOIN sessions s ON se.session_id = s.session_id
        WHERE
            s.user_id = (SELECT auth.uid())
    )
);

CREATE
OR REPLACE FUNCTION public.set_set_order() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = public AS $$ BEGIN NEW.set_number = COALESCE(
        (
            SELECT
                MAX(set_number) + 1
            FROM
                session_sets
            WHERE
                session_exercise_id = NEW.session_exercise_id
        ),
        0
    );

RETURN NEW;

END;

$$;

CREATE
OR REPLACE TRIGGER set_set_order BEFORE
INSERT
    ON session_sets FOR EACH ROW EXECUTE FUNCTION public.set_set_order();