import React from 'react';

const NavigationButtons = ({ activeTab, handlePrevious, handleNext }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex space-x-2">
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          onClick={handlePrevious}
          disabled={activeTab === 1}
        >
          Previous
        </button>
        {activeTab < 5 && (
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
