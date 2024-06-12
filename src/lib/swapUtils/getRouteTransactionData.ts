import { Route, RouteTransactionResult } from "../types";

export const getRouteTransactionData = async (route: Route) => {
  try {
    const response = await fetch(`/api/routeTransactionData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ route }),
    });

    const data = await response.json();
    return data.result as RouteTransactionResult;
  } catch (error) {
    console.error(error);
    throw new Error("Erorr fetching route transaction data");
  }
};
