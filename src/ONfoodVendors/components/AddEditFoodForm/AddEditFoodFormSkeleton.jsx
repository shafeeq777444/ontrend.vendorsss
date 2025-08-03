import React from "react";

const AddEditFoodFormSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-10 max-w-7xl mx-auto animate-pulse">
            {/* Image Upload and Item Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                {/* Image Upload Skeleton */}
                <div className="space-y-4">
                    <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                    <div className="flex justify-center">
                        <div className="w-32 h-10 bg-gray-200 rounded-md"></div>
                    </div>
                </div>

                {/* Item Info Card Skeleton */}
                <div className="md:col-span-2 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>

                    {/* Arabic Name Field */}
                    <div className="space-y-2">
                        <div className="w-24 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>

                    {/* Category Field */}
                    <div className="space-y-2">
                        <div className="w-16 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-24 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>

            {/* Stock Field (for E-Shopping) */}
            <div className="space-y-2">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
                <div className="w-32 h-10 bg-gray-200 rounded-md"></div>
            </div>

            {/* Compact Form Fields Section */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Price Fields */}
                    <div className="space-y-2">
                        <div className="w-24 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>

                    <div className="space-y-2">
                        <div className="w-28 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Time Fields */}
                    <div className="space-y-2">
                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                        <div className="flex gap-2">
                            <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
                            <div className="w-8 h-10 bg-gray-200 rounded-md"></div>
                            <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="w-28 h-4 bg-gray-200 rounded"></div>
                        <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>

            {/* Variants Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-16 h-6 bg-gray-200 rounded"></div>
                    <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
                </div>

                {/* Variant Items */}
                <div className="space-y-3">
                    {[1, 2].map((item) => (
                        <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
                            <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
                            <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add-ons Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-20 h-6 bg-gray-200 rounded"></div>
                    <div className="w-28 h-8 bg-gray-200 rounded-md"></div>
                </div>

                {/* Add-on Items */}
                <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
                            <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
                            <div className="w-16 h-6 bg-gray-200 rounded"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status Toggle Section */}
            <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="w-32 h-5 bg-gray-200 rounded"></div>
                        <div className="w-48 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                </div>
            </div>

            {/* Delete Warning Section */}
            <div className="bg-gray-100 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-3">
                        <div className="space-y-2">
                            <div className="w-full h-4 bg-gray-200 rounded"></div>
                            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
};

export default AddEditFoodFormSkeleton;
