import Link from "next/link";

export default function email_confirmation() {
  return (
    <div className="w-full h-screen flex items-center justify-center -translate-y-20">
      <div className="border-2 w-xs sm:w-md items-center text-center rounded-sm p-10">
        <h1>
          An email has been sent to the associated account. Please confirm sign
          up.
        </h1>
        <Link href={"/login"} className="text-blue-500 hover:text-blue-400">Login</Link>
      </div>
    </div>
  );
}
