import React from "react";

const SaveAndCancelButton = ({ handleSubmit, handleCancel, isLoading }) => {
    return (
        <div className="flex justify-end space-x-4">
            <button
                type="button"
                className="bg-white hover:bg-gray-100 transition text-gray-800 px-4 py-2 rounded-md font-medium"
                onClick={() => handleCancel()}
            >
                Cancel
            </button>
            <button
                onClick={handleSubmit}
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50"
                disabled={isLoading}
            >
                {isLoading ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
                <span className="ml-2">Save</span>
            </button>
        </div>
    );
};

export default SaveAndCancelButton;
