import { useState } from "react";
import { Tables } from "../../../database.types";
import { modifySetAction } from "@/app/actions/session_sets/modifySessionSet";
import { removeSetAction } from "@/app/actions/session_sets/removeSessionSet";

export default function SetFields({
  session_id,
  set,
  index,
}: {
  set: Tables<"session_sets">;
  session_id: string;
  index: number;
}) {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: Tables<"session_sets">,
    field: "set_weight" | "set_reps" | "set_rest_time"
  ) => {
    modifySetAction(
      session_id,
      set.set_id || "",
      Number(e.target.value),
      field
    );
  };

  const [clicked, setClicked] = useState(false);
  const playAnimation = (set_id: string, session_id: string) => {
    setClicked((prev) => !prev);
    setTimeout(() => removeSetAction(set_id || "", session_id), 500);
  };
  return (
    <div
      className={`grid grid-cols-8 bg-gray-700 bg-opacity-30 p-2 rounded text-white font-semibold font-mono ${
        clicked && `animate-slide-left`
      }`}
      key={set.set_id}
    >
      <span className="col-span-1">{index + 1}</span>
      <input
        onChange={(e) => onChange(e, set, "set_weight")}
        type="number"
        className="col-span-2"
        defaultValue={set.set_weight || ""}
        placeholder="0"
      ></input>
      <input
        onChange={(e) => onChange(e, set, "set_reps")}
        type="number"
        className="col-span-2"
        defaultValue={set.set_reps || ""}
        placeholder="0"
      ></input>
      <input
        onChange={(e) => onChange(e, set, "set_rest_time")}
        type="number"
        className="col-span-2"
        defaultValue={set.set_rest_time || ""}
        placeholder="0"
      ></input>
      <svg
        onClick={() => playAnimation(set.set_id || "", session_id)}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="red"
        className="bi bi-x cursor-pointer"
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
      </svg>
    </div>
  );
}
