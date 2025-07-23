import React from "react";

const AvailableTimeCard = ({ time, index, onChange, onRemove }) => {
  return (
    <div className="flex items-center gap-4 border rounded-lg p-4 shadow-sm bg-white w-full">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">From</label>
        <input
          type="time"
          name="from"
          value={time.from}
          onChange={(e) => onChange(index, "from", e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">To</label>
        <input
          type="time"
          name="to"
          value={time.to}
          onChange={(e) => onChange(index, "to", e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={() => onRemove(index)}
        className="ml-auto text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default AvailableTimeCard;
