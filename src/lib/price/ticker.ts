import "server-only";
import {
  KRAKEN_PUBLIC_URL,
  TICKER_REVALIDATION_TIME_IN_SECONDS,
  TOKEN_PAIRS,
} from "../constants";
import { TickerApiResponse, TickerData } from "../types";

export const getTicker = async (pair: string): Promise<TickerApiResponse> => {
  try {
    const response = await fetch(`${KRAKEN_PUBLIC_URL}/Ticker?pair=${pair}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: TICKER_REVALIDATION_TIME_IN_SECONDS,
      },
    });
    const data = await response.json();
    return data as TickerApiResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch ticker data");
  }
};

const prepareData = (data: TickerApiResponse) => {
  const result: { [key: string]: TickerData } = {};
  Object.keys(data.result).forEach((key) => {
    const price = data.result[key].c[0];
    const openingPrice = data.result[key].o;
    const highPrice = data.result[key].h[0];
    const lowPrice = data.result[key].l[0];
    const percentage =
      ((parseFloat(price) - parseFloat(openingPrice)) /
        parseFloat(openingPrice)) *
      100;
    result[key] = {
      pair: key,
      price,
      openingPrice,
      highPrice,
      lowPrice,
      percentage,
    };
  });
  return result;
};
export const getAllTickers = async () => {
  const pairs = TOKEN_PAIRS.map((pair) => pair.tickerName).join(",");
  const res = await getTicker(pairs);
  return prepareData(res);
};
