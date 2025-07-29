import React, { useState } from "react";

import { v4 as uuid } from "uuid";
import VariantListCard from "../../components/AddMenu/ VariantListCard";

const VariantListContainer = ({ initialVariants = [], onVariantsChange }) => {
  const [variants, setVariants] = useState(
    initialVariants.length > 0
      ? initialVariants
      : [{ id: uuid(), variantName: "", qty: "", price: "" }]
  );
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAdd = () => {
    const newVariant = { id: uuid(), variantName: "", qty: "", price: "" };
    setVariants((prev) => [...prev, newVariant]);
    setActiveIndex(variants.length); // Set new item to edit
    onVariantsChange && onVariantsChange([...variants, newVariant]);
  };

  const handleRemove = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
    setActiveIndex(null);
    onVariantsChange && onVariantsChange(updated);
  };

  const handleChange = (index, key, value) => {
    const updated = [...variants];
    updated[index][key] = value;
    setVariants(updated);
    onVariantsChange && onVariantsChange(updated);
  };

  return (
    <VariantListCard
      variants={variants}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onChange={handleChange}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    />
  );
};

export default VariantListContainer;
