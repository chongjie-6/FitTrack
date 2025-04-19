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
import { useState } from "react";
import { useRouter } from "next/navigation";

type RegisterFormProps = {
  registerAction: (params: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => Promise<{
    success: boolean;
    data: string;
  }>;
};

export default function RegisterForm({ registerAction }: RegisterFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must contain more than 8 characters" })
      .max(30, { message: "Password must contain less than 30 characters" }),
    first_name: z
      .string()
      .min(2, { message: "First name must be longer than 2 characters" })
      .max(30, { message: "First name must be shorter than 30 characters" }),
    last_name: z
      .string()
      .min(2, { message: "Last name must be longer than 2 characters" })
      .max(30, { message: "Last name must be shorter than 30 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError("");

      const response = registerAction({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
      });
      if (!(await response).success) {
        setError((await response).data || "Register failed. Please try again.");
        return;
      }
      if ((await response).success) {
        router.push("/email_confirmation");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Register error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <FormMessage> {<h3 className="text-red-400">{error}</h3>}</FormMessage>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
