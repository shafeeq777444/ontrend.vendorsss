import React from "react";
import CreatableSelect from "react-select/creatable";

const ItemInfoCard = ({
  name,
  arabicName,
  category,
  handleNameChange,
  handleDescription,
  categoryOnchange,
  allCategories,
  description,
}) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-2xl shadow-sm border">
      {/* English Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Item Name (English)
        </label>
        <input
          className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>

      {/* Arabic Name (disabled) */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Item Name (Arabic)
        </label>
        <input
          className="w-full px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-600"
          value={arabicName}
          disabled
        />
      </div>

      {/* Category Select */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <div className="react-select-container">
          <CreatableSelect
            options={allCategories}
            value={allCategories?.find((opt) => opt.value === category)}
            onChange={categoryOnchange}
            onCreateOption={(inputValue) => categoryOnchange(inputValue)}
            classNamePrefix="react-select"
            placeholder="Select or create category"
            isClearable
            isSearchable
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                padding: "2px",
                borderColor: "#d1d5db",
              }),
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
          placeholder="Enter item description"
          value={description}
          onChange={(e) => handleDescription(e.target.value)}
          
        />
      </div>
    </div>
  );
};

export default ItemInfoCard;
