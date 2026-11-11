import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export interface ShopCatalogErrorStateProps {
  onRetry: () => void;
}

export function ShopCatalogErrorState({
  onRetry,
}: ShopCatalogErrorStateProps): React.ReactElement {
  const router = useRouter();

  return (
    <div className="py-12 flex justify-center">
      <Card className="max-w-md w-full border-destructive/40 text-center p-6 space-y-4 shadow-warm">
        <CardHeader className="p-0 space-y-2">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl">
            Catalog Temporarily Unavailable
          </CardTitle>
          <CardDescription>
            We encountered a simulated 500 API diagnostic error while fetching
            fresh treats.
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-0 justify-center gap-3 pt-2">
          <Button
            variant="default"
            size="sm"
            onClick={onRetry}
            className="flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
