import {
  KRAKEN_PUBLIC_URL,
  OHLC_REVALIDATION_TIME_IN_SECONDS,
} from "../constants";
import { OHLCApiResponse } from "../types";

export const getOhlcData = async (
  pair: string,
  interval = 15,
  since?: number,
): Promise<OHLCApiResponse> => {
  try {
    const response = await fetch(
      `${KRAKEN_PUBLIC_URL}/OHLC?pair=${pair}&interval=${interval}${since ? `&since=${since}` : ""}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: OHLC_REVALIDATION_TIME_IN_SECONDS,
        },
      },
    );
    const data = await response.json();
    return data as OHLCApiResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch ohlc data");
  }
};
