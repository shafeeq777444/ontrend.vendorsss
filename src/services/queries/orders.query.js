import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getVendorAllOrders, updateOrder } from "../firebase/firestore/orders.firestore";
import toast from "react-hot-toast";



// get all orders of vendor
export const useVendorAllOrders = ({vendorId, status}) => {
  return useInfiniteQuery({
    queryKey: ["vendor-orders", vendorId, status],
    queryFn: ({ pageParam = null }) =>
      getVendorAllOrders({ vendorId, status, lastDoc: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastDoc : undefined,
    enabled: !!vendorId,
  });
};

// update each order
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:({ orderId, updatedData })=> updateOrder({ orderId, updatedData }),
    onSuccess: () => {
     toast.success("Order updated successfully");
     queryClient.invalidateQueries({queryKey:["vendor-orders"]})
    },
    onError: (error) => {
      console.error("Failed to update order", error);
    },
  });
};
