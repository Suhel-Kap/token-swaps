import { CandleStickChartItem, LineChartItem, OHLCApiResponse } from "../types";

export const prepareChartData = (
  ohlcData: Array<OHLCApiResponse>,
  prepareDataFn: (data: OHLCApiResponse) => any,
) => {
  const dataMap = new Map<
    string,
    Array<LineChartItem | CandleStickChartItem>
  >();
  const timeframes = ["15m", "1m", "1h", "4h", "1d", "1w"];

  ohlcData.forEach((data, index) => {
    if (data) {
      dataMap.set(timeframes[index], prepareDataFn(data));
    }
  });

  return dataMap;
};

export const timeFrameToInterval = (timeframe: string) => {
  switch (timeframe) {
    case "15m":
      return 15;
    case "1m":
      return 1;
    case "1h":
      return 60;
    case "4h":
      return 240;
    case "1d":
      return 1440;
    case "1w":
      return 10080;
    default:
      return 1;
  }
};
