"use client";

import { categories, brands } from "@/data/products";

export default function SidebarFilters({
  category,
  brand,
  minPrice,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onMaxPriceChange,
}) {
  return (
    <aside className="space-y-6">
      <div className="rounded-xl bg-gradient-to-b from-sky-700 to-blue-900 p-5 text-white shadow-sm">
        <h2 className="mb-4 text-4xl font-black">Filters</h2>

        <section className="mb-6">
          <h3 className="mb-2 text-2xl font-semibold">Category</h3>
          <div className="space-y-2 text-lg">
            {categories.map((item) => (
              <label key={item.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  className="size-4"
                  name="category"
                  checked={category === item.value}
                  onChange={() => onCategoryChange(item.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-2xl font-semibold">Price</h3>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            className="w-full accent-white"
          />
          <div className="mt-1 flex justify-between text-sm">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </section>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-2xl font-semibold text-slate-900">Brand</h3>
        <div className="space-y-2 text-lg text-slate-700">
          {brands.map((item) => (
            <label key={item.value} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                className="size-4"
                name="brand"
                checked={brand === item.value}
                onChange={() => onBrandChange(item.value)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
