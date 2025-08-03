import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import toast from "react-hot-toast";
import { deleteObject, getStorage, ref } from "firebase/storage";

// get individual eproduct details
export const getEProductDetail = async (category, productId) => {
    console.log(category, productId, "check2");
    try {
        const eProductRef = doc(db, "E-Shop", "items", "categories", category, "details", productId);
        const docSnap = await getDoc(eProductRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            };
        } else {
            throw new Error("E-product  not found");
        }
    } catch (error) {
        console.error("Error fetching E-product details:", error);
        return null;
    }
};

// add and update food item
export const addEProductItem = async (category, productObj) => {
    try {
        if (!category || !productObj) return toast.error("Invalid category or food object");

        const colRef = collection(db, "E-Shop", "items", "categories", category, "details");
        const docRef = await addDoc(colRef, productObj);

        await setDoc(docRef, {
            ...productObj,
            id: docRef.id,
            reference: docRef, // ✅ Firestore reference type
        });

        console.log(docRef.id, "🔥 doc id");
        toast.success("E-product Item Added Successfully");
    } catch (error) {
        console.error("Error adding E-product:", error);
        toast.error("Failed to add E-product");
    }
};
export const updateEProductItem = async (category, docId, updatedData) => {
    console.log(category, docId, "check docId");

    const docRef = doc(db, "E-Shop", "items", "categories", category.trim(), "details", docId.trim());
    console.log("Firestore doc path:", docRef.path);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const cleanedData = Object.fromEntries(Object.entries(updatedData).filter(([_, v]) => v !== undefined));   

        try {
            await updateDoc(docRef, cleanedData);
            toast.success("E-Shop item updated");
        } catch (err) {
            console.error("Update failed:", err);   
            toast.error("Update failed: " + err.message);
        }
    } else {
        toast.error("E-Shop item does not exist");
    }
};

// -------------------------------------- get All categories from e-shop -----------------------------------------------------------
export const getAllEShopCategories = async () => {
    try {
        const q = query(collection(db, "E-Shop/items/categories"), where("isApproved", "==", true));
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

// delete

export const deleteEProductItem = async (category, docId) => {
    const trimmedCategory = category.trim();
    const trimmedDocId = docId.trim();
    const docRef = doc(db, "E-Shop", "items", "categories", trimmedCategory, "details", trimmedDocId);
  
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
              // Direct storage path
              imageRef = ref(storage, imageUrl);
            } else {
              // Extract path from download URL
              const path = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
              imageRef = ref(storage, path);
            }
  
            await deleteObject(imageRef);
          } catch (imgErr) {
            console.warn("⚠️ Failed to delete image from storage:", imgErr);
          }
        }
      }
  
      await deleteDoc(docRef);
      toast.success(" E-Product deleted successfully");
    } catch (error) {
      console.error("❌Error deleting E-Product:", error);
      toast.error("Failed to delete E-Product");
    }
  };


//   create categories
export const createCategoryInEshop = async (categoryName) => {
    try {
        const colRef = collection(db, "E-Shop", "items", "categories");
        const docRef = await addDoc(colRef, { name: categoryName });
        toast.success("Category created successfully");
    } catch (error) {
        console.error("Error creating category:", error);
        toast.error("Failed to create category");
    }
};
    