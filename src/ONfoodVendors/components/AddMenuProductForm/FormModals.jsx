import React from 'react';
import ReusableConfirmationModal from '../common/ReusableConfirmationModal.jsx';

const FormModals = ({
  deleteModal,
  setDeleteModal,
  cancelModal,
  setCancelModal,
  handleConfirmationModal,
  handleConfirmCancel
}) => {
  return (
    <>
      {deleteModal && (
        <ReusableConfirmationModal
          title="Delete Item"
          isOpen={deleteModal}
          description="Are you sure you want to delete this item?"
          onAction={handleConfirmationModal}
          onClose={() => setDeleteModal(false)}
        />
      )}

      {cancelModal && (
        <ReusableConfirmationModal
          title="Cancel Changes"
          isOpen={cancelModal}
          description="Are you sure you want to cancel? Any unsaved changes will be lost."
          onAction={handleConfirmCancel}
          onClose={() => setCancelModal(false)}
        />
      )}
    </>
  );
};

export default FormModals;
