import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 as uuid } from "uuid";
export const handleNewImageUpload = async (croppedfile, setTempImage) => {
  const imageRef = ref(storage, `FoodImages/${uuid()}`);
  await uploadBytes(imageRef, croppedfile);
  const downloadURL = await getDownloadURL(imageRef);
  console.log(downloadURL, "img");
  setTempImage(downloadURL);
};