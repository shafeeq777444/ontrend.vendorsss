import React from "react";
import { useParams } from "react-router-dom";
import { useVendorFoodDetails } from "../../services/queries/foodVendor.query";
import AddEditFoodForm from "../components/AddEditFoodForm/AddEditFoodForm";


const AddMenuPage = () => {
  const { id, category } = useParams();

  // If "new", skip fetch and render blank form
  const isNew = id === "new";

  // Fetch only if not new
  const { data: foodDetails, isLoading } = useVendorFoodDetails(category, id, {
    enabled: !isNew, // prevents query if id === "new"
  });

  if (!isNew && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AddEditFoodForm existingData={isNew ? {} : foodDetails } />
    </div>
  );
};

export default AddMenuPage;
