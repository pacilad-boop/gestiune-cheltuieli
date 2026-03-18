import { formatCurrency } from "../utils/formatCurrency";

export function GoalItem({ label, current, target, color }) {
  const progress = Math.min((current / target) * 100, 100);

  const barColors = {
    green: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]",
    blue: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]",
    amber: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  };

  return (
    <div className="space-y-3 p-4 bg-gray-900/30 rounded-2xl border border-gray-800/50">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {label}
          </p>
          <p className="text-sm font-bold text-white mt-0.5">
            {formatCurrency(current)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-600 uppercase">Tinta</p>
          <p className="text-xs font-bold text-gray-400">
            {formatCurrency(target)}
          </p>
        </div>
      </div>

      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColors[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}