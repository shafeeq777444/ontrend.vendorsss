import { useState, useEffect } from "react";
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess
} from "../skiper-ui/SkiperUiForm";
import { fetchCurrentUserData } from "../../../utils/firebase/auth";

export default function PopoverFormFeedbackExample() {
  useEffect(()=>{
    async function fetchUserData() {
      const data =await fetchCurrentUserData();
      console.log(data,"current use");
    }
    fetchUserData()

  },[])
 

  const [formState, setFormState] = useState("idle");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    offerPrice: "",
    price: "",
    discount: "",
    category: "",
    preparationTime: "",
    availableTime: "",
    variants: "",
    addOns: "",
    image: null,
  });

  function submit() {
    setFormState("loading");
    setTimeout(() => setFormState("success"), 1500);
    setTimeout(() => {
      setOpen(false);
      setFormState("idle");
      setFormData({
        itemName: "",
        description: "",
        offerPrice: "",
        price: "",
        discount: "",
        category: "",
        preparationTime: "",
        availableTime: "",
        variants: "",
        addOns: "",
        image: null,
      });
    }, 3300);
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && open && formState === "idle") {
        submit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, formState]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <PopoverForm
        title="+ Add Food Items"
        open={open}
        setOpen={setOpen}
        width="1000px"
        height="700px"
        showCloseButton={formState !== "success"}
        showSuccess={formState === "success"}
        openChild={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!formData.itemName || !formData.price || !formData.category) return;
              submit();
            }}
            className="h-full flex flex-col hide"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-red-200">
              <h3 className="text-lg font-semibold text-red-900">Food Item Details</h3>
              <p className="text-sm text-red-700 mt-1">Fill in the details to add a new item to your menu</p>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6 p-6">
                {/* Column 1 */}
                <div className="space-y-5">
                  <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                    <h4 className="text-sm font-medium text-red-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Basic Information
                    </h4>
                    <div className="space-y-4">
                      <Input 
                        label="Item Name *" 
                        field="itemName" 
                        value={formData.itemName} 
                        onChange={handleInputChange}
                        placeholder="e.g., Margherita Pizza"
                      />
                      <Textarea 
                        label="Description" 
                        field="description" 
                        value={formData.description} 
                        onChange={handleInputChange}
                        placeholder="Describe your food item..."
                      />
                      <Select 
                        label="Category *" 
                        field="category" 
                        value={formData.category} 
                        onChange={handleInputChange} 
                        options={[
                          "Appetizer", "Main Course", "Dessert", "Beverage", "Salad", "Soup", "Fast Food", "Healthy"
                        ]} 
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                    <h4 className="text-sm font-medium text-red-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Pricing
                    </h4>
                    <div className="space-y-4">
                      <Input 
                        label="Regular Price ($) *" 
                        type="number" 
                        field="price" 
                        value={formData.price} 
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                      <Input 
                        label="Offer Price ($)" 
                        type="number" 
                        field="offerPrice" 
                        value={formData.offerPrice} 
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                      />
                      <Input 
                        label="Discount (%)" 
                        type="number" 
                        field="discount" 
                        value={formData.discount} 
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-5">
                  <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                    <h4 className="text-sm font-medium text-red-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Preparation & Availability
                    </h4>
                    <div className="space-y-4">
                      <Input 
                        label="Preparation Time (min)" 
                        type="number" 
                        field="preparationTime" 
                        value={formData.preparationTime} 
                        onChange={handleInputChange}
                        placeholder="15"
                        min="0"
                      />
                      <Input 
                        label="Available Time" 
                        field="availableTime" 
                        value={formData.availableTime} 
                        onChange={handleInputChange}
                        placeholder="e.g., 9 AM - 10 PM"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                    <h4 className="text-sm font-medium text-red-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Customization
                    </h4>
                    <div className="space-y-4">
                      <Input 
                        label="Variants (optional)" 
                        field="variants" 
                        value={formData.variants} 
                        onChange={handleInputChange}
                        placeholder="e.g., Small, Medium, Large"
                      />
                      <Input 
                        label="Add-ons (optional)" 
                        field="addOns" 
                        value={formData.addOns} 
                        onChange={handleInputChange}
                        placeholder="e.g., Extra cheese, Mushrooms"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-red-200 shadow-sm">
                    <h4 className="text-sm font-medium text-red-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Media
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-red-900 mb-2">Food Image</label>
                      <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                        <div className="space-y-2">
                          <svg className="mx-auto h-12 w-12 text-red-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="text-sm text-red-600">
                            <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500">
                              <span>Upload an image</span>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleInputChange("image", e.target.files[0])}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-red-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-red-50 px-6 py-4 border-t border-red-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-red-600">
                  * Required fields
                </div>
                <div className="relative flex h-12 items-center px-[10px]">
                  <PopoverFormSeparator />
                  <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                    <PopoverFormCutOutLeftIcon />
                  </div>
                  <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                    <PopoverFormCutOutRightIcon />
                  </div>
                  <PopoverFormButton loading={formState === "loading"} text="Add Item" />
                </div>
              </div>
            </div>
          </form>
        }
        successChild={
          <PopoverFormSuccess
            title="Item Added Successfully"
            description="Your food item has been added to the menu!"
          />
        }
      />
    </div>
  );
}

// Enhanced Input Component
const Input = ({ label, type = "text", field, value, onChange, placeholder, step, min, max }) => (
  <div>
    <label className="block text-sm font-medium text-red-900 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      step={step}
      min={min}
      max={max}
      className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300 bg-white"
    />
  </div>
);

// Enhanced Select Component
const Select = ({ label, field, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-red-900 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300 bg-white"
    >
      <option value="">Select {label.toLowerCase().replace(' *', '')}</option>
      {options.map((opt) => (
        <option key={opt} value={opt.toLowerCase()}>{opt}</option>
      ))}
    </select>
  </div>
);

// Enhanced Textarea Component
const Textarea = ({ label, field, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-red-900 mb-2">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-300 bg-white resize-none"
      rows={3}
    />
  </div>
);
