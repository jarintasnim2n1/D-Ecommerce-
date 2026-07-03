"use client";

import Image from "next/image";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/lib/data";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { useToast } from "@/components/Toast";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const isWishlisted = useAppSelector((state) => state.wishlist.items.some((item) => item.id === product.id));
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-champagne/30">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square bg-muted overflow-hidden">
            <Image src={product.image} alt={product.name} width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {product.badge && (
              <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold ${
                product.badge.includes("OFF") || product.badge.includes("Deal") ? "bg-coral text-white" : product.badge === "New" ? "bg-castleton text-white" : "bg-champagne text-castleton-dark"
              }`}>{product.badge}</span>
            )}
            {discount > 0 && !product.badge && (
              <span className="absolute top-3 left-3 bg-coral text-white px-3 py-1 rounded-lg text-xs font-bold">-{discount}%</span>
            )}
          </div>
        </Link>

        {/* Action buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button onClick={(e) => { e.preventDefault(); dispatch(toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })); toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist!", "success", <Heart className="w-4 h-4" />); }} className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${isWishlisted ? "bg-coral text-white" : "bg-card text-foreground/60 hover:text-coral"}`}>
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
          <Link href={`/product/${product.id}`} className="w-9 h-9 rounded-full bg-card text-foreground/60 hover:text-castleton flex items-center justify-center shadow-md transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-champagne-dark dark:text-champagne uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-champagne fill-champagne" />
              <span className="text-xs font-medium text-foreground/70">{product.rating}</span>
              <span className="text-[10px] text-muted-foreground">({product.reviews.toLocaleString()})</span>
            </div>
          </div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-foreground text-sm mb-3 line-clamp-2 hover:text-champagne transition-colors">{product.name}</h3>
          </Link>
          {product.colors && (
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.map((color, i) => (
                <span key={i} className="w-4 h-4 rounded-full border-2 border-card shadow-sm" style={{ backgroundColor: color }} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-castleton dark:text-champagne">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
            </div>
            <button onClick={(e) => { e.preventDefault(); dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })); toast(`${product.name} added to cart!`, "success", <ShoppingCart className="w-4 h-4" />); }} className="w-9 h-9 bg-castleton hover:bg-castleton-light text-white rounded-lg flex items-center justify-center transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
