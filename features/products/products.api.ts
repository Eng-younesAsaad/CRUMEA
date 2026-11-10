import {
  type ApiProduct,
  type ApiProductsResponse,
  type Product,
  isApiProduct,
  isApiProductsResponse,
} from "./products.types";
import { fetchJson, type ApiDiagnosticMode } from "@/lib/api/client";

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "leather tote bag":
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
  "canvas backpack":
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  "mini crossbody bag":
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80",
  "white sneakers":
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
  "running shoes":
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  "suede loafers":
    "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
  "wool scarf":
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80",
  "silver watch":
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
  "travel duffel bag":
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  "rain boots":
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
  "leather belt":
    "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80",
  cookies:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  biscuits:
    "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=600&q=80",
  brownies:
    "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=600&q=80",
  pastries:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  cakes:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
  "gift boxes":
    "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=600&q=80",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80";

function resolveProductImage(title: string, category: string): string {
  const normalizedTitle = title.toLowerCase().trim();
  const directMatch = PRODUCT_IMAGE_MAP[normalizedTitle];
  if (directMatch) {
    return directMatch;
  }

  const normalizedCategory = category.toLowerCase().trim();
  const categoryMatch = PRODUCT_IMAGE_MAP[normalizedCategory];
  if (categoryMatch) {
    return categoryMatch;
  }

  return FALLBACK_IMAGE;
}

function generateProductDescription(name: string, category: string): string {
  return `Artisanal ${name.toLowerCase()} from our ${category.toLowerCase()} tray, handcrafted in our Parisian atelier with churned Brittany butter, stone-ground Normandy flour, and pure Bourbon vanilla. Freshly baked every morning for unmatched fragrance, texture, and taste.`;
}

export function normalizeApiProduct(apiItem: ApiProduct): Product {
  const image = resolveProductImage(apiItem.title, apiItem.category_name);
  const description = generateProductDescription(apiItem.title, apiItem.category_name);

  return {
    id: apiItem.id,
    name: apiItem.title,
    category: apiItem.category_name,
    price: Math.round((apiItem.price_cents / 100) * 100) / 100,
    image,
    description,
    inStock: apiItem.in_stock,
  };
}

function isApiProductsResponseOrList(
  value: unknown
): value is ApiProductsResponse | ApiProduct[] {
  return (
    isApiProductsResponse(value) ||
    (Array.isArray(value) && value.every(isApiProduct))
  );
}

export async function getProducts(
  mode: ApiDiagnosticMode = "normal"
): Promise<Product[]> {
  try {
    const rawData = await fetchJson(
      "/api/products",
      isApiProductsResponseOrList,
      { modeOverride: mode }
    );

    if (isApiProductsResponse(rawData)) {
      return rawData.items.map(normalizeApiProduct);
    }

    return rawData.map(normalizeApiProduct);
  } catch (error) {
    if (mode === "fail") {
      throw error;
    }
    console.error("Failed to fetch products from API:", error);
    throw error;
  }
}

export async function getProductById(
  id: number | string,
  mode: ApiDiagnosticMode = "normal"
): Promise<Product | null> {
  const numericId = typeof id === "number" ? id : parseInt(id, 10);
  if (Number.isNaN(numericId)) {
    return null;
  }

  try {
    const rawData = await fetchJson(
      `/api/products/${numericId}`,
      isApiProduct,
      { modeOverride: mode }
    );

    return normalizeApiProduct(rawData);
  } catch (error) {
    if (mode === "fail") {
      throw error;
    }
    // Fallback: look up in getProducts list
    try {
      const all = await getProducts(mode);
      const found = all.find((p) => p.id === numericId);
      return found ?? null;
    } catch {
      console.error(`Failed to fetch product ${numericId}:`, error);
      return null;
    }
  }
}

