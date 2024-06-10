import { TOKEN } from "../types";

export const getBalance = async (
  chainId: number,
  address: string,
  token: TOKEN,
): Promise<string> => {
  try {
    const response = await fetch(
      `/api/checkBalance?chainId=${chainId}&owner=${address}&tokenAddress=${token.tokenAddress}`,
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

    return data.balance;
  } catch (error) {
    console.error(error);
    return "0";
  }
};
