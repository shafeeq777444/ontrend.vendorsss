import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 50, scale: 1, y: 0 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 50, scale: 1, y: 0 },
};

const ProductViewModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center px-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-4xl p-6 shadow-lg relative overflow-y-auto max-h-[90vh]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1,1 - Image */}
            <div className="row-span-1">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
            </div>

            {/* 1,2 - Details */}
            <div className="row-span-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.name}</h2>
              <p className="text-gray-500 text-sm mb-3 italic">{item.localName}</p>
              <p className="text-gray-700 text-sm mb-4">
                {item.description || "No description available."}
              </p>

              <DetailRow label="Category" value={item.category} />
              <DetailRow label="Preparation Time" value={`${item.preparationTime} min`} />

              <div className="mt-2">
                <span className="text-gray-600 text-sm">Price:</span>{" "}
                {item.discountAmount > 0 ? (
                  <>
                    <span className="font-semibold text-green-600">
                      OMR {Number(item.price).toFixed(3)}
                    </span>
                    <span className="ml-2 text-red-500 text-sm line-through">
                      OMR {Number(item.itemPrice).toFixed(3)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold text-green-600">
                    OMR {Number(item.itemPrice).toFixed(3)}
                  </span>
                )}
              </div>
            </div>

            {/* 2,1 - Add-ons */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="font-medium mb-2 text-gray-800">Add-ons</h4>
              {item.addOn && Object.keys(item.addOn).length > 0 ? (
                Object.entries(item.addOn).map(([groupName, addons]) =>
                  Array.isArray(addons) && addons.length > 0 ? (
                    <div key={groupName} className="mb-3">
                      <p className="text-sm font-semibold capitalize mb-1">{groupName}</p>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {addons.map((addon, i) => (
                          <li key={i} className="flex justify-between">
                            <span>
                              {addon.name} {addon.isRequired && "(Required)"}
                            </span>
                            <span className="text-green-600">
                              OMR {Number(addon.price).toFixed(3)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-sm text-gray-500">No add-ons available.</p>
              )}
            </div>

            {/* 2,2 - Variants */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
              <h4 className="font-medium mb-2 text-gray-800">Variants</h4>
              {item.variants && Object.keys(item.variants).length > 0 ? (
                <ul className="space-y-1 text-sm text-gray-700">
                  {Object.entries(item.variants).map(([key, value], i) => (
                    <li key={i} className="flex justify-between">
                      <span>{key} (Qty: {value.qty})</span>
                      <span className="text-green-600">
                        OMR {Number(value.price).toFixed(3)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No variants available.</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="mb-1">
    <span className="text-gray-600 text-sm">{label}:</span>{" "}
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default ProductViewModal;
