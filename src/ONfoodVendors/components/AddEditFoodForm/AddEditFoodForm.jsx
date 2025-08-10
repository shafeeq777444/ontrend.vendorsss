import React, { useEffect, useState } from "react";
import ImageUploading from "../AddMenu/ImageUploading.jsx";
import ItemInfoCard from "../AddMenu/ItemInfoCard.jsx";
import IsDisabled from "../AddMenu/IsDisabled.jsx";
import SaveButton from "../AddMenu/SaveButton.jsx";
import VariantListCard from "../AddMenu/VariantListCard.jsx";
import { AlertTriangle, X } from "lucide-react";
import AddOnListCard from "../AddMenu/AddOnListCard.jsx";
import { useDeleteFoodMutation } from "../../../services/queries/foodVendor.query.js";
import useFoodForm from "../../hooks/useFoodForm.js";
import CompactFoodFormFields from "../AddMenu/CompactFoodFormFields.jsx";
import { useParams } from "react-router-dom";
import ReusableConfirmationModal from "../common/ReusableConfirmationModal.jsx";
import { useDeleteEproductMutation } from "../../../services/queries/Eproduct.query.js";
import { useLiveAllCategoriesFromEshop } from "../../../services/hooks/menu/useLiveGetAllcategoriesFromEshop.js";
import { useLiveGetAllCategories } from "../../../services/hooks/menu/useLiveGetAllCategoriesFromFood.js";
import { useCurrentUser } from "../../../services/hooks/profile/useCurrentUserLiveData.js";
import Summary from "../AddMenu/Summary.jsx";

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
    handleCancel,
    handleOfferPrice,
    handlePrepearationTime,
    handleSubmit,
  } = useFoodForm({ existingData, onFinish });

  const [activeTab, setActiveTab] = useState(1);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const { mutate: deleteEproduct } = useDeleteEproductMutation();
  const { mutate: deleteFood } = useDeleteFoodMutation();

  const allCategories = useLiveGetAllCategories();
  const { categories: allCategoriesFromEShop } = useLiveAllCategoriesFromEshop();
  const { data: currentUSer } = useCurrentUser();
  const { id, category, vendorType } = useParams();

  const handleDeleteModal = () => setDeleteModal(true);

  const handleCancelModal = () => setCancelModal(true);

  const handleConfirmCancel = () => {
    setCancelModal(false);
    handleCancel();
  };

  const handleConfirmationModal = () => {
    if (vendorType === "E-Shopping") {
      deleteEproduct({ category, docId: id });
    } else {
      deleteFood({ category, docId: id });
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    const data =
      currentUSer?.vendorType === "Food/Restaurant"
        ? allCategories
        : allCategoriesFromEShop;
    if (data) setCategoryOptions(data);
  }, [allCategories, allCategoriesFromEShop, currentUSer?.vendorType]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center ">
            <ImageUploading
              imageUrl={formData.imageUrl}
              handleImageUpload={handleImageUpload}
            />
            <div className="md:col-span-2">
              <ItemInfoCard
                description={formData.description}
                name={formData.name}
                arabicName={formData.localName}
                category={formData.tag}
                handleNameChange={handleNameChange}
                handleDescription={handleDescription}
                allCategories={categoryOptions}
                setAllCategories={setCategoryOptions}
                categoryOnchange={handleCategoryChange}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <CompactFoodFormFields
            handleNameChange={handleNameChange}
            handleDescription={handleDescription}
            handleCategoryChange={handleCategoryChange}
            allCategories={allCategories}
            formData={{ ...formData, vendorType: currentUSer?.vendorType }}
            handleOriginalPrice={handleOriginalPrice}
            handleDiscountPercentage={handleDiscountPercentage}
            handleStock={handleStock}
            handleOfferPrice={handleOfferPrice}
            handleAvilableStartTime={handleAvilableStartTime}
            handleAvilableEndTime={handleAvilableEndTime}
            handlePrepearationTime={handlePrepearationTime}
          />
        );
      case 3:
        return (
          <VariantListCard
            initialvariants={formData.variants}
            onChange={(updated) => setFormData({ ...formData, variants: updated })}
          />
        );
      case 4:
        return (
          <AddOnListCard
            initialAddOn={formData.addOn}
            onChange={(updated) => setFormData({ ...formData, addOn: updated })}
          />
        );
      case 5:
        return (
          <>
            <div className="flex justify-end p-4">
              {id !== "new" && (
                <div className="bg-black text-white p-4 rounded-xl flex items-start space-x-4 shadow-lg w-full">
                  <AlertTriangle size={24} className="text-yellow-400 mt-1" />
                  <div className="flex-1 text-sm">
                    <p className="mb-3">
                      If you want to temporarily remove your data, please use the{" "}
                      <span className="font-semibold">status change</span> (enable or disable). This
                      allows you to hide the product temporarily. When you're ready, you can use{" "}
                      <span className="font-semibold">Delete Item</span> to permanently remove it.
                    </p>
                    <button
                      type="button"
                      className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-md font-medium"
                      onClick={handleDeleteModal}
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Summary 
                formData={formData} 
                categoryOptions={categoryOptions} 
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (activeTab < 5) setActiveTab(activeTab + 1);
  };
  const handlePrevious = () => {
    if (activeTab > 1) setActiveTab(activeTab - 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 max-w-7xl mx-auto space-y-8 relative">
      {/* Close button - Top Right */}
      <button
        type="button"
        className="absolute top-4 right-4 bg-white hover:bg-gray-100 transition text-gray-800 p-2 rounded-full border border-gray-300 shadow-sm hover:shadow-md"
        onClick={handleCancelModal}
        title="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Status toggle for existing items */}
      <div className="mb-6">
          <IsDisabled
            isDisabled={formData.isDisabled}
            handleToggleDisabled={handleToggleDisabled}
          />
        </div>
      

      {/* Tabs header */}
      <div className="flex space-x-4 border-b border-gray-300">
        {[1, 2, 3, 4, 5].map((tabNumber) => (
          <button
            key={tabNumber}
            onClick={() => setActiveTab(tabNumber)}
            className={`px-4 py-2 font-semibold rounded-t-lg focus:outline-none ${
              activeTab === tabNumber
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tabNumber === 1 && "Basic Info"}
            {tabNumber === 2 && "Pricing & Availability"}
            {tabNumber === 3 && "Variants"}
            {tabNumber === 4 && "Add-ons"}
            {tabNumber === 5 && "Save & Settings"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            onClick={handlePrevious}
            disabled={activeTab === 1}
          >
            Previous
          </button>
          {activeTab < 5 && (
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
        {activeTab === 5 && (
          <div className="flex-shrink-0">
            <SaveButton handleSubmit={() => handleSubmit(category)} />
          </div>
        )}
      </div>

      {deleteModal && (
        <ReusableConfirmationModal
          title="Delete Item"
          isOpen={deleteModal}
          description="Are you sure you want to delete this item?"
          onAction={handleConfirmationModal}
          onClose={() => setDeleteModal(false)}
        />
      )}

      {cancelModal && (
        <ReusableConfirmationModal
          title="Cancel Changes"
          isOpen={cancelModal}
          description="Are you sure you want to cancel? Any unsaved changes will be lost."
          onAction={handleConfirmCancel}
          onClose={() => setCancelModal(false)}
        />
      )}
    </div>
  );
};

export default AddEditFoodForm;
