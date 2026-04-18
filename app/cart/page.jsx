"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const [search, setSearch] = useState("");
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-100">
      <AppHeader search={search} onSearchChange={setSearch} />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-5xl font-black text-slate-900">Cart</h1>

        {items.length === 0 ? (
          <div className="mt-6 rounded-xl bg-white p-10 text-center shadow-sm">
            <ShoppingBag className="mx-auto mb-3 size-12 text-slate-400" />
            <h2 className="text-3xl font-bold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-slate-600">Add products from the listing page to get started.</p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={240}
                    height={240}
                    className="h-28 w-full rounded-lg object-cover"
                  />

                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                        <p className="text-slate-600">${item.price} each</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600"
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-slate-300">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="min-w-10 text-center font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <p className="text-xl font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-3xl font-black text-slate-900">Summary</h2>
              <div className="mt-4 space-y-2 text-slate-700">
                <p className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{items.length}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </p>
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4 text-2xl font-black text-slate-900">
                Total ${subtotal.toFixed(2)}
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="mt-4 w-full rounded-lg bg-blue-700 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-600"
              >
                Checkout
              </button>
            </aside>
          </section>
        )}
      </main>

      <AppFooter />
    </div>
  );
}
