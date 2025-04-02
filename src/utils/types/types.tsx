// User related types
export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
};

// Exercise related types
export type Exercise = {
  exercise_id: string;
  exercise_name: string;
  exercise_description: string;
  user_id: string;
};

// Template related types
export type Template = {
  template_id: string;
  template_name: string;
  template_description: string;
  user_id: string;
};

// Session related types
export type Session = {
  session_id: string;
  session_name: string;
  session_start_date: Date;
  session_end_date: Date;
  session_notes: string | null;
  user_id: string;
};

// Set related types
export type SessionSet = {
  set_id: string;
  set_number: number;
  set_weight: number | null; // Can be null for bodyweight exercises like plank
  set_reps: number;
  set_rest_time: number;
  exercise_id: string;
  session_id: string;
  user_id: string;
};

// Authentication related types
export type AuthUser = {
  instance_id: string;
  id: string;
  email: string;
  encrypted_password: string;
  email_confirmed_at: string;
  created_at: string;
  updated_at: string;
  role: string;
  aud: string;
  raw_app_meta_data: string;
  raw_user_meta_data: string;
  confirmation_token: string;
  recovery_token: string;
  email_change_token_new: string;
  email_change: string;
  is_super_admin: boolean | null;
};

export type Identity = {
  user_id: string;
  provider_id: string;
  provider: string;
  identity_data: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  id: string;
};

// User metadata from auth.users
export type UserMetadata = {
  sub: string;
  email: string;
  last_name: string;
  first_name: string;
  email_verified: boolean;
  phone_verified: boolean;
};

// App metadata from auth.users
export type AppMetadata = {
  provider: string;
  providers: string[];
};