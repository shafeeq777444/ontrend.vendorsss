import React from "react";

const AvailableTimeCard = ({ availableTime, handleAvilableStartTime, handleAvilableEndTime }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-800">Available Time</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">From</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={
              availableTime.from === "0:0" || availableTime.from === "0:00"
                ? "00:00"
                : availableTime.from
            }
            onChange={handleAvilableStartTime}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">To</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={availableTime.to}
            onChange={handleAvilableEndTime}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailableTimeCard;
