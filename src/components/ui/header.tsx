import Link from "next/link";
import React from "react";

export function Header() {
  return <header className="top-0 left-0 right-0 bg-gray-300 shadow-md z-50 border-b-2 ">
        <nav className="flex items-center justify-around h-16 sm:h-20">
          <p className="text-xl sm:text-3xl font-bold">
            <span className="text-blue-600">Fit</span>
            <span className="text-red-600">Track</span>
          </p>
          <Link href={"/login"} className="btn p-3 border-2 bg-blue-200 rounded-full">
            Login
          </Link>
        </nav>
      </header>;
}
  