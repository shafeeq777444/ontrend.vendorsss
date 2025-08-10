import React from "react";
import { useParams } from "react-router-dom";
import { useVendorFoodDetails } from "../../services/queries/foodVendor.query";
import AddEditFoodForm from "../components/AddMenu/AddEditFoodForm";
import { useEProductgetDetails } from "../../services/queries/Eproduct.query";
import AddEditFoodFormSkeleton from "../components/AddEditFoodForm/AddEditFoodFormSkeleton";

const AddMenuPage = () => {
    const { id, category, vendorType } = useParams();
    console.log(vendorType, "vendor ty");
    // If "new", skip fetch and render blank form
    const isNew = id === "new";

    // Fetch only if not new
    const { data: foodDetails, isLoading: isLoadingFood } = useVendorFoodDetails(category, id, {
        enabled: !isNew && vendorType == "Food",
    });
    const { data: EproductDetails, isLoading: isLoadingEproduct } = useEProductgetDetails(category, id, {
        enabled: !isNew && vendorType === "E-Shopping",
    });

    const isLoading = vendorType === "E-Shopping" ? isLoadingEproduct : isLoadingFood;

    if (!isNew && isLoading) {
        return <AddEditFoodFormSkeleton />;
    }

    const selectedData = isNew ? {} : vendorType === "E-Shopping" ? EproductDetails : foodDetails;
    if (isLoading) {
        return <AddEditFoodFormSkeleton />;
    }
    return (
        <div>
            <AddEditFoodForm existingData={selectedData} />
        </div>
    );
};

export default AddMenuPage;
