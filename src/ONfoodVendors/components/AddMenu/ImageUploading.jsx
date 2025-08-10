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
    <div className="mb-6 w-full">
      <div
        role="button"
        tabIndex="0"
        aria-label="Upload food image"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onAreaClick()}
        className={`group flex flex-col items-center justify-center w-full h-48 sm:h-64 md:h-72 lg:h-80 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'} 
          ${imageUrl ? 'bg-white' : 'bg-gray-50'}
        `}
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
          aria-label="Select food image to upload"
        />
        {imageUrl ? (
          <div className="relative w-full h-full group">
            <LazyImg 
              src={imageUrl} 
              alt="Food preview" 
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="p-3 mb-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-200">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 transition-transform group-hover:scale-110 duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-1">Upload food image</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xs">
              Drag & drop your image here, or <span className="text-blue-600 font-medium">browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG (Max 5MB)</p>
          </div>
        )}
        {isDragActive && (
          <div className="absolute inset-0 bg-blue-50 bg-opacity-80 backdrop-blur-sm rounded-lg pointer-events-none border-2 border-blue-400 border-dashed flex items-center justify-center">
            <div className="text-center p-4">
              <div className="bg-white rounded-full p-3 inline-block shadow-lg mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-blue-700 font-medium">Drop image to upload</p>
            </div>
          </div>
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
