import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryItem {
  title: string;
  categoryParam: string;
  image: string;
  alt: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    title: "Premium Cookies",
    categoryParam: "Cookies",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80",
    alt: "Golden chocolate chip cookies",
  },
  {
    title: "Artisan Biscuits",
    categoryParam: "Biscuits",
    image:
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=300&q=80",
    alt: "Almond butter biscuits",
  },
  {
    title: "Rich Brownies",
    categoryParam: "Brownies",
    image:
      "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=300&q=80",
    alt: "Fudge walnut brownie slice",
  },
  {
    title: "French Pastries",
    categoryParam: "Pastries",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038024a?auto=format&fit=crop&w=300&q=80",
    alt: "Fresh golden croissant",
  },
  {
    title: "Celebration Cakes",
    categoryParam: "Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80",
    alt: "Belgian chocolate layer cake",
  },
  {
    title: "Luxury Gift Boxes",
    categoryParam: "Gift Boxes",
    image:
      "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=300&q=80",
    alt: "Embossed bakery gift box",
  },
];

export function CategoryStrip(): React.ReactElement {
  return (
    <section
      className="py-14 sm:py-16 bg-oat/70 dark:bg-espresso border-b border-border/80"
      aria-label="Artisan Bakery Categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            EXPLORE THE ATELIER
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Curated Artisan Trays
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.categoryParam}
              href={`/shop?category=${encodeURIComponent(cat.categoryParam)}`}
              className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-card/70 transition-all duration-300"
              aria-label={`Explore ${cat.title}`}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-border/80 group-hover:border-gold transition-colors duration-300 shadow-warm">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="112px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="font-serif text-sm sm:text-base font-bold text-foreground mt-3 group-hover:text-gold transition-colors">
                {cat.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-gold mt-1 group-hover:translate-x-0.5 transition-transform">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
