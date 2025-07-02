export function Summary({
  workoutsThisMonth,
  hoursThisMonth,
  weightsThisMonth,
}: {
  workoutsThisMonth: number;
  hoursThisMonth: number;
  weightsThisMonth: number;
}) {
  const avgSessionsPerWeek =
    workoutsThisMonth > 0 ? Math.round((workoutsThisMonth / 4) * 10) / 10 : 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Workouts Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {workoutsThisMonth}
        </div>
        <div className="text-sm text-slate-400">Workouts Completed</div>
      </div>

      {/* Hours Card */}
      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-400/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {hoursThisMonth > 1
            ? `${(hoursThisMonth / 60).toPrecision(3)}h`
            : `${hoursThisMonth} mins`}
        </div>
        <div className="text-sm text-slate-400">Training Time</div>
      </div>

      {/* Weight Card */}
      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {weightsThisMonth}
        </div>
        <div className="text-sm text-slate-400">Total Weight Lifted</div>
      </div>

      {/* Weekly Average Card */}
      <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 hover:border-orange-400/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-orange-500/20 rounded-lg">
            <svg
              className="w-6 h-6 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {avgSessionsPerWeek}
        </div>
        <div className="text-sm text-slate-400">Sessions/Week</div>
      </div>
    </div>
  );
}
