import React from "react";

const StatusChangeModal = ({ isOpen, onClose, onConfirm, currentStatus, nextStatus }) => {
    if (!isOpen || !nextStatus) return null;

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
                <p className="text-sm text-gray-700 mb-6">
                    Are you sure you want to change the order status from{" "}
                    <strong>{currentStatus}</strong> to{" "}
                    <strong>{nextStatus}</strong>?
                </p>

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                        No
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                        Yes, Change
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusChangeModal;
