export const to12HourFormat = (timeStr) => {
  if (!timeStr) return "";
  // If already in AM/PM format, return as is
  if (/am|pm/i.test(timeStr)) {
    return timeStr;
  }
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};