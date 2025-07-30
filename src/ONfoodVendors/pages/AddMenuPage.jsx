import React from "react";
import { useParams } from "react-router-dom";
import { useVendorFoodDetails } from "../../services/queries/foodVendor.query";
import AddEditFoodForm from "../components/AddEditFoodForm/AddEditFoodForm";
import { useEProductgetDetails } from "../../services/queries/Eproduct.query";

const AddMenuPage = () => {
    const { id, category, vendorType } = useParams();
console.log(vendorType,"vendor ty")
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
        return <div>Loading...</div>;
    }

    const selectedData = isNew ? {} : vendorType === "E-Shopping" ? EproductDetails : foodDetails;

    return (
        <div>
            <AddEditFoodForm existingData={selectedData} />
        </div>
    );
};

export default AddMenuPage;
