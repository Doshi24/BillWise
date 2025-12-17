import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { server_url } from "../../config.js";
import { toast } from "react-toastify";
import Loader from "../../Loader.jsx";
import showToast from "../../Toast.jsx";
import { useRef } from "react"; 

const UpdateSuppliers = ({onClose , onSuccess}) => {

  const [loading, setLoading] = useState(false);
  const [searchquery, setsearchquery] = useState("");
  const [suggestions, setsuggestion] = useState([]); 
  const [notification, setNotification] = useState(null);
  const [isdisabled, setisdisabled] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
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
    stock_quantity: ""
  });

//search product 
useEffect(() => {
    try {
      if(searchquery.length >= 1){
          fetch(`${server_url}/product/search?query=${searchquery}`) // note
          .then(res => res.json())
          .then(data => setsuggestion(data.result || []))
      }else{
          setsuggestion([])
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
}, [searchquery]);


// on select suggestion
const handleProductselect = async (product) => {

    try {
     const response = await fetch(`${server_url}/product/select/${product.product_code}`)
    //  console.log("respojes", response)
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
        setsearchquery(product.product_code.trim());
        setsuggestion([]);
        setisdisabled(true);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
}

//   handle input change
 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

//   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true); // start loading
        const response = await fetch(`${server_url}/product/update`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      showToast("success","Product updated successfully!");
      // setNotification({ type: "success", message: "Product added successfully!" });
      setFormData({ name: "", description: "", price: "", quantity: "" });
      if (onClose) onClose(); // close modal
      if (onSuccess) onSuccess(); // r
    } else {
    showToast( "info","Not Worked as Expected" );
  }
}   catch (error) {
    toast.error("Error:", error);
    setNotification("error", "Something went wrong");
}   finally {
  setLoading(false); // stop loading no matter what
}
  };
//   to redirect after form submission
  const navigate = useNavigate();


// auto-highlight first suggestion
  useEffect(() => {
  if (suggestions.length > 0) {
    setHighlightIndex(0); 
  } else {
    setHighlightIndex(-1);
  }
}, [suggestions]);

// click outside to close suggestion box
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setsuggestion([]); // close dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                  value={searchquery}
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
                  onChange={(e) => setsearchquery(e.target.value)}
                onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                setHighlightIndex((prev) =>
                  prev < suggestions.length - 1 ? prev + 1 : 0
                );
              }
              if (e.key === "ArrowUp") {
                setHighlightIndex((prev) =>
                  prev > 0 ? prev - 1 : suggestions.length - 1
                );
              }
              if (e.key === "Enter") {
                e.preventDefault(); // stop form submit

                if (highlightIndex >= 0) {
                  // pick highlighted
                  handleProductselect(suggestions[highlightIndex]);
                } else if (suggestions.length > 0) {
                  // pick first suggestion if nothing highlighted
                  handleProductselect(suggestions[0]);
                }
              }
              }}
              placeholder="Type to search..."
              required
            />
            {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-300px bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((item, index) => (
              <li
                key={item.product_code}
                onClick={() => handleProductselect(item)}
                className={`px-13 py-2 cursor-pointer  
                  ${highlightIndex === index 
                    ? "bg-gray-600 text-white" 
                    : "hover:bg-blue-100 text-gray-700"}`}
              >
                <span className="font-medium"> {item.product_code}</span>
                {/* <span className="ml-2 text-sm font-medium">Product Name: {item.name}</span> */}
                </li>
                ))}
              </ul>
          )}
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

    {/* Footer */}
    <div className="bg-gray-100 px-6 py-4 border-t flex justify-end gap-4">
      <button
        type="button"
        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        onClick={() => onClose && onClose()}
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
          {loading ? <Loader type="dots" text="Saving..." /> : "Save Supplier "}  
        </button>
    </div>
  </form>

  {/* Notification */}
  {notification && (
    <Notification
      type={notification.type}
      message={notification.message}
      onClose={() => setNotification(null)}
    />
  )}
</div>




  );
};

export default UpdateSuppliers;
