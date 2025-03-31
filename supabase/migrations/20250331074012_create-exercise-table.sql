CREATE TABLE exercises (
    exercise_id uuid DEFAULT gen_random_uuid(),
    exercise_name text NULL,
    exercise_description text null,
    user_id uuid NOT NULL references users on delete cascade,
    PRIMARY KEY (exercise_id)
);

ALTER TABLE
    exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can create exercises" ON SESSIONS FOR ALL TO AUTHENTICATED;