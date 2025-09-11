    import React, { useEffect, useState } from "react";
    import { Download, Filter, Plus } from "lucide-react";
    import { server_url } from "../../config.js";
    import FilterMenu from "../FilterMenu";
    import AddProduct from "./AddProduct"

    function ProductPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [filters, setFilters] = useState({ product_code: "", name: "" });
    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const toggleAddForm = () => setShowAddForm((prev) => !prev);

      // Fetch product data
      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`${server_url}/product/display`);
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
        const result = await fetch(`${server_url}product/filter?${filtersearch}`);
        const displayresult = await result.json();
        setData(displayresult.result || []);
        setPage(1);
        } catch (error) {
        console.log("filter logic didn’t work", error);
        }
    };

    //   // Download CSV
    //   const handleDownload = () => {
    //     const query = new URLSearchParams(filters).toString();
    //     const link = document.createElement("a");
    //     link.href = `${server_url}product/list/download?${query}`;
    //     link.setAttribute("download", "products.csv");
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        {/* Header */}
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
            Inventory Management
            </h2>
            <p className="text-sm text-gray-500">
            Manage your wholesale product catalog and profit margins
            </p>
        </div>

        {/* Search + Actions */}
        <div className="flex justify-between items-center mb-6">
            {/* Search Bar */}
            <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />
            {/* Add Product Button */}
            <button
                onClick={toggleAddForm}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center"
            >
            <Plus className="w-5 h-5 mr-2" />
                Add Product
            </button>

            {/* Actions */}
            <div className="flex space-x-3">
            <FilterMenu onFilter={handlefilter} />
            <button
                // onClick={handleDownload}
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
                <AddProduct onClose={() => setShowAddForm(false)} />
                </div>
            </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto shadow border rounded-lg bg-white">
            <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-900 text-white">
                <tr>
                <th className="p-3 text-center">Code</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Tax</th>
                <th className="p-3 text-center">Brand</th>
                <th className="p-3 text-center">Category</th>
                <th className="p-3 text-center">Unit</th>
                <th className="p-3 text-center">Description</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                    <tr
                    key={item.product_code || index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                    <td className="p-3 text-center text-gray-700 font-medium">
                        {item.product_code}
                    </td>
                    <td className="p-3 text-center">{item.name || "__"}</td>
                    <td className="p-3 text-center">
                        {item.stock_quantity || "__"}
                    </td>
                    <td className="p-3 text-center">
                        ${item.per_unit_price || "__"}
                    </td>
                    <td className="p-3 text-center">{item.tax_rate || "__"}%</td>
                    <td className="p-3 text-center">{item.brand_id || "__"}</td>
                    <td className="p-3 text-center">{item.category_id || "__"}</td>
                    <td className="p-3 text-center">{item.unit_of_measure || "__"}</td>
                    <td className="p-3 text-center">{item.description || "__"}</td>
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

    export default ProductPage;
