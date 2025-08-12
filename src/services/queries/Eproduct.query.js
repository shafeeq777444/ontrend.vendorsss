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

// -------------------------------------------------- get individual eproduct details --------------------------------------------------
export const useEProductgetDetails = (category, productId, options = {}) => {
    return useQuery({
        queryKey: ["eshopProductDetails", category, productId],
        queryFn: () => getEProductDetail(category, productId),
        enabled: !!category && !!productId && (options.enabled ?? true),
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

    return useMutation({
      mutationFn: ( {categoryName, vendorId }) => createCategoryInEshop({categoryName, vendorId}),
      onSuccess: () => {


      },
    });
  };
  