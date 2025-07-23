import React from "react";
import { Trash2, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VariantListCard = ({ variants, onAdd, onRemove, onChange, activeIndex, setActiveIndex }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 border w-full max-w-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Variants</h3>
          <p className="text-xs text-gray-500">Click a row to edit variant options</p>
        </div>
        <button
          onClick={onAdd}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Variant List */}
      <div className="divide-y divide-gray-100">
        <AnimatePresence initial={false}>
          {variants.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-base text-gray-400 py-6 text-center"
            >
              No variants added
            </motion.div>
          ) : (
            variants.map((variant, index) => {
              const isActive = activeIndex === index;
              const isCompleted =
                variant.variantName.trim() !== "" &&
                variant.qty.trim() !== "" &&
                variant.price.trim() !== "";

              return (
                <motion.div
                  key={variant.id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`flex items-center justify-between py-4 px-3 cursor-pointer rounded-lg transition-all ${
                    isActive
                      ? "bg-red-50 border border-red-200 shadow-sm"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  style={{ marginTop: 8, marginBottom: 8 }}
                >
                  <div className="flex-1">
                    <AnimatePresence mode="wait" initial={false}>
                      {isActive ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <input
                            type="text"
                            name="variantName"
                            placeholder="Variant Name"
                            value={variant.variantName}
                            onChange={(e) =>
                              onChange(index, "variantName", e.target.value)
                            }
                            className="font-medium text-gray-900 border border-gray-300 focus:border-red-400 bg-white mb-2 w-full rounded-lg px-4 py-2 text-base transition"
                            autoFocus
                            onBlur={() => setActiveIndex(null)}
                          />
                          <div className="flex gap-3 text-sm text-gray-700 mt-1">
                            <input
                              type="number"
                              placeholder="Qty"
                              value={variant.qty}
                              onChange={(e) =>
                                onChange(index, "qty", e.target.value)
                              }
                              className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:border-red-400 text-base focus:outline-none transition"
                            />
                            <input
                              type="number"
                              placeholder="Price"
                              value={variant.price}
                              onChange={(e) =>
                                onChange(index, "price", e.target.value)
                              }
                              className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:border-red-400 text-base focus:outline-none transition"
                            />
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="summary"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-900 text-base pl-1">
                              {variant.variantName || (
                                <span className="text-gray-400">(No name)</span>
                              )}
                            </div>
                            {isCompleted && (
                              <Check className="text-green-600 w-5 h-5" />
                            )}
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600 pl-1">
                            <span>
                              Qty:{" "}
                              <span className="font-semibold">
                                {variant.qty || 0}
                              </span>
                            </span>
                            <span>
                              Price:{" "}
                              <span className="font-semibold">
                                ${variant.price || 0}
                              </span>
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(index);
                    }}
                    className="ml-4 text-gray-400 hover:text-red-500 p-2 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VariantListCard;
