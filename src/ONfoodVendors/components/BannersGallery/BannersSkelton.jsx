import React from 'react';

const BannerSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-5 justify-start max-w-4xl mx-auto">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="relative rounded-md overflow-hidden bg-gray-200 animate-pulse max-w-xl h-48 flex flex-col"
          aria-hidden="true"
        >
          {/* Image placeholder */}
          <div className="bg-gray-300 h-full w-full rounded-md" />

          {/* Delete button placeholder */}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-400" />

          {/* Optional: A small text placeholder bar at bottom */}
          <div className="absolute bottom-3 left-3 right-3 h-4 bg-gray-300 rounded-sm max-w-xs" />
        </div>
      ))}
    </div>
  );
};

export default BannerSkeleton;
