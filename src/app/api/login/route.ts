import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const data = await request.json();
  const {email, password, full_name} = data
  
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
  if (!full_name) {
    return Response.json(
      { success: false, data: "Please provide an valid name" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    if (error.message === "Invalid login credentials") {
      return Response.json(
        { success: false, data: "Incorrect credentials provided." },
        { status: 400 }
      );
    }
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
