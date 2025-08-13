import React from 'react';

const BannerSkeleton = ({ count = 4 }) => {
  return (
    <div className="w-full animate-pulse">
      {/* ImageUploading Skeleton */}
      <div className="mb-6 w-full h-48 sm:h-64 md:h-72 lg:h-80 border-2 border-dashed rounded-xl bg-gray-100" />

      {/* Banner Items Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="relative max-w-xl rounded-md overflow-hidden"
          >
            <div className="w-full h-48 bg-gray-200 rounded-md" />
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerSkeleton;
