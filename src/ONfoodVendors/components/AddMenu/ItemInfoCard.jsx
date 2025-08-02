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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
      {/* English Name */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-600">Item Name</label>
        <div className="mt-1">
          <input
            className="w-full text-sm px-5 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-0"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
      </div>

      {/* Arabic Name (disabled) */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">Arabic</label>
        <div className="mt-1">
          <input
            className="w-full px-5 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600"
            value={arabicName}
            disabled
          />
        </div>
      </div>

      {/* Category + Description side-by-side */}
      <div className="md:flex md:space-x-6 w-full md:col-span-2">
        {/* Category */}
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium text-gray-700">Category</label>
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
                borderRadius: "9999px",
                borderColor: "#d1d5db",
                outline: "none",
                boxShadow: "none",
              }),
            }}
          />
        </div>

       
      </div>
       {/* Description */}
       <div className="space-y-2 w-full mt-4 md:mt-0 col-span-2">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full px-3 py-2 rounded-2xl border mt-1 border-gray-300 focus:outline-none focus:ring-0 min-h-[44px] resize-none"
            placeholder="Enter item description"
            value={description}
            onChange={(e) => handleDescription(e.target.value)}
          />
        </div>
    </div>
  );
};

export default ItemInfoCard;
