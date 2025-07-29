import React from "react";

const ItemPriceCard = ({
  offerPrice,
  itemPrice,
  discountPercentage,
  handleOriginalPrice,
  handleDiscountPercentage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Item Price */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Item Price</label>
        <input
          type="number"
          placeholder="0"
          value={itemPrice}
          onChange={handleOriginalPrice}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Discount Percentage */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Discount %</label>
        <input
          type="number"
          placeholder="0"
          value={discountPercentage}
          onChange={handleDiscountPercentage}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Offer Price */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700">Offer Price</label>
        <input
          type="number"
          placeholder="0"
          value={offerPrice}
          readOnly
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default ItemPriceCard;
