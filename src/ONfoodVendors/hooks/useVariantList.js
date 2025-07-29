import { useState } from "react";
import toast from "react-hot-toast";

export const useVariantList = (initialVariants = []) => {
  const [variants, setVariants] = useState(initialVariants);
  const [activeIndex, setActiveIndex] = useState(null);

  const addVariant = () => {
    const newVariant = { variantName: "", qty: 1, price: 0 };
    setVariants(prev => {
      const updated = [...prev, newVariant];
      setActiveIndex(updated.length - 1);
      return updated;
    });
  };

  const removeVariant = (index) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index, updatedVariant) => {
    setVariants(prev => prev.map((v, i) => (i === index ? updatedVariant : v)));
   
  };

  const validate = ({ variantName, qty, price }) => {
    if (!variantName?.trim()) {
      toast.error("Variant name is required");
      return false;
    }
    if (!qty || qty < 1) {
      toast.error("Valid Qty is required");
      return false;
    }
    if (!price || price < 1) {
      toast.error("Valid Price is required");
      return false;
    }
    return true;
  };
  return {
    variants,
    activeIndex,
    setActiveIndex,
    addVariant,
    removeVariant,
    updateVariant,
    validate
  };
};
