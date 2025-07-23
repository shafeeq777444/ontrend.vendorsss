import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useCartItems, useChangeCartQuantity, useRemoveFromCart } from "@/shared/services/queries/cart.query";
import { useTranslation } from "react-i18next";

const CartItem = ({ name, desc, price, img, id, quantity, isArabic }) => {
  const { userId } = useSelector(state => state.user);
  const { mutate: changeQuantity } = useChangeCartQuantity(userId);
  const { mutate: removeCart } = useRemoveFromCart(userId);

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={img} alt={name} className="w-14 h-14 object-cover rounded-md" />
        <div className={isArabic ? "text-right" : "text-left"}>
          <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
          <p className="text-xs text-gray-500 line-clamp-2">{desc}</p>
          <p className="text-[#ff3131] font-semibold text-sm">OMR {price}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button onClick={() => removeCart(id)} className="text-gray-400 hover:text-red-500">
          <Trash2 size={18} />
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => changeQuantity({ productId: id, delta: -1 })} className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Minus size={14} />
          </button>
          <span className="px-2 text-sm font-medium">{quantity}</span>
          <button onClick={() => changeQuantity({ productId: id, delta: 1 })} className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FoodOrderComputerOrderCard = () => {
  const { userId } = useSelector(state => state.user);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { data: cartItems = [] } = useCartItems(userId);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.itemPrice ?? 0), 0);
  const DeliveryFee = 0;
  const total = subtotal + DeliveryFee;

  const getLocalizedField = (item, field) => {
    return isArabic ? item?.[`${field}Arabic`] || item?.[field] : item?.[field];
  };

  return (
    <div className="bg-[#f8f8f8] rounded-2xl p-5 max-w-sm w-full mx-auto shadow-md flex flex-col h-full max-h-[90vh] overflow-y-auto" dir={isArabic ? "rtl" : "ltr"}>
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems?.map((item, i) => (
          <CartItem
            key={item?.id || i}
            name={getLocalizedField(item, "restaurantName")}
            desc={getLocalizedField(item, "description")}
            price={item?.itemPrice}
            img={item?.imageUrl}
            id={item?.id}
            quantity={item?.quantity}
            isArabic={isArabic}
          />
        ))}
        {cartItems.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-4">Your cart is empty.</p>
        )}
      </div>

      {/* Promo Code */}
      <div className="flex items-center gap-2 mt-6">
        <input
          type="text"
          placeholder="Enter Promo Code"
          className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3131]/40"
        />
        <button className="bg-[#ff3131] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          Apply
        </button>
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>OMR{subtotal.toFixed(3)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>OMR{DeliveryFee.toFixed(3)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t pt-3">
          <span>Total</span>
          <span className="text-[#ff3131]">OMR{total.toFixed(3)}</span>
        </div>
      </div>

      {/* Payment Button */}
      <button className="mt-6 w-full bg-[#ff3131] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all">
        Proceed To Payment
      </button>
    </div>
  );
};

export default FoodOrderComputerOrderCard;
