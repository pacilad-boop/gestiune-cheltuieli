import { useMemo, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ReceiptText,
  Settings,
  Wallet,
} from "lucide-react";

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { StatCard } from "./components/stat-card";
import { FilterButton } from "./components/filter-button";
import { GoalItem } from "./components/goal-item";
import { TransactionRow } from "./components/transaction-row";
import { TransactionModal } from "./components/transaction-modal";

import toast, { Toaster } from "react-hot-toast";

import { useLocalStorage } from "./hooks/useLocalStorage";

export function App() {
  const [transactions, setTransactions] = useLocalStorage("finance_data", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Mancare & Bautura",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  function openModal(transaction = null) {
    if (transaction) {
      setEditingTransaction(transaction);
      setFormData({
        description: transaction.description,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
        date: transaction.date,
      });
    } else {
      setEditingTransaction(null);
      setFormData({
        description: "",
        amount: "",
        category: "Mancare & Bautura",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
    }

    setErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTransaction(null);
    setErrors({});
  }

  function handleSaveTransaction(event) {
    event.preventDefault();
    console.log("Form data on save:", formData); // Debug: log form data on save
    const newErrors = {};

    if (!formData.description.trim() || formData.description.length < 3) {
      newErrors.description =
        "Descrierea este obligatorie si trebuie sa aiba cel putin 3 caractere";
    }

    if (formData.amount === "" || Number(formData.amount) <= 0) {
      newErrors.amount = "Suma trebuie sa fie mai mare decat 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("Validation errors:", newErrors); // Debug: log validation errors
      toast.error("Te rog completeaza toate campurile corect");
      return;
    }

    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: editingTransaction ? editingTransaction.id : Date.now(),
    };

    if (editingTransaction) {
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === editingTransaction.id ? newTransaction : transaction,
      );

      setTransactions(updatedTransactions);
      toast.success("Tranzactie actualizata cu succes");
    } else {
      setTransactions([newTransaction, ...transactions]);
      toast.success("Tranzactie adaugata cu succes");
    }
    setErrors({});
    closeModal();
  }

  function deleteTransaction(id) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    );

    setTransactions(updatedTransactions);
    toast.success("Tranzactie stearsa cu succes");
  }

  const stats = useMemo(() => {
    const totalExpenses = transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" || transaction.type === "bill",
      )
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalBills = transactions
      .filter((transaction) => transaction.type === "bill")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalSavings = transactions
      .filter((transaction) => transaction.type === "deposit")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalSavings - totalExpenses;

    return {
      totalExpenses,
      totalBills,
      totalSavings,
      balance,
    };
  }, [transactions]);

  // Filtrare tranzactii in functie de tip
  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      const matchesFilter =
        filterType === "all" || transaction.type === filterType;

      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    const getSignedAmmount = (transaction) => {
      return transaction.type === "deposit"
        ? transaction.amount
        : -transaction.amount;
    };

    console.log("sortOption:", sortOption);
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "amount_asc":
          return getSignedAmmount(a) - getSignedAmmount(b);
        case "amount_desc":
          return getSignedAmmount(b) - getSignedAmmount(a);
        case "date_asc":
          return new Date(a.date) - new Date(b.date);
        case "date_desc":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

    return sorted;
  }, [transactions, filterType, searchTerm, sortOption]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0c10] text-gray-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddClick={() => openModal()}
        />

        {activeTab === "Dashboard" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Sold Total"
                amount={stats.balance}
                icon={Wallet}
                color="blue"
              />
              <StatCard
                title="Depozite"
                amount={stats.totalSavings}
                icon={ArrowUpCircle}
                color="green"
              />
              <StatCard
                title="Cheltuieli"
                amount={stats.totalExpenses}
                icon={ArrowDownCircle}
                color="red"
              />
              <StatCard
                title="Facturi"
                amount={stats.totalBills}
                icon={ReceiptText}
                color="amber"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#12141c] rounded-3xl border border-gray-800 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    Activitate Recenta
                  </h3>

                  {/* Filter Buttons - butoane de filtrare */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:imtems-center">
                    <div className="flex gap-2 flex-wrap">
                      <FilterButton
                        active={filterType === "all"}
                        onClick={() => setFilterType("all")}
                        label="Toate"
                      />
                      <FilterButton
                        active={filterType === "expense"}
                        onClick={() => setFilterType("expense")}
                        label="Cheltuieli"
                      />
                      <FilterButton
                        active={filterType === "bill"}
                        onClick={() => setFilterType("bill")}
                        label="Facturi"
                      />
                      <FilterButton
                        active={filterType === "deposit"}
                        onClick={() => setFilterType("deposit")}
                        label="Depozite"
                      />
                    </div>
                    <select
                      value={sortOption}
                      onChange={(e) => {
                        console.log("Selected sort option:", sortOption);
                        setSortOption(e.target.value);
                      }}
                      className="bg-gray-900 border border-gray-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto px-3 py-2"
                    >
                      <option value="date_desc">Cele mai noi</option>
                      <option value="date_asc">Cele mai vechi</option>
                      <option value="amount_desc">Suma descrescatoare</option>
                      <option value="amount_asc">Suma crescatoare</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-gray-500 text-xs uppercase border-b border-gray-800">
                      <tr>
                        <th className="text-left pb-4">Descriere</th>
                        <th className="text-left pb-4">Categorie</th>
                        <th className="text-left pb-4">Data</th>
                        <th className="text-right pb-4">Suma</th>
                        <th className="text-right pb-4">Actiuni</th>
                      </tr>
                    </thead>

                    {/* Afisare tranzactii in tabel */}
                    <tbody className="divide-y divide-gray-800/50">
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TransactionRow
                            key={transaction.id}
                            transaction={transaction}
                            onDelete={deleteTransaction}
                            onEdit={openModal}
                          />
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="py-8 text-center text-gray-500"
                          >
                            Nu exista tranzactii pentru filtrul selectat.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#12141c] rounded-3xl border border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Obiective Economii
                  </h3>

                  <div className="space-y-6">
                    <GoalItem
                      label="Fond urgenta"
                      current={8500}
                      target={10000}
                      color="green"
                    />
                    <GoalItem
                      label="Vacanta"
                      current={2100}
                      target={3000}
                      color="amber"
                    />
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-3xl border border-gray-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Organizare financiara
                  </h3>
                  <p className="text-sm text-gray-400">
                    Adauga facturi, cheltuieli lunare si depozite pentru a avea
                    o evidenta clara a banilor tai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Settings size={48} className="mb-4 opacity-20" />
            <p>Sectiunea {activeTab} este in constructie.</p>
          </div>
        )}
      </main>

      {/* Formular pentru adaugare/editare tranzactii */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingTransaction={editingTransaction}
        onSave={handleSaveTransaction}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "12px",
            padding: "12 px 16px",
          },
        }}
      />
    </div>
  );
}
