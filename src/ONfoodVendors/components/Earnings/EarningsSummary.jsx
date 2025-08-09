import React from 'react';
import { formatOMR } from '../../../utils/formatOMR';

const EarningsSummary = ({ allTimeEarnings, allTimeOrdersCount, totalEarnings, totalOrders, selectedFilter }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Earnings Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* All Time Average */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-600">All Time Average</p>
          <p className="text-2xl font-bold text-gray-900">
            {allTimeOrdersCount > 0 
              ? formatOMR(allTimeEarnings / allTimeOrdersCount) 
              : formatOMR(0)}
          </p>
          <p className="text-xs text-gray-500">per order</p>
        </div>

        {/* Filtered Average */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-600">Filtered Average</p>
          <p className="text-2xl font-bold text-blue-700">
            {totalOrders > 0 
              ? formatOMR(totalEarnings / totalOrders) 
              : formatOMR(0)}
          </p>
          <p className="text-xs text-blue-500">per order ({selectedFilter})</p>
        </div>

        {/* Filtered vs Total */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">Filtered vs Total</p>
          <p className="text-2xl font-bold text-green-700">
            {allTimeEarnings > 0 
              ? ((totalEarnings / allTimeEarnings) * 100).toFixed(1) 
              : '0'}%
          </p>
          <p className="text-xs text-green-500">of total earnings</p>
        </div>

      </div>
    </div>
  );
};

export default EarningsSummary;
