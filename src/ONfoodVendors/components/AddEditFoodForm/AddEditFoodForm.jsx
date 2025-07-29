import React from "react";

import ImageUploading from "../AddMenu/ImageUploading.jsx";
import ItemInfoCard from "../AddMenu/ItemInfoCard.jsx";
import AvailableTimeCard from "../AddMenu/AvailableTimeCard.jsx";
import ItemPriceCard from "../AddMenu/ItemPriceCard.jsx";
import IsDisabled from "../AddMenu/IsDisabled.jsx";
import SaveButton from "../AddMenu/SaveButton.jsx";
import PrepearationTime from "../AddMenu/PrepearationTime.jsx";
import VariantListCard from "../AddMenu/VariantListCard.jsx";

import AddOnListCard from "../AddMenu/AddOnListCard.jsx";
import { useGetAllCategories } from "../../../services/queries/foodVendor.query.js";
import useFoodForm from "../../hooks/useFoodForm.js";

const AddEditFoodForm = ({ existingData = {}, onFinish }) => {
  const {
    formData,
    setFormData,
    handleNameChange,
    handleDescription,
    handleImageUpload,
    handleToggleDisabled,
    handleCategoryChange,
    handleOriginalPrice,
    handleDiscountPercentage,
    handleAvilableStartTime,
    handleAvilableEndTime,
    handlePrepearationTime,
    handleSubmit,
  } = useFoodForm({ existingData, onFinish });
  console.log(existingData,"existingDta")

  const { data: allCategories } = useGetAllCategories();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
        <ImageUploading imageUrl={formData.imageUrl} handleImageUpload={handleImageUpload} />
        <div className="md:col-span-2">
          <ItemInfoCard
            description={formData.description}
            name={formData.name}
            arabicName={formData.localName}
            category={formData.tag}
            handleNameChange={handleNameChange}
            handleDescription={handleDescription}
            allCategories={allCategories}
            categoryOnchange={handleCategoryChange}
          />
        </div>
      </div>

      <AvailableTimeCard
        availableTime={formData.availableTime}
        handleAvilableStartTime={handleAvilableStartTime}
        handleAvilableEndTime={handleAvilableEndTime}
      />
      <PrepearationTime preparationTime={formData.preparationTime} handlePrepearationTime={handlePrepearationTime} />

      <ItemPriceCard
        itemPrice={formData.itemPrice}
        discountPercentage={formData.discountPercentage}
        offerPrice={formData.price}
        handleOriginalPrice={handleOriginalPrice}
        handleDiscountPercentage={handleDiscountPercentage}
      />

      <VariantListCard
        initialvariants={formData.variants}
        onChange={(updated) => setFormData({ ...formData, variants: updated })}
      />
      <AddOnListCard
        initialAddOn={formData.addOn}
        onChange={(updated) => setFormData({ ...formData, addOn: updated })}
      />

      <IsDisabled isDisabled={formData.isDisabled} handleToggleDisabled={handleToggleDisabled} />

      <div className="flex justify-end">
        <SaveButton handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddEditFoodForm;
