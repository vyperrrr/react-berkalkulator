import dayjs from "dayjs";

function validateDate(dateString) {
  const date = dayjs(dateString);
  if (!date.isValid()) return false;
  if (date.isAfter(dayjs())) return false;

  return true;
}

function isDateWithinTwoYearsFromNow(date) {
  const now = dayjs();
  const diffMonths = now.diff(date, "month");
  return diffMonths <= 24;
}

function isDateNextMonthBeforeNow(date) {
  const now = dayjs();
  const dateNextMonth = date.add(1, "month").startOf("month");
  return now.isAfter(dateNextMonth);
}

export { validateDate, isDateWithinTwoYearsFromNow, isDateNextMonthBeforeNow };
