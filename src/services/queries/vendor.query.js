import toast from "react-hot-toast";
import { updateVendorProfile } from "../firebase/firestore/vendorFireStore";
import { useMutation } from "@tanstack/react-query";

export const useUpdateVendorProfile = () => {
    return useMutation({
      mutationFn: ({ vendorId, updatedData }) => updateVendorProfile({ vendorId, updatedData }),
      onSuccess:()=>{
        toast.success("Vendor profile updated successfully")
      }
    });
  };