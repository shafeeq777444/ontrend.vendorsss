import { Switch } from "@/components/ui/switch"
import TimePicker from "react-time-picker";

function DayItem({ item, index, schedule, setSchedule }) {
  console.log(schedule,"--schedule")

    return (
      <div
        className={`flex items-center justify-between px-3 py-2 h-10 rounded-lg ${
          item.active ? "bg-gray-50" : "bg-gray-100/60"
        }`}
      >
        <div className="flex items-center space-x-2">
          <Switch
            checked={item.active}
            onCheckedChange={(val) => {
              const updated = [...schedule]
              updated[index].active = val
              setSchedule(updated)
            }}
          />
          <span className="w-20 text-sm">{item.day}</span>
        </div>
  
        {item.active ? (
          <div className="flex items-center space-x-2">
            <TimePicker
              onChange={value => {
                const updated = [...schedule];
                updated[index].from = value;
                setSchedule(updated);
              }}
              value={item.from || null}
              disableClock
              clearIcon={null}
              format="hh:mm a"
              className="text-sm"
            />
            <span className="text-sm mx-1">to</span>
            <TimePicker
              onChange={value => {
                console.log(value,"changed")
                const updated = [...schedule];
                updated[index].to = value;
                setSchedule(updated);
              }}
              value={item.to || null}
              disableClock
              clearIcon={null}
              format="hh:mm a"
              className="text-sm"
            />
          </div>
        ) : (
          <span className="text-sm text-gray-400">Closed</span>
        )}
      </div>
    )
}

export default DayItem