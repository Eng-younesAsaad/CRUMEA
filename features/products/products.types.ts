export interface ApiProduct {
  id: number;
  title: string;
  category_name: string;
  price_cents: number;
  in_stock: boolean;
}

export interface ApiProductsResponse {
  items: ApiProduct[];
  total: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

export function isApiProduct(value: unknown): value is ApiProduct {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "id" in value &&
    typeof value.id === "number" &&
    "title" in value &&
    typeof value.title === "string" &&
    "category_name" in value &&
    typeof value.category_name === "string" &&
    "price_cents" in value &&
    typeof value.price_cents === "number" &&
    "in_stock" in value &&
    typeof value.in_stock === "boolean"
  );
}

export function isApiProductsResponse(value: unknown): value is ApiProductsResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "items" in value &&
    Array.isArray(value.items) &&
    "total" in value &&
    typeof value.total === "number" &&
    value.items.every(isApiProduct)
  );
}

export function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return (
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "category" in value &&
    typeof value.category === "string" &&
    "price" in value &&
    typeof value.price === "number" &&
    "image" in value &&
    typeof value.image === "string" &&
    "description" in value &&
    typeof value.description === "string" &&
    "inStock" in value &&
    typeof value.inStock === "boolean"
  );
}

export function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}

