import React from 'react';

const IsDisabled = ({ isDisabled, handleToggleDisabled }) => {
  return (
    <div className="flex items-center gap-4 mt-6 px-4 py-3 bg-gray-50 border rounded-lg">
      <span className="font-medium text-gray-700">Status:</span>
      <span
        className={`text-sm font-semibold ${
          isDisabled ? 'text-red-500' : 'text-green-600'
        }`}
      >
        {isDisabled ? 'Disabled' : 'Enabled'}
      </span>

      <button
        type="button"
        onClick={handleToggleDisabled}
        role="switch"
        aria-checked={!isDisabled}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
          isDisabled ? 'bg-red-400' : 'bg-green-500'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isDisabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>

      <span className="text-sm text-gray-500">
        {isDisabled ? 'Click to Enable' : 'Click to Disable'}
      </span>
    </div>
  );
};

export default IsDisabled;
