


import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategoryInFood, deleteFoodItem, getAllFoodCategories ,getVendorFoodCategories, getVendorFoodDetails, getVendorFoodsPaginated} from "../firebase/firestore/foodVendorsFireStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// get all categories

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getAllFoodCategories(),
  });
}

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
export function useGetVendorFoodsAndCategories(vendorId, selectedCategory = "All") {
  return useInfiniteQuery({
    queryKey: ["vendorFoodsPaginated", vendorId, selectedCategory],
    queryFn: ({ pageParam = null }) =>
      getVendorFoodsPaginated(vendorId, 12, pageParam, selectedCategory),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastVisible : undefined,
    enabled: !!vendorId ,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

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
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryName) => createCategoryInFood(categoryName),
        onSuccess: () => {
          toast.success("Category created successfully");
          queryClient.invalidateQueries(["allCategories"]);
            navigate("/menu");
        },
    });
};
