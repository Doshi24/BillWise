import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { server_url } from "../../config.js";
import { toast } from "react-toastify";
import Loader from "../../Loader.jsx";
import showToast from "../../Toast.jsx";
import { useRef } from "react"; 
// import { useModal } from "../../component/ModalContext.jsx";

const Updateproduct = ({onClose , onSuccess}) => {

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


  // const { modals, setModal } = useModal();

  // if (!modals.updateProduct) return null;

  return (
<div className="flex justify-center bg-gray-100 border border-gray-500 rounded-2xl  p-3">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-5xl bg-white border border-gray-500 rounded-2xl shadow-lg overflow-hidden flex flex-col"
  >
    {/* Header */}
    <div className="bg-gray-900 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Update Product</h2>
    </div>

    {/* Content */}
    <div className="p-8 space-y-8">
      {/* Section 1: General Details */}
      <div className="px-2 pb-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          General Product Details
        </h3>

        <div className="grid grid-cols-4 gap-6">
          {/* Product Code */}
          <div ref={wrapperRef} className="relative">
            <label className="block text-gray-700 mb-2">Product Code</label>
            <input
            type="text"
              name="product_code"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={searchquery}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
              // disabled={isdisabled}
              // title="Product code cannot be changed"
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

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 mb-2">Product Name </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-50"
              disabled={isdisabled}
              title="Product name cannot be changed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2">Description *</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
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
      </div>

      {/* Section 2: Pricing & Tax */}
      <div className="px-2 pb-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Pricing & Tax
        </h3>

        <div className="grid grid-cols-3 gap-6">
          {/* Price */}
          <div>
            <label className="block text-gray-700 mb-2">
              Per Unit Price (₹) *
            </label>
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

          {/* Tax Rate */}
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

          {/* Tax Code */}
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
      </div>

      {/* Section 3: Categorization */}
      <div className="px-2 pb-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Categorization
        </h3>

        <div className="grid grid-cols-3 gap-6">
          {/* Category */}
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

          {/* Brand */}
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

          {/* Unit of Measure */}
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
      </div>
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
        // onClick={() => setModal("updateProduct", false)}
        className={`px-3 py-1 rounded-lg text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-900"
        }`}
        autoComplete="off"
      >
        {loading ? <Loader type="dots" text="Saving..." /> : "Save Product"}
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

export default Updateproduct;
