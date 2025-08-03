import React, { useMemo } from 'react';
import { FaEdit, FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LazyImg from '../common/LazyImg';

const FoodCardInVendor = ({ item, venderLogo, onClick,onClickView }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const description = useMemo(() =>
    item.description ||
    `A delicious ${item.category?.toLowerCase() || "dish"} prepared with care at ${item.restaurantName || "our restaurant"}.`
  , [item.description, item.category, item.restaurantName]);

  const shortDesc = useMemo(() =>
    description.length > 30
      ? description.slice(0, 30) + (isArabic ? '... المزيد' : '... more')
      : description
  , [description, isArabic]);

  const hasDiscount = useMemo(() => item.discountPercentage > 0, [item.discountPercentage]);

  const formatPrice = useMemo(() => (amount) =>
    new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(amount)
  , [isArabic]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer">
      
      {/* Image Section */}
      <div className="relative">
        <LazyImg
          src={item.imageUrl}
          alt={item.name}
          placeholder={venderLogo}
          loading="lazy"
          className="w-full rounded-md h-44 sm:h-52 object-cover"
        />

        {/* Discount Badge */}
        {hasDiscount && (
  <div className={`absolute top-3 ${isArabic ? 'left-3' : 'right-3'}`}>
    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow font-semibold">
      {isArabic ? `% خصم ${item.discountPercentage}` : `${item.discountPercentage}% OFF`}
    </div>
  </div>
)}

{/* Not Approved Badge */}
{item?.isApproved === false && (
  <div className={`absolute top-3 ${isArabic ? 'right-3' : 'left-3'}`}>
    <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full shadow font-semibold">
      {isArabic ? 'قيد المراجعة' : 'Not Approved'}
    </div>
  </div>
)}
{/* Disabled Badge */}
{item?.isDisabled && (
  <div className="absolute inset-0 bg-black/50 rounded-lg z-10 flex items-center justify-center">
    <div className=" text-white text-lg px-2 py-1 rounded-full shadow font-semibold">
      {isArabic ? 'غير متاح' : 'Disabled'}
    </div>
  </div>
)}

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-sm font-semibold truncate">{item.localName}</p>
          <p className="text-white text-xs truncate">{item.localTag}</p>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 pb-20 ${isArabic ? 'text-right' : 'text-left'}`}>
        <h3 className="text-base font-semibold truncate">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">{shortDesc}</p>
      </div>

      {/* Price */}
      <div className={`absolute bottom-14 ${isArabic ? 'right-4' : 'left-4'}`}>
        {hasDiscount ? (
          <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-bold text-red-600">
              {isArabic ? `ريال ${formatPrice(item.price)}` : `OMR ${formatPrice(item.price)}`}
            </span>
            <span className="text-xs text-gray-400 line-through ml-2">
              {isArabic ? `ريال ${formatPrice(item.itemPrice)}` : `OMR ${formatPrice(item.itemPrice)}`}
            </span>
          </div>
        ) : (
          <span className="text-sm font-bold text-gray-900">
            {isArabic ? `ريال ${formatPrice(item.itemPrice)}` : `OMR ${formatPrice(item.itemPrice)}`}
          </span>
        )}
      </div>

      {/* Minimal Action Buttons */}
      <div className="absolute bottom-0 w-full px-4 pb-4 flex gap-2">
        <button
          onClick={()=>onClickView(item)}
          className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs py-1.5 rounded-lg transition"
        >
          <FaEye size={13} className="opacity-70" />
          {isArabic ? 'عرض' : 'View'}
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs py-1.5 rounded-lg transition"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <FaEdit size={13} className="opacity-70" />
          {isArabic ? 'تعديل' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FoodCardInVendor);
