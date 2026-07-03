"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturedCategories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Browse by Category</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">Featured Categories</h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-castleton dark:text-champagne hover:text-castleton-light transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={`/shop/${category.name.toLowerCase().replace(/\s+&\s+/g, '-')}`} className="group block">
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-champagne/30 hover:-translate-y-1">
                  <div className="aspect-square relative overflow-hidden">
                    <Image src={category.image} alt={category.name} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold text-sm">{category.name}</h3>
                      <p className="text-[11px] text-white/70">{category.productCount} products</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
