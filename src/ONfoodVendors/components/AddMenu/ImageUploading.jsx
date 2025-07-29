import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import LazyImg from '../common/LazyImg';
import ImageCropModal from '../common/ImageCropModal';

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const ImageUploading = ({ imageUrl, handleImageUpload }) => {
  const fileInputRef = useRef();
  const [isDragActive, setIsDragActive] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Image must be an image');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      toast.error('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setTempImage(reader.result);
    reader.readAsDataURL(file);
  };

  const onCropDone = (croppedFile) => {
    setTempImage(null);
    handleImageUpload(croppedFile);
  };

  const onAreaClick = () => fileInputRef.current.click();

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const onInputChange = (e) => {
    if (e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="mb-4">

      <div
        className={`flex flex-col items-center justify-center w-90 h-70 border-2 border-dashed rounded-lg cursor-pointer transition bg-gray-50 relative ${isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-400'} ${imageUrl ? '' : 'hover:bg-blue-50'}`}
        onClick={onAreaClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          onChange={onInputChange}
        />
        {imageUrl ? (
          <LazyImg src={imageUrl} alt="Food" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11l4 4 4-4m-4 4V7" />
            </svg>
            <span className="text-gray-500 text-sm text-center">Click or drag image here<br/>PNG, JPG, JPEG (max 5MB)</span>
          </>
        )}
        {isDragActive && (
          <div className="absolute inset-0 bg-blue-100 bg-opacity-40 rounded-lg pointer-events-none border-2 border-blue-400 border-dashed"></div>
        )}
      </div>

      {tempImage && (
        <ImageCropModal
          imageSrc={tempImage}
          onClose={() => setTempImage(null)}
          onCropDone={onCropDone}
        />
      )}
    </div>
  );
};

export default ImageUploading;
