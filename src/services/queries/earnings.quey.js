
import { useQuery } from "@tanstack/react-query";
import { getTotalOrders, getVendorEarningsAndTotalOrdersByFiltered } from "../firebase/firestore/earnings.firestore";



//---------------- total number of order ------------
export const useTotalDeliveredOrders = (vendorId) => {
    return useQuery({
      queryKey: ["total-delivered-orders", vendorId],
      queryFn: () => getTotalOrders(vendorId),
      enabled: !!vendorId, 
    });
  };

export const useVendorEarningsAndOrdersByFiltered = ({ vendorId, startDate=null, endDate=null }) => {
  return useQuery({
    queryKey: ["vendor-earnings-orders", vendorId, startDate?.toMillis(), endDate?.toMillis()],
    queryFn: () => getVendorEarningsAndTotalOrdersByFiltered(vendorId, startDate, endDate),
    enabled: !!vendorId 
    // && 
    // !!startDate && !!endDate, 
  });
};

