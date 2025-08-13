import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import SaveButton from '../AddMenu/SaveButton.jsx';
import Summary from '../AddMenu/Summary.jsx';
import Loading from '../common/Loading.jsx';

const SaveSettingsTab = ({
  id,
  formData,
  categoryOptions,
  handleDeleteModal,
  handleSubmit,
  category
}) => {
   const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex justify-end p-4">
        {id !== "new" && (
          <div className="bg-blue-50 border border-blue-100 text-blue-900 p-4 rounded-xl flex items-start space-x-4 shadow-sm w-full">
            <AlertTriangle size={24} className="text-blue-500 mt-1" />
            <div className="flex-1 text-sm">
              <p className="mb-3">
                If you want to temporarily remove your data, please use the{" "}
                <span className="font-semibold text-blue-700">status change</span> (enable or disable). 
                This allows you to hide the product temporarily. When you're ready, you can use{" "}
                <span className="font-semibold text-blue-700">Delete Item</span> to permanently remove it.
              </p>
              <button
                type="button"
                className="bg-red-50 border border-red-200 hover:bg-red-100 transition text-red-700 px-4 py-2 rounded-md font-medium"
                onClick={handleDeleteModal}
              >
                Delete Item
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Save & Settings</h3>
        <SaveButton handleSubmit={async() => {
          setLoading(true);
          await handleSubmit(category);
          setLoading(false);
        }} />

        {/* Summary Section */}
        <div className="mt-6">
          <Summary 
            formData={formData} 
            categoryOptions={categoryOptions} 
          />
        </div>
      </div>
      {loading && (
       <Loading />
      )}
    </>
  );
};

export default SaveSettingsTab;
