import * as timeago from "timeago.js";

const stringFormat = [
  ["now", "now"],
  ["%s sec ago", "%s sec ago"],
  ["1m ago", "1m ago"],
  ["%sm ago", "%sm ago"],
  ["1h ago", "1h ago"],
  ["%sh ago", "%sh ago"],
  ["1d ago", "1d ago"],
  ["%sd ago", "%sd ago"],
  ["1w ago", "1w ago"],
  ["%sw ago", "%sw ago"],
  ["1mo ago", "1mo ago"],
  ["%smo ago", "%smo ago"],
  ["1y ago", "1y ago"],
  ["%sy ago", "%sy ago"],
];

const localeFunc = (number: number, index: number): any => {
  return stringFormat[index];
};
timeago.register("thunder-format", localeFunc);

export const timeagoFormat = (time: number | string) => {
  return timeago.format(time, "thunder-format");
};

const expireStringFormat = [
  ["now", "now"],
  ["in %s seconds", "%s seconds"],
  ["in 1 minute", "in 1 minute"],
  ["in %s minutes", "in %s minutes"],
  ["in 1 hour", "in 1 hour"],
  ["in %s hours", "in %s hours"],
  ["in 1 day", "in 1 day"],
  ["in %s days", "in %s days"],
  ["in 1 week", "in 1 week"],
  ["in %s weeks", "in %s weeks"],
  ["in 1 month", "in 1 month"],
  ["in %s months", "in %s months"],
  ["in 1 year", "in 1 year"],
  ["in %s years", "in %s years"],
];

const _localeFunc = (number: number, index: number): any => {
  return expireStringFormat[index];
};
timeago.register("expires-in-format", _localeFunc);

export const expiresInFormat = (time: any) => {
  return timeago.format(time, "expires-in-format");
};
