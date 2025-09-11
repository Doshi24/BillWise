import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader.jsx";
import { server_url } from "../../config.js";
import showToast from "../../Toast.jsx";

const AddProduct = ({onClose}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_code: "",
    name: "",
    description: "",
    per_unit_price: "",
    tax_rate: "",
    tax_code_id: "",
    category_id: "",
    brand_id: "",
    unit_of_measure: "",
    stock_quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("Form submitted", formData);
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Form submitted", formData);
      const response = await fetch(`${server_url}/product/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Response received", response);
      if (response.ok) {
        showToast("success", "Product added successfully!");
        setFormData({
          product_code: "",
          name: "",
          description: "",
          per_unit_price: "",
          tax_rate: "",
          tax_code_id: "",
          category_id: "",
          brand_id: "",
          unit_of_measure: "",
          stock_quantity: "",
        });
        // navigate("/product");
        if (onClose) onClose();
      } else {
        showToast("error", "Failed to add product.");
      }
    } catch (error) {
      showToast("error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Add New Product</h2>
          <p className="text-sm text-gray-200 mt-1">
            Fill in the details below to add a product to your inventory.
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* General Details */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              General Details
            </h3>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Product Code *</label>
                <input
                  type="text"
                  name="product_code"
                  value={formData.product_code}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Quantity *</label>
                <input
                  type="text"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
            </div>
          </section>

          {/* Pricing & Tax */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pricing & Tax
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="per_unit_price"
                  value={formData.per_unit_price}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  name="tax_rate"
                  value={formData.tax_rate}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Tax Code</label>
                <input
                  type="text"
                  name="tax_code_id"
                  value={formData.tax_code_id}
                  onChange={handleChange}
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
            </div>
          </section>

          {/* Categorization */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categorization
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Category *</label>
                <input
                  type="text"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Brand *</label>
                <input
                  type="text"
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Unit of Measure *</label>
                <input
                  type="text"
                  name="unit_of_measure"
                  value={formData.unit_of_measure}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 border-t flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose} // ✅ Close modal on Cancel
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-black"
          }`}
        >
          {loading ? <Loader type="dots" text="Saving..." /> : "Save Product"}
        </button>
      </div>
      </form>
    </div>
  );
};

export default AddProduct;
