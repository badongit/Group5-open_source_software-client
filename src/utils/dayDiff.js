import dayjs from "dayjs";

const showDayDiff = (date, string) => {
  const keyword = Math.abs(date) > 1 ? `${string}s` : string;
  return `${Math.abs(date)} ${keyword}`;
};

export default function dayDiff(date) {
  const datetime = dayjs(date);

  const week = datetime.diff(Date.now(), "week");
  if (week) {
    return showDayDiff(week, "week");
  }

  const day = datetime.diff(Date.now(), "day");
  if (day) {
    return showDayDiff(day, "day");
  }

  const hour = datetime.diff(Date.now(), "hour");
  if (hour) {
    return showDayDiff(hour, "hour");
  }

  const minute = datetime.diff(Date.now(), "minute");
  if (minute) {
    return showDayDiff(minute, "minute");
  }

  return "1 minute";
}
