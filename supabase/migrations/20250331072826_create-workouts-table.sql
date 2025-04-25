BEGIN;

CREATE TABLE workouts (
    workout_id UUID DEFAULT gen_random_uuid(),
    workout_name TEXT NOT NULL DEFAULT '',
    workout_description TEXT NULL,
    user_id UUID REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY (workout_id)
);

ALTER TABLE
    workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can create workouts" ON workouts FOR ALL TO authenticated USING ((auth.uid()) = user_id) WITH CHECK ((auth.uid()) = user_id);

COMMIT;