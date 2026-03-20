import { X } from "lucide-react";
import { CATEGORIES } from "../utils/constants";
import { TypeOption } from "./type-option";

export function TransactionModal({
  isOpen,
  onClose,
  editingTransaction,
  onSave,
  formData,
  setFormData,
  errors,
  setErrors,
}) {
  if (!isOpen) {
    return null;
  }
  console.log("Errors in TransactionModal:", errors); // Debug: log errors
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#12141c] border border-gray-800 w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-white">
            {editingTransaction ? "Editeaza Tranzactia" : "Adauga Tranzactie"}
          </h3>

          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-6">
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
            <label className="text-xs text-gray-500 block mb-1 uppercase font-bold tracking-wider">
              Suma (RON)
            </label>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-blue-500">lei</span>
              <input
                type="number"
                step="0.01"
                className={`bg-transparent text-3xl font-bold w-full focus:outline-none text-white ${
                  errors?.amount ? "border-b border-red-500" : ""
                }`}
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => {
                  setFormData({ ...formData, amount: e.target.value });

                  if (errors?.amount) {
                    setErrors((prev) => ({
                      ...prev,
                      amount: "",
                    }));
                  }
                }}
                autoFocus
              />
            </div>
            {errors?.amount && (
              <p className="text-red-500 text-xs mt-2">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-2 uppercase font-bold tracking-wider">
              Tip
            </label>

            <div className="grid grid-cols-3 gap-2">
              <TypeOption
                active={formData.type === "expense"}
                onClick={() => setFormData({ ...formData, type: "expense" })}
                label="Cheltuiala"
              />
              <TypeOption
                active={formData.type === "bill"}
                onClick={() => setFormData({ ...formData, type: "bill" })}
                label="Factura"
              />
              <TypeOption
                active={formData.type === "deposit"}
                onClick={() => setFormData({ ...formData, type: "deposit" })}
                label="Depozit"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-2">
                  Categorie
                </label>
                <select
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-sm text-white"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">Data</label>
                <input
                  type="date"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-sm text-white"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-2">
                Descriere
              </label>
              <input
                type="text"
                placeholder="Ex: Factura curent..."
                className={`w-full bg-gray-900 border rounded-xl p-3 text-sm text-white ${
                  errors?.description ? "border-red-500" : "border-gray-800"
                }`}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });

                  if (errors?.description) {
                    setErrors((prev) => ({
                      ...prev,
                      description: "",
                    }));
                  }
                }}
              />

              {errors?.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all"
          >
            {editingTransaction
              ? "Actualizeaza Tranzactia"
              : "Salveaza Tranzactia"}
          </button>
        </form>
      </div>
    </div>
  );
}
