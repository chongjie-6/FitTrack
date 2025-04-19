import LoginForm from "@/components/ui/login_form";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | FitTrack",
  description: "Log in to your FitTrack account",
};

async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean; data: string }> {
  "use server";
  if (!email) {
    return { success: false, data: "Please provide an email address" };
  }
  if (!password) {
    return { success: false, data: "Please provide a valid password" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    if (error.message === "Invalid login credentials") {
      return { success: false, data: "Incorrect credentials provided." };
    }
    return {
      success: false,
      data: "Unable to login at this time. Please try again later.",
    };
  }

  return { success: true, data: "Logging you in..." };
}

export default async function LoginPage() {
  // Check if user is already logged in
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl w-full h-full mx-auto p-5 mt-20">
      <LoginForm loginAction={loginAction} />
      <section className="w-full">
        <div className="flex flex-col items-center sm:border-gray-200 rounded-md sm:border-2 mt-5 py-5">
          <p>Don&apos;t have an account? </p>
          <a href="/register" className="text-blue-500 hover:text-blue-400">
            Sign Up
          </a>
        </div>
      </section>
    </div>
  );
}
