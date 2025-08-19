import React from 'react';

const IsDisabled = ({ isDisabled, handleToggleDisabled }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Status:</span>
      
      <div className="inline-flex rounded-lg   bg-gray-50 p-1">
        <button
          type="button"
          onClick={() => !isDisabled && handleToggleDisabled()}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            isDisabled
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Disabled
        </button>
        
        <button
          type="button"
          onClick={() => isDisabled && handleToggleDisabled()}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            !isDisabled
              ? 'bg-green-200 text-green-700 '
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Enabled
        </button>
      </div>
      
      <span className="text-xs text-gray-400">
        
      </span>
    </div>
  );
};

export default IsDisabled;
