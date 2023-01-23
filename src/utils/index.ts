import dayjs from "dayjs";
import BigNumber from "bignumber.js";

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const numberFormat = (number: number) => {
  return String(number).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const dateFormat = (date: any, format = "MM/DD/YYYY HH:mm") => {
  if (!date) {
    return "-";
  }

  return dayjs(date).format(format);
};

export const chunk = (arr: any = [], chunkSize = 4) => {
  const tmpArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    tmpArray.push(chunk);
  }

  return tmpArray;
};

export const getDateFromExpirationTime = (expirationTime: string) => {
  const currentDate = new Date();
  const [amount, unit] = expirationTime.split(" ");
  let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + parseInt(amount), currentDate.getHours(), currentDate.getMinutes());
  if (unit.includes("day")) {
    date = new Date(currentDate.getTime() + parseInt(amount) * 24 * 60 * 60 * 1000);
  } else if (unit.includes("month")) {
    date = new Date(currentDate);
    date.setMonth(date.getMonth() + parseInt(amount), currentDate.getDate());
    date.setHours(currentDate.getHours());
    date.setMinutes(currentDate.getMinutes());
    date.setSeconds(currentDate.getSeconds());
  }

  return date?.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function substract(num1: number, num2: number) {
  const a = new BigNumber(num1);
  const b = new BigNumber(num2);
  const difference = a.minus(b);

  return difference.toString();
}
