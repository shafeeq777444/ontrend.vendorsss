import React from 'react';
import { formatOMR } from '../../../utils/formatOMR';

const StatsCards = ({ currentUser, filteredOrdersEarningsAndCountOfOrders, totalDeliveredOrders, selectedFilter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total Seller Earnings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Seller Earnings</p>
            <p className="text-3xl font-bold text-green-600">
              {formatOMR(currentUser?.sellerEarnings || 0)}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Filtered Earnings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Filtered Earnings</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatOMR(filteredOrdersEarningsAndCountOfOrders?.totalEarnings || 0)}
            </p>
            <p className="text-xs text-gray-500">{selectedFilter}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-3xl font-bold text-purple-600">
              {totalDeliveredOrders || 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        </div>
      </div>

      {/* Filtered Orders */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Filtered Orders</p>
            <p className="text-3xl font-bold text-orange-600">
              {filteredOrdersEarningsAndCountOfOrders?.totalOrders || 0}
            </p>
            <p className="text-xs text-gray-500">{selectedFilter}</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StatsCards;
