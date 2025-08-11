import React, { useState, useEffect, useCallback, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import { useCreateCategoryMutationInFood } from "../../../services/queries/foodVendor.query";
import { useCreateCategoryMutationInEshop } from "../../../services/queries/Eproduct.query";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../../services/hooks/profile/useCurrentUserLiveData";

const ItemInfoCard = React.memo(function ItemInfoCard({
    name,
    arabicName,
    category,
    handleNameChange,
    handleDescription,
    categoryOnchange,
    allCategories,
    description,
    setAllCategories
}) {
    const { vendorType } = useParams();
    const { data: user } = useCurrentUser();

    const { mutateAsync: createCategoryMutationInFood } = useCreateCategoryMutationInFood();
    const { mutateAsync: createCategoryMutationInEshop } = useCreateCategoryMutationInEshop();

    // Local form state
    const [localName, setLocalName] = useState(name || "");
    const [localDescription, setLocalDescription] = useState(description || "");
    const [localCategory, setLocalCategory] = useState(allCategories?.find((opt) => opt.value === category) || null);

    // Refs for focusing
    const nameRef = useRef(null);
    const categoryRef = useRef(null);
    const descriptionRef = useRef(null);

    // Sync props
    useEffect(() => {
        setLocalName(name || "");
    }, [name]);

    useEffect(() => {
        setLocalDescription(description || "");
    }, [description]);

    useEffect(() => {
        setLocalCategory(allCategories?.find((opt) => opt.value === category) || null);
    }, [category, allCategories]);

    // Create category
    const handleCategoryCreate = useCallback(
        async (inputValue) => {
            try {
                if (vendorType?.toLowerCase() === "food") {
                    await createCategoryMutationInFood({ categoryName: inputValue, vendorId: user?.id });
                } else {
                    await createCategoryMutationInEshop({ categoryName: inputValue, vendorId: user?.id });
                }

                const newOption = { value: inputValue, label: inputValue };

                setAllCategories((prev) => {
                    if (prev.some((item) => item?.value?.toLowerCase() === inputValue.toLowerCase())) {
                        return prev;
                    }
                    return [...prev, newOption];
                });

                setLocalCategory(newOption);
                categoryOnchange(newOption);

                // Focus description
                descriptionRef.current?.focus();
            } catch (error) {
                console.error("Category creation failed:", error);
            }
        },
        [
            vendorType,
            user?.id,
            createCategoryMutationInFood,
            createCategoryMutationInEshop,
            categoryOnchange,
            setAllCategories
        ]
    );

    // Enter key navigation
    const handleKeyDown = (e, nextFieldRef, isLast = false) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isLast) {
                e.currentTarget.blur(); // just blur on last
            } else {
                nextFieldRef?.current?.focus();
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm">
            {/* English Name */}
            <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <div className="relative">
                    <input
                        ref={nameRef}
                        className="w-full text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                        placeholder="Enter item name"
                        value={localName}
                        onChange={(e) => {
                            setLocalName(e.target.value);
                            handleNameChange(e.target.value);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, categoryRef)}
                        aria-label="Item name in English"
                    />
                </div>
            </div>

            {/* Arabic Name (disabled) */}
            <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-medium text-gray-700">Arabic Name</label>
                <div className="relative">
                    <input
                        className="w-full text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-gray-50 border border-gray-200 text-gray-600 cursor-not-allowed"
                        value={arabicName || ""}
                        disabled
                        aria-label="Item name in Arabic (auto-generated)"
                        title="Arabic name is auto-generated from the English name"
                    />
                </div>
            </div>

            {/* Category */}
            <div className="space-y-2 sm:space-y-3 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="w-full">
                    <div onKeyDown={(e) => handleKeyDown(e, descriptionRef)}>
                        <CreatableSelect
                            ref={categoryRef}
                            options={allCategories}
                            value={localCategory}
                            onChange={(selected) => {
                                setLocalCategory(selected);
                                categoryOnchange(selected);
                                descriptionRef.current?.focus();
                            }}
                            onCreateOption={handleCategoryCreate}
                            classNamePrefix="react-select"
                            placeholder="Select or create category"
                            isClearable
                            isSearchable
                            menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                            menuPosition="fixed"
                            formatOptionLabel={(option) => (
                                <div className="flex items-center justify-between w-full">
                                    <span>{option.label}</span>
                                    {option.isApproved !== true && (
                                        <span className="ml-2 text-xs text-gray-600 opacity-70 italic">Admin not approved</span>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2 sm:space-y-3 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="relative">
                    <textarea
                        ref={descriptionRef}
                        className="w-full text-sm sm:text-base px-4 sm:px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[120px] sm:min-h-[142px] resize-none outline-none"
                        placeholder="Enter item description"
                        value={localDescription}
                        onChange={(e) => {
                            setLocalDescription(e.target.value);
                            handleDescription(e.target.value);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, null, true)}
                        aria-label="Item description"
                    />
                </div>
            </div>
        </div>
    );
});

export default ItemInfoCard;
