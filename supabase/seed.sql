-- Seed file for Fitness App
-- Insert test users into auth.users
-- This will trigger the function to populate the users table
INSERT INTO
  auth.users (
    instance_id,
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    role,
    aud,
    raw_app_meta_data,
    raw_user_meta_data,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    is_super_admin
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb',
    'oagu0001@student.monash.edu',
    '$2a$10$wlgX6zexWB9xE5NhgKUBGuK35ZqXRC6xb/KeVd5WWgu2fYCh8/k62',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '{"sub": "378fc432-b330-46dc-87ff-62bb2f24ccbb","email": "oagu0001@student.monash.edu","last_name": "A","first_name": "Elijah","email_verified": true,"phone_verified": false}',
    '',
    '',
    '',
    '',
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154',
    'cche0204@student.monash.edu',
    '$2a$10$wlgX6zexWB9xE5NhgKUBGuK35ZqXRC6xb/KeVd5WWgu2fYCh8/k62',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '{"sub": "0d2b54fe-4b28-40f8-adfc-c269c75e3154","email": "cche0204@student.monash.edu","last_name": "C","first_name": "Chongjie","email_verified": true,"phone_verified": false}',
    '',
    '',
    '',
    '',
    NULL
  );

INSERT INTO
  "auth"."identities" (
    user_id,
    provider_id,
    provider,
    identity_data,
    last_sign_in_at,
    created_at,
    updated_at,
    id
  )
VALUES
  (
    '378fc432-b330-46dc-87ff-62bb2f24ccbb',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb',
    'email',
    '{"sub": "378fc432-b330-46dc-87ff-62bb2f24ccbb","email": "oagu0001@student.monash.edu","last_name": "A","first_name": "Elijah","email_verified": true,"phone_verified": false}',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '3c0b8a80-a862-4220-803f-331fafa7d59a'
  ),
  (
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154',
    'email',
    '{"sub": "0d2b54fe-4b28-40f8-adfc-c269c75e3154","email": "cche0204@student.monash.edu","last_name": "C","first_name": "Chongjie","email_verified": true,"phone_verified": false}',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'abdf6a65-c4b4-4552-a9bf-818aee68ff7a'
  );

-- Insert workouts for users
INSERT INTO
  workouts(
    workout_id,
    workout_name,
    workout_description,
    user_id
  )
VALUES
  -- Elijah's workouts
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Upper Body',
    'Focus on chest, shoulders, and triceps',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb'
  ),
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'Lower Body',
    'Quads, hamstrings, and calves',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb'
  ),
  -- Chongjie's workouts
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Push Day',
    'Upper body pushing exercises',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'Pull Day',
    'Upper body pulling exercises',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    'Leg Day',
    'Lower body workout',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  );

-- Insert exercises for each user
INSERT INTO
  exercises (
    exercise_id,
    exercise_name,
    exercise_description,
    user_id
  )
VALUES
  -- Elijah's exercises
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'Barbell Rows',
    'Bent over row with barbell',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    'Leg Press',
    'Machine press for quads and hamstrings',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
    'Overhead Press',
    'Standing press with barbell',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb'
  ),
  -- Chongjie's exercises
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Bench Press',
    'Lie on bench and press barbell upward',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'Squat',
    'Barbell squat with weight on shoulders',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Deadlift',
    'Lift barbell from floor to hip level',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'Pull-up',
    'Vertical pulling movement',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    'Push-up',
    'Horizontal pushing movement from floor',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    'Plank',
    'Core stabilization exercise',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  );

-- Insert workout sessions
INSERT INTO
  sessions (
    session_id,
    workout_id,
    session_name,
    session_start_date,
    session_end_date,
    session_notes,
    user_id
  )
VALUES
  -- Elijah's sessions
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Morning Upper Body',
    '2025-04-01 06:30:00',
    '2025-04-01 07:45:00',
    'Great pump today',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb'
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'Leg Session',
    '2025-04-03 17:00:00',
    '2025-04-03 18:30:00',
    'Pushing for new PR',
    '378fc432-b330-46dc-87ff-62bb2f24ccbb'
  ),
  -- Chongjie's sessions
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Push Workout',
    '2025-04-02 08:00:00',
    '2025-04-02 10:15:00',
    'Great workout, increased bench by 5kg',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    'Leg Workout',
    '2025-04-01 07:30:00',
    '2025-04-01 08:45:00',
    'Feeling stronger on squats',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'Pull Workout',
    '2025-04-04 16:00:00',
    '2025-04-04 17:30:00',
    'Back is feeling stronger',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Push Workout',
    '2025-03-25 09:00:00',
    '2025-03-25 10:30:00',
    'Chest feels great',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  );

-- Insert session exercises
INSERT INTO
  session_exercises (
    session_exercise_id,
    session_id,
    exercise_id,
    session_exercise_order
  )
VALUES
  -- Elijah's session exercises
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    1
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
    2
  ),
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    1
  ),
  -- Chongjie's session exercises
  (
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1
  ),
  (
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    2
  ),
  (
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    1
  ),
  (
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    1
  ),
  (
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    2
  ),
  (
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1
  ),
  (
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    2
  ),
  (
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    3
  );

-- Insert sets for each session exercise
INSERT INTO
  session_sets (
    set_id,
    set_number,
    set_weight,
    set_reps,
    set_rest_time,
    session_exercise_id
  )
VALUES
  -- Elijah's barbell rows sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
    1,
    70,
    12,
    90,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
    2,
    75,
    10,
    90,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
    3,
    80,
    8,
    120,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01'
  ),
  -- Elijah's overhead press sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
    1,
    50,
    10,
    90,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a05',
    2,
    55,
    8,
    90,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a06',
    3,
    60,
    6,
    120,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02'
  ),
  -- Elijah's leg press sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a07',
    1,
    150,
    12,
    120,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a08',
    2,
    170,
    10,
    120,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a09',
    3,
    190,
    8,
    150,
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03'
  ),
  -- Chongjie's bench press sets
  (
    'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1,
    80,
    10,
    90,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    2,
    85,
    8,
    90,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    3,
    90,
    6,
    120,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  -- Chongjie's push-up sets
  (
    'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    1,
    0,
    20,
    60,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    2,
    0,
    15,
    60,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e1eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    3,
    0,
    15,
    60,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  -- Chongjie's squat sets
  (
    'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1,
    100,
    8,
    120,
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    2,
    110,
    6,
    120,
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    3,
    115,
    4,
    150,
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  -- Chongjie's pull-up sets
  (
    'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1,
    0,
    8,
    90,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    2,
    0,
    6,
    90,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    3,
    0,
    5,
    90,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  -- Chongjie's deadlift sets
  (
    'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    1,
    120,
    8,
    180,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    2,
    130,
    6,
    180,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    3,
    140,
    4,
    180,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  -- Chongjie's bench press sets (other session)
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1,
    75,
    10,
    90,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    2,
    80,
    8,
    90,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    3,
    85,
    6,
    120,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  -- Chongjie's push-up sets (other session)
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    1,
    0,
    15,
    60,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    2,
    0,
    12,
    60,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    3,
    0,
    10,
    60,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  -- Chongjie's plank sets
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
    1,
    NULL,
    60,
    30,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
    2,
    NULL,
    45,
    30,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
    3,
    NULL,
    30,
    30,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'
  );