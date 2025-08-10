import React from 'react';

const SaveButton = ({ handleSubmit }) => {
  return (
    <div className="pt-6 flex justify-end">
      <button
        onClick={handleSubmit}
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50"
      >

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="ml-2"> Save </span>
      </button>
    </div>
  );
};

export default SaveButton;
