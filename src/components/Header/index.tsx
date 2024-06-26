import Link from "next/link";
import { ConnectButton } from "./ConnectButton";
import ThemeSwitch from "../ThemeSwitch";

export default function Header() {
  return (
    <header className="bg-slate-50 dark:bg-neutral-950 h-16 flex place-items-center justify-center px-6">
      <div className="flex place-items-center max-w-screen-lg w-full justify-between px-2">
        <h1 className="text-2xl font-semibold">
          <Link href="/">Token Swaps</Link>
        </h1>
        <div className="flex space-x-2 place-items-center">
          <ConnectButton />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
