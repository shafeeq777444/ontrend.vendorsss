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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* English Name */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-600">Item Name</label>
                <div className="mt-1">
                    <input
                        className="w-full text-sm px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-0"
                        placeholder="Enter item name"
                        value={localName}
                        onChange={(e) => {
                            setLocalName(e.target.value);
                            handleNameChange(e.target.value);
                        }}
                    />
                </div>
            </div>

            {/* Arabic Name (disabled) */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Arabic</label>
                <div className="mt-1">
                    <input
                        className="w-full px-5 py-3 rounded-full bg-gray-100 border border-gray-200 text-gray-600"
                        value={arabicName || ""}
                        disabled
                    />
                </div>
            </div>

            {/* Category */}
            <div className="md:flex md:space-x-6 w-full md:col-span-2">
                <div className="space-y-2 w-full">
                    <label className="text-sm font-medium text-gray-700">Category</label>
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
                    className="w-full px-3 py-3 rounded-2xl border mt-1 border-gray-300 focus:outline-none focus:ring-0 min-h-[142px] resize-none"
                    placeholder="Enter item description"
                    value={localDescription}
                    onChange={(e) => {
                        setLocalDescription(e.target.value);
                        handleDescription(e.target.value);
                    }}
                />
            </div>
        </div>
    );
});

export default ItemInfoCard;
