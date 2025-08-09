import {  useMutation, useQueryClient } from "@tanstack/react-query"
import {  updateOrder } from "../firebase/firestore/orders.firestore";
import toast from "react-hot-toast";


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
