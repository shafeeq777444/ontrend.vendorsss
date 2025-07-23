import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSelector } from "react-redux";
import { useAddToCart } from "@/shared/services/queries/cart.query";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase/config";



const FoodVendorDrawer = ({ item, onClose }) => {
  const navigate=useNavigate()
  const [selectedVariant, setSelectedVariant] = useState(() => {
    const keys = item?.variants ? Object.keys(item.variants) : [];
    return keys.length > 0 ? keys[0] : undefined;
  });
  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const drawerRef = useRef();

  const { userId } = useSelector((state) => state.user);
    const { mutate: addToCart } = useAddToCart(userId);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!item) return null;

  const toggleAddon = (addon) => {
    setAddons((prev) =>
      prev.includes(addon)
        ? prev.filter((a) => a !== addon)
        : [...prev, addon]
    );
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
    <>
      <div
        ref={drawerRef}
        className="flex-1 overflow-y-auto scrollbar-hide rounded-t-lg bg-white"
      >
        {/* Image Header */}
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-64 object-cover p-1 rounded-2xl"
          />
          <div
            onClick={onClose}
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow cursor-pointer"
          >
            <ChevronLeft size={20} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between">
          {/* Title & Description */}
          <div>
            <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-4">
              {item.description || "A tasty dish from our kitchen."}
            </p>

            {/* Variant Selection */}
            {item.variants && Object.keys(item.variants).length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  SELECT OPTION
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {Object.entries(item.variants).map(([variantName]) => (
                    <button
                      key={variantName}
                      className={`px-4 py-1 rounded-full border text-sm font-medium ${
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

            {/* Add-ons */}
            {item.addOn && (
              <div className="mt-5 space-y-6 mb-24">
                {Object.entries(item.addOn).map(([groupName, options]) => (
                  <div key={groupName}>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {groupName.trim().toUpperCase()}
                    </h3>
                    <div className="flex gap-3 flex-wrap">
                      {options.map((option) => {
                        const trimmedName = option.name.trim();
                        return (
                          <div
                            key={trimmedName}
                            className={`border-2 rounded-xl p-3 min-w-[100px] text-center cursor-pointer ${
                              addons.includes(trimmedName)
                                ? "border-black bg-gray-100"
                                : "border-gray-300"
                            }`}
                            onClick={() => toggleAddon(trimmedName)}
                          >
                            <div className="text-sm font-medium">
                              {trimmedName}
                            </div>
                            <div className="text-xs text-gray-500">
                              +OMR {option.price?.toFixed(3) || "0.000"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white py-4 px-4 border-t fixed bottom-0 left-0 right-0 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xl font-bold">OMR {(getPricePerQuantity() * quantity).toFixed(3)}</div>

            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 rounded-full bg-gray-100 text-xl"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                className="w-8 h-8 rounded-full bg-gray-100 text-xl"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <Button
              className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md"
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
      quantity
    });

    onClose();
  }}
            >
              Add to order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(FoodVendorDrawer);
