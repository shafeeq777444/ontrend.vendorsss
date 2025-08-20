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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
           
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative w-full bg-gray-100" style={{ height: 480 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                backgroundColor: '#f3f4f6'
              }
            }}
          />
        </div>

        {/* Controls Section */}
        <div className="p-6 space-y-6">
          {/* Aspect ratio buttons for banners */}
          {type === 'banner' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
              <div className="flex flex-wrap gap-2">
                {presetAspectRatios.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setAspectRatio(preset.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                      aspectRatio === preset.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Zoom Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Zoom Level</label>
              <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="px-2">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, z) => setZoom(z)}
                sx={{
                  color: '#3b82f6',
                  height: 6,
                  '& .MuiSlider-thumb': {
                    width: 20,
                    height: 20,
                    backgroundColor: '#fff',
                    border: '2px solid #3b82f6',
                    '&:hover': {
                      boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.16)'
                    }
                  },
                  '& .MuiSlider-track': {
                    height: 6,
                    borderRadius: 3
                  },
                  '& .MuiSlider-rail': {
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#e5e7eb'
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            {loading ? 'Processing...' : 'Apply Crop'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
