import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosStar } from "react-icons/io";

const VendorProfileHeader = ({ vendorType, restaurantName, vendorLogo, isTop }) => {
    return (
        <div className="flex flex-col items-center sm:flex-row sm:items-center">
            {/* Logo */}
            <div className="relative group mb-4 sm:mb-0">
                <Avatar className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-white mx-auto sm:mx-0">
                    <AvatarImage src={vendorLogo} alt="Vendor Logo" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            </div>

            {/* Name and Type */}
            <div className="flex flex-col gap-1 md:gap-3 sm:ml-6 sm:mt-4 items-center sm:items-start">
                <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3">
                    <h1 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">{restaurantName}</h1>
                    {isTop && (
                        <div className="flex  relative rounded-full px-2 py-1 sm:px-3 sm:py-1  items-center gap-1 sm:gap-2 text-white md:text-gray-200 bg-red-600 md:bg-white/30 backdrop-blur-sm border border-white/40">
                            <IoIosStar />
                            <span className="hidden sm:inline">Top Rated</span>
                            <span className="inline sm:hidden text-xs">Top</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-gray-500 rounded-full py-1 px-2 text-center sm:text-left">
                        {vendorType}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VendorProfileHeader;
