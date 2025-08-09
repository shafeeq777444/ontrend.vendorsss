import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createCategoryInFood,
    deleteFoodItem,
    getVendorFoodDetails,
} from "../firebase/firestore/foodOrAllProduct.fireStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// individual product detail
export const useVendorFoodDetails = (category, foodId, options = {}) => {
    return useQuery({
        queryKey: ["vendorFood", category, foodId],
        queryFn: () => getVendorFoodDetails(category, foodId),
        enabled: !!category && !!foodId && (options.enabled ?? true),
        staleTime: 5 * 60 * 1000,
    });
};

// delete
export const useDeleteFoodMutation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ category, docId }) => deleteFoodItem(category, docId),
        onSuccess: (_, { category, docId }) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated", category]);
            queryClient.invalidateQueries({
                queryKey: ["vendorFood", category, docId],
                refetchType: "active", // refetch immediately
            });
            navigate("/menu");
        },
    });
};

// create category
export const useCreateCategoryMutationInFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ categoryName, vendorId }) => createCategoryInFood({ categoryName, vendorId }),

        onSuccess: (_, { categoryName }) => {
            toast.success("Category created successfully");

            queryClient.setQueryData(["allCategories"], (oldData) => {
                const newCategory = {
                    name: categoryName,
                    label: categoryName,
                };

                if (!oldData || !Array.isArray(oldData)) {
                    return [newCategory];
                }

                // Avoid duplicate entry
                const exists = oldData.some((item) => item.name?.toLowerCase() === categoryName.toLowerCase());
                if (exists) return oldData;

                return [...oldData, newCategory];
            });
        },
    });
};
