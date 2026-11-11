import React from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { getProductById, getProducts } from "@/features/products/products.api";
import { ProductDetailView } from "@/features/products/components/ProductDetailView";
import { type Product } from "@/features/products/products.types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Treat Not Found | CRUMÉA Luxury Bakery",
    };
  }

  return {
    title: `${product.name} | CRUMÉA Luxury Bakery`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  let allProducts: Product[] = [];
  try {
    allProducts = await getProducts("normal");
  } catch {
    allProducts = [];
  }

  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fallbackRelated =
    related.length > 0
      ? related
      : allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <ProductDetailView product={product} relatedProducts={fallbackRelated} />
  );
}
