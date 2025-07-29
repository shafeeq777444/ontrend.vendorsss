"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import useCurrentUser from "../../../../services/queries/user.query";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Helper: Validate time string ("HH:mm")
const isValidTime = (time) => {
  return typeof time === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
};

export default function GeneralScheduleForm({ generalTime, setGeneralTime, handleApply }) {
  const { data } = useCurrentUser();
  const [selectedDays, setSelectedDays] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (data?.workingDays) {
      setSelectedDays(data.workingDays);
    }
  }, [data?.workingDays]);

  const toggleDay = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleApplyClick = () => {
    if (!isValidTime(generalTime.from) || !isValidTime(generalTime.to)) {
      setError("Please enter valid opening and closing times.");
      return;
    }

    if (!Object.values(selectedDays).some(Boolean)) {
      setError("Please select at least one day.");
      return;
    }

    setError(""); // Clear previous error
    handleApply(selectedDays);
  };

  return (
    <div className="space-y-6">
      {/* Time Picker */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-1">General Opening Time</h3>
        <div className="flex items-center space-x-3">
          <div className="w-28">
            <TimePicker
              value={generalTime.from || null}
              onChange={(val) =>{
                console.log(val,"value")
                setGeneralTime({ ...generalTime, from: val })}}
              format="h:mm a"
              disableClock
              clearIcon={null}
              className="text-sm rounded"
              required
            />
          </div>

          <span className="text-sm">to</span>

          <div className="w-28">
            <TimePicker
              value={generalTime.to || null}
              onChange={(val) => setGeneralTime({ ...generalTime, to: val })}
              format="h:mm a"
              disableClock
              clearIcon={null}
              className="text-sm"
              required
            />
          </div>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      {/* Day Selection */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Apply to Selected Days</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {days.map((day) => (
            <label key={day} className="flex items-center space-x-2 text-sm">
              <Switch
                checked={!!selectedDays[day]}
                onCheckedChange={() => toggleDay(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button
        size="sm"
        variant="outline"
        className="text-xs"
        onClick={handleApplyClick}
      >
        Apply to Selected Days
      </Button>
    </div>
  );
}
