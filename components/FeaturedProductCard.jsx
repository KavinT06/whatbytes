"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import RatingStars from "@/components/RatingStars";

export default function FeaturedProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  return (
    <article className="rounded-xl bg-white p-4 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Link href={`/product/${product.id}`} className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={700}
            height={700}
            className="h-64 w-full rounded-lg object-cover"
          />
        </Link>

        <div className="space-y-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-4xl font-bold leading-tight text-slate-900">
              {product.title}
            </h3>
          </Link>
          <p className="text-5xl font-black text-slate-900">${product.price}</p>
          <RatingStars rating={product.rating} />
          <p className="text-slate-600">{product.description}</p>
          <p className="text-sm text-slate-500">
            Category <span className="font-semibold text-slate-700">{product.category}</span>
          </p>
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-xl font-semibold text-white transition hover:bg-blue-600"
          >
            <ShoppingCart className="size-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
