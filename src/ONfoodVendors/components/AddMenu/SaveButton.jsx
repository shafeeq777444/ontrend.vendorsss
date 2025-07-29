import React from 'react';

const SaveButton = ({ handleSubmit }) => {
  return (
    <div className="pt-6 flex justify-end">
      <button
        onClick={handleSubmit}
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50"
      >

        <span>Save Food Item</span>
      </button>
    </div>
  );
};

export default SaveButton;
