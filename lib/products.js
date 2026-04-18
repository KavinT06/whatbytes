export function getProductById(items, id) {
  return items.find((item) => item.id === id);
}

export function parsePriceRange(priceParam) {
  if (!priceParam) {
    return { min: 0, max: 1000 };
  }

  const [minRaw, maxRaw] = priceParam.split("-");
  const min = Number(minRaw);
  const max = Number(maxRaw);

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return { min: 0, max: 1000 };
  }

  return { min, max };
}

export function getFilteredProducts(items, filters) {
  const { search, category, brand, minPrice, maxPrice } = filters;

  return items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "all" || item.category === category;
    const matchesBrand = brand === "all" || item.brand === brand;
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });
}
