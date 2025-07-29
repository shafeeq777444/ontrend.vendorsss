import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const VariantRowEditable = ({ variant, index, onSave }) => {
  const [form, setForm] = useState(variant);

  return (
    <motion.div
      key="edit"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <input
        type="text"
        value={form.variantName}
        onChange={(e) => setForm({ ...form, variantName: e.target.value })}
        className="font-medium text-gray-900 border border-gray-300 focus:border-red-400 bg-white mb-2 w-full rounded-lg px-4 py-2"
        placeholder="Variant Name"
        autoFocus
      />
      <div className="flex gap-3 text-sm text-gray-700 mt-1">
        <input
          type="number"
          min="1"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: e.target.value })}
          placeholder="Qty"
          className="w-24 px-4 py-2 rounded-lg border border-gray-300 focus:border-red-400"
        />
        <input
          type="number"
          min="1"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          className="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:border-red-400"
        />
        <button
          className="bg-gray-200 hover:bg-gray-500 text-green-600 rounded-full px-2 flex justify-center items-center"
          onClick={() => onSave(form)}
        >
          <Check className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default VariantRowEditable;
