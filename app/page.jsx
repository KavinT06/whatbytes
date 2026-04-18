"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import SidebarFilters from "@/components/SidebarFilters";
import ProductGrid from "@/components/ProductGrid";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import AppFooter from "@/components/AppFooter";
import { products } from "@/data/products";
import { getFilteredProducts, parsePriceRange } from "@/lib/products";

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialPriceRange = parsePriceRange(searchParams.get("price"));

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [priceRange, setPriceRange] = useState(initialPriceRange);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }
    if (category !== "all") {
      params.set("category", category);
    }
    if (brand !== "all") {
      params.set("brand", brand);
    }

    params.set("price", `${priceRange.min}-${priceRange.max}`);

    const query = params.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }, [router, search, category, brand, priceRange]);

  const filteredProducts = useMemo(() => {
    return getFilteredProducts(products, {
      search,
      category,
      brand,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  }, [search, category, brand, priceRange]);

  const featured = filteredProducts.find((item) => item.id === "8") || filteredProducts[0];
  const productCards = filteredProducts.filter((item) => item.id !== featured?.id);

  return (
    <div className="min-h-screen bg-slate-100">
      <AppHeader search={search} onSearchChange={setSearch} />

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[300px_1fr]">
        <SidebarFilters
          category={category}
          brand={brand}
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
          onCategoryChange={setCategory}
          onBrandChange={setBrand}
          onMaxPriceChange={(nextMax) =>
            setPriceRange((prev) => ({ ...prev, max: nextMax }))
          }
        />

        <section className="space-y-5">
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900">No products found</h2>
              <p className="mt-2 text-slate-600">
                Try changing the category, brand, price range, or search term.
              </p>
            </div>
          ) : (
            <>
              <ProductGrid products={productCards} />
              <FeaturedProductCard product={featured} />
            </>
          )}
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 p-6 text-center text-slate-600">
          Loading products...
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
