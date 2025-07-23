/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAddToCart } from "@/shared/services/queries/cart.query";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase/config";
import LazyImg from "@/shared/components/LazyImg";

// Animation configs
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const FoodOrderDetailModal = ({ item, onClose }) => {
    const navigate = useNavigate();

    const [selectedVariant, setSelectedVariant] = useState(() => {
        const keys = item?.variants ? Object.keys(item.variants) : [];
        return keys.length > 0 ? keys[0] : undefined;
    });
    const { userId } = useSelector((state) => state.user);
    const { mutate: addToCart } = useAddToCart(userId);

    const [addons, setAddons] = useState([]);
    const [quantity, setQuantity] = useState(1);
    // ****** Ref ******
    const drawerRef = useRef();

    // ****** useEffects ******
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    if (!item) return null;

    const toggleAddon = (addon) => {
        setAddons((prev) => (prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]));
    };

    const getPricePerQuantity = () => {
        const variantPrice = parseFloat(item.variants?.[selectedVariant]?.price || item.itemPrice || 0);

        const addonsTotal = Object.values(item.addOn || {})
            .flat()
            .filter((addon) => addons.includes(addon.name.trim()))
            .reduce((sum, addon) => sum + parseFloat(addon.price || 0), 0);

        const total = variantPrice + addonsTotal;
        return total.toFixed(3);
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.div
                    ref={drawerRef}
                    className="bg-white w-full max-w-md rounded-2xl shadow-xl relative flex flex-col max-h-[90vh] overflow-hidden"
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-white/30 z-10 text-gray-600 hover:text-black p-1 rounded-full transition-all duration-200 hover:bg-gray-200 active:scale-90"
                    >
                        <X size={10} />
                    </button>

                    {/* Image */}
                    <div className="w-full h-64">
                        <LazyImg src={item.imageUrl} alt={item.name} className="object-cover h-full w-full rounded-t-2xl" />
                    </div>

                    {/* Scrollable content */}
                    <div className="p-4 flex-1 overflow-y-auto scrollbar-hide">
                        <h2 className="text-2xl font-bold">{item.name}</h2>
                        <p className="text-sm text-gray-600 mb-4">{item.description || "A tasty dish from our kitchen."}</p>

                        {/* Variant Selection */}
                        {item.variants && Object.keys(item.variants).length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-gray-500 mb-2">SELECT OPTION</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {Object.entries(item.variants).map(([variantName]) => (
                                        <button
                                            key={variantName}
                                            className={`px-3 py-1 rounded-full border text-sm transition-all duration-150 ${
                                                selectedVariant === variantName
                                                    ? "bg-black text-white"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                            onClick={() => setSelectedVariant(variantName)}
                                        >
                                            {variantName.trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Addons */}
                        {item.addOn && (
                            <div className="space-y-4 mb-4">
                                {Object.entries(item.addOn).map(([groupName, options]) => (
                                    <div key={groupName}>
                                        <h3 className="text-sm font-semibold text-gray-500 mb-2">
                                            {groupName.trim().toUpperCase()}
                                        </h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {options.map((option) => {
                                                const trimmedName = option.name.trim();
                                                return (
                                                    <div
                                                        key={trimmedName}
                                                        className={`border-2 rounded-lg px-3 py-2 text-sm cursor-pointer transition-all duration-150 ${
                                                            addons.includes(trimmedName)
                                                                ? "border-black bg-gray-100"
                                                                : "border-gray-300 hover:border-black"
                                                        }`}
                                                        onClick={() => toggleAddon(trimmedName)}
                                                    >
                                                        {trimmedName} (+OMR {option.price.toFixed(3)})
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t  p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xl font-bold">OMR {(getPricePerQuantity() * quantity).toFixed(3)}</div>
                        <div className="flex items-center gap-3">
                            <button
                                className="w-8 h-8 rounded-full bg-gray-100 text-xl transition duration-150 hover:bg-gray-200"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <span className="text-lg font-medium">{quantity}</span>
                            <button
                                className="w-8 h-8 rounded-full bg-gray-100 text-xl transition duration-150 hover:bg-gray-200"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                        <Button
                            onClick={() => {
                                if (!auth.currentUser) {
                                    navigate("/auth");
                                    return;
                                }
                                const variant = selectedVariant;
                                const selectedAddons = addons;
                                const pricePerQuantity = getPricePerQuantity();

                                addToCart({
                                    ...item,
                                    selectedVariant: variant,
                                    selectedAddons,
                                    pricePerQuantity,
                                    quantity,
                                });

                                onClose();
                            }}
                            className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-200"
                        >
                            Add to Order
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default React.memo(FoodOrderDetailModal);

