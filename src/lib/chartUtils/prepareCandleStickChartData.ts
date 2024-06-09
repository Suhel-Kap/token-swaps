import { UTCTimestamp } from "lightweight-charts";
import { CandleStickChartItem, OHLCApiResponse } from "../types";

export const prepareCandlestickChartData = (
  data: OHLCApiResponse,
): CandleStickChartItem[] => {
  const result: CandleStickChartItem[] = [];
  Object.keys(data.result).forEach((key) => {
    if (key === "last") return;

    data.result[key].forEach((ohlcd) => {
      result.push({
        time: ohlcd[0] as UTCTimestamp,
        open: parseFloat(ohlcd[1]),
        high: parseFloat(ohlcd[2]),
        low: parseFloat(ohlcd[3]),
        close: parseFloat(ohlcd[4]),
      });
    });
  });
  return result;
};
