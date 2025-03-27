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

export default function Register() {
  const router = useRouter()
  const [, setError] = useState("");
  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must contain more than 8 characters" })
      .max(30, { message: "Password must contain less than 30 characters" }),
    full_name: z
      .string()
      .min(2, { message: "Name must be longer than 2 characters" })
      .max(30, { message: "Name must be shorter than 30 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      setError(data.data);
      return;
    }
    await router.push("/login");
  };
  return (
    <div className="form-container">
      <div className="text-center w-xs sm:w-lg">
        <section className="sm:border-gray-200 sm:border-2 sm:p-10 rounded-md">
          <h1 className="text-3xl font-semibold">Register</h1>
          <p className="py-5 text-gray-200">
            Register now to start tracking your workouts today!
          </p>
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
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </section>
        <div className="flex flex-col items-center mt-5 sm:border-gray-200 sm:border-2 sm:p-5 rounded-md">
          <p>Have an account?</p>
          <Link href={"/login"} className="text-blue-500 hover:text-blue-400">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
