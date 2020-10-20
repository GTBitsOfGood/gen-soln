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
