import React from 'react';

const IsDisabled = ({ isDisabled, handleToggleDisabled }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Status:</span>
      
      <button
        type="button"
        onClick={handleToggleDisabled}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          isDisabled 
            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {isDisabled ? 'Disabled' : 'Enabled'}
      </button>
      
      <span className="text-xs text-gray-400">
        Click to toggle
      </span>
    </div>
  );
};

export default IsDisabled;
