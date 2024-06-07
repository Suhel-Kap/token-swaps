import "server-only";
import { configureServerSideSIWE } from "connectkit-next-siwe";
import { getDefaultConfig } from "connectkit";
import { base, polygon } from "wagmi/chains";
import { http } from "wagmi";

const ckConfig = getDefaultConfig({
  chains: [polygon, base],
  transports: {
    [polygon.id]: http("https://137.rpc.thirdweb.com"),
    [base.id]: http("https://8453.rpc.thirdweb.com"),
  },
  walletConnectProjectId: "6ac48a777896a48d691d8409264e98e0",
  appName: "Token Swaps",
});

export const siweServer = configureServerSideSIWE({
  config: {
    chains: ckConfig.chains,
    transports: ckConfig.transports,
  },
  session: {
    cookieName: "connectkit-next-siwe",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
