import { ColorType } from "lightweight-charts";
import { TOKEN } from "../types";

export const TOKEN_PAIRS: TOKEN[] = [
  {
    tickerName: "WBTCUSD",
    wsName: "BTC/USD",
    displayName: "Wrapped Bitcoin",
    symbol: "WBTC",
    chainId: 137,
    tokenAddress: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    decimals: 8,
  },
  {
    tickerName: "ETHUSDT",
    wsName: "ETH/USD",
    displayName: "Wrapped Ethereum",
    symbol: "WETH",
    chainId: 137,
    tokenAddress: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    decimals: 18,
  },
  {
    tickerName: "MATICUSD",
    wsName: "MATIC/USD",
    displayName: "Matic",
    symbol: "MATIC",
    chainId: 137,
    tokenAddress: "0x0000000000000000000000000000000000001010",
    decimals: 18,
    isNative: true,
  },
  {
    tickerName: "USDTZUSD",
    wsName: "USDT/USD",
    displayName: "Tether USD",
    symbol: "USDT",
    chainId: 137,
    tokenAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6,
  },
  {
    tickerName: "USDCUSD",
    wsName: "USDC/USD",
    displayName: "Circle USD",
    symbol: "USDC",
    chainId: 137,
    tokenAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    decimals: 6,
  },
  {
    tickerName: "UNIUSD",
    wsName: "UNI/USD",
    displayName: "Uniswap",
    symbol: "UNI",
    chainId: 137,
    tokenAddress: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    decimals: 18,
  },
  {
    tickerName: "LINKUSD",
    wsName: "LINK/USD",
    displayName: "Chainlink",
    symbol: "LINK",
    chainId: 137,
    tokenAddress: "0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
    decimals: 18,
  },
  {
    tickerName: "GRTUSD",
    wsName: "GRT/USD",
    displayName: "Graph",
    symbol: "GRT",
    chainId: 137,
    tokenAddress: "0x5fe2b58c013d7601147dcdd68c143a77499f5531",
    decimals: 18,
  },
  {
    tickerName: "APEUSD",
    wsName: "APE/USD",
    displayName: "ApeCoin",
    symbol: "APE",
    chainId: 137,
    tokenAddress: "0xb7b31a6bc18e48888545ce79e83e06003be70930",
    decimals: 18,
  },
  {
    tickerName: "SUSHIUSD",
    wsName: "SUSHI/USD",
    displayName: "Sushi",
    symbol: "SUSHI",
    chainId: 137,
    tokenAddress: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
    decimals: 18,
  },
];

export const TICKER_REVALIDATION_TIME_IN_SECONDS = 60;
export const OHLC_REVALIDATION_TIME_IN_SECONDS = 15 * 60; // 15 minutes

export const KRAKEN_PUBLIC_URL = "https://api.kraken.com/0/public";
export const KRAKEN_PUBLIC_WS_URL = "wss://ws.kraken.com/v2";
export const BUNGEE_PUBLIC_URL = "https://api.socket.tech/v2";
export const POLYGON_RPC_URL = "https://polygon-rpc.com";

export const TIME_INTERVALS = {
  ONE_MINUTE: 1,
  FIFTEEN_MINUTES: 15,
  ONE_HOUR: 60,
  FOUR_HOURS: 240,
  ONE_DAY: 1440,
  ONE_WEEK: 10080,
};

export const ASPECT_RATIO = 16 / 9;

export const MATIC_ADDRESS_FOR_BUNGEE =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
export const MATIC_ADDRESS_FOR_POLYGON =
  "0x0000000000000000000000000000000000001010";

export const getChartColors = (theme: string) => {
  const chartColors = {
    layout: {
      textColor: "#7c8298",
      background: {
        type: ColorType.Solid,
        color: theme === "light" ? "#ffffff" : "#0d1520",
      },
    },
    grid: {
      vertLines: {
        color: theme === "light" ? "#efefef" : "#333444",
      },
      horzLines: {
        color: theme === "light" ? "#efefef" : "#333444",
      },
    },
  };
  return chartColors;
};
