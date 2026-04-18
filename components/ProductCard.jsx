"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import RatingStars from "@/components/RatingStars";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/product/${product.id}`} className="block">
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={450}
          className="h-40 w-full rounded-lg object-cover"
        />
      </Link>

      <div className="mt-3 space-y-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">
            {product.title}
          </h3>
        </Link>
        <p className="text-2xl font-bold text-slate-900">${product.price}</p>
        <RatingStars rating={product.rating} />
      </div>

      <button
        type="button"
        onClick={() => addToCart(product, 1)}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2 font-semibold text-white transition hover:bg-blue-600"
      >
        <ShoppingCart className="size-4" />
        Add to Cart
      </button>
    </article>
  );
}
