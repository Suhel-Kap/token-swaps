import "server-only";
import { SessionOptions } from "iron-session";

export const IRON_OPTIONS: SessionOptions = {
  cookieName: "token_swaps_session_cookie",
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: true, // Change this to false when locally testing on Safari
    sameSite: "none",
  },
};
