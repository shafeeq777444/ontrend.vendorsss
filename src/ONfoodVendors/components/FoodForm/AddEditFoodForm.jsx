import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDeleteFoodMutation } from "../../../services/queries/foodVendor.query.js";
import { useDeleteEproductMutation } from "../../../services/queries/Eproduct.query.js";
import { useLiveAllCategoriesFromEshop } from "../../../services/hooks/menu/useLiveGetAllcategoriesFromEshop.js";
import { useLiveGetAllCategories } from "../../../services/hooks/menu/useLiveGetAllCategoriesFromFood.js";
import { useCurrentUser } from "../../../services/hooks/profile/useCurrentUserLiveData.js";
import useFoodForm from "../../hooks/useFoodForm.js";

// Import all the split components
import FormHeader from './FormHeader.jsx';
import FormTabs from './FormTabs.jsx';
import NavigationButtons from './NavigationButtons.jsx';
import BasicInfoTab from './BasicInfoTab.jsx';
import PricingTab from './PricingTab.jsx';
import VariantsTab from './VariantsTab.jsx';
import AddOnsTab from './AddOnsTab.jsx';
import SaveSettingsTab from './SaveSettingsTab.jsx';
import FormModals from './FormModals.jsx';

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
  const { data: currentUser } = useCurrentUser();
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
      currentUser?.vendorType === "Food/Restaurant"
        ? allCategories
        : allCategoriesFromEShop;
    if (data) setCategoryOptions(data);
  }, [allCategories, allCategoriesFromEShop, currentUser?.vendorType]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <BasicInfoTab
            formData={formData}
            categoryOptions={categoryOptions}
            setCategoryOptions={setCategoryOptions}
            handleImageUpload={handleImageUpload}
            handleNameChange={handleNameChange}
            handleDescription={handleDescription}
            handleCategoryChange={handleCategoryChange}
          />
        );
      case 2:
        return (
          <PricingTab
            formData={formData}
            currentUser={currentUser}
            allCategories={allCategories}
            handleNameChange={handleNameChange}
            handleDescription={handleDescription}
            handleCategoryChange={handleCategoryChange}
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
          <VariantsTab
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <AddOnsTab
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 5:
        return (
          <SaveSettingsTab
            id={id}
            formData={formData}
            categoryOptions={categoryOptions}
            handleDeleteModal={handleDeleteModal}
            handleSubmit={handleSubmit}
            category={category}
          />
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
      <FormHeader
        formData={formData}
        handleToggleDisabled={handleToggleDisabled}
        handleCancelModal={handleCancelModal}
      />

      <FormTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tab Content */}
      {renderTabContent()}

      <NavigationButtons
        activeTab={activeTab}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />

      <FormModals
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        cancelModal={cancelModal}
        setCancelModal={setCancelModal}
        handleConfirmationModal={handleConfirmationModal}
        handleConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
};

export default AddEditFoodForm;
