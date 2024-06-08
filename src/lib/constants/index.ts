import { TOKEN } from "../types";

export const COOKIE_KEYS = {
  JWT: "jwt",
};

export const TICKER_REVALIDATION_TIME_IN_SECONDS = 60;

export const KRAKEN_PUBLIC_URL = "https://api.kraken.com/0/public";

export const TOKEN_PAIRS: TOKEN[] = [
  {
    name: "WBTCUSD",
    displayName: "Wrapped Bitcoin",
    symbol: "WBTC",
    wsname: "WTBC/USD",
  },
  {
    name: "ETHUSDT",
    displayName: "Ethereum",
    symbol: "ETH",
    wsname: "ETH/USDT",
  },
  {
    name: "MATICUSD",
    displayName: "Matic",
    symbol: "MATIC",
    wsname: "MATIC/USD",
  },
  {
    name: "USDTZUSD",
    displayName: "Tether USD",
    symbol: "USDT",
    wsname: "USDT/USD",
  },
  {
    name: "USDCUSD",
    displayName: "Circle USD",
    symbol: "USDC",
    wsname: "USDC/USD",
  },
];
