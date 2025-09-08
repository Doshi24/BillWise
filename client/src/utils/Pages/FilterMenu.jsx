import { useState } from "react";
import { Filter } from "lucide-react";

function FilterMenu({ onFilter }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    product_code: "",
    name: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    onFilter(filters); // send filters back to parent
    setOpen(false); // close dropdown
  };

  const handleReset = () => {
    const resetFilters = { product_code: "", name: "" };
    setFilters(resetFilters);
    onFilter(resetFilters);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Filter Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
      >
        <Filter className="w-5 h-5" />
        <span className="font-medium text-sm">Filter</span>
      </button>

      {/* Dropdown Form */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10 animate-slide-down">
          <h4 className="text-gray-800 font-semibold mb-3 text-sm">Filter Products</h4>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="product_code"
              value={filters.product_code}
              onChange={handleChange}
              placeholder="Product Code"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            />
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm transition"
            >
              Reset
            </button>
            <button
              onClick={handleSearch}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterMenu;
