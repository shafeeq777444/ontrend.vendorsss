// hooks/useFoodForm.js
import { useEffect, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import debounce from "lodash.debounce";
import { transliterateINTOarabic } from "../../lib/arabicTransilarate";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useCurrentUser } from "../../services/hooks/profile/useCurrentUserLiveData";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import { useAddFoodMutation, useUpdateFoodMutation } from "../../services/queries/foodAdd.mutation";
import {
    useAddEproductMutation,
    useDeleteEproductMutation,
    useUpdateEproducMutation,
} from "../../services/queries/Eproduct.query";
import { useDeleteFoodMutation } from "../../services/queries/foodVendor.query";

const useFoodForm = ({ existingData = {}, onFinish }) => {
    // food-----------------------
    const { mutate: addFoodMutate } = useAddFoodMutation();
    const { mutate: updateFoodMutate } = useUpdateFoodMutation();
    const { mutate: deleteFoodMutate } = useDeleteFoodMutation();
    // eproduct-------------------------
    const { mutate: addEProductMutate } = useAddEproductMutation();
    const { mutate: updateEProductMutate } = useUpdateEproducMutation();
    const { mutate: deleteEProductMutate } = useDeleteEproductMutation();

    const { id } = useParams();
    const navigate = useNavigate();
    const { data: currentVendor } = useCurrentUser();
    const [tempName, setTempName] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        lowerCaseName: "",
        tag: "",
        description: "",
        variants: [],
        addOn: {},
        availableTime: { from: "00:00", to: "23:59" },
        preparationTime: 10,
        itemPrice: 0,
        discountPercentage: 0,
        discountScheduledPercentage: 0,
        discountExpiresAt: null,
        discountStartsAt: null,
        price: 0,
        discountAmount: 0,
        imageUrl: "",
        isDisabled: false,
        isApproved: false,
        vID: null,
        id: null,
        reference: null,
        timeStamp: serverTimestamp(),
        stock: 0,
        restaurantName: "",
        arabicRestaurantName: "",
        lowerCaseRestaurantName: "",
        localTag: "",
        localName: "",
        ...existingData,
    });

    // Debounce for transliteration
    useEffect(() => {
        const debounced = debounce(async (name) => {
            const arabicName = await transliterateINTOarabic(name);
            setFormData((prev) => ({
                ...prev,
                name,
                lowerCaseName: name.toLowerCase(),
                localName: arabicName,
            }));
        }, 500);
        if (tempName) debounced(tempName);
        return () => debounced.cancel();
    }, [tempName]);

    // Form handlers
    const handleNameChange = (val) => {
        setFormData((prev) => ({
            ...prev,
            name: val,
        }));
        setTempName(val);
    };
    const handleDescription = (val) => setFormData({ ...formData, description: val });
    // const handleImageUpload = async (croppedfile) => {
    //     const imageRef = ref(storage, `${currentVendor?.id}/images/product_images/${uuid()}`);
    //     await uploadBytes(imageRef, croppedfile);
    //     const downloadURL = await getDownloadURL(imageRef);
    //     downloadURL;
    //     console.log(downloadURL, "img");
    //     setFormData({ ...formData, imageUrl: downloadURL });
    // };
    const handleImageUpload = async (croppedfile) => {
        try {
            // Step 1: Delete old image if it exists
            if (formData.imageUrl) {
                try {
                    let oldImageRef;
                    if (!formData.imageUrl.startsWith("http")) {
                        oldImageRef = ref(storage, formData.imageUrl);
                    } else {
                        const path = decodeURIComponent(formData.imageUrl.split("/o/")[1].split("?")[0]);
                        oldImageRef = ref(storage, path);
                    }

                    await deleteObject(oldImageRef);
                    console.log("✅ Previous image deleted");
                } catch (err) {
                    console.warn("⚠️ Failed to delete previous image:", err);
                }
            }

            // Step 2: Upload new image
            // const imageRef = ref(storage, `${currentVendor?.id}/images/product_images/${uuid()}`);
            const imageRef = ref(storage, `ABC/${uuid()}`);
            await uploadBytes(imageRef, croppedfile);
            const downloadURL = await getDownloadURL(imageRef);
            console.log("📤 Uploaded image URL:", downloadURL);

            // Step 3: Update form data
            setFormData((prev) => ({ ...prev, imageUrl: downloadURL }));
        } catch (err) {
            console.error("❌ Error during image upload:", err);
            toast.error("Image upload failed");
        }
    };

    const handleToggleDisabled = () => setFormData((prev) => ({ ...prev, isDisabled: !prev.isDisabled }));
    const handleCategoryChange = (selectedOption) => setFormData((prev) => ({ ...prev, tag: selectedOption?.value || "" }));

    const handleOriginalPrice = (e) => {
        console.log("worked");
        console.log(formData.itemPrice, "itemPrice before");
        console.log(e.target.value, "itemPrice input value");
        const itemPrice = parseFloat(e.target.value);
        const discount = formData.discountPercentage || 0;
        const discountAmount = (itemPrice * discount) / 100;
        const price = itemPrice - discountAmount;
        setFormData((prev) => ({ ...prev, itemPrice, price, discountAmount }));
    };

    const handleDiscountPercentage = (e) => {
        const discount = parseFloat(e.target.value);

        if (discount < 0) {
            return toast.error("Discount percentage cannot be less than 0%");
        }

        if (discount > 100) {
            return toast.error("Discount percentage cannot be more than 100%");
        }

        if (!formData.itemPrice) return toast.error("Enter item price first");

        const itemPrice = formData.itemPrice;
        const discountAmount = (itemPrice * discount) / 100;
        const finalPrice = itemPrice - discountAmount;

        setFormData((prev) => ({
            ...prev,
            discountPercentage: discount,
            price: finalPrice,
            discountAmount,
        }));
    };

    const handleOfferPrice = (e) => {
        const offerPrice = parseFloat(e.target.value);
        const itemPrice = formData.itemPrice;

        if (!itemPrice) {
            toast.error("Enter item price first");
            return;
        }

        if (offerPrice > itemPrice) {
            toast.error("Offer price cannot be greater than item price");
            setFormData((prev) => ({ ...prev, price: itemPrice }));
            return;
        }

        const discountAmount = itemPrice - offerPrice;
        const discountPercentage = (discountAmount / itemPrice) * 100;

        setFormData((prev) => ({
            ...prev,
            price: offerPrice,
            discountAmount,
            discountPercentage: parseFloat(discountPercentage.toFixed(2)),
        }));
    };

    const handleAvilableStartTime = (e) => {
        const [h, m] = e.target.value.split(":").map(Number);
        setFormData({
            ...formData,
            availableTime: {
                ...formData.availableTime,
                from: e.target.value,
                fromMinute: h * 60 + m,
                isAvailable: true,
            },
        });
    };

    const handleAvilableEndTime = (e) => {
        const [h, m] = e.target.value.split(":").map(Number);
        setFormData({
            ...formData,
            availableTime: {
                ...formData.availableTime,
                to: e.target.value,
                toMinute: h * 60 + m,
                isAvailable: true,
            },
        });
    };

    const handlePrepearationTime = (e) => {
        const time = parseInt(e.target.value);
        setFormData({ ...formData, preparationTime: time });
    };

    const handleSubmit = (category) => {
        // Validation checks
        if (!formData.name?.trim()) {
            return toast.error("Item name is required");
        }
        if (!formData.tag?.trim()) {
            return toast.error("Category is required");
        }
        if (!formData.description?.trim()) {
            return toast.error("Description is required");
        }
        if (!formData.itemPrice || formData.itemPrice <= 0) {
            return toast.error("Item price must be greater than 0");
        }
        if (formData.discountPercentage < 0 || formData.discountPercentage > 100) {
            return toast.error("Discount percentage must be between 0 and 100");
        }
        if (formData.price > formData.itemPrice) {
            return toast.error("Offer price cannot be greater than item price");
        }
        if (formData.availableTime?.fromMinute === undefined || formData.availableTime?.toMinute === undefined) {
            return toast.error("Available time (start and end) must be selected");
        }
        if (formData.availableTime.fromMinute >= formData.availableTime.toMinute) {
            return toast.error("Available start time must be before end time");
        }
        if (!formData.preparationTime || formData.preparationTime <= 0) {
            return toast.error("Preparation time must be greater than 0");
        }

        // If all validations pass, proceed
        // const priceBase = formData.discountPercentage > 0 ? formData.price : formData.itemPrice;
        // const commissionRate = priceBase * 0.22;
        const commissionRate = 22;

        const finalPayload = {
            ...formData,
            timeStamp: serverTimestamp(),
            addedBy: currentVendor?.id,
            commissionRate,
            tag: formData?.tag,
            localTag: formData?.localTag,
            lowerCaseName: formData?.name?.toLowerCase(),
            arabicRestaurantName: currentVendor?.restaurantArabicName,
            lowerCaseRestaurantName: currentVendor?.restaurantName?.toLowerCase(),
            restaurantName: currentVendor?.restaurantName,
            vID: currentVendor?.vendorID,
            isApproved: formData?.isApproved || false,
        };

        if (currentVendor?.vendorType === "E-Shopping") {
            if (id === "new") {
                addEProductMutate({ category: finalPayload?.tag, productObj: finalPayload });
            } else if (category === finalPayload?.tag) {
                updateEProductMutate({ category, docId: finalPayload?.id, updatedData: finalPayload });
            } else {
                deleteEProductMutate({ category, docId: finalPayload?.id });
                addEProductMutate({ category: finalPayload?.tag, productObj: finalPayload });
            }
        } else {
            if (id === "new") {
                addFoodMutate({ category: finalPayload?.tag, foodObj: finalPayload });
            } else if (category === finalPayload?.tag) {
                updateFoodMutate({ category, docId: finalPayload?.id, updatedData: finalPayload });
            } else {
                deleteFoodMutate({ category, docId: finalPayload?.id });
                addFoodMutate({ category: finalPayload?.tag, foodObj: finalPayload });
            }
        }

        if (onFinish) onFinish();
    };

    // const handleSubmit = (category) => {

    //     const priceBase = formData.discountPrice > 0 ? formData.discountPrice : formData.itemPrice;
    //     const commissionRate = priceBase * 0.22;

    //     const finalPayload = {
    //         ...formData,
    //         timeStamp: serverTimestamp(),
    //         addedBy: currentVendor?.id,
    //         commissionRate,
    //         tag: formData?.tag,
    //         localTag: formData?.localTag,
    //         lowerCaseName: formData?.name?.toLowerCase(),
    //         arabicRestaurantName: currentVendor?.restaurantArabicName,
    //         lowerCaseRestaurantName: currentVendor?.restaurantName?.toLowerCase(),
    //         restaurantName: currentVendor?.restaurantName,
    //         vID: currentVendor?.vendorID,
    //         isApproved: formData?.isApproved || false,
    //     };

    //     // Update both Food and E-Shop depending on vendorType
    //     if (currentVendor?.vendorType === "E-Shopping") {
    //         // E-Shop logic (add/update)
    //         if (id === "new") {
    //             addEProductMutate({ category: finalPayload?.tag, productObj: finalPayload });
    //         } else if(category==finalPayload?.tag) {
    //             updateEProductMutate({ category, docId: finalPayload?.id, updatedData: finalPayload });
    //         }
    //         else{
    //             deleteEProductMutate({ category, docId: finalPayload?.id });
    //             addEProductMutate({ category: finalPayload?.tag, productObj: finalPayload });
    //         }

    //     } else {
    //         // Food logic (add/update)
    //         if (id === "new") {
    //             console.log("form");
    //             addFoodMutate({ category: finalPayload?.tag, foodObj: finalPayload });
    //         } else if(category==finalPayload?.tag){
    //             updateFoodMutate({ category, docId: finalPayload?.id, updatedData: finalPayload });
    //         }
    //         else{
    //             deleteFoodMutate({ category, docId: finalPayload?.id });
    //             addFoodMutate({ category: finalPayload?.tag, foodObj: finalPayload });
    //         }
    //     }

    //     if (onFinish) onFinish();
    // };

    const handleStock = (e) => {
        const value = parseInt(e.target.value, 10);
        setFormData((prev) => ({
            ...prev,
            stock: isNaN(value) ? 0 : value,
        }));
    };
    const handleCancel = async () => {
        navigate(-1); // Go back to previous page
    };

    return {
        formData,
        setFormData,
        handleNameChange,
        handleDescription,
        handleImageUpload,
        handleToggleDisabled,
        handleCategoryChange,
        handleOriginalPrice,
        handleDiscountPercentage,
        handleAvilableStartTime,
        handleAvilableEndTime,
        handlePrepearationTime,
        handleSubmit,
        handleStock,
        handleCancel,
        handleOfferPrice,
    };
};

export default useFoodForm;
