import React from 'react';
import CompactFoodFormFields from '../AddMenu/CompactFoodFormFields.jsx';

const PricingTab = ({
  formData,
  currentUser,
  allCategories,
  handleNameChange,
  handleDescription,
  handleCategoryChange,
  handleOriginalPrice,
  handleDiscountPercentage,
  handleStock,
  handleOfferPrice,
  handleAvilableStartTime,
  handleAvilableEndTime,
  handlePrepearationTime
}) => {
  return (
    <CompactFoodFormFields
      handleNameChange={handleNameChange}
      handleDescription={handleDescription}
      handleCategoryChange={handleCategoryChange}
      allCategories={allCategories}
      formData={{ ...formData, vendorType: currentUser?.vendorType }}
      handleOriginalPrice={handleOriginalPrice}
      handleDiscountPercentage={handleDiscountPercentage}
      handleStock={handleStock}
      handleOfferPrice={handleOfferPrice}
      handleAvilableStartTime={handleAvilableStartTime}
      handleAvilableEndTime={handleAvilableEndTime}
      handlePrepearationTime={handlePrepearationTime}
    />
  );
};

export default PricingTab;
