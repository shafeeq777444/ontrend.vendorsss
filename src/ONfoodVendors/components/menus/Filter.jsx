import { setSortOption } from "../../../slices/food/foodSlice";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import React from "react";

const Filter = React.memo(({ showFilter, setShowFilter, sortOption, setCurrentPageIndex }) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showFilter) setIsVisible(true);
    else setIsVisible(false);
  }, [showFilter]);

  const handleSelect = useCallback(
    (option) => {
      setCurrentPageIndex(0);
      dispatch(setSortOption(option));
      setIsVisible(false);
      setTimeout(() => setShowFilter(false), 200); // Wait for animation to finish
    },
    [dispatch, setCurrentPageIndex, setShowFilter]
  );

  return (
    <>
      {showFilter && (
        <div
          className={`absolute top-12 right-2 w-48 md:w-64 bg-white rounded-xl border shadow-lg z-50 overflow-hidden transition-all duration-200 transform 
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="p-4">
            <h3 className="text-base font-semibold mb-3">Sort By</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleSelect("lowToHigh")}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-left transition 
                  ${sortOption === "lowToHigh" ? "bg-black text-white" : "hover:bg-gray-100 text-gray-800"}`}
              >
                Low to High
              </button>
              <button
                onClick={() => handleSelect("")}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-left transition 
                  ${sortOption === "" ? "bg-black text-white" : "hover:bg-gray-100 text-gray-800"}`}
              >
                Default
              </button>
              <button
                onClick={() => handleSelect("highToLow")}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-left transition 
                  ${sortOption === "highToLow" ? "bg-black text-white" : "hover:bg-gray-100 text-gray-800"}`}
              >
                High to Low
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Filter;