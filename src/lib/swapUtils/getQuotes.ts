import { Route, TOKEN } from "../types";

export const getQuotes = async (
  chainId: number,
  userAddress: string,
  tokenIn: TOKEN,
  tokenOut: TOKEN,
  amountIn: string,
): Promise<Route | null> => {
  try {
    const response = await fetch(
      `/api/quote?fromChainId=${chainId}&fromTokenAddress=${tokenIn.tokenAddress}&toChainId=${chainId}&toTokenAddress=${tokenOut.tokenAddress}&userAddress=${userAddress}&fromAmount=${amountIn}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 10,
        },
      },
    );
    const data = await response.json();

    return data.result.routes[0] as Route;
  } catch (error) {
    console.error(error);
    return null;
  }
};
