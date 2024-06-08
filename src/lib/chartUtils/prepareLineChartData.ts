import { OHLCApiResponse } from "../types";

export const prepareLineChartData = (data: OHLCApiResponse) => {
  // convert data into an array of objects consisting time and close price
  const result: { time: string; value: number }[] = [];
  Object.keys(data.result).forEach((key) => {
    if (key === "last") return;

    data.result[key].forEach((ohlcd) => {
      result.push({ time: ohlcd[0].toString(), value: parseFloat(ohlcd[4]) });
    });
  });
  return result;
};
