import { type Product } from "./products.types";

export type ProductSortOption = "default" | "price-asc" | "price-desc";

export function filterAndSortProducts(
  products: Product[],
  query?: string,
  category?: string,
  sort: ProductSortOption = "default"
): Product[] {
  let result = [...products];

  // 1. Filter by category
  if (category && category !== "All" && category.trim() !== "") {
    const targetCategory = category.toLowerCase().trim();
    result = result.filter(
      (p) => p.category.toLowerCase().trim() === targetCategory
    );
  }

  // 2. Filter by search query
  if (query && query.trim() !== "") {
    const cleanQuery = query.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(cleanQuery) ||
        p.description.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery)
    );
  }

  // 3. Sort
  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

export function extractCategories(products: Product[]): string[] {
  const set = new Set<string>();
  for (const product of products) {
    if (product.category) {
      set.add(product.category);
    }
  }
  return ["All", ...Array.from(set)];
}
