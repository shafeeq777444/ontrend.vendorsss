/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import ImageCropModal from './ImageCropModal';

const ImageCropperModalCommon = ({ 
  uploadPath = `FoodImages/${uuid()}`, 
  onUploadComplete, 
  initialImageUrl = ''
}) => {
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);
  const [rawImageFile, setRawImageFile] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCropSrc(reader.result);
      reader.readAsDataURL(file);
      setRawImageFile(file);
    }
  };

  const handleCropDone = async (croppedBlob) => {
    const imageRef = ref(Storage, uploadPath);
    await uploadBytes(imageRef, croppedBlob);
    const url = await getDownloadURL(imageRef);
    setPreviewUrl(url);
    onUploadComplete(url);
    setCropSrc(null); // close modal
  };

  return (
    <div className="space-y-3">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="rounded-xl border w-full h-48 object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="text-sm"
      />

      {cropSrc && (
        <ImageCropModal
          imageSrc={cropSrc}
          onClose={() => setCropSrc(null)}
          onCropDone={handleCropDone}
        />
      )}
    </div>
  );
};

export default ImageCropperModalCommon;
