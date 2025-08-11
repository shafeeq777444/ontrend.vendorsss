import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../lib/cropImageHelper';
import { Slider } from '@mui/material';

const ImageCropModal = ({ imageSrc, onClose, onCropDone, type = "" }) => {
  const presetAspectRatios = [
    { label: 'Free', value: 1/1 },
    { label: '3:1', value: 3 / 1 },
    { label: '16:9', value: 16 / 9 },
    { label: '4:1', value: 4 / 1 },
  ];

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(type === 'banner' ? 3 / 1 : 1);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    setLoading(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      await onCropDone(croppedImage);
    } catch (error) {
      console.error("Crop failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-fadeIn scale-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {/* You can put an icon here */}
            </svg>
            <h2 className="text-lg font-semibold text-gray-800">Crop Image</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative w-full flex items-center justify-center bg-gray-300 rounded-b-lg border-b border-gray-100" style={{ minHeight: 440 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Aspect ratio buttons for banners */}
        {type === 'banner' && (
          <div className="flex justify-center gap-4 my-3">
            {presetAspectRatios.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setAspectRatio(preset.value)}
                className={`px-3 py-1 rounded-md border ${
                  aspectRatio === preset.value
                    ? 'border-blue-600 bg-blue-100 text-blue-700 font-semibold'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}

        {/* Zoom Slider */}
        <div className="px-6 py-4 bg-gray-50 flex flex-col items-center gap-2">
          <label className="text-xs text-gray-500 font-medium mb-1">Zoom</label>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e, z) => setZoom(z)}
            sx={{ color: '#2563eb', width: '90%' }}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold shadow transition flex items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
