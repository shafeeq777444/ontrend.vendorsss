import React, { useRef, useState } from "react";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
};

const VariantListCard = ({ initialvariants = {}, onChange }) => {
    const qtyRef = useRef(null);
    const priceRef = useRef(null);
    const saveBtnRef = useRef(null);
    const [variants, setVariants] = useState(initialvariants);
    const [editKey, setEditKey] = useState(null);
    const [editVariant, setEditVariant] = useState({ key: "", qty: "", price: "" });
    const [isAdding, setIsAdding] = useState(false);
    const [newVariant, setNewVariant] = useState({ key: "", qty: "", price: "" });

    const handleAddNewVariant = () => {
        const trimmedKey = newVariant.key.trim();
        const qtyNum = parseFloat(newVariant.qty);
        const priceNum = parseFloat(newVariant.price);

        if (!trimmedKey) return toast.error("Variant name is required");
        if (isNaN(qtyNum) || qtyNum <= 0) return toast.error("Quantity must be greater than 0");
        if (isNaN(priceNum) || priceNum <= 0) return toast.error("Price must be greater than 0");
        if (variants[trimmedKey]) return toast.error("Variant already exists");

        const updated = {
            ...variants,
            [trimmedKey]: { qty: qtyNum, price: priceNum },
        };

        setVariants(updated);
        setNewVariant({ key: "", qty: "", price: "" });
        setIsAdding(false);
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
        <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Variants</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                <AnimatePresence>
                    {Object.entries(variants).map(([key, value]) => (
                        <motion.div
                            key={key}
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={boxVariants}
                            transition={{ duration: 0.25 }}
                            className="group border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col justify-between bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-offset-1 h-40 min-h-[160px]"
                        >
                            {editKey === key ? (
                                <>
                                    <input
                                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 mb-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                        value={editVariant.key}
                                        onChange={(e) => setEditVariant({ ...editVariant, key: e.target.value })}
                                        placeholder="Variant Name"
                                    />
                                    <input
                                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 mb-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                        value={editVariant.qty}
                                        onChange={(e) => setEditVariant({ ...editVariant, qty: Math.ceil(e.target.value) })}
                                        placeholder="Quantity"
                                        type="number"
                                        min={0}
                                    />
                                    <input
                                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                        value={editVariant.price}
                                        onChange={(e) => setEditVariant({ ...editVariant, price: e.target.value })}
                                        placeholder="Price"
                                        type="number"
                                        min={0}
                                    />
                                    <div className="flex gap-2 justify-end">
                                        <Check
                                            className="text-green-600 cursor-pointer"
                                            onClick={handleSaveEdit}
                                            title="Save"
                                        />
                                        <X
                                            className="text-gray-500 cursor-pointer"
                                            onClick={() => setEditKey(null)}
                                            title="Cancel"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="font-semibold text-gray-800 mb-1 truncate">{key}</div>
                                    <div className="text-gray-600 text-sm">Qty: {value.qty}</div>
                                    <div className="text-gray-600 text-sm mb-2">Price: OMR {value.price.toFixed(3)}</div>
                                    <div className="flex gap-2 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(key)}
                                            title="Edit variant"
                                            aria-label={`Edit variant ${key}`}
                                            className="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition h-8 w-8"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(key)}
                                            title="Delete variant"
                                            aria-label={`Delete variant ${key}`}
                                            className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1 transition h-8 w-8"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}

                    {/* Plus box for adding new variant */}
                    <motion.div
                        layout
                        key="add-new"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={boxVariants}
                        transition={{ duration: 0.25 }}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors h-40 min-h-[160px]"
                        onClick={() => setIsAdding(true)}
                    >
                        {!isAdding ? (
                            <Plus className="w-8 h-8 text-blue-600" title="Add variant" />
                        ) : (
                            <div className="flex flex-col justify-between h-full w-full">
                                {/* Variant Name */}
                                <input
                                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 mb-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                    value={editVariant.key}
                                    onChange={(e) => setEditVariant({ ...editVariant, key: e.target.value })}
                                    placeholder="Variant Name"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            qtyRef.current?.focus(); // Move to Qty
                                        }
                                    }}
                                />

                                {/* Quantity */}
                                <input
                                    ref={qtyRef}
                                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 mb-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                    value={editVariant.qty}
                                    onChange={(e) => setEditVariant({ ...editVariant, qty: Math.ceil(e.target.value) })}
                                    placeholder="Quantity"
                                    type="number"
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            priceRef.current?.focus(); // Move to Price
                                        }
                                    }}
                                />

                                {/* Price */}
                                <input
                                    ref={priceRef}
                                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                    value={editVariant.price}
                                    onChange={(e) => setEditVariant({ ...editVariant, price: e.target.value })}
                                    placeholder="Price"
                                    type="number"
                                    min={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSaveEdit(); // Trigger Save
                                        }
                                    }}
                                />

                                {/* Save & Cancel */}
                                <div className="flex gap-2 justify-end">
                                    <Check
                                        ref={saveBtnRef}
                                        className="text-green-600 cursor-pointer"
                                        onClick={handleSaveEdit}
                                        title="Save"
                                    />
                                    <X
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() => setEditKey(null)}
                                        title="Cancel"
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VariantListCard;
