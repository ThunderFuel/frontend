import * as timeago from "timeago.js";

const stringFormat = [["now"], ["%s sec ago"], ["1m ago"], ["%sm ago"], ["1h ago"], ["%sh ago"], ["1d ago"], ["%sd ago"], ["1w ago"], ["%sw ago"], ["1mo ago"], ["%smo ago"], ["1y ago"], ["%sy ago"]];

const localeFunc = (number: number, index: number): any => {
  return stringFormat[index];
};
// register your locale with timeago
timeago.register("thunder-format", localeFunc);

export const timeagoFormat = (time: number | string) => {
  return timeago.format(time, "thunder-format");
};
