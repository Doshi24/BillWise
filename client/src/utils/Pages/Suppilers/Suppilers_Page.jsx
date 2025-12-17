    import React, { useEffect, useState } from "react";
    import { Download, Filter, Plus , Search , PenLine} from "lucide-react";
    import { server_url } from "../../config.js";
    import FilterMenu from "../FilterMenu.jsx";
    import AddProduct from "../Inventory/AddProduct.jsx"
    import { useNavigate } from "react-router-dom";
    import Suppilers from "../Suppilers/Suppilers.jsx";
    import UpdateSuppliers from "./UpdateSuppliers.jsx";

    function Suppilers_Page() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const [filters, setFilters] = useState({ product_code: "", name: "" });
    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const toggleAddForm = () => setShowAddForm((prev) => !prev);
    const toggleUpdateForm = () => setShowUpdateForm((prev) => !prev);

      // Fetch product data
      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`${server_url}/api/display-suppliers`);
            const json = await res.json();
            setData(json.result || []);
          } catch (err) {
            console.error("❌ Error fetching products:", err);
          }
        };
        fetchData();
      }, []);

    // Pagination logic
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    //   // Filter logic
    const handlefilter = async (filters) => {
        try {
        setFilters(filters);
        const filtersearch = new URLSearchParams(filters).toString();
        const result = await fetch(`${server_url}/api/product/filter?${filtersearch}`);
        const displayresult = await result.json();
        setData(displayresult.result || []);
        setPage(1);
        } catch (error) {
        console.log("filter logic didn’t work", error);
        }
    };

      // Download CSV
      const handleDownload = () => {
        const query = new URLSearchParams(filters).toString();
        const link = document.createElement("a");
        link.href = `${server_url}/api/product/list/download?${query}`;
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };


      // seach product logic
const [searchquery, setSearchquery] = useState("");

useEffect(() => {
  const fetchSearchResults = async () => {
    try {
      if (searchquery.length >= 1) {
        // search API
        const res = await fetch(`${server_url}/api/product/search?query=${searchquery}`);
        const result = await res.json();
        setData(result.result || []); // update table with search result
        setPage(1); // reset pagination
      } else {
        // fetch all products if search is empty
        const res = await fetch(`${server_url}/api/display-suppliers`);
        const result = await res.json();
        setData(result.result || []); // update table with full product list
        setPage(1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchSearchResults();
}, [searchquery]);

// fetch latest products 
const fetchProducts = async () => {
  try {
    const res = await fetch(`${server_url}/api/display-suppliers`);
    const json = await res.json();
    setData(json.result || []);
    setPage(1); // optional: reset to page 1
  } catch (err) {
    console.error("❌ Error fetching products:", err);
  }
};
useEffect(()=>{
  fetchProducts()
},[])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        {/* Header */}
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900"> 
            Suppliers Management
            </h2>
            <p className="text-sm text-gray-500 font-bold">
            Manage your wholesale product catalog with suppliers details
            </p>
        </div>

        {/* Search + Actions */}
        <div className="flex justify-between items-center mb-6">
            {/* Search Bar */}
            <div className="relative w-1/2">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search Suppliers by Name"
                value={searchquery}
                onChange={(e) => setSearchquery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
            </div>
            {/* Actions */}
            <div className="flex space-x-3">
            {/* Add Suppliers Button */}
            <button
                onClick={toggleAddForm}
                // onClick={() => navigate("/add-product")}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center"
            >
            <Plus className="w-5 h-5 mr-2" />
                Suppliers
            </button>
            <button
                onClick={toggleUpdateForm}
                // onClick={() => navigate("/add-product")}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center"
            >
            <PenLine className="w-5 h-5 mr-2" />
                Update Suppliers
            </button>
            <FilterMenu onFilter={handlefilter} />
            <button
                onClick={handleDownload}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center"
            >
                <Download className="w-5 h-5 mr-2" />
                Download
            </button>
            </div>
        </div>
        {showAddForm && (
            <div className="fixed inset-0 flex items-start justify-center z-50">
                {/* Blur Background */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

                {/* Modal Form */}
                <div className="relative w-1/2 max-w-3xl h-auto my-5 rounded-2xl shadow-lg overflow-y-auto bg-white z-50">
                <Suppilers onClose={() => setShowAddForm(false)} 
                onSuccess={fetchProducts}  
                />
                </div>
            </div>
        )}
        {showUpdateForm && (
          <div className="fixed inset-0 flex items-start justify-center z-50">
            {/* Blur Background */}
            <div
              className="absolute inset-0 bg-white/30 backdrop-blur-sm"
              onClick={() => setShowUpdateForm(false)}
            ></div>

            {/* Modal Form */}
            <div className="relative w-1/2 max-w-3xl h-auto my-5 rounded-2xl shadow-lg overflow-y-auto bg-white z-50">
              <UpdateSuppliers onClose={() => setShowUpdateForm(false)} 
                onSuccess={fetchProducts}
              />
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto shadow border rounded-lg bg-white">
            <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-900 text-white">
                <tr>
                <th className="p-3 text-center">ID</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Email</th>
                <th className="p-3 text-center">Address</th>
                <th className="p-3 text-center">Phone</th>
                <th className="p-3 text-center">Category</th>
                <th className="p-3 text-center">Payment Terms</th>
                <th className="p-3 text-center">Notes</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                    <tr
                    key={item.id || index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                    <td className="p-3 text-center text-gray-700 font-medium">
                        {item.id}
                    </td>
                    <td className="p-3 text-center">{item.name || "__"}</td>
                    <td className="p-3 text-center">
                        {item.email || "__"}
                    </td>
                    <td className="p-3 text-center">
                        {item.address || "__"}
                    </td>
                    <td className="p-3 text-center">{item.phone || "__"}</td>
                    <td className="p-3 text-center">{item.category || "__"}</td>
                    <td className="p-3 text-center">{item.payment_terms || "__"}</td>
                    <td className="p-3 text-center">{item.notes || "__"}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="9" className="p-4 text-center text-gray-500">
                    No products found
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-4">
            <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            >
            Previous
            </button>
            <span className="font-medium text-gray-800">
            Page {page} of {Math.max(1, Math.ceil(data.length / itemsPerPage))}
            </span>
            <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
            onClick={() => setPage((p) => p + 1)}
            disabled={endIndex >= data.length}
            >
            Next
            </button>
        </div>
        </div>
    );
    }

    export default Suppilers_Page;
