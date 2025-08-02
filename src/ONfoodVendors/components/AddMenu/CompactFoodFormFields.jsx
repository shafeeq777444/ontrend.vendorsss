import React from "react";

const CompactFoodFormFields = ({
  formData,
  handleOriginalPrice,
  handleDiscountPercentage,
  handleStock,
  handleAvilableStartTime,
  handleAvilableEndTime,
  handlePrepearationTime
}) => {
  return (
    <div className="space-y-6 mt-1 ">


      {/* Price, Discount, Offer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
        <div>
          <label className="text-sm font-medium text-gray-700">Item Price</label>
          <input
            type="number"
            className="w-full px-5 py-2.5 rounded-full  border border-gray-200 text-gray-600 mt-1"
            value={formData.itemPrice}
            onChange={handleOriginalPrice}
            placeholder="e.g. 50"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Discount %</label>
          <input
            type="number"
            className="w-full px-5 py-2.5 rounded-full  border border-gray-200 text-gray-600 mt-1"
            value={formData.discountPercentage}
            onChange={handleDiscountPercentage}
            placeholder="e.g. 10"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Offer Price</label>
          <input
            type="number"
            readOnly
            className="w-full px-5 py-2.5 rounded-full bg-gray-100 border border-gray-200 text-gray-500 mt-1"
            value={formData.price}
          />
        </div>
      </div>

      {/* Time Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
        <div>
          <label className="text-sm font-medium text-gray-700">Available From</label>
          <input
            type="time"
            className="w-full px-5 py-2.5 rounded-full  border border-gray-200 text-gray-600 mt-1"
            value={
              formData.availableTime.from === "0:0" || formData.availableTime.from === "0:00"
                ? "00:00"
                : formData.availableTime.from
            }
            onChange={handleAvilableStartTime}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Available To</label>
          <input
            type="time"
            className="w-full px-5 py-2.5 rounded-full  border border-gray-200 text-gray-600 mt-1"
            value={formData.availableTime.to}
            onChange={handleAvilableEndTime}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Prep Time (min)</label>
          <input
            type="number"
            className="w-full px-5 py-2.5 rounded-full  border border-gray-200 text-gray-600 mt-1"
            min="1"
            value={formData.preparationTime}
            onChange={handlePrepearationTime}
            placeholder="e.g. 15"
          />
        </div>
      </div>

      {/* Stock for E-Shopping */}
      {formData.vendorType === "E-Shopping" && (
        <div className="mt-1">
          <label className="text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            min="0"
            className="w-full px-5 py-2.5 rounded-full  border border-gray-200 text-gray-600 mt-1"
            value={formData.stock || ""}
            onChange={handleStock}
            placeholder="Enter stock"
          />
        </div>
      )}
    </div>
  );
};

export default CompactFoodFormFields;
