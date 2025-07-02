import { LoggedInHeader } from "@/components/ui/loggedInHeader";
import { SkeletonPage } from "@/components/ui/skeleton_page";
import { Suspense } from "react";
import getUser from "../actions/getUser";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <>
      <LoggedInHeader user={user} />
      <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
    </>
  );
}
