// hooks/useFoodForm.js
import { useEffect, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import debounce from "lodash.debounce";
import { transliterateINTOarabic } from "../../lib/arabicTransilarate";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import useCurrentUser from "../../services/queries/user.query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import { useAddFoodMutation, useUpdateFoodMutation } from "../../services/queries/foodAdd.mutation";
import { useAddEproductMutation, useUpdateEproducMutation } from "../../services/queries/Eproduct.query";

const useFoodForm = ({ existingData = {}, onFinish }) => {
    // food-----------------------
    const { mutate: addFoodMutate } = useAddFoodMutation();
    const { mutate: updateFoodMutate } = useUpdateFoodMutation();
    // eproduct-------------------------
    const { mutate: addEProductMutate } = useAddEproductMutation();
    const { mutate: updateEProductMutate } = useUpdateEproducMutation();

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
        stock:0,
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
    const handleImageUpload = async (croppedfile) => {
        const imageRef = ref(storage, `FoodImages/${uuid()}`); //change path into vendorname/... check
        await uploadBytes(imageRef, croppedfile);
        const downloadURL = await getDownloadURL(imageRef);
        downloadURL;
        console.log(downloadURL, "img");
        setFormData({ ...formData, imageUrl: downloadURL });
    };

    const handleToggleDisabled = () => setFormData((prev) => ({ ...prev, isDisabled: !prev.isDisabled }));
    const handleCategoryChange = (selectedOption) =>
        setFormData((prev) => ({ ...prev, tag: selectedOption?.value || "" }));

    const handleOriginalPrice = (e) => {
        const itemPrice = parseFloat(e.target.value);
        const discount = formData.discountPercentage || 0;
        const discountAmount = (itemPrice * discount) / 100;
        const price = itemPrice - discountAmount;
        setFormData({ ...formData, itemPrice, price, discountAmount });
    };

    const handleDiscountPercentage = (e) => {
        const discount = parseFloat(e.target.value);
        if (!formData.itemPrice) return toast.error("Enter item price first");
        const itemPrice = formData.itemPrice;
        const discountAmount = (itemPrice * discount) / 100;
        const finalPrice = itemPrice - discountAmount;
        setFormData({
            ...formData,
            discountPercentage: discount,
            price: finalPrice,
            discountAmount,
        });
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

    const handleSubmit = () => {
        const priceBase = formData.discountPrice > 0 ? formData.discountPrice : formData.itemPrice;
        const commissionRate = priceBase * 0.22;

        const finalPayload = {
            ...formData,
            timeStamp: serverTimestamp(),
            addedBy: currentVendor?.id,
            commissionRate,
            tag: formData?.category,
            localTag: formData?.category,
            lowerCaseName: formData?.name?.toLowerCase(),
            arabicRestaurantName: currentVendor?.restaurantArabicName,
            lowerCaseRestaurantName: currentVendor?.restaurantName?.toLowerCase(),
            restaurantName: currentVendor?.restaurantName,
            isApproved: formData?.isApproved || false,
        };

        // Update both Food and E-Shop depending on vendorType
        if (currentVendor?.vendorType === "E-Shopping") {
            // E-Shop logic (add/update)
            if (id === "new") {
                addEProductMutate({ category: formData?.tag, productObj: finalPayload });
            } else {
                updateEProductMutate({ category: formData?.tag, docId: finalPayload?.id, updatedData: finalPayload });
            }
        } else {
            // Food logic (add/update)
            if (id === "new") {
                addFoodMutate({ category: formData?.tag, foodObj: finalPayload });
            } else {
                updateFoodMutate({ category: formData?.tag, docId: finalPayload?.id, updatedData: finalPayload });
            }
        }

        
        if (onFinish) onFinish();
    };

    const handleStock = (e) => {
        const value = parseInt(e.target.value, 10);
        setFormData((prev) => ({
            ...prev,
            stock: isNaN(value) ? 0 : value,
        }));
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
        handleStock
    };
};

export default useFoodForm;
