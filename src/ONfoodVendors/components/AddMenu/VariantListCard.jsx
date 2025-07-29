import React, { useState } from "react";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import toast from "react-hot-toast";

const VariantListCard = ({ initialvariants = {}, onChange }) => {
  const [variants, setVariants] = useState(initialvariants);
  const [editKey, setEditKey] = useState(null);
  const [editVariant, setEditVariant] = useState({ key: "", qty: "", price: "" });
  const [newVariant, setNewVariant] = useState({ key: "", price: "", qty: "" });

  const handleAdd = () => {
    const key = newVariant.key.trim();
    const qty = parseFloat(newVariant.qty);
    const price = parseFloat(newVariant.price);

    if (!key) return toast.error("Variant name is required");
    if (isNaN(qty) || qty <= 0) return toast.error("Quantity must be greater than 0");
    if (isNaN(price) || price <= 0) return toast.error("Price must be greater than 0");
    if (variants[key]) return toast.error("Variant already exists");

    const updated = {
      ...variants,
      [key]: { qty, price },
    };
    setVariants(updated);
    setNewVariant({ key: "", qty: "", price: "" });
    onChange && onChange(updated);
  };

  const handleEdit = (key) => {
    setEditKey(key);
    setEditVariant({ key, ...variants[key] });
  };

  const handleSaveEdit = () => {
    const oldKey = editKey;
    const { key, qty, price } = editVariant;
    const trimmedKey = key.trim();

    if (!trimmedKey) return toast.error("Variant name is required");
    if (isNaN(parseFloat(qty)) || parseFloat(qty) <= 0) return toast.error("Quantity > 0 required");
    if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) return toast.error("Price > 0 required");

    const updated = { ...variants };
    delete updated[oldKey];
    updated[trimmedKey] = { qty: parseFloat(qty), price: parseFloat(price) };

    setVariants(updated);
    setEditKey(null);
    setEditVariant({ key: "", qty: "", price: "" });
    onChange && onChange(updated);
  };

  const handleDelete = (key) => {
    const updated = { ...variants };
    delete updated[key];
    setVariants(updated);
    onChange && onChange(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Variants</h3>

      {Object.entries(variants).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg shadow-sm">
          {editKey === key ? (
            <>
              <input
                className="border p-1 px-2 w-32 rounded"
                value={editVariant.key}
                onChange={(e) => setEditVariant({ ...editVariant, key: e.target.value })}
              />
              <input
                className="border p-1 px-2 w-20 rounded"
                value={editVariant.qty}
                onChange={(e) => setEditVariant({ ...editVariant, qty: e.target.value })}
              />
              <input
                className="border p-1 px-2 w-20 rounded"
                value={editVariant.price}
                onChange={(e) => setEditVariant({ ...editVariant, price: e.target.value })}
              />
              <Check className="text-green-600 cursor-pointer" onClick={handleSaveEdit} />
              <X className="text-gray-500 cursor-pointer" onClick={() => setEditKey(null)} />
            </>
          ) : (
            <>
              <div className="w-32 font-medium text-gray-700">{key}</div>
              <div className="text-gray-600">Qty: {value.qty}</div>
              <div className="text-gray-600">Price: {value.price}</div>
              <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" onClick={() => handleEdit(key)} />
              <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => handleDelete(key)} />
            </>
          )}
        </div>
      ))}

      {/* Add new */}
      <div className="flex flex-wrap gap-2 items-center mt-4">
        <input
          placeholder="Variant Name"
          className="border p-1 px-2 w-32 rounded"
          value={newVariant.key}
          onChange={(e) => setNewVariant({ ...newVariant, key: e.target.value })}
        />
        <input
          placeholder="Qty"
          className="border p-1 px-2 w-20 rounded"
          value={newVariant.qty}
          onChange={(e) => setNewVariant({ ...newVariant, qty: e.target.value })}
        />
        <input
          placeholder="Price"
          className="border p-1 px-2 w-20 rounded"
          value={newVariant.price}
          onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded shadow flex items-center"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VariantListCard;
