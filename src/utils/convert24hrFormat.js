// utils/timeHelpers.js

export const convertTo24HourFormat = (time12h) => {
    if (!time12h) return "00:00:00";
    const [time, modifier] = time12h.trim().toLowerCase().split(/(am|pm)/).filter(Boolean);
    if (!time || !modifier) return "00:00:00";
  
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
  
    if (modifier === "pm" && hours !== 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;
  
    return `${String(hours).padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  };
  
  export const isValidTime = (timeStr) => {
    return /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(timeStr);
  };
  