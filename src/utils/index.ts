import dayjs from "dayjs";

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
