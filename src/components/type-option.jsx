export function TypeOption({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-1 rounded-xl text-[10px] uppercase font-bold border transition-all ${
        active
          ? "bg-blue-600 border-blue-500 text-white shadow-lg"
          : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
      }`}
    >
      {label}
    </button>
  );
}