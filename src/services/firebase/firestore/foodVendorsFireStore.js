import {
    addDoc,
    collection,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    setDoc,
    startAfter,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import toast from "react-hot-toast";

// each vendors foods(parallel version---------------------------------------------------
// export const getVendorFoodsAndCategories = async (vendorId) => {
//   try {
//     const categoriesRef = collection(db, "Food/items/categories");
//     const approvedQuery = query(categoriesRef, where("isApproved", "==", true));
//     const approvedSnapshots = await getDocs(approvedQuery);

//     const fetchVendorFoodsByCategory = approvedSnapshots.docs.map(async (categoryDoc) => {
//       const categoryId = categoryDoc.id;
//       const foodsRef = collection(db, `Food/items/categories/${categoryId}/details`);
//       const approvedFoodsQuery = query(
//         foodsRef,
//         where("isApproved", "==", true),
//         where("addedBy", "==", vendorId) // ✅ filter at query-level
//       );

//       const foodDocs = await getDocs(approvedFoodsQuery);

//       return foodDocs.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//         category: categoryId,
//       }));
//     });

//     const nestedFoods = await Promise.all(fetchVendorFoodsByCategory);
//     const allFoods = nestedFoods.flat();

//     const uniqueCategories = ["All", ...new Set(allFoods.map((food) => food.category))];

//     return {
//       foods: allFoods,
//       categories: uniqueCategories,
//     };
//   } catch (error) {
//     console.error("Error fetching vendor foods and categories:", error);
//     return {
//       foods: [],
//       categories: [],
//     };
//   }
// };
// get all categories

export const getAllFoodCategories = async () => {
    try {
        const q = query(collection(db, "Food/items/categories"), where("isApproved", "==", true));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => {
            const name = doc.get("name");
            return { value: name, label: name };
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

// get  catergories (vedner included)
export const getVendorFoodCategories = async (vendorId) => {
    try {
        const q = query(collectionGroup(db, "details"), where("addedBy", "==", vendorId)); //add where isApproved true

        const snapshot = await getDocs(q);

        const categoriesSet = new Set();

        snapshot.forEach((doc) => {
            const tag = doc.data()?.tag;
            if (tag) categoriesSet.add(tag);
        });

        const categories = ["All", ...Array.from(categoriesSet)];
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return ["All"];
    }
};

// avoid collection mapping--------------(avoid fetching collection)
export const getVendorFoodsPaginated = async (vendorId, pageSize = 12, lastVisibleDoc = null, categoryFilter = "All") => {
    try {
        let filters = [ where("addedBy", "==", vendorId)];//add where isApproved true

        if (categoryFilter && categoryFilter !== "All") {
            filters.push(where("tag", "==", categoryFilter));
        }

        let q = query(collectionGroup(db, "details"), ...filters, limit(pageSize));

        if (lastVisibleDoc) {
            q = query(q, startAfter(lastVisibleDoc));
        }

        const snapshot = await getDocs(q);

        const foods = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            category: doc.data()?.tag || "Unknown",
        }));

        return {
            foods,
            lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
            hasMore: snapshot.size === pageSize,
        };
    } catch (error) {
        console.error("Error fetching paginated foods:", error);
        return {
            foods: [],
            lastVisible: null,
            hasMore: false,
        };
    }
};

// get individual food details
export const getVendorFoodDetails = async (category, foodId) => {
    try {
        const foodRef = doc(db, "Food", "items", "categories", category, "details", foodId);
        const docSnap = await getDoc(foodRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            };
        } else {
            throw new Error("Food item not found");
        }
    } catch (error) {
        console.error("Error fetching food details:", error);
        return null;
    }
};

// each vendors foods (serial version)
// export const getVendorFoodsAndCategories = async (vendorId) => {
//     try {
//         console.log(vendorId, "jjj");

//         const categoriesRef = collection(db, "Food/items/categories");
//         const approvedQuery = query(categoriesRef, where("isApproved", "==", true));
//         const approvedSnapshots = await getDocs(approvedQuery);

//         const allFoods = [];

//         for (const categoryDoc of approvedSnapshots.docs) {
//             const categoryId = categoryDoc.id;
//             const foodsRef = collection(db, `Food/items/categories/${categoryId}/details`);
//             const approvedFoodsQuery = query(foodsRef, where("isApproved", "==", true));
//             const foodDocs = await getDocs(approvedFoodsQuery);

//             for (const doc of foodDocs.docs) {
//                 const data = doc.data();
//                 if (data.addedBy === vendorId) {
//                     allFoods.push({
//                         ...data,
//                         id: doc.id,
//                         category: categoryId,
//                     });
//                 }
//             }
//         }

//         const uniqueCategories = ["All", ...new Set(allFoods.map((food) => food.category))];

//         return {
//             foods: allFoods,
//             categories: uniqueCategories,
//         };
//     } catch (err) {
//         console.error(err);
//         return {
//             foods: [],
//             categories: [],
//         };
//     }
// };

// add and update food item
export const addFoodItem = async (category, foodObj) => {
    try {
      if (!category || !foodObj) return toast.error("Invalid category or food object");
  
      const colRef = collection(db, "Food", "items", "categories", category, "details");
      const docRef = await addDoc(colRef, foodObj);
  
      await setDoc(docRef, {
        ...foodObj,
        id: docRef.id,
        reference: docRef, // ✅ Firestore reference type
      });
  
      console.log(docRef.id, "🔥 doc id");
      toast.success("Food Item Added Successfully");
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error("Failed to add food item");
    }
  };

export const updateFoodItem = async (category, docId, updatedData) => {
    const docRef = doc(db, "Food", "items", "categories", category, "details", docId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docRef,updatedData,"--data")
        await updateDoc(docRef, updatedData);
        toast.success("Food item updated");
    } else {
        toast.error("Food item does not exist");
    }
};
