import React from "react";

const ItemPriceCard = ({ priceInfo, onChange }) => {
  const inputStyle =
    "mt-1 w-full text-sm px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-0";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border w-full max-w-md space-y-4">
      <h2 className="text-base font-semibold text-gray-900"> Item Pricing</h2>

      {/* Price */}
      <div>
        <label className="text-sm font-medium text-gray-700">Base Price (₹)</label>
        <input
          type="number"
          name="price"
          value={priceInfo.price}
          onChange={onChange}
          className={inputStyle}
          placeholder="Enter base price"
        />
      </div>

      {/* Discount */}
      <div>
        <label className="text-sm font-medium text-gray-700">Discount (₹ or %)</label>
        <input
          type="number"
          name="discount"
          value={priceInfo.discount}
          onChange={onChange}
          className={inputStyle}
          placeholder="Enter discount"
        />
      </div>

      {/* Offer Price */}
      <div>
        <label className="text-sm font-medium text-gray-700">Final Offer Price (₹)</label>
        <input
          type="number"
          name="offerPrice"
          value={priceInfo.offerPrice}
          onChange={onChange}
          className={inputStyle}
          placeholder="Calculated or entered manually"
        />
      </div>
    </div>
  );
};

export default ItemPriceCard;
