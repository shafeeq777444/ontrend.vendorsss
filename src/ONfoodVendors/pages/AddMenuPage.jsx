import React from "react";
import { useParams } from "react-router-dom";
import { useVendorFoodDetails } from "../../services/queries/foodVendor.query";
import AddEditFoodForm from "../components/AddEditFoodForm/AddEditFoodForm";


const AddMenuPage = () => {
    const {id,category}=useParams()
    console.log(id,category,"id")
    const {data:foodDetails,isLoading:isFoodDetailsLoading}=useVendorFoodDetails(category,id)
    console.log(foodDetails,"foodDetails")
            return (
        <div>
            <AddEditFoodForm existingData={foodDetails} onFinish={()=>{}} />
        </div>
    );
};
export default AddMenuPage;
