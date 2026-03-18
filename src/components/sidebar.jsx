import {
  LayoutDashboard,
  PieChart,
  ReceiptText,
  Settings,
  Wallet,
} from "lucide-react";

export function Sidebar({ activeTab, setActiveTab }) {
  function SidebarItem({ icon: Icon, label, active }) {
    return (
      <button
        onClick={() => setActiveTab(label)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          active
            ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </button>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-gray-800 p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Wallet className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            FinFlow
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            Budget Tracker
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={activeTab === "Dashboard"}
        />
        <SidebarItem
          icon={ReceiptText}
          label="Tranzactii"
          active={activeTab === "Tranzactii"}
        />
        <SidebarItem
          icon={PieChart}
          label="Rapoarte"
          active={activeTab === "Rapoarte"}
        />
        <SidebarItem
          icon={Settings}
          label="Setari"
          active={activeTab === "Setari"}
        />
      </nav>

      <div className="mt-auto p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
        <p className="text-sm font-semibold text-white">Finante personale</p>
        <p className="text-xs text-gray-500 mt-1">
          Gestioneaza facturi, cheltuieli si depozite.
        </p>
      </div>
    </aside>
  );
}