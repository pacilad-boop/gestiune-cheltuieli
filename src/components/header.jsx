import { Plus, Search } from "lucide-react";

export function Header({ searchTerm, setSearchTerm, onAddClick }) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Salutare!</h2>
        <p className="text-gray-400">
          Vizualizeaza situatia ta financiara in timp real.
        </p>
      </div>

      {/* Search - cautare tranzactii */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Cauta tranzactii..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl sm:px-4 sm:py-2 flex items-center gap-2 transition-all"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Adauga Tranzactie</span>
        </button>
      </div>
    </header>
  );
}
