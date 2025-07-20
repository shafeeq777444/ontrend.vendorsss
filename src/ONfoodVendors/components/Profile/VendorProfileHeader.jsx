import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosStar } from "react-icons/io";

const VendorProfileHeader = () => {
  return (
    <div className="flex items-center ">
      {/* Logo */}
      <div className="relative">
        <Avatar className="w-40 h-40 rounded-full border-2  border-white">
          <AvatarImage src="/ONtrend/ONtrend-logo.png" alt="Vendor Logo" />
          <AvatarFallback>VL</AvatarFallback>
        </Avatar>
      </div>

      {/* Name and Type */}
      <div className="ml-6 flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">ONtrend Mart</h1>
          <div className="bg-white text-red-600 rounded-full px-2 py-1 flex items-center gap-2">
            <IoIosStar />
            Top Rated
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-xs sm:text-sm md:text-base font-bold text-gray-500 rounded-full py-1 px-2">
            Food/Restaurant
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorProfileHeader;
