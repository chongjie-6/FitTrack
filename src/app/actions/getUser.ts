"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default async function getUser(): Promise<User> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      redirect("/login");
    }

    return data.user;
  } catch (error) {
    console.error("Error getting user:", error);
    redirect("/login");
  }
}
