import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../common/ConfirmationModal";

const AddOnListCard = ({ initialAddOn = {}, onChange }) => {
    const [addOnData, setAddOnData] = useState(Object.keys(initialAddOn).length > 0 ? initialAddOn : {});

    const [newAddOnName, setNewAddOnName] = useState("");
    const [showGroupInput, setShowGroupInput] = useState(false);
    const [confirmState, setConfirmState] = useState({ type: null, target: null, extra: null });

    const triggerChange = (updated) => {
        setAddOnData(updated);
        onChange?.(updated);
    };

    const handleAddAddOn = () => {
        const addOnName = newAddOnName.trim();
        if (!addOnName) return toast.error("Add-on name required");
        if (addOnData[addOnName]) return toast.error("Add-on already exists");

        triggerChange({ ...addOnData, [addOnName]: [] });
        setNewAddOnName("");
        setShowGroupInput(false);
    };

    const handleDeleteAddOn = (addOnName) => {
        const updated = { ...addOnData };
        delete updated[addOnName];
        triggerChange(updated);
    };

    const handleDeleteItem = (addOnName, index) => {
        const updatedGroup = addOnData[addOnName].filter((_, i) => i !== index);
        triggerChange({ ...addOnData, [addOnName]: updatedGroup });
    };

    const handleAddItem = (addOnName) => {
        const updatedGroup = [
            ...(addOnData[addOnName] || []),
            { name: "", price: 0, isRequired: addOnData[addOnName]?.[0]?.isRequired || false },
        ];
        triggerChange({ ...addOnData, [addOnName]: updatedGroup });
    };

    const handleUpdateItem = (addOnName, index, key, value) => {
        const updatedGroup = [...addOnData[addOnName]];
        updatedGroup[index][key] = value;
        triggerChange({ ...addOnData, [addOnName]: updatedGroup });
    };

    const handleAddOnRequired = (addOnName, isRequired) => {
        const updated = { ...addOnData };
        updated[addOnName] = updated[addOnName].map((item) => ({ ...item, isRequired }));
        triggerChange(updated);
    };

    const confirmDeleteAddOn = (addOnName) => {
        setConfirmState({ type: "group", target: addOnName });
    };

    const confirmDeleteItem = (addOnName, index) => setConfirmState({ type: "item", target: addOnName, extra: index });

    const handleConfirmDelete = () => {
        const { type, target, extra } = confirmState;
        if (type === "group") handleDeleteAddOn(target);
        else if (type === "item") handleDeleteItem(target, extra);
        setConfirmState({ type: null, target: null, extra: null });
    };

    return (
        <div className="space-y-6 p-6">
            {/* ➕ Add Add-on Group */}
            {!showGroupInput ? (
                <button
                    onClick={() => setShowGroupInput(true)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-100 active:scale-95"
                >
                    <Plus className="w-5 h-6" />
                    <span className="text-sm font-medium">Add Group</span>
                </button>
            ) : (
                <div className="flex gap-3 animate-in  duration-300">
                    <input
                        type="text"
                        placeholder="Add-on name (e.g. Extras, Spicy/Non-spicy, etc.)"
                        value={newAddOnName}
                        onChange={(e) => setNewAddOnName(e.target.value)}
                        className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-200 shadow-sm focus:shadow-md"
                        autoFocus
                    />
                    <button
                        onClick={handleAddAddOn}
                        className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                        Add
                    </button>
                    <button
                        onClick={() => {
                            setShowGroupInput(false);
                            setNewAddOnName("");
                        }}
                        className="bg-gray-200 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Groups Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(addOnData)
                    .reverse()
                    .map(([addOnName, items]) => (
                        <div
                            key={addOnName}
                            className="border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition p-5 space-y-4"
                        >
                            {/* Group Header */}
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg text-gray-800">{addOnName}</h3>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={items.length > 0 && items.every((item) => item.isRequired)}
                                            onChange={(e) => handleAddOnRequired(addOnName, e.target.checked)}
                                            className="accent-blue-600"
                                        />
                                        <span className="text-gray-600">Required</span>
                                    </label>

                                    <button
                                        onClick={() => confirmDeleteAddOn(addOnName)}
                                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="space-y-3">
                                {items.map((item, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-3">
                                        <input
                                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                            placeholder="Item Name"
                                            value={item.name}
                                            onChange={(e) => handleUpdateItem(addOnName, index, "name", e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                            placeholder="Price (OMR)"
                                            value={item.price}
                                            onChange={(e) => handleUpdateItem(addOnName, index, "price", +e.target.value)}
                                        />
                                        <div className="flex justify-between items-center">
                                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    disabled
                                                    checked={item.isRequired}
                                                    className="accent-blue-600"
                                                />
                                                Required
                                            </label>
                                            <button
                                                onClick={() => confirmDeleteItem(addOnName, index)}
                                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Add New Item */}
                                <button
                                    onClick={() => handleAddItem(addOnName)}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                                >
                                    <Plus className="w-4 h-4" /> Add Item
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

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
                    onCancel={() => setConfirmState({ type: null, target: null, extra: null })}
                />
            )}
        </div>
    );
};

export default AddOnListCard;
