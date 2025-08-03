import {
    addDoc,
    collection,
    collectionGroup,
    deleteDoc,
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
import { deleteObject, getStorage, ref } from "firebase/storage";



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

// delete food item
export const deleteFoodItem = async (category, docId) => {
    const trimmedCategory = category?.trim();
    const trimmedDocId = docId?.trim();
  
    if (!trimmedCategory || !trimmedDocId) {
      toast.error("Invalid category or document ID");
      return;
    }
  
    const docRef = doc(db, "Food", "items", "categories", trimmedCategory, "details", trimmedDocId);
  
    try {
      const snap = await getDoc(docRef);
  
      if (snap.exists()) {
        const data = snap.data();
        const imageUrl = data?.imageUrl;
  
        if (imageUrl) {
          try {
            const storage = getStorage();
            let imageRef;
  
            if (!imageUrl.startsWith("http")) {
              imageRef = ref(storage, imageUrl);
            } else {
              const path = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
              imageRef = ref(storage, path);
            }
  
            await deleteObject(imageRef);
            toast.success("Image deleted successfully");
          } catch (imgErr) {
            console.warn("⚠️ Failed to delete image:", imgErr);
            toast.error("Failed to delete image");
          }
        }
      }
  
      await deleteDoc(docRef);
      toast.success("🍽️ Food item deleted");
    } catch (error) {
      console.error("❌ Error deleting food item:", error);
      toast.error("Failed to delete food item");
    }
  };

//   create categories
export const createCategoryInFood = async (categoryName) => {
    try {
        const colRef = collection(db, "Food", "items", "categories");
        const docRef = await addDoc(colRef, { name: categoryName });
        toast.success("Category created successfully");
    } catch (error) {
        console.error("Error creating category:", error);
        toast.error("Failed to create category");
    }
};