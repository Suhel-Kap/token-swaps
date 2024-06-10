import { OHLCApiResponse } from "../types";

export const prepareChartData = (
  ohlcData: Array<OHLCApiResponse>,
  prepareDataFn: (data: OHLCApiResponse) => any,
) => {
  const dataMap = new Map<string, any>();
  const timeframes = ["15m", "1h", "4h", "1d", "1w"];

  ohlcData.forEach((data, index) => {
    if (data) {
      dataMap.set(timeframes[index], prepareDataFn(data));
    }
  });

  return dataMap;
};
