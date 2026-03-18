export function FilterButton  ({ active, onClick, label }){
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );
}