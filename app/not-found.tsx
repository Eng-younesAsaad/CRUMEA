import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound(): React.ReactElement {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase mb-2">
        404 ERROR
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        Crumb Not Found
      </h1>
      <p className="max-w-md text-sm text-muted-foreground leading-relaxed mb-8">
        The pastry you are searching for might have already been enjoyed or moved
        to another tray in our atelier.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild variant="primary">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Browse Bakery</Link>
        </Button>
      </div>
    </div>
  );
}

