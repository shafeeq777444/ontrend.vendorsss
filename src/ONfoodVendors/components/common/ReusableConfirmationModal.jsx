import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ReusableConfirmationModal = ({
  isOpen,
  onClose,
  onAction,
  image,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  closeText = "Cancel",
  actionText = "Confirm",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          {/* Background Layer */}
          <motion.div
            initial={{ opacity: 0, rotate: 3, scale: 0.95 }}
            animate={{ opacity: 1, rotate: 3, scale: 1 }}
            exit={{ opacity: 0, rotate: 3, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full max-w-sm h-full max-h-[190px] border-2 bg-white/30 border-gray-200 rounded-3xl shadow-lg z-10"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-black -rotate-3 rounded-2xl shadow-xl w-full max-w-sm p-6 relative z-20"
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Optional Image */}
            {image && (
              <div className="flex justify-center mb-4">
                <img src={image} alt="modal" className="h-28 object-contain" />
              </div>
            )}

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-100 text-center mb-2">{title}</h2>

            {/* Description */}
            <p className="text-sm text-gray-400 text-center mb-6">{description}</p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-200"
              >
                {closeText}
              </button>
              <button
                onClick={onAction}
                className="px-4 py-2 rounded-full text-sm bg-black text-white hover:bg-gray-900"
              >
                {actionText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReusableConfirmationModal;
