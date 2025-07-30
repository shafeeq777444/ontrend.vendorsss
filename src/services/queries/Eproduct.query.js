import { useQuery } from "@tanstack/react-query";
import {
    addEProductItem,
    getAllEShopCategories,
    getEProductDetail,
    updateEProductItem,
} from "../firebase/firestore/eProduct.FireStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// get
export const useEProductgetDetails = (category, productId, options = {}) => {
    console.log(category, productId, "--chek 1");
    return useQuery({
        queryKey: ["eshopProductDetails", category, productId],
        queryFn: () => getEProductDetail(category, productId),
        enabled: !!category && !!productId && (options.enabled ?? true), // only run if both are defined
        staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
    });
};

// create
export const useAddEproductMutation = () => {
  const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ category, productObj }) => addEProductItem(category, productObj),
        onSuccess: (_, { category, productObj }) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated", category]);
            queryClient.invalidateQueries(["eshopProductDetails", category,productObj.id]);
            toast.success("Menu hooke Added Successfully");
        navigate("/menu");
        },
    });
};

// update

export const useUpdateEproducMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ category, docId, updatedData }) =>
      updateEProductItem(category, docId, updatedData),
    onSuccess: (_, { category, docId }) => {
      queryClient.invalidateQueries(["vendorFoodsPaginated", category]);
      queryClient.invalidateQueries({
        queryKey: ["eshopProductDetails", category, docId],
        refetchType: "active", // refetch immediately
      });
       toast.success("Menu hooke Added Successfully");
        navigate("/menu");
    },
  });
};

// -------------------------------------- get All categories from e-shop -----------------------------------------------------------
export function useGetAllCategoriesFromEshop() {
    return useQuery({
        queryKey: ["allCategoriesFromEshop"],
        queryFn: () => getAllEShopCategories(),
        
    });
}
