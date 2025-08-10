import React from 'react';
import { AlertTriangle } from 'lucide-react';
import SaveButton from '../AddMenu/SaveButton.jsx';
import Summary from '../AddMenu/Summary.jsx';

const SaveSettingsTab = ({
  id,
  formData,
  categoryOptions,
  handleDeleteModal,
  handleSubmit,
  category
}) => {
  return (
    <>
      <div className="flex justify-end p-4">
        {id !== "new" && (
          <div className="bg-black text-white p-4 rounded-xl flex items-start space-x-4 shadow-lg w-full">
            <AlertTriangle size={24} className="text-yellow-400 mt-1" />
            <div className="flex-1 text-sm">
              <p className="mb-3">
                If you want to temporarily remove your data, please use the{" "}
                <span className="font-semibold">status change</span> (enable or disable). This
                allows you to hide the product temporarily. When you're ready, you can use{" "}
                <span className="font-semibold">Delete Item</span> to permanently remove it.
              </p>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-md font-medium"
                onClick={handleDeleteModal}
              >
                Delete Item
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Save & Settings</h3>
        <SaveButton handleSubmit={() => handleSubmit(category)} />
        
        {/* Summary Section */}
        <div className="mt-6">
          <Summary 
            formData={formData} 
            categoryOptions={categoryOptions} 
          />
        </div>
      </div>
    </>
  );
};

export default SaveSettingsTab;
