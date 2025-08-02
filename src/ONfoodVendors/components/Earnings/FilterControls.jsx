import React from 'react';

const FilterControls = ({ selectedFilter, setSelectedFilter, selectedYear, setSelectedYear, isYearDropdownOpen, setIsYearDropdownOpen }) => {
  const filterOptions = ['Today', 'Last Week', 'Last Month', 'Last Year'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Earnings</h2>
      <div className="flex flex-wrap gap-3 items-center">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelectedFilter(option);
              setIsYearDropdownOpen(false);
            }}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedFilter === option
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            {option}
          </button>
        ))}
        
        {/* Custom Year Selector */}
        <div className="relative">
          <button
            onClick={() => {
              if (selectedFilter === 'Year') {
                setIsYearDropdownOpen(!isYearDropdownOpen);
              } else {
                setSelectedFilter('Year');
                setIsYearDropdownOpen(true);
              }
            }}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedFilter === 'Year'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            <span>Year {selectedFilter === 'Year' ? selectedYear : ''}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isYearDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isYearDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10 min-w-[120px]">
              {[2025, 2024, 2023, 2022, 2021].map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    selectedYear === year ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterControls; 