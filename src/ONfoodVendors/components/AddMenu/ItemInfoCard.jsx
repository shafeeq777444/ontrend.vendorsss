import React from "react";

const ItemInfoFormCard = ({ item, onChange }) => {
  const inputStyle =
    "mt-1 w-full text-sm px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-0 focus:ring-black/80";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border w-full max-w-xl space-y-4">
      <h2 className="text-base font-semibold text-gray-900">General Information</h2>

      {/* Item Name (English) */}
      <div>
        <label className="text-sm font-medium text-gray-700">Name Product</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={onChange}
          className={inputStyle}
        />
      </div>

      {/* Item Description */}
      <div>
        <label className="text-sm font-medium text-gray-700">Description Product</label>
        <textarea
          name="description"
          value={item.description}
          onChange={onChange}
          rows={4}
          className={`${inputStyle} resize-none`}
        />
      </div>

      {/* Category (English) */}
      <div>
        <label className="text-sm font-medium text-gray-700">Category (English)</label>
        <input
          type="text"
          name="category"
          value={item.category}
          onChange={onChange}
          className={inputStyle}
        />
      </div>

      {/* Category (Arabic) */}
      <div>
        <label className="text-sm font-medium text-gray-700">Category (Arabic)</label>
        <input
          type="text"
          name="categoryArabic"
          value={item.categoryArabic}
          onChange={onChange}
          dir="rtl"
          className={inputStyle}
        />
      </div>

      {/* Item Name (Arabic) */}
      <div>
        <label className="text-sm font-medium text-gray-700">Name Product (Arabic)</label>
        <input
          type="text"
          name="nameArabic"
          value={item.nameArabic}
          onChange={onChange}
          dir="rtl"
          className={inputStyle}
        />
      </div>
    </div>
  );
};

export default ItemInfoFormCard;
