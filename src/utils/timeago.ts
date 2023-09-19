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
