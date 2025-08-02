import React from "react";

import ImageUploading from "../AddMenu/ImageUploading.jsx";
import ItemInfoCard from "../AddMenu/ItemInfoCard.jsx";
import AvailableTimeCard from "../AddMenu/AvailableTimeCard.jsx";
import ItemPriceCard from "../AddMenu/ItemPriceCard.jsx";
import IsDisabled from "../AddMenu/IsDisabled.jsx";
import SaveButton from "../AddMenu/SaveButton.jsx";
import PrepearationTime from "../AddMenu/PrepearationTime.jsx";
import VariantListCard from "../AddMenu/VariantListCard.jsx";
import { AlertTriangle } from "lucide-react";


import AddOnListCard from "../AddMenu/AddOnListCard.jsx";
import { useGetAllCategories } from "../../../services/queries/foodVendor.query.js";
import useFoodForm from "../../hooks/useFoodForm.js";
import useCurrentUser from "../../../services/queries/user.query.js";
import { useGetAllCategoriesFromEshop } from "../../../services/queries/Eproduct.query.js";
import CompactFoodFormFields from "../AddMenu/CompactFoodFormFields.jsx";

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
    handleStock,
    handlePrepearationTime,
    handleSubmit,
  } = useFoodForm({ existingData, onFinish });
  console.log(existingData,"existingDta")

  

  const { data: allCategories } = useGetAllCategories();
  const {data:allCategoriesFromEShop}=useGetAllCategoriesFromEshop()
  const {data:currentUSer}=useCurrentUser()


  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-10 max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <ImageUploading imageUrl={formData.imageUrl} handleImageUpload={handleImageUpload} />
        <div className="md:col-span-2">
          <ItemInfoCard
            description={formData.description}
            name={formData.name}
            arabicName={formData.localName}
            category={formData.tag}

            handleNameChange={handleNameChange}
            handleDescription={handleDescription}
            allCategories={currentUSer?.vendorType == "E-Shopping" ? allCategoriesFromEShop : allCategories}
            categoryOnchange={handleCategoryChange}
          />
        </div>
      </div>

      {currentUSer?.vendorType == "E-Shopping" && (
        <div className="flex flex-col space-y-2">
          <label htmlFor="stocks" className="font-medium text-gray-700">Stocks</label>
          <input
            id="stocks"
            type="number"
            min="0"
            className="border rounded px-3 py-2 w-32"
            value={formData.stock || ""}
            onChange={handleStock}
            placeholder="Enter stock quantity"
          />
        </div>
      )}

      {/* <AvailableTimeCard
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
      /> */}

<CompactFoodFormFields
   handleNameChange={handleNameChange}
   handleDescription={handleDescription}
   handleCategoryChange={handleCategoryChange}
   allCategories={allCategories}
   formData={{ ...formData, vendorType: currentUSer?.vendorType }}
   handleOriginalPrice={handleOriginalPrice}
   handleDiscountPercentage={handleDiscountPercentage}
   handleStock={handleStock}
   handleAvilableStartTime={handleAvilableStartTime}
   handleAvilableEndTime={handleAvilableEndTime}
   handlePrepearationTime={handlePrepearationTime}
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
      <div className="flex justify-end p-4">
  <div className="bg-black text-white p-4 rounded-xl flex items-start space-x-4 shadow-lg  w-full">
    <AlertTriangle size={24} className="text-yellow-400 mt-1" />
    
    <div className="flex-1 text-sm">
      <p className="mb-3">
        If you want to temporarily remove your data, please use the <span className="font-semibold">status change</span> (enable or disable). This allows you to hide the product temporarily. When you're ready, you can use <span className="font-semibold">Delete Item</span> to permanently remove it.
      </p>

      <button
        type="button"
        className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-md font-medium"
        onClick={() => {
          if (confirm("Are you sure you want to delete this item?")) {
            onFinish({ ...formData, deleteItem: true });
          }
        }}
      >
        Delete Item
      </button>
    </div>
  </div>
</div>


      <div className="flex justify-end">
        <SaveButton handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddEditFoodForm;
