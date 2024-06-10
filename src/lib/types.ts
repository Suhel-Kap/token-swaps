import { Time } from "lightweight-charts";
import { Dispatch, SetStateAction } from "react";

export type TOKEN = {
  tickerName: string;
  displayName: string;
  symbol: string;
  wsname: string;
  chainId: number;
  tokenAddress: string;
  decimals: number;
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

export type Asset = {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  logoURI: string;
  chainAgnosticId: string | null;
};

export type GasFees = {
  gasAmount: string;
  gasLimit: number;
  asset: Asset;
  feesInUsd: number;
};

export type ApprovalData = {
  minimumApprovalAmount: string;
  approvalTokenAddress: string;
  allowanceTarget: string;
  owner: string;
};

export type UserTx = {
  userTxType: string;
  txType: string;
  swapSlippage: number;
  chainId: number;
  protocol: {
    name: string;
    displayName: string;
    icon: string;
  };
  fromAsset: Asset;
  approvalData: ApprovalData;
  fromAmount: string;
  toAsset: Asset;
  toAmount: string;
  minAmountOut: string;
  gasFees: GasFees;
  sender: string;
  recipient: string;
  userTxIndex: number;
};

export type IntegratorFee = {
  amount: string;
  asset: Asset;
};

export type Route = {
  routeId: string;
  isOnlySwapRoute: boolean;
  fromAmount: string;
  toAmount: string;
  sender: string;
  recipient: string;
  totalUserTx: number;
  totalGasFeesInUsd: number;
  userTxs: UserTx[];
  usedDexName: string;
  integratorFee: IntegratorFee;
  outputValueInUsd: number;
  receivedValueInUsd: number;
  inputValueInUsd: number;
};

export type RouteTransactionResult = {
  userTxType: string;
  txType: string;
  txData: string;
  txTarget: string;
  chainId: number;
  userTxIndex: number;
  value: string;
  approvalData: {
    minimumApprovalAmount: string;
    approvalTokenAddress: string;
    allowanceTarget: string;
    owner: string;
  };
};

export type CheckAllowanceResult = {
  value: string;
  tokenAddress: string;
};

export type TransactionData = {
  to: string;
  data: string;
  value: string;
};

export type SwapTokenProps = {
  initialTokenIn: TOKEN;
};

export type TokenInputProps = {
  label: string;
  token: TOKEN | null;
  setToken: Dispatch<SetStateAction<TOKEN | null>>;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  excludeToken?: TOKEN | null;
  disabled?: boolean;
};
