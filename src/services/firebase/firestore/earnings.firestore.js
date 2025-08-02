import { collection, query, where, getDocs,  Timestamp, getCountFromServer } from "firebase/firestore";
import { db } from "../../../config/firebase";

//---------------- total number of order ------------
export const getTotalOrders = async (vendorId) => {
    console.log(vendorId,"vendorId");
    const q = query(
      collection(db, "orders"),
      where("addedBy", "==", vendorId),
      where("status", "==", "Delivered")
    );
  
    const snapshot = await getCountFromServer(q);
    console.log("totalOrders", snapshot.data().count);
    return snapshot.data().count;
  };
  

// -----------  vender order filterd by-> price ,count  -----------


export const getVendorEarningsAndTotalOrdersByFiltered = async (vendorId, startDate=null, endDate=null) => {
    const filters = [
      where("addedBy", "==", vendorId),
      where("status", "==", "Delivered")
    ];
  
    if (startDate) {
      filters.push(where("orderTimeStamp", ">=", startDate));
    }
  
    if (endDate) {
      filters.push(where("orderTimeStamp", "<=", endDate));
    }
  
    const q = query(collection(db, "orders"), ...filters);
  
    const snapshot = await getDocs(q);
  
    let totalEarnings = 0;
  
    snapshot.docs.forEach((doc) => {
      const items = doc.data().items || [];
  
      items.forEach((item) => {
        const total = item.total || 0;
        const commission = item.commission || 0;
  
        const sellerEarning = total - (total * commission / 100);
        totalEarnings += sellerEarning;
      });
    });
  
    return {
      totalOrders: snapshot.size,
      totalEarnings: parseFloat(totalEarnings.toFixed(3)),
      totalData:snapshot.docs.map((doc) => doc.data())
    };
  };
  