import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { SkeletonPage } from "@/components/ui/skeleton_page";
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
        <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
      </body>
    </html>
  );
}
