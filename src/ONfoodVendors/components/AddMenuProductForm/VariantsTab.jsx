import React from 'react';
import VariantListCard from '../AddMenu/VariantListCard.jsx';

const VariantsTab = ({ formData, setFormData }) => {
  return (
    <VariantListCard
      initialvariants={formData.variants}
      onChange={(updated) => setFormData({ ...formData, variants: updated })}
    />
  );
};

export default VariantsTab;
