import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FavoriteButton from "@/shared/components/common/FavouriteButton";
import RatingStars from "@/shared/components/common/RatingStar";



const FoodDiscountRestaurantCard = ({ restaurant = {}, isLiked }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const averageRating =
    restaurant?.Ratings && restaurant?.totalRatings
      ? restaurant.Ratings / restaurant.totalRatings
      : 0;

  return (
    <div
      onClick={() => navigate(`/food/${restaurant.id}`)}
      className="relative rounded-lg overflow-hidden shadow-md min-w-[220px] bg-white group transition-transform hover:scale-[1.02] duration-300 ease-in-out hover:z-10"
    >
      {/* Discount Badge */}
      {!!restaurant.discountValue && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-red-400 text-white text-[11px] px-3 py-1 rounded-full shadow-lg z-20 font-semibold tracking-wide">
          <span className="whitespace-nowrap">
            {`${Math.floor(restaurant.discountValue)}% ${
              isArabic ? "خصم" : "OFF"
            }`}
            {restaurant.selectedItems
              ? ` ${isArabic ? "• عناصر محددة" : "• Selected Items"}`
              : ""}
          </span>
        </div>
      )}

      {/* Heart Button */}
      <div className="absolute top-2 left-2 z-20">
        <FavoriteButton product={restaurant} isLiked={isLiked} />
      </div>

      {/* Image Section */}
      <div className="relative w-full aspect-[4/3]">
        <img
          src={
            restaurant?.bannerImage?.[2] ||
            restaurant?.bannerImage?.[1] ||
            restaurant?.bannerImage?.[0] ||
            "/fallback.jpg"
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback.jpg";
          }}
          alt={
            isArabic
              ? restaurant.restaurantArabicName
              : restaurant.restaurantName
          }
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
      </div>

      {/* Overlay Content (bottom) */}
      <div
        className={`absolute bottom-4 ${
          isArabic ? "right-3 gap-4" : "left-3"
        } flex items-start space-x-3 rtl:space-x-reverse z-20`}
      >
        {/* Logo + Online Status */}
        <div className="relative rounded-lg w-14 h-14 shadow-md overflow-hidden bg-white">
          <img
            src={restaurant.image || "/fallback-logo.jpg"}
            alt="logo"
            className="w-full h-full object-cover"
          />
          {restaurant.isOnline && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <div
                className="w-3 h-3 bg-green-500 rounded-full"
                title={isArabic ? "متصل" : "Online"}
              />
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className={`text-white ${isArabic ? "text-right" : "text-left"}`}>
          <h3 className="text-sm font-semibold max-w-[140px] break-words leading-tight">
            {isArabic
              ? restaurant?.restaurantArabicName
              : restaurant?.restaurantName}
          </h3>

          {averageRating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <RatingStars rating={averageRating} />
              <span className="text-xs text-white/80">
                ({restaurant?.totalRatings || 0})
              </span>
            </div>
          )}

          {(restaurant?.distance || restaurant?.estimatedTime) && (
            <p className="text-xs text-white/90 mt-0.5 flex items-center space-x-1 rtl:space-x-reverse">
              {restaurant?.distance && (
                <span>
                  {parseFloat(restaurant.distance).toFixed(1)}{" "}
                  {isArabic ? "كم" : "km"}
                </span>
              )}
              {restaurant?.distance && restaurant?.estimatedTime && <span>•</span>}
              {restaurant?.estimatedTime && (
                <span>
                  {restaurant.estimatedTime} {isArabic ? "دقيقة" : "mins"}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDiscountRestaurantCard;
