import React from "react";

const CompactFoodFormFields = ({
    formData,
    handleOriginalPrice,
    handleDiscountPercentage,
    handleStock,
    handleOfferPrice,
    handleAvilableStartTime,
    handleAvilableEndTime,
    handlePrepearationTime,
}) => {
    return (
        <div className="space-y-8 mt-4">
            {/* Price, Discount, Offer */}
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                        Item Price <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                        value={formData.itemPrice}
                        onChange={handleOriginalPrice}
                        placeholder="Enter item price"
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Discount %</label>
                    <input
                        type="number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                        value={formData.discountPercentage}
                        onChange={handleDiscountPercentage}
                        placeholder="Enter discount % (0-100)"
                        min="0"
                        max="100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Offer Price</label>
                    <input
                        type="number"
                        onChange={handleOfferPrice}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-500 placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                        value={formData.price}
                        placeholder="Auto-calculated"
                    />
                </div>
            </div>

            {/* Time Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Available From</label>
                    <input
                        type="time"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                        value={
                            formData.availableTime.from === "0:0" || formData.availableTime.from === "0:00"
                                ? "00:00"
                                : formData.availableTime.from
                        }
                        onChange={handleAvilableStartTime}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Available To</label>
                    <input
                        type="time"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                        value={formData.availableTime.to}
                        onChange={handleAvilableEndTime}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Prep Time (min)</label>
                    <input
                        type="number"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                        min="1"
                        value={formData.preparationTime}
                        onChange={handlePrepearationTime}
                        placeholder="e.g. 15"
                    />
                </div>
            </div>

            {/* Stock for E-Shopping */}
            {formData.vendorType === "E-Shopping" && (
                <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Stock</label>
                    <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
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
