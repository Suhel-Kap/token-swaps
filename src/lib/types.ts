import { Time } from "lightweight-charts";

export type TOKEN = {
  tickerName: string;
  displayName: string;
  symbol: string;
  wsname: string;
};

export type AssetTickerInfo = {
  a: [string, string, string]; // Ask [<price>, <whole lot volume>, <lot volume>]
  b: [string, string, string]; // Bid [<price>, <whole lot volume>, <lot volume>]
  c: [string, string]; // Last trade closed [<price>, <lot volume>]
  v: [string, string]; // Volume [<today>, <last 24 hours>]
  p: [string, string]; // Volume weighted average price [<today>, <last 24 hours>]
  t: [number, number]; // Number of trades [<today>, <last 24 hours>]
  l: [string, string]; // Low [<today>, <last 24 hours>]
  h: [string, string]; // High [<today>, <last 24 hours>]
  o: string; // Today's opening price
};

export type TickerApiResponse = {
  error: string[];
  result: {
    [key: string]: AssetTickerInfo;
  };
};

export type TickerData = {
  pair: string;
  price: string;
  openingPrice: string;
  highPrice: string;
  lowPrice: string;
  percentage: number;
};

export type OHLCData = [
  number, // Time
  string, // Open
  string, // High
  string, // Low
  string, // Close
  string, // Vwap
  string, // Volume
  number, // Count
];

export type OHLCApiResponse = {
  error: string[];
  result: {
    [key: string]: Array<OHLCData>;
  };
};

export type LineChartItem = {
  time: Time;
  value: number;
};

export type CandleStickChartItem = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type ChartType = "baseline" | "candlestick";
