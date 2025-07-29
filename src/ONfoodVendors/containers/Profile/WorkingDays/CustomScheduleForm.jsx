"use client";
import DayItem from "./DayItemCard";

export default function CustomScheduleForm({ schedule, setSchedule, handleUpdate, hasChange }) {
  const weekdays = schedule.filter((d) => !["Saturday", "Sunday"].includes(d.day));
  const weekends = schedule.filter((d) => ["Saturday", "Sunday"].includes(d.day));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Weekdays</h3>
        {weekdays.map((item, index) => (
          <DayItem
            key={index}
            item={item}
            index={schedule.indexOf(item)}
            setSchedule={setSchedule}
            schedule={schedule}
          />
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Weekend</h3>
        {weekends.map((item, index) => (
          <DayItem
            key={index}
            item={item}
            index={schedule.indexOf(item)}
            setSchedule={setSchedule}
            schedule={schedule}
          />
        ))}
        {hasChange && (
          <div className="col-span-2 relative left-80 top-24">
            <button
              onClick={handleUpdate}
              className="text-sm px-4 py-2 rounded-md bg-black text-white"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
