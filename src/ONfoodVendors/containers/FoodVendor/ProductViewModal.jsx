import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 50 },
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
          className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Product Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg"
            />

            {/* Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-500 text-sm mb-3">{item.localName}</p>
              <p className="text-sm mb-3">{item.description || "No description available."}</p>

              <div className="mb-2">
                <span className="text-gray-600 text-sm">Category:</span>{" "}
                <span className="font-medium">{item.category}</span>
              </div>

              <div className="mb-2">
                <span className="text-gray-600 text-sm">Preparation Time:</span>{" "}
                <span className="font-medium">{item.preparationTime} min</span>
              </div>

              <div className="mb-2">
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

              {/* Add-ons */}
              {item.addOn?.extra?.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-1">Add-ons:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {item.addOn.extra.map((addon, i) => (
                      <li key={i}>
                        {addon.name} - OMR {Number(addon.price).toFixed(3)}{" "}
                        {addon.isRequired ? "(Required)" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Variants */}
              {item.variants && Object.keys(item.variants).length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-1">Variants:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {Object.entries(item.variants).map(([key, value], i) => (
                      <li key={i}>
                        {key} - OMR {Number(value.price).toFixed(3)} (Qty: {value.qty})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductViewModal;
