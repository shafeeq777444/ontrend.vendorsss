import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createCategoryInFood,
    deleteFoodItem,
    getVendorFoodCategories,
    getVendorFoodDetails,
} from "../firebase/firestore/foodOrAllProduct.fireStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { getVendorFoodsPaginatedLive } from "../hooks/menu/useLiveGetAllProductsPaginated";

// vender included categories
export function useVendorFoodCategories(vendorId) {
    return useQuery({
        queryKey: ["vendorFoodCategories", vendorId],
        queryFn: () => getVendorFoodCategories(vendorId),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!vendorId,
    });
}

//GetVendorFoodsAndCategories--(vendor page :vendoorId) with pagination

// export function useGetVendorFoodsAndCategoriesLive(vendorId, selectedCategory = "All") {
//     return useInfiniteQuery({
//         queryKey: ["vendorFoodsLivePaginated", vendorId, selectedCategory],
//         queryFn: ({ pageParam = null }) =>
//             new Promise((resolve) => {
//                 const unsubscribe = getVendorFoodsPaginatedLive(vendorId, 12, pageParam, selectedCategory, (data) =>
//                     resolve(data)
//                 );
//                 // Return unsubscribe for cleanup
//                 return () => unsubscribe();
//             }),
//         getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastVisible : undefined),
//         enabled: !!vendorId,
//         staleTime: Infinity, // Since data is live, no need for re-fetch timing
//         cacheTime: Infinity,
//         refetchOnWindowFocus: false,
//     });
// }

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
