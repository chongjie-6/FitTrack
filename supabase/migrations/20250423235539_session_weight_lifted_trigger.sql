-- Create a function to calculate and update total weight lifted for a session
CREATE
OR REPLACE FUNCTION public.calculate_session_weight_lifted() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = public AS $$ DECLARE session_id_var UUID;

BEGIN -- Determine which session needs updating based on the operation
IF TG_OP = 'DELETE' THEN -- For DELETE operations, get session_id from the session_exercise the set belonged to
SELECT
    se.session_id INTO session_id_var
FROM
    session_exercises se
WHERE
    se.session_exercise_id = OLD.session_exercise_id;

ELSE -- For INSERT or UPDATE operations, get session_id from the related session_exercise
SELECT
    se.session_id INTO session_id_var
FROM
    session_exercises se
WHERE
    se.session_exercise_id = NEW.session_exercise_id;

END IF;

-- Update the total weight lifted (weight * reps) for this session
UPDATE
    sessions
SET
    session_weight_lifted = COALESCE(
        (
            SELECT
                SUM(ss.set_weight * ss.set_reps)
            FROM
                session_sets ss
                JOIN session_exercises se ON ss.session_exercise_id = se.session_exercise_id
            WHERE
                se.session_id = session_id_var
                AND ss.set_weight IS NOT NULL
                AND ss.set_reps IS NOT NULL
        ),
        0
    )
WHERE
    session_id = session_id_var;

RETURN NULL;

END;

$$;

CREATE TRIGGER update_session_weight_lifted
AFTER
INSERT
    OR
UPDATE
    OR DELETE ON session_sets FOR EACH ROW EXECUTE FUNCTION public.calculate_session_weight_lifted();

UPDATE
    sessions s
SET
    session_weight_lifted = COALESCE(
        (
            SELECT
                SUM(ss.set_weight * ss.set_reps)
            FROM
                session_sets ss
                JOIN session_exercises se ON ss.session_exercise_id = se.session_exercise_id
            WHERE
                se.session_id = s.session_id
                AND ss.set_weight IS NOT NULL
                AND ss.set_reps IS NOT NULL
        ),
        0
    );