import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFoodItem, updateFoodItem } from "../firebase/firestore/foodVendorsFireStore";

export const useAddFoodMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({category,foodObj}) => addFoodItem(category,foodObj),
        onSuccess: (_,{category}) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated",category]);
        },
    });
};

export const useUpdateFoodMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({category,docId,updatedData}) => updateFoodItem(category,docId,updatedData),
        onSuccess: (_,{category}) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated",category]);
        },
    });
};
