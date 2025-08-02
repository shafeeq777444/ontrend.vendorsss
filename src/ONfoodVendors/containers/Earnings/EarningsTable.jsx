'use client';
import React, { useState, useMemo } from 'react';
import { subDays, subMonths, subYears, startOfDay, endOfDay } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { useTotalDeliveredOrders, useVendorEarningsAndOrdersByFiltered } from '../../../services/queries/earnings.quey';
import { 
  StatsCards, 
  EarningsSummary, 
  FilterControls, 
  OrdersTable, 
  OrderDetailsModal 
} from '../../components/Earnings';
import useCurrentUser from '../../../services/queries/user.query';

// Main EarningsTable Component
const EarningsTable = () => {
  // all time eranings user data
  const { data: currentUser } = useCurrentUser();
    // const currentUser={id:"7h08I2ng5HVFV0mRaAla1pCkOdF3",sellerEarnings:9}

  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calculate date range based on selected filter
  const getDateRange = useMemo(() => {
    const now = new Date();
    let startDate = null;
    let endDate = null;

    if (selectedFilter === 'Today') {
      startDate = startOfDay(now);
      endDate = endOfDay(now);
    } else if (selectedFilter === 'Last Week') {
      startDate = subDays(now, 7);
      endDate = now;
    } else if (selectedFilter === 'Last Month') {
      startDate = subMonths(now, 1);
      endDate = now;
    } else if (selectedFilter === 'Last Year') {
      startDate = subYears(now, 1);
      endDate = now;
    } else if (selectedFilter === 'Year') {
      startDate = new Date(selectedYear, 0, 1); // January 1st of selected year
      endDate = new Date(selectedYear, 11, 31, 23, 59, 59); // December 31st of selected year
    }

    return {
      startDate: startDate ? Timestamp.fromDate(startDate) : null,
      endDate: endDate ? Timestamp.fromDate(endDate) : null
    };
  }, [selectedFilter, selectedYear]);

  //  filtered earnings and filtered orders
  const {data:filteredOrdersEarningsAndCountOfOrders}=useVendorEarningsAndOrdersByFiltered({vendorId:currentUser?.id,startDate: getDateRange.startDate,
    endDate: getDateRange.endDate})
  console.log(filteredOrdersEarningsAndCountOfOrders?.totalData,"totalData");
  // total orders
  const {data:totalDeliveredOrders}=useTotalDeliveredOrders(currentUser?.id);

  // Transform filtered orders
  const filteredOrders = useMemo(() => {
    if (!filteredOrdersEarningsAndCountOfOrders?.totalData) return [];
    
    return filteredOrdersEarningsAndCountOfOrders.totalData.map(order => (order));
  }, [filteredOrdersEarningsAndCountOfOrders]);

  // Pagination logic
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filteredOrders.slice(startIndex, endIndex);
    
    // Debug logging
    console.log('Pagination Debug:', {
      totalOrders: filteredOrders.length,
      currentPage,
      itemsPerPage,
      startIndex,
      endIndex,
      paginatedLength: paginated.length,
      totalPages: Math.ceil(filteredOrders.length / itemsPerPage)
    });
    
    return paginated;
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, selectedYear]);

  // Calculate totals
  const totalEarnings = useMemo(() => {
    return filteredOrdersEarningsAndCountOfOrders?.totalEarnings || 0;
  }, [filteredOrdersEarningsAndCountOfOrders]);

  const totalOrders = filteredOrdersEarningsAndCountOfOrders?.totalOrders || 0;

  const allTimeEarnings = useMemo(() => {
    return currentUser?.sellerEarnings || 0;
  }, [currentUser]);

  const allTimeOrdersCount = totalDeliveredOrders || 0;

  const getPaymentModeIcon = (mode) => {
    switch (mode) {
      case 'UPI':
        return '💳';
      case 'Cash on Delivery':
        return '💰';
      case 'Card':
        return '💳';
      case 'Online Payment':
        return '💳';
      default:
        return '💳';
    }
  };

  const getPaymentModeColor = (mode) => {
    switch (mode) {
      case 'UPI':
        return 'bg-blue-100 text-blue-800';
      case 'Cash on Delivery':
        return 'bg-green-100 text-green-800';
      case 'Card':
        return 'bg-purple-100 text-purple-800';
      case 'Online Payment':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-t-2xl from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8 ">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Earnings Dashboard</h1>
          <p className="text-gray-600">Track your earnings and order performance</p>
        </div>

        {/* Stats Cards */}
        <StatsCards 
          currentUser={currentUser}
          filteredOrdersEarningsAndCountOfOrders={filteredOrdersEarningsAndCountOfOrders}
          totalDeliveredOrders={totalDeliveredOrders}
          selectedFilter={selectedFilter}
        />

        {/* Earnings Summary */}
        <EarningsSummary 
          allTimeEarnings={allTimeEarnings}
          allTimeOrdersCount={allTimeOrdersCount}
          totalEarnings={totalEarnings}
          totalOrders={totalOrders}
          selectedFilter={selectedFilter}
        />

        {/* Filter Controls */}
        <FilterControls 
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          isYearDropdownOpen={isYearDropdownOpen}
          setIsYearDropdownOpen={setIsYearDropdownOpen}
        />

        {/* Orders Table */}
        <OrdersTable 
          filteredOrders={filteredOrders}
          paginatedOrders={paginatedOrders}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          handlePageChange={handlePageChange}
          setSelectedOrder={setSelectedOrder}
          getPaymentModeIcon={getPaymentModeIcon}
          getPaymentModeColor={getPaymentModeColor}
        />
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal 
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        getPaymentModeIcon={getPaymentModeIcon}
      />
    </div>
  );
};

export default EarningsTable;
