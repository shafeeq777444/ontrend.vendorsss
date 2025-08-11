import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFoodItem, updateFoodItem } from "../firebase/firestore/foodOrAllProduct.fireStore";
import { useNavigate } from "react-router-dom";


export const useAddFoodMutation = () => {
        const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({category,foodObj}) => addFoodItem(category,foodObj),
        onSuccess: (_,{category}) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated",category]);

        navigate("/menu");
        },
    });
};

export const useUpdateFoodMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({category,docId,updatedData}) => updateFoodItem(category,docId,updatedData),
        onSuccess: (_,{category,docId}) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated",category,docId]);

        navigate("/menu");
        },
    });
};
