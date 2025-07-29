import { useInfiniteQuery } from "@tanstack/react-query"
import { getVendorAllOrders } from "../firebase/firestore/vendorOrdersFireStore"



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
