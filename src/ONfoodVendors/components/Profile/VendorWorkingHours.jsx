"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function BusinessHoursCard() {
  const [mode, setMode] = useState("general")
  const [generalTime, setGeneralTime] = useState({ from: "09:00 AM", to: "5:30 PM" })

  const [schedule, setSchedule] = useState(
    days.map((day, idx) => ({
      day,
      active: idx < 5,
      from: "09:00 AM",
      to: "5:30 PM",
    }))
  )

  const weekdays = schedule.filter((d) => !["Saturday", "Sunday"].includes(d.day))
  const weekends = schedule.filter((d) => ["Saturday", "Sunday"].includes(d.day))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1250px] w-full bg-white rounded-2xl shadow-md p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">

        <div className="flex items-center gap-3">
          <Button
            variant={mode === "general" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("general")}
          >
            General
          </Button>
          <Button
            variant={mode === "custom" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("custom")}
          >
            Day-wise
          </Button>
        </div>
      </div>

      {/* View switch */}
      {mode === "custom" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weekdays Column */}
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

          {/* Weekends Column */}
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
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">General Opening Time</h3>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={generalTime.from}
              onChange={(e) => setGeneralTime({ ...generalTime, from: e.target.value })}
              className="w-28 px-2 py-1 border rounded text-sm"
            />
            <span className="text-sm">to</span>
            <input
              type="text"
              value={generalTime.to}
              onChange={(e) => setGeneralTime({ ...generalTime, to: e.target.value })}
              className="w-28 px-2 py-1 border rounded text-sm"
            />
          </div>

          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => {
              const updated = schedule.map((item) =>
                item.active ? { ...item, from: generalTime.from, to: generalTime.to } : item
              )
              setSchedule(updated)
            }}
          >
            Apply to All Active Days
          </Button>
        </div>
      )}
    </motion.div>
  )
}

function DayItem({ item, index, schedule, setSchedule }) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg ${
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
        <div className="flex space-x-2">
          <input
            type="text"
            value={item.from}
            onChange={(e) => {
              const updated = [...schedule]
              updated[index].from = e.target.value
              setSchedule(updated)
            }}
            className="w-24 px-2 py-1 border rounded text-sm"
          />
          <span className="text-sm">to</span>
          <input
            type="text"
            value={item.to}
            onChange={(e) => {
              const updated = [...schedule]
              updated[index].to = e.target.value
              setSchedule(updated)
            }}
            className="w-24 px-2 py-1 border rounded text-sm"
          />
        </div>
      ) : (
        <span className="text-sm text-gray-400">Closed</span>
      )}
    </div>
  )
}
