import { Pencil, Check } from "lucide-react";
import { useForm } from "react-hook-form";

export default function VendorInfo({ restaurantName, restaurantArabicName, ownerName, vendorType }) {
    const { watch } = useForm({
        defaultValues: {
            companyName: ownerName || "",
            restaurantName: restaurantName || "",
            restaurantNameArabic: restaurantArabicName || "",
            vendorType: vendorType || "",
        },
    });

    

    return (
        <div className="w-full max-w-4xl rounded-2xl bg-white shadow-lg p-6 mt-6 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Vendor Info</h2>
            </div>

            {/* Info Display */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {/* Company Name */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                    <p className="mt-1 text-sm text-gray-600">{ownerName}</p>
                </div>

                {/* Restaurant Name */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Restaurant Name</label>
                    <p className="mt-1 text-sm text-gray-600">{restaurantName}</p>
                </div>

                {/* Restaurant Name Arabic */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Restaurant Name (Arabic)</label>
                    <p className="mt-1 text-sm text-gray-600" dir="rtl">
                        {restaurantArabicName}
                    </p>
                </div>

                {/* Vendor Type (Read-only) */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Vendor Type</label>
                    <p className="mt-1 text-sm text-gray-600">{vendorType}</p>
                </div>
            </div>
        </div>
    );
}
