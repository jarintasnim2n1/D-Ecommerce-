"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const filters = ["All", "Electronics", "Fashion", "Accessories", "New Arrivals", "Best Sellers"];

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = products.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "New Arrivals") return p.badge === "New";
    if (activeFilter === "Best Sellers") return p.badge === "Best Seller";
    return p.category === activeFilter;
  });

  return (
    <section className="py-16 lg:py-24 bg-muted/30 dark:bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Curated for You</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">Featured Products</h2>
          </div>
          <Link href="/shop" className="flex items-center gap-1.5 text-sm font-semibold text-castleton dark:text-champagne hover:text-castleton-light transition-colors">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 15 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2"
        >
          {filters.map((filter) => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter ? "bg-castleton text-white shadow-md" : "bg-card text-foreground/70 hover:bg-castleton/5 hover:text-castleton border border-border/50"
            }`}>{filter}</button>
          ))}
          <button className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-card text-foreground/70 hover:bg-castleton/5 hover:text-castleton border border-border/50 transition-all">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ y: 15 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link href="/shop" className="inline-flex items-center gap-2 border-2 border-castleton text-castleton dark:border-champagne dark:text-champagne px-8 py-3 rounded-xl font-bold text-sm hover:bg-castleton hover:text-white dark:hover:bg-champagne dark:hover:text-castleton-dark transition-all">
            Load More Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
