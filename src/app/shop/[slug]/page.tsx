"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default function ShopCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find((c) => c.name.toLowerCase().replace(/\s+&\s+/g, "-") === slug);
  const categoryName = category?.name || slug;
  const filtered = products.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase() || p.category.toLowerCase().includes(categoryName.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-champagne transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{categoryName}</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{categoryName}</h1>
          <p className="text-muted-foreground mt-2">{filtered.length} products in this category</p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No products found in this category.</p>
            <Link href="/shop" className="text-champagne hover:underline font-semibold">Browse All Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
