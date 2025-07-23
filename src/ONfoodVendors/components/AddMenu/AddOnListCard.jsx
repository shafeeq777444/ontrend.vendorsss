/* eslint-disable no-unused-vars */
import React from "react";
import { Trash2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddOnListCard = ({
  addOns,
  onAdd,
  onRemove,
  onChange,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 border w-full max-w-md space-y-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Add-Ons</h3>
          <p className="text-xs text-gray-500">Click a row to edit add-on</p>
        </div>
        <button
          onClick={onAdd}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        <AnimatePresence initial={false}>
          {addOns.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-base text-gray-400 py-6 text-center"
            >
              No add-ons added
            </motion.div>
          ) : (
            addOns.map((addOn, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={`flex items-center justify-between py-4 px-3 cursor-pointer rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50 border border-blue-200 shadow-sm"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveIndex(index)}
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
                            placeholder="Add-On Title"
                            value={addOn.name}
                            onChange={(e) =>
                              onChange(index, "name", e.target.value)
                            }
                            className="font-medium text-gray-900 border border-gray-300 focus:border-blue-400 bg-white mb-2 w-full rounded-lg px-4 py-2 text-base"
                            autoFocus
                            onBlur={() => setActiveIndex(null)}
                          />
                          <div className="flex gap-2 mt-2">
                            {["Required", "Optional"].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => onChange(index, "type", type)}
                                className={`px-3 py-1 rounded-full border text-sm transition ${
                                  addOn.type === type
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
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
                          <div className="font-medium text-gray-900 text-base pl-1">
                            {addOn.name || (
                              <span className="text-gray-400">(No title)</span>
                            )}
                          </div>
                          <div className="text-sm text-blue-600 pl-1 font-semibold">
                            {addOn.type}
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

export default AddOnListCard;
