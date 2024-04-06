import dayjs from "dayjs";

function validateDate(dateString) {
  const date = dayjs(dateString);
  if (!date.isValid()) return false;
  if (date.isAfter(dayjs())) return false;

  return true;
}

function isDateWithinTwoYearsFromNow(date) {
  const now = dayjs();
  const diffYears = now.diff(date, "year");
  return diffYears <= 2;
}

function isDateNextMonthBeforeNow(date) {
  const now = dayjs();
  const dateNextMonth = date.add(1, "month").startOf("month");
  return now.isAfter(date);
}

export { validateDate, isDateWithinTwoYearsFromNow, isDateNextMonthBeforeNow };
