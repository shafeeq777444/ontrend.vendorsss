import React from 'react';

const StatsCards = ({ currentUser, filteredOrdersEarningsAndCountOfOrders, totalDeliveredOrders, selectedFilter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">All Time Earnings</p>
            <p className="text-3xl font-bold text-green-600">₹{currentUser?.sellerEarnings?.toFixed(3) || 0.000}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Filtered Earnings</p>
            <p className="text-3xl font-bold text-blue-600">₹{filteredOrdersEarningsAndCountOfOrders?.totalEarnings?.toFixed(3) || 0.000}</p>
            <p className="text-xs text-gray-500">{selectedFilter}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <p className="text-3xl font-bold text-purple-600">{totalDeliveredOrders || 0}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Filtered Orders</p>
            <p className="text-3xl font-bold text-orange-600">{filteredOrdersEarningsAndCountOfOrders?.totalOrders || 0}</p>
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