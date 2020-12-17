import { timeFormat, timeParse } from "d3";

export function fmtMinSec(num) {
  const minutes = Math.floor(num / 60);
  const seconds = num - minutes * 60;
  if (minutes <= 0) {
    return `${seconds}s`;
  } else {
    return `${minutes}m ${seconds}s`;
  }
}

export const yyyymmddParse = timeParse("%Y%m%d");
export const formatDate = timeFormat("%d/%m/%Y");

// console.log(yyyymmdd("20200303"));
