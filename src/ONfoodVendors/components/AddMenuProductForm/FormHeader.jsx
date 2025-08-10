import React from 'react';
import { X } from 'lucide-react';
import IsDisabled from '../AddMenu/IsDisabled.jsx';

const FormHeader = ({ 
  formData, 
  handleToggleDisabled, 
  handleCancelModal 
}) => {
  return (
    <>
      {/* Close button - Top Right */}
      <button
        type="button"
        className="absolute top-4 right-4 bg-white hover:bg-gray-100 transition text-gray-800 p-2 rounded-full border border-gray-300 shadow-sm hover:shadow-md"
        onClick={handleCancelModal}
        title="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Status toggle */}
      <div className="mb-6">
        <IsDisabled
          isDisabled={formData.isDisabled}
          handleToggleDisabled={handleToggleDisabled}
        />
      </div>
    </>
  );
};

export default FormHeader;
