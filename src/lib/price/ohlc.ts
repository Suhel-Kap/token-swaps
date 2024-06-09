import {
  KRAKEN_PUBLIC_URL,
  OHLC_REVALIDATION_TIME_IN_SECONDS,
} from "../constants";
import { OHLCApiResponse } from "../types";

export const getOhlcData = async (
  pair: string,
  interval = 15,
  since?: number,
): Promise<OHLCApiResponse | null> => {
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
    // console.log(data);
    return data as OHLCApiResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
