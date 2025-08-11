// ------------------ live listener for Food Categories ------------------
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";


export const listenToAllFoodCategories = (callback) => {
  try {
    const q = query(
      collection(db, "Food/items/categories"),
      // where("isApproved", "==", true)
    );

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categories = snapshot.docs.map((doc) => {
        const name = doc.get("name");
        const isApproved = doc.get("isApproved");
        return { value: name, label: name,isApproved };
      });
      callback(categories);
    });

    return unsubscribe; // for cleanup
  } catch (error) {
    console.error("Error listening to categories:", error);
    callback([]);
    return () => {}; // empty cleanup
  }
};

// ------------------ React hook for live categories ------------------
export function useLiveGetAllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToAllFoodCategories(setCategories);
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return categories;
}
