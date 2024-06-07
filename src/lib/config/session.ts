import "server-only";
import { SessionOptions } from "iron-session";

console.log("This file is only for type checking.", process.env.SESSION_SECRET);

export const IRON_OPTIONS: SessionOptions = {
  cookieName: "token_swaps_session_cookie",
  password: process.env.SESSION_SECRET!,
  ttl: 60 * 60 * 24, // TODO: set via env
  cookieOptions: {
    secure: true, // Change this to false when locally testing on Safari
    sameSite: "none",
  },
};
