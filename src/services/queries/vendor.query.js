import { updateVendorProfile } from "../firebase/firestore/vendorFireStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateVendorProfile = () => {
  const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ vendorId, updatedData }) => updateVendorProfile({ vendorId, updatedData }),
      onSettled:()=>{
        queryClient.invalidateQueries({queryKey:["currentUser"]})
      }
    });
  };