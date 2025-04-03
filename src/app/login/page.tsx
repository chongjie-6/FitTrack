"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");
  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginClick = () => {
    const loginButton = document.getElementById("login_btn");
    if (loginButton) {
      loginButton.innerHTML = "Logging you in...";
    }
  };

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.data);
      const loginButton = document.getElementById("login_btn");
      if (loginButton) {
        loginButton.innerHTML = "Log In";
      }

      return;
    }

    router.push("/dashboard");
  };
  return (
    <div className="form-container ">
      <div className="text-center w-xs sm:w-lg">
        <section className="sm:border-gray-200 sm:border-2 sm:p-10 rounded-md">
          <h1 className="text-3xl font-semibold">Login</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {<h3 className="text-red-400">{error}</h3>}
              <Button
                type="submit"
                className="w-full"
                id="login_btn"
                onClick={onLoginClick}
              >
                Log In
              </Button>
            </form>
          </Form>
        </section>
        <div className="flex flex-col items-center mt-5 sm:border-gray-200 sm:border-2 sm:p-5 rounded-md">
          <p>Don&apos;t have an account? </p>
          <Link
            href={"/register"}
            className="text-blue-500 hover:text-blue-400"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
