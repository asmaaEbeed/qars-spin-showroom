export const getDates = () => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const nextCentury = new Date();
  nextCentury.setDate(today.getDate() + 36524);

  const lastMonth = new Date();
  lastMonth.setDate(today.getDate() - 30);

  const format = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return {
    today: format(today),
    nextWeek: format(nextWeek),
    lastMonth: format(lastMonth),
    nextCentury: format(nextCentury)
  };
};