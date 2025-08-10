/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";

const Section = memo(({ title, children, className }) => (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${className}`}>
        <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">{title}</h2>
        {children}
    </div>
));

const Label = memo(({ children }) => <label className="block text-sm font-semibold text-gray-700 mb-1">{children}</label>);

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
    console.log(formData, "formDatatests");
    const memoizedHandleOriginalPrice = useCallback(handleOriginalPrice, [formData?.itemPrice]);
    const memoizedHandleDiscountPercentage = useCallback(handleDiscountPercentage, [formData]); //form discount percentage what the issue?
    const memoizedHandleStock = useCallback(handleStock, [formData?.stock]);
    const memoizedHandleOfferPrice = useCallback(handleOfferPrice, [formData?.price]);
    const memoizedHandleAvilableStartTime = useCallback(handleAvilableStartTime, [formData?.availableTime?.from]);
    const memoizedHandleAvilableEndTime = useCallback(handleAvilableEndTime, [formData?.availableTime?.to]);
    const memoizedHandlePrepearationTime = useCallback(handlePrepearationTime, [formData?.preparationTime]);


    return (
        <div className="space-y-6 mt-4">
            {/* ===== Pricing Section ===== */}
            <Section title="Pricing">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Item Price */}
                    <div>
                        <Label>
                            Item Price <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">OMR</span>
                            <input
                                type="number"
                                className="w-full pl-14 pr-4 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={formData.itemPrice || ""}
                                onChange={memoizedHandleOriginalPrice}
                                placeholder="0.000"
                                min="0"
                                step="0.001"
                            />
                        </div>
                    </div>

                    {/* Discount */}
                    <div>
                        <Label>Discount %</Label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={formData.discountPercentage || ""}
                                onChange={memoizedHandleDiscountPercentage}
                                placeholder="Enter discount"
                                min="0"
                                max="100"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                        </div>
                    </div>

                    {/* Offer Price */}
                    <div>
                        <Label>Offer Price</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">OMR</span>
                            <input
                                value={formData.price || ""}
                                onChange={memoizedHandleOfferPrice}
                                className="w-full pl-14 pr-4 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="Auto-calculated"
                                min="0"
                                step="0.001"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ===== Second Row: Timing & Prep+Stock ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Timing */}
                <Section title="Timing">
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <Label>Available From</Label>
                            <input
                                type="time"
                                className="w-full px-4 py-3 rounded-full border border-gray-300 text-gray-700
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                                value={
                                    formData.availableTime?.from === "0:0" || formData.availableTime?.from === "0:00"
                                        ? "00:00"
                                        : formData.availableTime?.from || ""
                                }
                                onChange={memoizedHandleAvilableStartTime}
                            />
                        </div>
                        <div>
                            <Label>Available To</Label>
                            <input
                                type="time"
                                className="w-full px-4 py-3 rounded-full border border-gray-300 text-gray-700
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                                value={formData.availableTime?.to || ""}
                                onChange={memoizedHandleAvilableEndTime}
                            />
                        </div>
                    </div>
                </Section>

                {/* Preparation & Stock */}
                <Section title={formData.vendorType === "E-Shopping" ? "Preparation & Stock" : "Preparation"}>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <Label>Prep Time </Label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full px-4 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                                    value={formData.preparationTime || ""}
                                    onChange={memoizedHandlePrepearationTime}
                                    placeholder="Enter prep time"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">min</div>
                            </div>
                        </div>
                        {formData.vendorType === "E-Shopping" && (
                            <div>
                                <Label>Stock</Label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full px-4 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                                    value={formData.stock || ""}
                                    onChange={memoizedHandleStock}
                                    placeholder="Enter stock count"
                                    inputMode="numeric"
                                />
                            </div>
                        )}
                    </div>
                </Section>
            </div>
        </div>
    );
};

// Memoize the main component to prevent unnecessary re-renders
export default memo(CompactFoodFormFields, (prevProps, nextProps) => {
    // Only re-render if formData or handlers change
    return (
        prevProps.formData === nextProps.formData &&
        prevProps.handleOriginalPrice === nextProps.handleOriginalPrice &&
        prevProps.handleDiscountPercentage === nextProps.handleDiscountPercentage &&
        prevProps.handleStock === nextProps.handleStock &&
        prevProps.handleOfferPrice === nextProps.handleOfferPrice &&
        prevProps.handleAvilableStartTime === nextProps.handleAvilableStartTime &&
        prevProps.handleAvilableEndTime === nextProps.handleAvilableEndTime &&
        prevProps.handlePrepearationTime === nextProps.handlePrepearationTime
    );
});
