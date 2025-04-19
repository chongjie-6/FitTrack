import RegisterForm from "@/components/register_form";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Register | FitTrack",
  description: "Register for a FitTrack account",
};

async function registerAction({
  email,
  password,
  first_name,
  last_name,
}: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}): Promise<{ success: boolean; data: string }> {
  "use server";

  // Basic validation
  if (!email) {
    return { success: false, data: "Please provide an email address" };
  }
  if (!password) {
    return { success: false, data: "Please provide a valid password" };
  }
  if (!first_name) {
    return { success: false, data: "Please provide an valid first name" };
  }
  if (!first_name) {
    return { success: false, data: "Please provide an valid last name" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
      },
    },
  });

  if (error && error.status == 422) {
    return {
      success: false,
      data: "User with that email already exists.",
    };
  }

  if (error) {
    return {
      success: false,
      data: "Unable to register at this time. Please try again later.",
    };
  }
  return { success: true, data: "Registering..." };
}

export default async function Register() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="text-center w-full max-w-2xl mx-auto mt-20">
      <section className="sm:border-gray-200 sm:border-2 sm:p-10 rounded-md mt-20 sm:mt-0 p-5">
        <h1 className="text-3xl font-semibold">Register</h1>
        <p className="py-5 text-gray-200">
          Register now to start tracking your workouts today!
        </p>

        <RegisterForm registerAction={registerAction}></RegisterForm>
      </section>
      <div className="flex flex-col items-center mt-5 sm:border-gray-200 sm:border-2 sm:p-5 rounded-md">
        <p>Have an account?</p>
        <Link href={"/login"} className="text-blue-500 hover:text-blue-400">
          Login
        </Link>
      </div>
    </div>
  );
}
