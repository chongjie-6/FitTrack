DROP TABLE IF EXISTS EXERCISES CASCADE;
CREATE TABLE EXERCISES (
    exercise_id uuid DEFAULT gen_random_uuid(),
    exercise_name text NOT NULL DEFAULT format(''),
    exercise_description text null,
    user_id uuid NOT NULL references users on delete cascade,
    PRIMARY KEY (exercise_id)
);

ALTER TABLE
    exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can create exercises" ON EXERCISES FOR ALL TO AUTHENTICATED USING (
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