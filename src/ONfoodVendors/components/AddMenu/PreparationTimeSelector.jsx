import React from "react";

const PreparationTimeSelector = ({ value = { hours: 0, minutes: 0 }, onChange }) => {
  const handleHourChange = (e) => {
    const newHours = parseInt(e.target.value);
    onChange({ ...value, hours: newHours });
  };

  const handleMinuteChange = (e) => {
    const newMinutes = parseInt(e.target.value);
    onChange({ ...value, minutes: newMinutes });
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
      <div className="flex gap-3">
        <select
          value={value.hours ?? 0}
          onChange={handleHourChange}
          className="border px-3 py-2 rounded-md text-sm"
        >
          {[...Array(13)].map((_, i) => (
            <option key={i} value={i}>{i} hr</option>
          ))}
        </select>
        <select
          value={value.minutes ?? 0}
          onChange={handleMinuteChange}
          className="border px-3 py-2 rounded-md text-sm"
        >
          {[0, 5, 10, 15, 20, 30, 45].map((min) => (
            <option key={min} value={min}>{min} min</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PreparationTimeSelector;
