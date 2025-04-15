import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  // Attempts to create a user
  
  const data = await request.json();
  const { email, password, first_name, last_name } = data

  // Basic validation
  if (!email) {
    return Response.json(
      { success: false, data: "Please provide an email address" },
      { status: 400 }
    );
  }
  if (!password) {
    return Response.json(
      { success: false, data: "Please provide a valid password" },
      { status: 400 }
    );
  }
  if (!first_name) {
    return Response.json(
      { success: false, data: "Please provide an valid first name" },
      { status: 400 }
    );
  }
  if (!first_name) {
    return Response.json(
      { success: false, data: "Please provide an valid last name" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
      }
    }
  });

  if (error && error.status == 422){
    return Response.json(
      {
        success: false,
        data: "User with that email already exists.",
      },
      { status: 422 }
    );
  }

  if (error) {
    return Response.json(
      {
        success: false,
        data: "Unable to register at this time. Please try again later.",
      },
      { status: 400 }
    );
  }

  return Response.json(
    { success: true, data: "Registering..." },
    { status: 200 }
  );
}
