import { useQuery } from "@tanstack/react-query";
import {
    addEProductItem,
    createCategoryInEshop,
    deleteEProductItem,
    getEProductDetail,
    updateEProductItem,
} from "../firebase/firestore/eProduct.FireStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// -------------------------------------------------- get individual eproduct details --------------------------------------------------
export const useEProductgetDetails = (category, productId, options = {}) => {
    return useQuery({
        queryKey: ["eshopProductDetails", category, productId],
        queryFn: () => getEProductDetail(category, productId),
        enabled: !!category && !!productId && (options.enabled ?? true), // only run if both are defined
    });
};

// -------------------------------------------------- create --------------------------------------------------
export const useAddEproductMutation = () => {
  const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ category, productObj }) => addEProductItem(category, productObj),
        onSuccess: (_, { category, productObj }) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated", category]);
            queryClient.invalidateQueries(["eshopProductDetails", category,productObj.id]);

        navigate("/menu");
        },
    });
};

// -------------------------------------------------- update --------------------------------------------------

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

        navigate("/menu");
    },
  });
};



// -------------------------------------------------- delete --------------------------------------------------
export const useDeleteEproductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ category, docId }) => deleteEProductItem(category, docId),
        onSuccess: (_, { category, docId }) => {
            queryClient.invalidateQueries(["vendorFoodsPaginated", category]);
            queryClient.invalidateQueries({
                queryKey: ["eshopProductDetails", category, docId],
                refetchType: "active", // refetch immediately
            });

        },
    });
};

// create category
export const useCreateCategoryMutationInEshop = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ( {categoryName, vendorId }) => createCategoryInEshop({categoryName, vendorId}),
      onSuccess: () => {
        toast.success("Category created successfully");
        queryClient.invalidateQueries(["allCategories"]);
      },
    });
  };
  