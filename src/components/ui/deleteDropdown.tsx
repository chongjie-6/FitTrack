"use client";
import React from "react";
export function DeleteDropdown({
  handleDropDown,
  session_id,
}: {
  handleDropDown: (session_id: string) => void;
  session_id: string;
}) {
  return (
    <div
      className="absolute top-6 right-3 cursor-pointer hover:border border-black rounded-xl hover:bg-gray-400 transition-colors"
      onClick={() => {
        handleDropDown(session_id);
      }}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        aria-label="Options"
      >
        <circle cx="12" cy="6" r="2" fill="black" />
        <circle cx="12" cy="12" r="2" fill="black" />
        <circle cx="12" cy="18" r="2" fill="black" />
      </svg>
    </div>
  );
}
