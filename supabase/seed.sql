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
    'fd76e705-84df-42da-9a71-1fc6a0e215a4',
    'playwright@easy-task.com',
    '$2a$10$wlgX6zexWB9xE5NhgKUBGuK35ZqXRC6xb/KeVd5WWgu2fYCh8/k62',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '{"sub": "fd76e705-84df-42da-9a71-1fc6a0e215a4","email": "playwright@easy-task.com","last_name": "Test","first_name": "Playwright","email_verified": true,"phone_verified": false}',
    '',
    '',
    '',
    '',
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'f6508257-5947-4835-a711-979cf0330777',
    'jcru0005@student.monash.edu',
    '$2a$10$wlgX6zexWB9xE5NhgKUBGuK35ZqXRC6xb/KeVd5WWgu2fYCh8/k62',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '{"sub": "f6508257-5947-4835-a711-979cf0330777","email": "jcru0005@student.monash.edu","last_name": "C","first_name": "Jesse","email_verified": true,"phone_verified": false}',
    '',
    '',
    '',
    '',
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b',
    'klee0081@student.monash.edu',
    '$2a$10$wlgX6zexWB9xE5NhgKUBGuK35ZqXRC6xb/KeVd5WWgu2fYCh8/k62',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '{"sub": "f2c1be6b-25da-40f3-8fe1-8ec45ed5319b","email": "klee0081@student.monash.edu","last_name": "L","first_name": "Khanh","email_verified": true,"phone_verified": false}',
    '',
    '',
    '',
    '',
    NULL
  ),
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
    'fd76e705-84df-42da-9a71-1fc6a0e215a4',
    'fd76e705-84df-42da-9a71-1fc6a0e215a4',
    'email',
    '{"sub": "fd76e705-84df-42da-9a71-1fc6a0e215a4","email": "playwright@easy-task.com","last_name": "Test","first_name": "Playwright","email_verified": true,"phone_verified": false}',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'bfe88d4c-f64b-4407-aab2-d321bb3724e8'
  ),
  (
    'f6508257-5947-4835-a711-979cf0330777',
    'f6508257-5947-4835-a711-979cf0330777',
    'email',
    '{"sub": "f6508257-5947-4835-a711-979cf0330777","email": "jcru0005@student.monash.edu","last_name": "C","first_name": "Jesse","email_verified": true,"phone_verified": false}',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'd7dda800-8692-42e4-a7fb-6ec1d200a5e3'
  ),
  (
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b',
    'email',
    '{"sub": "f2c1be6b-25da-40f3-8fe1-8ec45ed5319b","email": "klee0081@student.monash.edu","last_name": "L","first_name": "Khanh","email_verified": true,"phone_verified": false}',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    '2024-09-24 10:07:51.296459 +00:00',
    'ab2dab34-2d67-48b5-8edf-83dfa35f70cd'
  ),
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

-- Insert workouts for each user
INSERT INTO
  workouts(
    workout_id,
    workout_name,
    workout_description,
    user_id
  )
VALUES
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Push Day',
    'Upper body pushing exercises',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'Pull Day',
    'Upper body pulling exercises',
    'f6508257-5947-4835-a711-979cf0330777'
  ),
  (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Leg Day',
    'Lower body workout',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b'
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
  -- Jesse's exercises
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    'Pull-up',
    'Vertical pulling movement',
    'f6508257-5947-4835-a711-979cf0330777'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Push-up',
    'Horizontal pushing movement from floor',
    'f6508257-5947-4835-a711-979cf0330777'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    'Plank',
    'Core stabilization exercise',
    'f6508257-5947-4835-a711-979cf0330777'
  ),
  -- Khanh's exercises
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    'Bicep Curl',
    'Curl dumbbell toward shoulder',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    'Shoulder Press',
    'Press weight overhead from shoulders',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b'
  ),
  (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Lat Pulldown',
    'Pull bar down to chest level',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b'
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
  -- Chongjie's sessions
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Push Workout',
    '2025-04-02 08:00:00',
    '2025-04-02 10:15:00',
    'Great workout, increased bench by 5kg',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    'Leg Workout',
    '2025-04-01 07:30:00',
    '2025-04-01 08:45:00',
    'Feeling stronger on squats',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  -- Jesse's sessions
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'Pull Workout',
    '2025-04-03 17:00:00',
    '2025-04-03 18:00:00',
    'Did 3 pull-ups unassisted!',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Push Workout',
    '2025-04-19 18:00:00',
    '2025-04-19 19:15:00',
    'Core is getting stronger',
    '0d2b54fe-4b28-40f8-adfc-c269c75e3154'
  ),
  -- Khanh's sessions
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Push Workout',
    '2025-03-17 12:00:00',
    '2025-03-17 13:00:00',
    'Arms are pumped',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b'
  ),
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Push Workout',
    '2025-03-20 11:30:00',
    '2025-03-20 12:45:00',
    'Shoulder press felt good',
    'f2c1be6b-25da-40f3-8fe1-8ec45ed5319b'
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
  -- Chongjie's session exercises
  (
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1
  ),
  (
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    1
  ),
  -- Jesse's session exercises
  (
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    1
  ),
  (
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    1
  ),
  -- Khanh's session exercises
  (
    'a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    1
  ),
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    1
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
  -- Chongjie's bench press sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    1,
    80,
    10,
    90,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    2,
    85,
    8,
    90,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    3,
    90,
    6,
    120,
    'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  -- Chongjie's squat sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
    1,
    100,
    8,
    120,
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
    2,
    110,
    6,
    120,
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
    3,
    115,
    4,
    150,
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
  ),
  -- Jesse's pull-up sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
    1,
    0,
    3,
    60,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a21'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    2,
    0,
    2,
    60,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a21'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
    3,
    0,
    2,
    60,
    'a3eebc99-9c0b-4ef8-bb6d-6bb9bd380a21'
  ),
  -- Jesse's plank sets (weight is null, using time instead)
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
    1,
    NULL,
    60,
    30,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
    2,
    NULL,
    45,
    30,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
    3,
    NULL,
    30,
    30,
    'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'
  ),
  -- Khanh's bicep curl sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
    1,
    15,
    12,
    60,
    'a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a31'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
    2,
    17,
    10,
    60,
    'a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a31'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    3,
    20,
    8,
    60,
    'a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a31'
  ),
  -- Khanh's shoulder press sets
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a34',
    1,
    25,
    10,
    90,
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a32'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a35',
    2,
    27,
    8,
    90,
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a32'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
    3,
    30,
    6,
    90,
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a32'
  );