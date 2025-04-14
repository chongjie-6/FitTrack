import React from "react";
export function Summary({
  workoutsThisMonth,
  hoursThisMonth,
  weightsThisMonth,
}: {
  workoutsThisMonth: number | null | undefined;
  hoursThisMonth: number | null | undefined;
  weightsThisMonth: number | null | undefined;
}) {
  return (
    <div className="summary_layout">
      <div className="summary_box">
        <h2 className="font-medium">Workouts</h2>
        <div>
          <span className="summary_main_text">{workoutsThisMonth}</span>
          <span>This Month</span>
        </div>
      </div>
      <div className="summary_box">
        <h2 className="font-medium">Training Time</h2>
        <div>
          <span className="summary_main_text">{hoursThisMonth}h</span>
          <span>This Month</span>
        </div>
      </div>
      <div className="summary_box">
        <h2 className="font-medium">Weight</h2>
        <div>
          <span className="summary_main_text">{weightsThisMonth}</span>
          <span>Kgs Lifted</span>
        </div>
      </div>
    </div>
  );
}
