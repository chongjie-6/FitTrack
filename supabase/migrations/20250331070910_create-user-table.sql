-- Create the users table
CREATE TABLE users (
    user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    email text NOT NULL,
    first_name text NOT NULL DEFAULT '',
    last_name text NOT NULL DEFAULT '',
    PRIMARY KEY(user_id)
);

-- Enable Row Level Security
ALTER TABLE
    users ENABLE ROW LEVEL SECURITY;

-- Create function to insert a row into users table
CREATE FUNCTION public.create_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = public AS $$ BEGIN
INSERT INTO
    public.users (
        user_id,
        email,
        first_name,
        last_name
    )
VALUES
    (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data ->> 'first_name',
        NEW.raw_user_meta_data ->> 'last_name'
    );

RETURN NEW;

END;

$$;

-- Create trigger to call function when a user is created
CREATE TRIGGER on_user_created
AFTER
INSERT
    ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user();