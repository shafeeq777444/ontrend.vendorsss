import React from 'react';
import { Package, DollarSign, Clock, Users, Tag, FileText, Image } from 'lucide-react';

const Summary = ({ formData, categoryOptions }) => {
  const getCategoryName = (categoryValue) => {
    const category = categoryOptions?.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue || 'Not selected';
  };

  const formatPrice = (price) => {
    return price ? `OMR ${parseFloat(price).toFixed(3)}` : 'Not set';
  };

  const formatTime = (time) => {
    return time || 'Not set';
  };

  const getVariantsCount = () => {
    return formData.variants ? Object.keys(formData.variants).length : 0;
  };

  const getAddOnsCount = () => {
    if (!formData.addOn) return 0;
    return Object.values(formData.addOn).reduce((total, items) => total + items.length, 0);
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6 space-y-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">

        Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2">

            Basic Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{formData.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Arabic Name:</span>
              <span className="font-medium">{formData.localName || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{getCategoryName(formData.tag)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${formData.isDisabled ? 'text-red-600' : 'text-green-600'}`}>
                {formData.isDisabled ? 'Disabled' : 'Enabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Availability */}
        <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2">

            Pricing & Availability
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Original Price:</span>
              <span className="font-medium">{formatPrice(formData.itemPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Offer Price:</span>
              <span className="font-medium">{formatPrice(formData.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium">{formData.discountPercentage ? `${formData.discountPercentage}%` : 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stock:</span>
              <span className="font-medium">{formData.stock || 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Time & Preparation */}
        <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Time & Preparation
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Available From:</span>
              <span className="font-medium">{formatTime(formData.availableTime?.from)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Until:</span>
              <span className="font-medium">{formatTime(formData.availableTime?.to)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Preparation Time:</span>
              <span className="font-medium">{formData.preparationTime ? `${formData.preparationTime} min` : 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Variants & Add-ons */}
        <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            Variants & Add-ons
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Variants:</span>
              <span className="font-medium">{getVariantsCount()} variant(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Add-on Groups:</span>
              <span className="font-medium">{formData.addOn ? Object.keys(formData.addOn).length : 0} group(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Add-ons:</span>
              <span className="font-medium">{getAddOnsCount()} item(s)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {formData.description && (
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-blue-500" />
            Description
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {formData.description}
          </p>
        </div>
      )}

      {/* Image */}
      {formData.imageUrl && (
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
            <Image className="w-4 h-4 text-blue-500" />
            Product Image
          </h4>
          <div className="flex justify-center">
            <img 
              src={formData.imageUrl} 
              alt="Product" 
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>
        </div>
      )}

      {/* Variants Details */}
      {formData.variants && Object.keys(formData.variants).length > 0 && (
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-blue-500" />
            Variant Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(formData.variants).map(([name, details]) => (
              <div key={name} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="font-medium text-sm text-blue-900">{name}</div>
                <div className="text-xs text-gray-600 mt-1">
                  Qty: {details.qty} | Price: {formatPrice(details.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons Details */}
      {formData.addOn && Object.keys(formData.addOn).length > 0 && (
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-blue-500" />
            Add-on Details
          </h4>
          <div className="space-y-4">
            {Object.entries(formData.addOn).map(([groupName, items]) => (
              <div key={groupName} className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="font-medium text-sm text-blue-900 mb-2">{groupName}</div>
                {items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {items.map((item, index) => (
                      <div key={index} className="bg-white rounded p-2 text-xs border border-gray-100">
                        <div className="font-medium">{item.name || 'Unnamed item'}</div>
                        <div className="text-gray-600">
                          {formatPrice(item.price)} {item.isRequired && '(Required)'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">No items added</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
