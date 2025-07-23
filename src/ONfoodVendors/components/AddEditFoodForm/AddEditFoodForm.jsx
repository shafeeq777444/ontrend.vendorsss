import React, { useState } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { storage } from "../../../config/firebase";
import VariantListCard from "../AddMenu/ VariantListCard";

const AddEditFoodForm = ({ existingData = {}, onFinish }) => {
  // const {data:currentVendor} = useCurrentUser()
  // console.log(currentUser,"current user")
  const currentVendor = {id:"0F7jaOrjQ8QE18jKYyCfa1cU5b32"};
  const [formData, setFormData] = useState({
    name: "",
    arabicName: "",
    lowerCaseName: "",
    category: "Burger",
    description: "",
    variants: [],
    addOns: {},
    availableTime: { from: "00:00", to: "23:59" },
    preparationTime: 10,
    itemPrice: 0,
    discountPrice: 0,
    offerPrice: 0,
    imageUrl: "",
    isDisabled: false,
    ...existingData,
  });

  const handleImageUpload = async (file) => {
    const fileRef = ref(storage, `foodImages/${uuid()}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    setFormData({ ...formData, imageUrl: url });
  };

  const handleNameChange = (name) => {
    const arabicName = name; // Optional: Translate via API
    setFormData({
      ...formData,
      name,
      arabicName,
      lowerCaseName: name.toLowerCase(),
    });
  };

  const handleSubmit = async () => {
    const priceBase = formData.discountPrice > 0 ? formData.discountPrice : formData.itemPrice;
    const commissionRate = priceBase * 0.22;
    console.log({
      ...formData,
      timeStamp: new Date(),
      addedBy: currentVendor,
      isApproved: false,
      isDisabled: formData.isDisabled,
      commissionRate,
      vID: 98,
    })
    // const docRef = doc(db, "Food", "items", "categories", formData.category, "details", formData.id || uuid());
    // await setDoc(docRef, {
    //   ...formData,
    //   timeStamp: new Date(),
    //   addedBy: currentVendor,
    //   isApproved: false,
    //   isDisabled: formData.isDisabled,
    //   commissionRate,
    //   vID: 98,
    // });
    if (onFinish) onFinish();
  };

  const handleToggleDisabled = () => {
    setFormData((prev) => ({ ...prev, isDisabled: !prev.isDisabled }));
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add / Edit Food Item</h2>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block font-medium text-gray-700">Food Image</label>
        <input
          type="file"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="Food" className="mt-2 w-32 h-32 object-cover rounded" />
        )}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Item Name (English)</label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Item Name (English)"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Item Name (Arabic)</label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={formData.arabicName}
            disabled
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Lowercase Name</label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value={formData.lowerCaseName}
            disabled
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Burger">Burger</option>
            <option value="Juice">Juice</option>
            <option value="Rice">Rice</option>
            <option value="Appetizers">Appetizers</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* Variants & AddOns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div>
          <h3 className="font-semibold text-gray-700 mb-1">Variants</h3>
          <div className="text-gray-400 text-sm italic">(Add variant fields dynamically)</div>
        </div> */}
        <VariantListCard variants={formData.variants} onAdd={()=>{}} onRemove={()=>{}} onChange={()=>{}} activeIndex={0} setActiveIndex={()=>{}}/>
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Add-Ons</h3>
          <div className="text-gray-400 text-sm italic">(Add-ons like Extras, Spicy/Non-Spicy)</div>
        </div>
      </div>

      {/* Available Time */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-700">Available Time</h3>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm text-gray-600">From</label>
            <input
              type="time"
              className="border rounded px-3 py-2"
              value={formData.availableTime.from}
              onChange={(e) =>
                setFormData({ ...formData, availableTime: { ...formData.availableTime, from: e.target.value } })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">To</label>
            <input
              type="time"
              className="border rounded px-3 py-2"
              value={formData.availableTime.to}
              onChange={(e) =>
                setFormData({ ...formData, availableTime: { ...formData.availableTime, to: e.target.value } })
              }
            />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Preparation Time (minutes)</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="number"
            value={formData.preparationTime}
            onChange={(e) => setFormData({ ...formData, preparationTime: +e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Item Price</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="number"
            value={formData.itemPrice}
            onChange={(e) => setFormData({ ...formData, itemPrice: +e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Discount Price</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="number"
            value={formData.discountPrice}
            onChange={(e) => setFormData({ ...formData, discountPrice: +e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Offer Price</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="number"
            value={formData.offerPrice}
            onChange={(e) => setFormData({ ...formData, offerPrice: +e.target.value })}
          />
        </div>
      </div>

      {/* Enable/Disable Toggle */}
      <div className="flex items-center gap-4 mt-4">
        <span className="font-medium text-gray-700">Status:</span>
        <span className={formData.isDisabled ? "text-red-500 font-semibold" : "text-green-600 font-semibold"}>
          {formData.isDisabled ? "Disabled" : "Enabled"}
        </span>
        <button
          type="button"
          onClick={handleToggleDisabled}
          className={`ml-4 relative inline-flex h-6 w-12 border-2 border-gray-300 rounded-full transition-colors duration-200 focus:outline-none ${formData.isDisabled ? 'bg-red-400' : 'bg-green-400'}`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${formData.isDisabled ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
        <span className="text-sm text-gray-500">{formData.isDisabled ? "Click to Enable" : "Click to Disable"}</span>
      </div>

      {/* Save Button */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold shadow"
        >
          Save Food Item
        </button>
      </div>
    </div>
  );
};

export default AddEditFoodForm;
