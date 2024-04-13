export const TimeEndingWithSeconds = () => {};
export const TimeEndingWithMinutes = () => {};
export const TimeForMillisecond = () => {};
export const AddOneMonthString = (timeSting) => {
  const date = new Date(timeSting);
  return date.toISOString();
};
export const ToDateString = (t) => {
  const date = new Date(t);

  const h = `${date.getHours()}`.padStart(2, "0");
  const m = `${date.getMinutes()}`.padStart(2, "0");

  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}, ${h}:${m}${
    date.getHours() >= 0 && date.getHours() <= 12 ? "am" : "pm"
  }`;
};
