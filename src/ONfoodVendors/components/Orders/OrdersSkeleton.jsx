// OrdersSkeleton.jsx
import React from 'react';

const OrdersSkeleton = () => {
    return (
        <div className="bg-white rounded-t-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Static Title */}
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Static Table Headings */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Time</th>
                        </tr>
                    </thead>

                    {/* Skeleton Content Rows */}
                    <tbody className="bg-white divide-y divide-gray-100 animate-pulse">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i}>
                                {Array.from({ length: 7 }).map((_, j) => (
                                    <td key={j} className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersSkeleton;
