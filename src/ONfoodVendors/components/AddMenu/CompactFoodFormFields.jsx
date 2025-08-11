/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useState, useEffect, useRef } from "react";

// === Reusable Components ===
const Section = memo(({ title, children, className }) => (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${className}`}>
        <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">{title}</h2>
        {children}
    </div>
));

const Label = memo(({ children }) => (
    <label className="block text-sm font-semibold text-gray-700 mb-1">{children}</label>
));

// === Helper functions ===
const formatPrice = (value) => {
    if (value === "" || value === null || isNaN(value)) return "";
    return parseFloat(value).toFixed(3);
};

const clampPercentage = (value) => {
    if (value === "" || value === null || isNaN(value)) return "";
    let num = parseFloat(value);
    if (num < 0) num = 0;
    if (num > 100) num = 100;
    return num;
};

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
    // Local states for typing-friendly inputs
    const [itemPriceInput, setItemPriceInput] = useState(formData.itemPrice?.toString() || "");
    const [discountInput, setDiscountInput] = useState(formData.discountPercentage?.toString() || "");
    const [offerPriceInput, setOfferPriceInput] = useState(formData.price?.toString() || "");

    // Input refs for navigation
    const discountRef = useRef();
    const offerPriceRef = useRef();
    const availableFromRef = useRef();
    const availableToRef = useRef();
    const prepTimeRef = useRef();
    const stockRef = useRef();

    // Sync with formData changes
    useEffect(() => setItemPriceInput(formData.itemPrice?.toString() || ""), [formData.itemPrice]);
    useEffect(() => setDiscountInput(formData.discountPercentage?.toString() || ""), [formData.discountPercentage]);
    useEffect(() => setOfferPriceInput(formData.price?.toString() || ""), [formData.price]);

    // Handlers
    const handleItemPriceChange = (e) => setItemPriceInput(e.target.value);
    const handleItemPriceBlur = () => {
        const formatted = formatPrice(itemPriceInput);
        setItemPriceInput(formatted);
        handleOriginalPrice({ target: { value: formatted ? parseFloat(formatted) : null } });
    };

    const handleDiscountChange = (e) => setDiscountInput(e.target.value);
    const handleDiscountBlur = () => {
        const clamped = clampPercentage(discountInput);
        setDiscountInput(clamped);
        handleDiscountPercentage({ target: { value: clamped === "" ? null : parseFloat(clamped) } });
    };

    const handleOfferPriceChange = (e) => setOfferPriceInput(e.target.value);
    const handleOfferPriceBlur = () => {
        const formatted = formatPrice(offerPriceInput);
        setOfferPriceInput(formatted);
        handleOfferPrice({ target: { value: formatted ? parseFloat(formatted) : null } });
    };

    // Memoized handlers
    const memoizedHandleStock = useCallback(handleStock, [formData]);
    const memoizedHandleAvilableStartTime = useCallback(handleAvilableStartTime, [formData]);
    const memoizedHandleAvilableEndTime = useCallback(handleAvilableEndTime, [formData]);
    const memoizedHandlePrepearationTime = useCallback(handlePrepearationTime, [formData]);

    // Handle Enter key navigation
    const handleKeyDown = (e, nextRef) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (nextRef?.current) {
                nextRef.current.focus();
            }
        }
    };

    return (
        <div className="space-y-6 mt-4">
            {/* Pricing Section */}
            <Section title="Pricing">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Item Price */}
                    <div>
                        <Label>Item Price <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">OMR</span>
                            <input
                                type="number"
                                className="w-full pl-14 pr-4 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={itemPriceInput}
                                onChange={handleItemPriceChange}
                                onBlur={handleItemPriceBlur}
                                placeholder="0.000"
                                min="0"
                                step="0.001"
                                onKeyDown={(e) => handleKeyDown(e, discountRef)}
                            />
                        </div>
                    </div>

                    {/* Discount */}
                    <div>
                        <Label>Discount %</Label>
                        <div className="relative">
                            <input
                                ref={discountRef}
                                type="number"
                                className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={discountInput}
                                onChange={handleDiscountChange}
                                onBlur={handleDiscountBlur}
                                placeholder="Enter discount"
                                min="0"
                                max="100"
                                step="0.01"
                                onKeyDown={(e) => handleKeyDown(e, offerPriceRef)}
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
                                ref={offerPriceRef}
                                value={offerPriceInput}
                                onChange={handleOfferPriceChange}
                                onBlur={handleOfferPriceBlur}
                                className="w-full pl-14 pr-4 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="Auto-calculated"
                                min="0"
                                step="0.001"
                                type="number"
                                onKeyDown={(e) => handleKeyDown(e, availableFromRef)}
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Timing & Prep+Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Timing */}
                <Section title="Timing">
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <Label>Available From</Label>
                            <input
                                ref={availableFromRef}
                                type="time"
                                className="w-full px-4 py-3 rounded-full border border-gray-300 text-gray-700
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                                value={
                                    formData.availableTime?.from === "0:0" || formData.availableTime?.from === "0:00"
                                        ? "00:00"
                                        : formData.availableTime?.from || ""
                                }
                                onChange={memoizedHandleAvilableStartTime}
                                onKeyDown={(e) => handleKeyDown(e, availableToRef)}
                            />
                        </div>
                        <div>
                            <Label>Available To</Label>
                            <input
                                ref={availableToRef}
                                type="time"
                                className="w-full px-4 py-3 rounded-full border border-gray-300 text-gray-700
                                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                                value={formData.availableTime?.to || ""}
                                onChange={memoizedHandleAvilableEndTime}
                                onKeyDown={(e) => handleKeyDown(e, prepTimeRef)}
                            />
                        </div>
                    </div>
                </Section>

                {/* Preparation & Stock */}
                <Section title={formData.vendorType === "E-Shopping" ? "Preparation & Stock" : "Preparation"}>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <Label>Prep Time</Label>
                            <div className="relative">
                                <input
                                    ref={prepTimeRef}
                                    type="number"
                                    min="0"
                                    className="w-full px-4 py-3 rounded-full border border-gray-300 text-gray-700 placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm transition"
                                    value={formData.preparationTime || ""}
                                    onChange={memoizedHandlePrepearationTime}
                                    placeholder="Enter prep time"
                                    onKeyDown={(e) => {
                                        if (formData.vendorType === "E-Shopping") {
                                            handleKeyDown(e, stockRef);
                                        }
                                    }}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">min</div>
                            </div>
                        </div>
                        {formData.vendorType === "E-Shopping" && (
                            <div>
                                <Label>Stock</Label>
                                <input
                                    ref={stockRef}
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

export default memo(CompactFoodFormFields);
