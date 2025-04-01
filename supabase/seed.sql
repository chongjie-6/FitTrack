-- Seed file for Fitness App

-- Insert test users into auth.users
-- This will trigger the function to populate the users table
INSERT INTO auth.users (id, email, encrypted_password, raw_user_meta_data)
VALUES
  ('0d2b54fe-4b28-40f8-adfc-c269c75e3154', 'john.doe@example.com', 'password_hash', '{"first_name": "John", "last_name": "Doe"}'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'jane.smith@example.com', 'password_hash', '{"first_name": "Jane", "last_name": "Smith"}'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'mike.jones@example.com', 'password_hash', '{"first_name": "Mike", "last_name": "Jones"}');

-- Insert exercises for each user
INSERT INTO exercises (exercise_id, exercise_name, exercise_description, user_id)
VALUES
  -- John's exercises
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Bench Press', 'Lie on bench and press barbell upward', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Squat', 'Barbell squat with weight on shoulders', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Deadlift', 'Lift barbell from floor to hip level', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  
  -- Jane's exercises
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Pull-up', 'Vertical pulling movement', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Push-up', 'Horizontal pushing movement from floor', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'Plank', 'Core stabilization exercise', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  
  -- Mike's exercises
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'Bicep Curl', 'Curl dumbbell toward shoulder', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'Shoulder Press', 'Press weight overhead from shoulders', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Lat Pulldown', 'Pull bar down to chest level', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13');

-- Insert templates for each user
INSERT INTO templates (template_id, template_name, template_description, user_id)
VALUES
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Push Day', 'Upper body pushing exercises', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Pull Day', 'Upper body pulling exercises', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Leg Day', 'Lower body workout', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13');

-- Insert workout sessions
INSERT INTO sessions (session_id, session_start_date, session_end_date, session_notes, user_id)
VALUES
  -- John's sessions
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2025-03-15 08:00:00', '2025-03-15 09:15:00', 'Great workout, increased bench by 5kg', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '2025-03-18 07:30:00', '2025-03-18 08:45:00', 'Feeling stronger on squats', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  
  -- Jane's sessions
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', '2025-03-16 17:00:00', '2025-03-16 18:00:00', 'Did 3 pull-ups unassisted!', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '2025-03-19 18:00:00', '2025-03-19 19:15:00', 'Core is getting stronger', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  
  -- Mike's sessions
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', '2025-03-17 12:00:00', '2025-03-17 13:00:00', 'Arms are pumped', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', '2025-03-20 11:30:00', '2025-03-20 12:45:00', 'Shoulder press felt good', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13');

-- Insert sets for each session
INSERT INTO session_sets (set_id, set_number, set_weight, set_reps, set_rest_time, exercise_id, session_id, user_id)
VALUES
  -- John's bench press sets
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 1, 80, 10, 90, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 2, 85, 8, 90, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 3, 90, 6, 120, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),

  -- John's squat sets
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 1, 100, 8, 120, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 2, 110, 6, 120, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 3, 115, 4, 150, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', '0d2b54fe-4b28-40f8-adfc-c269c75e3154'),

  -- Jane's pull-up sets
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 1, 0, 3, 60, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 2, 0, 2, 60, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 3, 0, 2, 60, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),

  -- Jane's plank sets (weight is null, using time instead)
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 1, NULL, 60, 30, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 2, NULL, 45, 30, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 3, NULL, 30, 30, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),

  -- Mike's bicep curl sets
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 1, 15, 12, 60, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 2, 17, 10, 60, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 3, 20, 8, 60, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),

  -- Mike's shoulder press sets
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', 1, 25, 10, 90, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 2, 27, 8, 90, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a36', 3, 30, 6, 90, 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13');