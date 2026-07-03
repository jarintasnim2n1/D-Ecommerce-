"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Truck, RotateCcw, Zap } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: Truck, label: "Free Shipping" },
  { icon: Shield, label: "Secure Payment" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: Zap, label: "Web3 Powered" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-castleton via-castleton-dark to-castleton-light">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-champagne/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[520px] py-16 lg:py-20">
          <motion.div
            initial={{ x: -30 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
              <span className="text-sm font-medium text-champagne-light">New Collection 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Shop the <span className="text-champagne">Future</span> of{" "}
              <span className="text-coral-light">Commerce</span>
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
              Discover premium products with blockchain-secured transactions. Shop smarter, pay with crypto, and enjoy seamless decentralized e-commerce.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/shop" className="group inline-flex items-center gap-2 bg-champagne text-castleton-dark px-8 py-4 rounded-xl font-bold text-sm hover:bg-champagne-light transition-all hover:shadow-lg hover:shadow-champagne/20">
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/deals" className="inline-flex items-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-white/10 transition-all">
                View Deals
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-white/60">
                  <badge.icon className="w-4 h-4 text-champagne" />
                  <span className="text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative">
              <div className="w-80 h-96 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 animate-float">
                <div className="w-full h-44 rounded-2xl mb-4 overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" alt="Premium Headphones" width={400} height={300} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Premium Collection</h3>
                <p className="text-white/60 text-sm mb-4">Discover our curated selection of top-quality products</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-champagne font-bold text-2xl">$199</span>
                    <span className="text-white/40 text-sm line-through ml-2">$299</span>
                  </div>
                  <Link href="/shop" className="bg-coral hover:bg-coral-dark text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                    Add to Cart
                  </Link>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-coral text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">50% OFF</div>
              <div className="absolute -bottom-4 -left-4 bg-card text-foreground px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-castleton rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">W3</span>
                </div>
                <div>
                  <div className="text-xs font-bold">Web3 Verified</div>
                  <div className="text-[10px] text-muted-foreground">Blockchain secured</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
