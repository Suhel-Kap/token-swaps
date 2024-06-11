import Link from "next/link";
import { MyConnectButton } from "./ConnectButton";
import ThemeSwitch from "../ThemeSwitch";

export default function Header() {
  return (
    <header className="bg-slate-50 dark:bg-neutral-950 h-16 flex place-items-center justify-center px-4">
      <div className="flex place-items-center max-w-screen-lg w-full justify-between">
        <h1 className="text-2xl font-semibold">
          <Link href="/">Token Swaps</Link>
        </h1>
        <div className="flex space-x-2 place-items-center">
          <MyConnectButton />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
