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
        if (isNaN(parseFloat(qty)) || parseFloat(qty) < 0) return toast.error("Quantity must be positive");
        if (isNaN(parseFloat(price)) || parseFloat(price) < 0) return toast.error("Price must be positive");

        if (variants[trimmedKey]) toast.success("Existing variant updated");
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
                    {Object.entries(variants)?.map(([key, value]) => (
                        <motion.div
                            key={key}
                            layout
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={boxVariants}
                            transition={{ duration: 0.25 }}
                            className="group border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col justify-between bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:ring-offset-1 h-44 min-h-[160px]"
                        >
                            {editKey === key ? (
                                <>
                                    <input
                                        className="border border-gray-300 rounded-lg px-2.5 py-1.5 mb-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                                        value={editVariant.key}
                                        onChange={(e) => setEditVariant({ ...editVariant, key: e.target.value })}
                                        placeholder="Variant Name"
                                    />
                                    {/* Quantity (Edit Mode) */}
                                    <div className="relative mb-1">
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">
                                            Qty
                                        </span>
                                        <input
                                            className="border border-gray-300 rounded-lg pl-10 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 w-full"
                                            value={editVariant.qty}
                                            onChange={(e) =>
                                                setEditVariant({ ...editVariant, qty: isNaN(e.target.value) || e.target.value==0 ?  "": Math.ceil(e.target.value) })
                                            }
                                            placeholder="0"
                                            type="number"
                                            min={0}
                                        />
                                    </div>

                                    {/* Price (Edit Mode) */}
                                    <div className="relative mb-2">
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">
                                            OMR
                                        </span>
                                        <input
                                            className="border border-gray-300 rounded-lg pl-12 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 w-full"
                                            value={editVariant.price}
                                            onChange={(e) => setEditVariant({ ...editVariant, price: e.target.value })}
                                            placeholder="0.000"
                                            type="number"
                                            min={0}
                                        />
                                    </div>

                                    <div className="flex gap-2 justify-end mt-1">
                                        <button
                                            type="button"
                                            onClick={handleSaveEdit}
                                            className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600  transition-all h-8 w-8 shadow-sm"
                                            title="Save"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditKey(null);
                                                setIsAdding(false);
                                            }}
                                            className="inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition-all h-8 w-8 shadow-sm"
                                            title="Cancel"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="font-semibold text-gray-800 mb-1 truncate">{key}</div>
                                    <div className="text-gray-600 text-sm">Qty: {value?.qty}</div>
                                    {/* <div className="text-gray-600 text-sm mb-2">Price: OMR {value?.price?.toFixed(3)}</div> */}
                                    <div className="text-gray-600 text-sm mb-2">
                                        Price: OMR {Number(value?.price)?.toFixed(3)}
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsAdding(false);
                                                handleEdit(key);
                                            }}
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
                        className={`${
                            !isAdding ? "border-2 border-dashed border-gray-300" : "border border-gray-200 shadow-md"
                        } rounded-xl p-3 sm:p-4 flex items-center justify-center  transition-colors h-44 min-h-[160px]`}
                    >
                        {!isAdding ? (
                            <Plus
                                onClick={() => {
                                    setIsAdding(true);
                                    setEditKey(null);
                                    setEditVariant({ key: "", qty: "", price: "" });
                                }}
                                className="w-8 h-8 text-blue-600 hover:bg-blue-100  cursor-pointer rounded-full duration-300 ease-in-out transition-all"
                                title="Add variant  "
                            />
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
                                <div className="relative mb-1">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">
                                        Qty
                                    </span>
                                    <input
                                        ref={qtyRef}
                                        className="border border-gray-300 rounded-lg pl-10 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 w-full"
                                        value={editVariant.qty}
                                        onChange={(e) => setEditVariant({ ...editVariant, qty: Math.ceil(e.target.value) })}
                                        placeholder="0"
                                        type="number"
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                priceRef.current?.focus(); // Move to Price
                                            }
                                        }}
                                    />
                                </div>

                                {/* Price */}
                                <div className="relative mb-2">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">
                                        OMR
                                    </span>
                                    <input
                                        ref={priceRef}
                                        className="border border-gray-300 rounded-lg pl-12 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 w-full"
                                        value={editVariant.price}
                                        onChange={(e) => setEditVariant({ ...editVariant, price: e.target.value })}
                                        placeholder="0.000"
                                        type="number"
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleSaveEdit(); // Trigger Save
                                            }
                                        }}
                                    />
                                </div>

                                {/* Save & Cancel */}
                                <div className="flex gap-2 justify-end mt-1">
                                    <button
                                        type="button"
                                        onClick={handleSaveEdit}
                                        className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600  transition-all h-8 w-8 shadow-sm"
                                        title="Save"
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditKey(null);
                                            setIsAdding(false);
                                        }}
                                        className="inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition-all h-8 w-8 shadow-sm"
                                        title="Cancel"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
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
