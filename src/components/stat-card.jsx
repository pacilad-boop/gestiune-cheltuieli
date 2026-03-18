import { formatCurrency } from "../utils/formatCurrency";

export function StatCard({ title, amount, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-green-500 bg-green-500/10",
    red: "text-red-500 bg-red-500/10",
    amber: "text-amber-500 bg-amber-500/10",
  };

  return (
    <div className="bg-[#12141c] p-6 rounded-3xl border border-gray-800 hover:border-gray-700 transition-all group">
      <div
        className={`w-12 h-12 rounded-2xl ${colors[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon size={24} />
      </div>

      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h4 className="text-2xl font-bold mt-1 text-white">
        {formatCurrency(amount)}
      </h4>
    </div>
  );
}