import React from "react";

const OrderTabBarSkeleton = () => {
  return (
    <div className="relative px-3 py-2 bg-white rounded-xl shadow border border-gray-200 overflow-x-auto scrollbar-hide mb-3">
      <div className="flex gap-2 whitespace-nowrap">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="h-8 w-20 rounded-lg bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default OrderTabBarSkeleton;
