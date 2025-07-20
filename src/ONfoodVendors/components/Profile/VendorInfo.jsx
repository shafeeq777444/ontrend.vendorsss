import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function VendorInfo() {
  const [isEditable, setIsEditable] = useState(false);
  const [companyName, setCompanyName] = useState("Ontrend Technologies");
  const [restaurantName, setRestaurantName] = useState("Taste of Punjab");
  const [restaurantNameArabic, setRestaurantNameArabic] = useState("طعم البنجاب");
  const [category, setCategory] = useState("Indian");
  const [vatNumber, setVatNumber] = useState("GSTIN27AAGPJ1234B1Z5");

  const inputStyle =
    "mt-1 w-full text-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  return (
    <div className="w-full max-w-4xl  rounded-2xl bg-white shadow-lg p-6 mt-6 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Vendor Info</h2>
        <button
          onClick={() => setIsEditable((prev) => !prev)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition"
        >
          {isEditable ? (
            <>
              <Check className="w-4 h-4" /> Done
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" /> Edit
            </>
          )}
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {/* Company Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Company Name</label>
          {isEditable ? (
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={inputStyle}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-600">{companyName}</p>
          )}
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Restaurant Name</label>
          {isEditable ? (
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className={inputStyle}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-600">{restaurantName}</p>
          )}
        </div>

        {/* Restaurant Name Arabic */}
        <div>
          <label className="text-sm font-medium text-gray-700">Restaurant Name (Arabic)</label>
          {isEditable ? (
            <input
              type="text"
              value={restaurantNameArabic}
              onChange={(e) => setRestaurantNameArabic(e.target.value)}
              className={inputStyle}
              dir="rtl"
            />
          ) : (
            <p className="mt-1 text-sm text-gray-600" dir="rtl">
              {restaurantNameArabic}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          {isEditable ? (
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputStyle}
            />
          ) : (
            <p className="mt-1 text-sm text-gray-600">{category}</p>
          )}
        </div>

        {/* VAT Number */}

      </div>
    </div>
  );
}
