import React from 'react'

const PrepearationTime = ({ preparationTime, handlePrepearationTime }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Preparation Time <span className="text-gray-400">(in minutes)</span>
      </label>
      <input
        type="number"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder="e.g. 20"
        value={preparationTime}
        onChange={handlePrepearationTime}
        min={1}
      />
    </div>
  )
}

export default PrepearationTime
