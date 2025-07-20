// FoodItemFormModal.jsx
import React from "react"
import { useForm } from "react-hook-form"
import ImageUploadField from "../../components/Menus/AddFood/ImageUploadField"
import TextField from "../../components/Menus/AddFood/TextField"
import SelectField from "../../components/Menus/AddFood/SelectField"
import TimeField from "../../components/Menus/AddFood/TimeField"
import TextAreaField from "../../components/Menus/AddFood/TextAreaField"

export default function FoodItemFormModal({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 p-4 max-w-5xl">
      <div className="col-span-2">
        <ImageUploadField register={register} errors={errors} name="image" />
      </div>

      <TextField label="Item Name" name="itemName" register={register} errors={errors} required />
      {/* <SelectField label="Category" name="category" register={register} options={["Starter", "Main", "Dessert"]} required /> */}

      <TextField label="Preparation Time (min)" name="prepTime" type="number" register={register} />
      <TimeField label="Available Time (optional)" name="availableTime" register={register} />

      <TextField label="Add Variants (optional)" name="variants" register={register} />
      <TextField label="Add-ons" name="addons" register={register} />

      <TextField label="Item Price" name="price" type="number" register={register} required />
      <TextField label="Discount (%)" name="discount" type="number" register={register} />

      <TextField label="Offer Price" name="offerPrice" type="number" register={register} />

      <div className="col-span-2">
        <TextAreaField label="Item Description" name="description" register={register} />
      </div>

      <div className="col-span-2 text-right">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </form>
  )
}
