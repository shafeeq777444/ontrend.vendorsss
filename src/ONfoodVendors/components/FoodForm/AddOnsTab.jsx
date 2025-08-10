import React from 'react';
import AddOnListCard from '../AddMenu/AddOnListCard.jsx';

const AddOnsTab = ({ formData, setFormData }) => {
  return (
    <AddOnListCard
      initialAddOn={formData.addOn}
      onChange={(updated) => setFormData({ ...formData, addOn: updated })}
    />
  );
};

export default AddOnsTab;
