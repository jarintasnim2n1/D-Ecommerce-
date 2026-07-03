"use client";

import { useState } from "react";
import { SlidersHorizontal, Grid, List, Star, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { categories, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];
const priceRanges = ["Under $50", "$50 - $100", "$100 - $200", "$200 - $500", "Over $500"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Featured");

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">Shop All</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-bold text-foreground text-sm mb-3">Categories</h3>
                <div className="space-y-1">
                  {["All", ...categories.map((c) => c.name)].map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat ? "bg-castleton text-white font-medium" : "text-foreground/70 hover:bg-muted"}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm mb-3">Price Range</h3>
                <div className="space-y-1">
                  {priceRanges.map((range) => (
                    <button key={range} onClick={() => setSelectedPrice(selectedPrice === range ? null : range)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedPrice === range ? "bg-champagne text-castleton-dark font-medium" : "text-foreground/70 hover:bg-muted"}`}>{range}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm mb-3">Rating</h3>
                <div className="space-y-1">
                  {[4, 3, 2].map((rating) => (
                    <button key={rating} className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground/70 hover:bg-muted flex items-center gap-2">
                      <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-3 h-3 ${i < rating ? "text-champagne fill-champagne" : "text-border"}`} />))}</div>
                      <span>&amp; up</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{selectedCategory === "All" ? "All Products" : selectedCategory}</h1>
                <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products found</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden sm:block">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-card border border-border/50 rounded-xl px-4 py-2.5 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50 cursor-pointer">
                    {sortOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <button className="p-2.5 bg-card border border-border/50 rounded-xl text-foreground/60 hover:text-foreground hover:bg-muted transition-all"><Grid className="w-4 h-4" /></button>
                <button className="p-2.5 bg-card border border-border/50 rounded-xl text-foreground/60 hover:text-foreground hover:bg-muted transition-all"><List className="w-4 h-4" /></button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border/50 rounded-xl text-sm text-foreground/70 hover:bg-muted transition-all lg:hidden"><SlidersHorizontal className="w-4 h-4" /> Filter</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {filteredProducts.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
