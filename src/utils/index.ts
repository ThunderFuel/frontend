import dayjs from "dayjs";
import { ethers } from "ethers";
import * as timeago from "timeago.js";
import { ContainerClient } from "@azure/storage-blob";
import imageService from "../api/image/image.service";

export const addressFormat = (address: any, type = 0) => {
  if (!address) {
    return "-";
  }
  if (type === 0) {
    const first6 = address.substring(0, 6);
    const last4 = address.substring(address.length - 4);

    return first6 + "..." + last4;
  } else if (type === 1) {
    const first6 = address.substring(0, 6);

    return first6;
  }
};

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const numberFormat = (number: number) => {
  if (!number) {
    return 0;
  }

  return String(number).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const dateFormat = (date: any, format = "MM/DD/YYYY HH:mm", convertFrom: any = null) => {
  if (!date) {
    return "-";
  }
  if (convertFrom) {
    return dayjs(date, convertFrom).format(format);
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

export const getDateFromExpirationTime = (expireTime: number) => {
  const futureTime = new Date().getTime() + expireTime * 86400000;
  const date = new Date(futureTime);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  const hours = (hour % 12 || 12).toString().padStart(2, "0");

  return `${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`;
};

export function formatDisplayedNumber(num: number) {
  return formatPrice(num / 1000000000);
}

export function toGwei(num: any) {
  let _num = num;
  if (num === "") _num = 0;
  if (num === ".") _num = 0.1;

  const x = ethers.utils.parseUnits(_num.toString(), "gwei");

  return x;
}

export function randomIntFromInterval(min = 1, max = 11111111) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const timeagoFormat = (time: number | string) => {
  return timeago.format(time);
};

export const uniqueArr = (array: any[]) => {
  return Array.from(new Set(array.map((item) => JSON.stringify(item)))).map((item) => JSON.parse(item));
};

export const clipboardCopy = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch {
    window.navigator["clipboard"].writeText(text);
  }
};

export const formatPrice = (price: any) => {
  if (price === null || price === "-" || price === 0) {
    return price;
  }

  if (price < 0.0001) return "<0.0001";

  return parseFloat(price)
    .toFixed(5) //.toFixed(4)
    .replace(/\.?0+$/, "");
};

export const isObjectEmpty = (object: any) => Object.keys(object).length === 0;

export const uploadFile = async (file: File, onProcess: any = null) => {
  const response = await imageService.getToken({
    ext: file.name.split(".").pop(),
    directoryName: "drop",
  });

  const containerClient = new ContainerClient(response.data.token);

  const renamedFile = new File([file], response.data.fileName, { type: file.type });
  const blockBlobClient = containerClient.getBlockBlobClient(renamedFile.name);
  await blockBlobClient.uploadData(renamedFile, {
    onProgress: (e) => {
      if (onProcess) {
        onProcess(Math.floor((e.loadedBytes / renamedFile.size) * 100));
      }
    },
  });

  return response.data.cdnUrl;
};

const calculateHelper = (distance: number, divider: number = 1000 * 60 * 60 * 24) => {
  return Math.floor(distance / divider)
    .toString()
    .padStart(2, "0");
};

export const countDownTimer = (time: number) => {
  const distance = time - dayjs().valueOf();

  return {
    days: calculateHelper(distance, 1000 * 60 * 60 * 24),
    hours: calculateHelper(distance % (1000 * 60 * 60 * 24), 1000 * 60 * 60),
    minutes: calculateHelper(distance % (1000 * 60 * 60), 1000 * 60),
    seconds: calculateHelper(distance % (1000 * 60), 1000),
  };
};

export const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

export const formatTimeContract = (time: any) => {
  return time * 24 * 60 * 60;
};

export const formatTimeBackend = (time: any) => {
  return Math.round(dayjs().add(time, "days").valueOf() / 1000);
};
