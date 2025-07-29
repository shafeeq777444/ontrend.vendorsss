import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../common/ConfirmationModal";

const AddOnListCard = ({ initialAddOn = {}, onChange }) => {
  const [addOnData, setAddOnData] = useState(initialAddOn || {});
  const [newAddOnName, setNewAddOnName] = useState("");

  const [confirmState, setConfirmState] = useState({
    type: null,
    target: null,
    extra: null,
  });

  const triggerChange = (updated) => {
    setAddOnData(updated);
    onChange?.(updated);
  };

  const handleAddAddOn = () => {
    const addOnName = newAddOnName.trim();
    if (!addOnName) return toast.error("Add-on name required");
    if (addOnData[addOnName]) return toast.error("Add-on already exists");

    const updated = { ...addOnData, [addOnName]: [] };
    triggerChange(updated);
    setNewAddOnName("");
  };

  const handleDeleteAddOn = (addOnName) => {
    const updated = { ...addOnData };
    delete updated[addOnName];
    triggerChange(updated);
  };

  const handleDeleteItem = (addOnName, index) => {
    const updatedGroup = [...addOnData[addOnName]].filter((_, i) => i !== index);
    const updated = { ...addOnData, [addOnName]: updatedGroup };
    triggerChange(updated);
  };

  const handleAddItem = (addOnName) => {
    const updatedGroup = [
      ...(addOnData[addOnName] || []),
      {
        name: "",
        price: 0,
        isRequired: addOnData[addOnName].required || false,
        usageCount: 0,
      },
    ];
    const updated = { ...addOnData, [addOnName]: updatedGroup };
    triggerChange(updated);
  };

  const handleUpdateItem = (addOnName, index, key, value) => {
    const updatedGroup = [...addOnData[addOnName]];
    updatedGroup[index][key] = value;
    const updated = { ...addOnData, [addOnName]: updatedGroup };
    triggerChange(updated);
  };

  const handleAddOnRequired = (addOnName, isRequired) => {
    const updated = { ...addOnData };
    updated[addOnName] = updated[addOnName].map((item) => ({
      ...item,
      isRequired,
    }));
    triggerChange(updated);
  };

  const confirmDeleteAddOn = (addOnName) => {
    setConfirmState({
      type: "group",
      target: addOnName,
    });
  };

  const confirmDeleteItem = (addOnName, index) => {
    setConfirmState({
      type: "item",
      target: addOnName,
      extra: index,
    });
  };

  const handleConfirmDelete = () => {
    const { type, target, extra } = confirmState;
    if (type === "group") {
      handleDeleteAddOn(target);
    } else if (type === "item") {
      handleDeleteItem(target, extra);
    }
    setConfirmState({ type: null, target: null, extra: null });
  };

  return (
    <div className="space-y-6">
      {/* ➕ Add Add-on Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter new add-on group name"
          value={newAddOnName}
          onChange={(e) => setNewAddOnName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddAddOn}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Group
        </button>
      </div>

      {/* Render each Add-on Group */}
      {Object.entries(addOnData).map(([addOnName, items]) => (
        <div key={addOnName} className="border rounded-md p-4 shadow-sm space-y-4">
          {/* Group Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-semibold text-lg">{addOnName}</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={items.length > 0 && items.every((item) => item.isRequired)}
                  onChange={(e) => handleAddOnRequired(addOnName, e.target.checked)}
                  className="accent-green-600"
                />
                <span className="text-gray-700"> Required</span>
              </label>
              <button
                onClick={() => handleAddItem(addOnName)}
                className="text-blue-600 hover:text-blue-800"
                title="Add item"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => confirmDeleteAddOn(addOnName)}
                className="text-red-500 hover:text-red-700"
                title="Delete group"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Group Items */}
          <div className="space-y-2">
            {/* Column Labels for Desktop */}
            <div className="hidden md:grid md:grid-cols-4 gap-2 text-gray-500 text-sm font-medium px-2">
              <span>Item</span>
              <span>Price</span>
              <span>Required</span>
              <span>Delete</span>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap md:grid md:grid-cols-4 items-center gap-2 bg-gray-100 p-3 rounded-md"
              >
                <input
                  className="border rounded p-2 w-full"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleUpdateItem(addOnName, index, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="border rounded p-2 w-full"
                  placeholder="Price (e.g., 0.50)"
                  step="0.01"
                  value={item.price}
                  onChange={(e) =>
                    handleUpdateItem(addOnName, index, "price", +e.target.value)
                  }
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    disabled
                    checked={item.isRequired}
                    onChange={(e) =>
                      handleUpdateItem(addOnName, index, "isRequired", e.target.checked)
                    }
                    className="accent-green-600"
                  />
                  Required
                </label>
                <button
                  onClick={() => confirmDeleteItem(addOnName, index)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Confirmation Modal */}
      {confirmState.type && (
        <ConfirmModal
          title={
            confirmState.type === "group"
              ? `Delete group "${confirmState.target}"?`
              : `Delete item from "${confirmState.target}"?`
          }
          description="This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={() =>
            setConfirmState({ type: null, target: null, extra: null })
          }
        />
      )}
    </div>
  );
};

export default AddOnListCard;
