import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { IoIosArrowBack, IoIosShareAlt } from "react-icons/io";
import { FaStar } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import SkeletonFoodVendorHeader from "@/shared/components/skeleton/SkeletonFoodVendorHeader";
import LazyImg from "@/shared/components/LazyImg";

const FoodVendorHeader = ({ currentVendor, isLoading }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handleShare = () => {
    alert(isArabic ? "مشاركة!" : "Share clicked!");
  };

  const rating =
    currentVendor?.Ratings && currentVendor?.totalRatings
      ? (currentVendor?.Ratings / currentVendor?.totalRatings).toFixed(1)
      : "0.0";

  if (isLoading) return <SkeletonFoodVendorHeader />;

  return (
    <div className=" top-14 right-0 w-full scrollbar-hide">
      <div className="relative w-full h-[220px] md:h-[270px] overflow-hidden shadow-md">
        {/* Banner Gradient with Vendor Name */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg text-center">
            {isArabic
              ? currentVendor?.restaurantArabicName
              : currentVendor?.restaurantName}
          </h1>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Top Buttons */}
        <div className="absolute top-5 w-full px-4 flex justify-between items-center">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-white/80 cursor-pointer backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
            aria-label="Back"
          >
            <IoIosArrowBack
              className={`w-5 h-5 text-gray-900 ${isArabic ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Vendor Info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end gap-4">
            {/* Vendor Image + Busy Badge */}
            <div className="relative">
              <LazyImg
                src={currentVendor?.image}
                alt={
                  isArabic
                    ? currentVendor?.restaurantArabicName
                    : currentVendor?.restaurantName
                }
                className={`w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md ${
                  currentVendor?.isOnline === false ? "grayscale" : ""
                }`}
              />
              {currentVendor?.isOnline === false && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                  {isArabic ? "مشغول" : "Busy"}
                </div>
              )}
            </div>

            {/* Vendor Details */}
            <div className="flex-1">
              <h2 className="text-white text-xl font-bold leading-tight line-clamp-1">
                {isArabic
                  ? currentVendor?.restaurantArabicName
                  : currentVendor?.restaurantName}
              </h2>
              <div className="flex items-center text-sm text-gray-200 mt-1">
                <MapPin className={`w-4 h-4 ${isArabic ? "-mr-2" : "mr-1"}`} />
                <span className="line-clamp-1">{currentVendor?.businessAddress}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex justify-between bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm shadow-sm">
            <div className="flex-1 text-center">
              <div className="flex justify-center items-center gap-1 font-medium">
                <FaStar />
                {rating}
              </div>
              <div className="text-xs text-gray-200">
                {isArabic ? "التقييمات" : "Reviews"}
              </div>
            </div>

            <div className="flex-1 text-center border-x border-white/20">
              <div className="font-medium">
                {currentVendor?.distance} {isArabic ? "كم" : "km"}
              </div>
              <div className="text-xs text-gray-200">
                {isArabic ? "المسافة" : "Distance"}
              </div>
            </div>

            <div className="flex-1 text-center">
              <div className="font-medium">{currentVendor?.estimatedTime}</div>
              <div className="text-xs text-gray-200">
                {isArabic ? "وقت التوصيل" : "Delivery Time"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodVendorHeader;
