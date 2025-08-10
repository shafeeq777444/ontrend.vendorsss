import React from 'react';
import ImageUploading from '../AddMenu/ImageUploading.jsx';
import ItemInfoCard from '../AddMenu/ItemInfoCard.jsx';

const BasicInfoTab = ({
  formData,
  categoryOptions,
  setCategoryOptions,
  handleImageUpload,
  handleNameChange,
  handleDescription,
  handleCategoryChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
      <ImageUploading
        imageUrl={formData.imageUrl}
        handleImageUpload={handleImageUpload}
      />
      <div className="md:col-span-2">
        <ItemInfoCard
          description={formData.description}
          name={formData.name}
          arabicName={formData.localName}
          category={formData.tag}
          handleNameChange={handleNameChange}
          handleDescription={handleDescription}
          allCategories={categoryOptions}
          setAllCategories={setCategoryOptions}
          categoryOnchange={handleCategoryChange}
        />
      </div>
    </div>
  );
};

export default BasicInfoTab;
