import { Pencil } from "lucide-react";
import { motion } from "framer-motion";

const VariantRowCompleted = ({ variant, index, setActiveIndex }) => {
  return (
    <motion.div
      key="summary"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-1"
    >
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-900 flex items-center gap-2">
          {variant.variantName || "(No name)"}
          <button
            type="button"
            className="ml-1 p-1 rounded hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
            aria-label="Edit variant"
          >
            <Pencil className="w-4 h-4 text-gray-500 hover:text-red-400" />
          </button>
        </div>
      </div>
      <div className="flex gap-4 text-sm text-gray-600">
        <span>Qty: <span className="font-semibold">{variant.qty}</span></span>
        <span>Price: <span className="font-semibold">${variant.price}</span></span>
      </div>
    </motion.div>
  );
};

export default VariantRowCompleted;
