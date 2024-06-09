import { TOKEN } from "../types";

export const COOKIE_KEYS = {
  JWT: "jwt",
};

export const TOKEN_PAIRS: TOKEN[] = [
  {
    tickerName: "WBTCUSD",
    displayName: "Wrapped Bitcoin",
    symbol: "WBTC",
    wsname: "WTBC/USD",
  },
  {
    tickerName: "ETHUSDT",
    displayName: "Ethereum",
    symbol: "ETH",
    wsname: "ETH/USDT",
  },
  {
    tickerName: "MATICUSD",
    displayName: "Matic",
    symbol: "MATIC",
    wsname: "MATIC/USD",
  },
  {
    tickerName: "USDTZUSD",
    displayName: "Tether USD",
    symbol: "USDT",
    wsname: "USDT/USD",
  },
  {
    tickerName: "USDCUSD",
    displayName: "Circle USD",
    symbol: "USDC",
    wsname: "USDC/USD",
  },
];

export const TICKER_REVALIDATION_TIME_IN_SECONDS = 60;
export const OHLC_REVALIDATION_TIME_IN_SECONDS = 60 * 60;

export const KRAKEN_PUBLIC_URL = "https://api.kraken.com/0/public";

export const TIME_INTERVALS = {
  ONE_HOUR: 60,
  FOUR_HOURS: 240,
  ONE_DAY: 1440,
  ONE_WEEK: 10080,
};
