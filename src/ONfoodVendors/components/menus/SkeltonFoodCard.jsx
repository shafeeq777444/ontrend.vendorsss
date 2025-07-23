import React from "react";

// Skeleton card component
const FoodCardSkeleton = React.memo(() => (
  <div className="relative rounded-xl overflow-hidden shadow-md bg-white animate-pulse">
    <div className="w-full h-40 sm:h-48 bg-gray-200" />
    <div className="p-2 pb-14 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
    <div className="absolute bottom-0 left-0 p-2">
      <div className="h-4 bg-gray-200 rounded w-16" />
    </div>
    <div className="absolute bottom-0 right-0 p-2">
      <div className="h-8 w-16 bg-gray-300 rounded-tl-xl rounded-br-xl" />
    </div>
  </div>
));

// Main skeleton grid component
const SkeltonFoodCard = React.memo(() => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
});

export default SkeltonFoodCard;
