import React, { useState, useEffect, useCallback } from "react";
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
    setAllCategories,
}) {
    const { vendorType } = useParams();
    const { data: user } = useCurrentUser();

    const { mutateAsync: createCategoryMutationInFood } = useCreateCategoryMutationInFood();
    const { mutateAsync: createCategoryMutationInEshop } = useCreateCategoryMutationInEshop();

    // Local form state to prevent unnecessary parent renders
    const [localName, setLocalName] = useState(name || "");
    const [localDescription, setLocalDescription] = useState(description || "");
    const [localCategory, setLocalCategory] = useState(allCategories?.find((opt) => opt.value === category) || null);

    // Sync local state if props change
    useEffect(() => {
        setLocalName(name || "");
    }, [name]);

    useEffect(() => {
        setLocalDescription(description || "");
    }, [description]);

    useEffect(() => {
        setLocalCategory(allCategories?.find((opt) => opt.value === category) || null);
    }, [category, allCategories]);

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
            setAllCategories,
        ]
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-sm">
            {/* English Name */}
            <div className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <div className="relative">
                    <input
                        className="w-full text-sm sm:text-base px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                        placeholder="Enter item name"
                        value={localName}
                        onChange={(e) => {
                            setLocalName(e.target.value);
                            handleNameChange(e.target.value);
                        }}
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

            {/* Category - Full width */}
            <div className="space-y-2 sm:space-y-3 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="w-full">
                    <CreatableSelect
                        options={allCategories}
                        value={localCategory}
                        onChange={(selected) => {
                            setLocalCategory(selected);
                            categoryOnchange(selected);
                        }}
                        onCreateOption={handleCategoryCreate}
                        classNamePrefix="react-select"
                        placeholder="Select or create category"
                        isClearable
                        isSearchable
                        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                        menuPosition="fixed"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                minHeight: '44px',
                                borderRadius: '9999px',
                                borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
                                boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
                                '&:hover': {
                                    borderColor: state.isFocused ? '#3b82f6' : '#9ca3af'
                                },
                                transition: 'all 0.2s',
                                fontSize: '0.875rem',
                                padding: '0 0.5rem',
                            }),
                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                            option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isSelected ? '#3b82f6' : isFocused ? '#f3f4f6' : 'white',
                                color: isSelected ? 'white' : isFocused ? '#1f2937' : '#4b5563',
                                '&:active': {
                                    backgroundColor: isSelected ? '#3b82f6' : '#e5e7eb',
                                },
                                fontSize: '0.875rem',
                                padding: '8px 12px',
                            }),
                            input: base => ({
                                ...base,
                                margin: 0,
                                padding: 0,
                            }),
                        }}
                        className="react-select-container"
                        aria-label="Select or create a category"
                    />
                </div>
            </div>

            {/* Description - Full width */}
            <div className="space-y-2 sm:space-y-3 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="relative">
                    <textarea
                        className="w-full text-sm sm:text-base px-4 sm:px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[120px] sm:min-h-[142px] resize-none outline-none"
                        placeholder="Enter item description"
                        value={localDescription}
                        onChange={(e) => {
                            setLocalDescription(e.target.value);
                            handleDescription(e.target.value);
                        }}
                        aria-label="Item description"
                    />
                </div>
            </div>
        </div>
    );
});

export default ItemInfoCard;
