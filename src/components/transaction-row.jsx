import { ArrowDownCircle, ArrowUpCircle, Edit2, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export function TransactionRow({ transaction, onDelete, onEdit }) {
  const isPositive = transaction.type === "deposit";

  return (
    <tr className="group hover:bg-gray-800/20 transition-colors">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              transaction.type === "deposit"
                ? "bg-green-500/10 text-green-500"
                : transaction.type === "bill"
                ? "bg-amber-500/10 text-amber-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {transaction.type === "deposit" ? (
              <ArrowUpCircle size={18} />
            ) : (
              <ArrowDownCircle size={18} />
            )}
          </div>

          <span className="font-semibold text-sm text-white">
            {transaction.description}
          </span>
        </div>
      </td>

      <td className="py-4">
        <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-[11px] font-bold uppercase tracking-wider">
          {transaction.category}
        </span>
      </td>

      <td className="py-4 text-sm text-gray-500">
        {new Date(transaction.date).toLocaleDateString("ro-RO")}
      </td>

      <td
        className={`py-4 text-right font-bold text-sm ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </td>

      <td className="py-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(transaction)}
            className="p-2 text-gray-500 hover:text-blue-500 bg-gray-800/50 rounded-lg"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onDelete(transaction.id)}
            className="p-2 text-gray-500 hover:text-red-500 bg-gray-800/50 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}