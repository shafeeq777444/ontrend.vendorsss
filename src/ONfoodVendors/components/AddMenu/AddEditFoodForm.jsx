import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploading from "./ImageUploading.jsx";
import ItemInfoCard from "./ItemInfoCard.jsx";
import IsDisabled from "./IsDisabled.jsx";
import SaveButton from "./SaveButton.jsx";
import VariantListCard from "./VariantListCard.jsx";
import { AlertTriangle, X } from "lucide-react";
import AddOnListCard from "./AddOnListCard.jsx";
import { useDeleteFoodMutation } from "../../../services/queries/foodVendor.query.js";
import useFoodForm from "../../hooks/useFoodForm.js";
import CompactFoodFormFields from "./CompactFoodFormFields.jsx";
import { useParams } from "react-router-dom";
import ReusableConfirmationModal from "../common/ReusableConfirmationModal.jsx";
import { useDeleteEproductMutation } from "../../../services/queries/Eproduct.query.js";
import { useLiveAllCategoriesFromEshop } from "../../../services/hooks/menu/useLiveGetAllcategoriesFromEshop.js";
import { useLiveGetAllCategories } from "../../../services/hooks/menu/useLiveGetAllCategoriesFromFood.js";
import { useCurrentUser } from "../../../services/hooks/profile/useCurrentUserLiveData.js";
import Summary from "./Summary.jsx";
import DeleteWarningCard from "../AddEditFoodForm/DeleteWarningCard.jsx";

// Minimal Framer Motion variants for subtle, fast UI motion
const containerVariant = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: 6, transition: { duration: 0.18 } },
};

const tabContentVariant = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.22 } },
    exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
};

const buttonTap = { scale: 0.985 };

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
        const data = currentUSer?.vendorType === "Food/Restaurant" ? allCategories : allCategoriesFromEShop;
        if (data) setCategoryOptions(data);
    }, [allCategories, allCategoriesFromEShop, currentUSer?.vendorType]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center ">
                        <ImageUploading imageUrl={formData.imageUrl} handleImageUpload={handleImageUpload} />
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
                        <div className="mt-6">
                            <Summary formData={formData} categoryOptions={categoryOptions} />
                            {id !== "new" && (
                                <div className="mt-6">
                                    <DeleteWarningCard onDelete={handleDeleteModal} />
                                </div>
                            )}
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
        <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 relative w-full"
        >
            {/* Close button - Top Right */}
            <motion.button
                whileTap={buttonTap}
                type="button"
                className="absolute top-4 right-4 bg-white hover:bg-gray-100 transition text-gray-800 p-2 rounded-full border border-gray-300 shadow-sm hover:shadow-md"
                onClick={handleCancelModal}
                title="Close"
                aria-label="Close form"
            >
                <X className="w-5 h-5" />
            </motion.button>

            {/* Status toggle for existing items */}
            <div className="mb-4 sm:mb-6">
                <IsDisabled isDisabled={formData.isDisabled} handleToggleDisabled={handleToggleDisabled} />
            </div>

            {/* Tabs header */}
            <div className="overflow-x-auto pb-2 -mx-2 sm:mx-0">
                <div className="flex space-x-1 sm:space-x-2 min-w-max px-2 sm:px-0 scrollbar-hide">
                    {[1, 2, 3, 4, 5].map((tabNumber) => (
                        <motion.button
                            key={tabNumber}
                            onClick={() => setActiveTab(tabNumber)}
                            whileTap={buttonTap}
                            className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-lg focus:outline-none whitespace-nowrap ${
                                activeTab === tabNumber
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {tabNumber === 1 && (
                                <>
                                    <span className="hidden sm:inline">Basic Info</span>
                                    <span className="sm:hidden">1. Info</span>
                                </>
                            )}
                            {tabNumber === 2 && (
                                <>
                                    <span className="hidden sm:inline">Pricing & Avail</span>
                                    <span className="sm:hidden">2. Price</span>
                                </>
                            )}
                            {tabNumber === 3 && (
                                <>
                                    <span className="hidden sm:inline">Variants</span>
                                    <span className="sm:hidden">3. Variants</span>
                                </>
                            )}
                            {tabNumber === 4 && (
                                <>
                                    <span className="hidden sm:inline">Add-ons</span>
                                    <span className="sm:hidden">4. Add-ons</span>
                                </>
                            )}
                            {tabNumber === 5 && (
                                <>
                                    <span className="hidden sm:inline">Save & Summary</span>
                                    <span className="sm:hidden">5. Save</span>
                                </>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Tab Content with AnimatePresence for smooth transitions */}
            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={tabContentVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {renderTabContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-6 px-2 sm:px-0">
                <div className="flex space-x-2">
                    <motion.button
                        whileTap={buttonTap}
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm sm:text-base w-20 sm:w-auto"
                        onClick={handlePrevious}
                        disabled={activeTab === 1}
                    >
                        Previous
                    </motion.button>
                    {activeTab < 5 && (
                        <motion.button
                            whileTap={buttonTap}
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm sm:text-base w-16 sm:w-auto"
                            onClick={handleNext}
                        >
                            Next
                        </motion.button>
                    )}
                </div>
                {activeTab === 5 && (
                    <div className="w-full sm:w-auto">
                        <SaveButton handleSubmit={() => handleSubmit(category)} className="w-full" />
                    </div>
                )}
            </div>

            {/* Animated modals/backdrops (non-invasive, minimal) */}
            <AnimatePresence>
                {deleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 flex items-center justify-center"
                    >
                        <ReusableConfirmationModal
                            title="Delete Item"
                            isOpen={deleteModal}
                            description="Are you sure you want to delete this item?"
                            onAction={handleConfirmationModal}
                            onClose={() => setDeleteModal(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {cancelModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 flex items-center justify-center"
                    >
                        <ReusableConfirmationModal
                            title="Cancel Changes"
                            isOpen={cancelModal}
                            description="Are you sure you want to cancel? Any unsaved changes will be lost."
                            onAction={handleConfirmCancel}
                            onClose={() => setCancelModal(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AddEditFoodForm;
