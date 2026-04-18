"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import RatingStars from "@/components/RatingStars";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [search, setSearch] = useState("");
    const [quantity, setQuantity] = useState(1);

    const product = useMemo(() => products.find((item) => item.id === id), [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-100">
                <AppHeader search={search} onSearchChange={setSearch} />
                <main className="mx-auto max-w-5xl px-4 py-12">
                    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                        <h1 className="text-4xl font-black text-slate-900">Product not found</h1>
                        <p className="mt-3 text-slate-600">The selected product does not exist.</p>
                        <Link
                            href="/"
                            className="mt-6 inline-flex rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white"
                        >
                            Back to products
                        </Link>
                    </div>
                </main>
                <AppFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <AppHeader search={search} onSearchChange={setSearch} />

            <main className="mx-auto max-w-6xl px-4 py-6">
                <Link
                    href="/"
                    className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
                >
                    <ArrowLeft className="size-4" />
                    Back to products
                </Link>

                <section className="grid gap-6 rounded-xl bg-white p-5 shadow-sm lg:grid-cols-2">
                    <div className="rounded-lg bg-slate-50 p-4">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={1000}
                            height={1000}
                            className="h-full max-h-120 w-full rounded-lg object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-black leading-tight text-slate-900">{product.title}</h1>
                        <p className="text-5xl font-black text-slate-900">${product.price}</p>
                        <RatingStars rating={product.rating} />
                        <p className="text-lg text-slate-600">{product.description}</p>

                        <div className="rounded-lg border border-slate-200 p-4">
                            <p className="text-sm font-medium text-slate-500">Category</p>
                            <p className="text-lg font-semibold capitalize text-slate-900">
                                {product.category}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-slate-700">Quantity</span>
                            <div className="inline-flex items-center rounded-lg border border-slate-300">
                                <button
                                    type="button"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    className="px-3 py-2"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="size-4" />
                                </button>
                                <span className="min-w-10 text-center font-semibold">{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                    className="px-3 py-2"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => addToCart(product, quantity)}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-600"
                        >
                            <ShoppingCart className="size-5" />
                            Add to Cart
                        </button>

                        <section className="rounded-lg bg-slate-50 p-4">
                            <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>
                            <p className="mt-2 text-slate-600">
                                Great product quality and value. Fast delivery and premium finish.
                            </p>
                        </section>
                    </div>
                </section>
            </main>

            <AppFooter />
        </div>
    );
}
