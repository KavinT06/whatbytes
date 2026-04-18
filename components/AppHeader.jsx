"use client";

import Link from "next/link";
import { Search, ShoppingCart, UserCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AppHeader({ search, onSearchChange }) {
  const { itemCount } = useCart();

  return (
    <header className="rounded-b-xl bg-gradient-to-r from-sky-700 to-blue-950 px-4 py-4 shadow-lg sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-3xl font-black tracking-tight text-white">
          Logo
        </Link>

        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-200" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search for products..."
            className="w-full rounded-lg border border-sky-400/70 bg-sky-700/30 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-sky-200 outline-none ring-0 transition focus:border-white"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <ShoppingCart className="size-4" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-full bg-white/15 p-1.5 text-white transition hover:bg-white/30"
            aria-label="Profile"
          >
            <UserCircle2 className="size-8" />
          </button>
        </div>
      </div>
    </header>
  );
}
