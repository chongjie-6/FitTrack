import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { SkeletonPage } from "@/components/ui/skeleton_page";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Fitness Tracker",
  description: "Track your workouts today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <Toaster></Toaster>
        <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
      </body>
    </html>
  );
}
