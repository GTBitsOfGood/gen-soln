export const nthDate = (date: number) => {
  if (date > 3 && date < 21) return "th";
  switch (date % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Generates string representations like "Jun 29th, 2:00 PM - 4:00 PM" and "Jun 29th, 2:00 PM - Jun 30th 4:00 PM"
export const formatDateRange = (s: string, e: string) => {
  const start = new Date(s);
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };

  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const startDate = start.getDate();
  const startDateString = `${startDate.toString()}${nthDate(startDate)}`;
  const startTime = start.toLocaleString("en-US", timeOptions);
  const startFormatted = `${startMonth} ${startDateString}, ${startTime}`;

  const end = new Date(e);
  const endTime = end.toLocaleString("en-US", timeOptions);
  let endFormatted = endTime;

  if (end.getDate() !== startDate || end.getMonth() !== start.getMonth()) {
    const endMonth = end.toLocaleString("en-US", { month: "short" });
    const endDate = end.getDate();
    const endDateString = `${endDate.toString()}${nthDate(endDate)}`;
    endFormatted = `${endMonth} ${endDateString}, ${endTime}`;
  }
  return `${startFormatted} - ${endFormatted}`;
};

export const getBeginningOfDay = (date: Date) => {
  const dateCopy = new Date(date); // Don't modify existing object
  dateCopy.setHours(0);
  dateCopy.setMinutes(0);
  dateCopy.setSeconds(0);
  dateCopy.setMilliseconds(0);
  return dateCopy;
};

// How many days to the current or next Saturday? Returns 0 if date=Saturday, -1 if date=Sunday, 5 if date=Monday, etc.
export const getWeekendOffset = (date: Date) =>
  date.getDay() == 0 ? -1 : 6 - date.getDay();

export const addDays = (date: Date, days: number) => {
  const dateCopy = new Date(date); // Don't modify existing object
  dateCopy.setDate(dateCopy.getDate() + days);
  return dateCopy;
};
