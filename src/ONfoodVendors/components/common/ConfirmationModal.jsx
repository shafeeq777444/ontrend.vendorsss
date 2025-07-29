const ConfirmModal = ({ title, description, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-sm space-y-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onCancel}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 text-sm"
            >
              Cancel 
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
            >
              
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ConfirmModal;