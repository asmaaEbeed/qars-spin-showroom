export const getFirstDayOfCurrentMonth = () => {
  const now = new Date();

  const firstDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0, // hour
    0, // minute
    0,
    0,
  );

  const pad = (n) => String(n).padStart(2, "0");

  return `${firstDay.getFullYear()}-${pad(firstDay.getMonth() + 1)}-${pad(
    firstDay.getDate(),
  )}T${pad(firstDay.getHours())}:${pad(firstDay.getMinutes())}`;
};
