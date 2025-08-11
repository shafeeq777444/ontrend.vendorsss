import { doc, collection, serverTimestamp, setDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const uploadBannerImageAndSave = async ({ file, user }) => {
  try {
    if (!user?.id) throw new Error("User ID is required");

    const uniqueId = uuid();
    const fileName = `${file.name}-${uniqueId}`;
    const storagePath = `${user.id}/banners/${fileName}`;
    const storageRef = ref(storage, storagePath);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Wait for upload completion
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: track progress here
          console.log(`Upload is ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        () => {
          console.log("Upload successful");
          resolve();
        }
      );
    });

    // Get download URL after upload
    const downloadedUrl = await getDownloadURL(storageRef);

    // Create a new doc reference with auto ID in banners collection
    const bannerDocRef = doc(collection(db, "banners"));

    // Save metadata to Firestore
    await setDoc(bannerDocRef, {
      addedBy: user.id,
      bannerType: user.vendorType,
      fileName: storagePath,
      fileType: file.type || "image/png",
      uploadedAt: serverTimestamp(),
      url: downloadedUrl,
    });

    return true;
  } catch (error) {
    console.error("Error uploading banner:", error);
    return false;
  }
};

// delete banner

export const deleteBannerById = async (banner) => {
    if (!banner || !banner.id) {
      console.warn("Banner or banner ID missing");
      return false;
    }
  
    // Delete the image from Firebase Storage if URL exists
    if (banner.url) {
      try {
        const storage = getStorage();
        let imageRef;
  
        // If banner.url is a storage path (not a download URL)
        if (!banner.url.startsWith("http")) {
          imageRef = ref(storage, banner.url);
        } else {
          // banner.url is a download URL, extract storage path from it
          // URL format: .../o/<path>?...
          const path = decodeURIComponent(
            banner.url.split("/o/")[1].split("?")[0]
          );
          imageRef = ref(storage, path);
        }
  
        await deleteObject(imageRef);
      } catch (imgErr) {
        console.warn("Failed to delete image from storage:", imgErr);
        // Optional: continue to delete Firestore doc even if image delete fails
      }
    }
  
    // Delete the Firestore document
    try {
      const bannerDocRef = doc(db, "banners", banner.id);
      await deleteDoc(bannerDocRef);
      return true;
    } catch (error) {
      console.error("Error deleting banner document:", error);
      return false;
    }
  };
