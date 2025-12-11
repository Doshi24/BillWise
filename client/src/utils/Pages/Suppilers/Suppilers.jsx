import React, { useState } from "react";
import Loader from "../../Loader";
import showToast from "../../Toast";
import { server_url } from "../../config";
function Suppilers() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    category: "",
    payment_terms: "",
    notes: ""
  });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${server_url}/api/supplier/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.status === "success") {
        showToast("success", responseData.message || "Suppiler added successfully!");
        setFormData({
            name: "",
            email: "",
            address: "",
            phone: "",
            category: "",
            payment_terms: "",
            notes: ""
        });
        // navigate("/product");
        // if (onClose) onClose(); // close modal
        // if (onSuccess) onSuccess(); // r
      } else {
        showToast("error", responseData.message ||"Failed to add product.");
      }
    } catch (error) {
      showToast("error", responseData.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData(prev =>({... prev , [name]:value,}))
  }



  const Loader = () =>{}
  return (
        <div className="flex justify-center bg-gray-100 border border-gray-500 rounded-2xl  p-3">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white border border-gray-500 rounded-2xl shadow-lg overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Add New Supplier</h2>
          <p className="text-sm text-gray-200 mt-1">
            Fill in the details below to add a supplier to Manage your inventory.
          </p>
        </div>
        {/* Body */}
        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Suppliers Details
            </h3>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Supplier Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Monil Doshi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Mdoshi@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="10 Digit only"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
                <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="EX: Mumbai 40101"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pricing & Tax
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Payment Terms</label>
                <input
                  type="text"
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Ex: 30% Advance ..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
                <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Ex: Oil and Lubricant"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="E.g., GST, VAT"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="bg-gray-100 px-6 py-4 border-t flex justify-end gap-4">
        <button
          type="button"
        //   onClick={onClose} // ✅ Close modal on Cancel
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
}
export default Suppilers;