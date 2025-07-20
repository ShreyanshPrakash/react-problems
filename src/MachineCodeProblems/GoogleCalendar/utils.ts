export const getFirstDayOfMonth = (date?: Date) => {
  const currentDate = date || new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();

  // For Jan, month is 0, hence + 1 as I am doing string
  const dateString = `${month + 1}/1/${year}`;
  const firstDayOfMonth = new Date(dateString);
  let day = firstDayOfMonth.getDay();
  return day;
};

export const fillTheDates = (
  startIndex: number = 0,
  size: number
): Array<number | null> => {
  size = size || 7 * 5;
  let list = new Array(size).fill(null);

  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();

  for (let i = startIndex; i <= size; i++) {
    const monthDate = i - startIndex + 1;
    const dateString = `${month + 1}/${monthDate}/${year}`;
    const firstDayOfMonth = new Date(dateString);

    if (String(firstDayOfMonth) === "Invalid Date") {
      break;
    }

    list[i] = monthDate;
  }

  return list;
};
