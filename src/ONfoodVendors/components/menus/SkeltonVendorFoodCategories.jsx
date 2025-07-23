import React from "react";

const SkeletonCategoryTabs = () => {
  return (
    <div className="relative p-4 rounded-2xl bg-white">
      {/* Skeleton Heading */}
      <div className="mb-4">
        <div className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
      </div>

      {/* Skeleton Buttons */}
      <div className="flex gap-3 overflow-x-scroll snap-x px-2 py-2 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 rounded-md bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonCategoryTabs;
