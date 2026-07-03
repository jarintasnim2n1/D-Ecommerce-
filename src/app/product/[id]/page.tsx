"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight, Star, Heart, ShoppingCart, Shield, Truck, RotateCcw, Share2, Minus, Plus, Check, Store, Copy, CheckCircle2 } from "lucide-react";
import { products, reviews } from "@/lib/data";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { useToast } from "@/components/Toast";
import { motion } from "framer-motion";

export default function ProductPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">("details");
  const [copied, setCopied] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const isWishlisted = useAppSelector((state) => state.wishlist.items.some((item) => item.id === product?.id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-champagne hover:underline font-semibold">Browse All Products</Link>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.product === product.name);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity }));
    toast(`${product.name} added to cart!`, "success", <ShoppingCart className="w-4 h-4" />);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.image }));
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist!", "success", <Heart className="w-4 h-4" />);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: product.description, url });
        toast("Shared successfully!", "success", <Share2 className="w-4 h-4" />);
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast("Link copied to clipboard!", "success", <Copy className="w-4 h-4" />);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-champagne transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop/${product.category.toLowerCase()}`} className="hover:text-champagne transition-colors">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>

        {/* Product Main */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ duration: 0.4 }}>
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden mb-4">
              <Image src={product.images[selectedImage]} alt={product.name} width={800} height={800} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === selectedImage ? "border-champagne" : "border-border/50 opacity-60 hover:opacity-100"}`}>
                  <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ x: 20 }} animate={{ x: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-champagne-dark dark:text-champagne uppercase tracking-wider">{product.category}</span>
              {product.badge && (
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${product.badge.includes("OFF") || product.badge.includes("Deal") ? "bg-coral text-white" : product.badge === "New" ? "bg-castleton text-white" : "bg-champagne text-castleton-dark"}`}>{product.badge}</span>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-champagne fill-champagne" : "text-border"}`} />)}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
              <span className="text-sm text-green-500 font-medium">{product.sold.toLocaleString()} sold</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-castleton dark:text-champagne">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="bg-coral/10 text-coral px-2.5 py-0.5 rounded-lg text-sm font-bold">-{discount}%</span>
                </>
              )}
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed mb-6">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-2">Color: <span className="text-muted-foreground">{product.colors[selectedColor]}</span></p>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, i) => (
                    <button key={i} onClick={() => setSelectedColor(i)} className={`w-10 h-10 rounded-full border-2 transition-all ${i === selectedColor ? "border-champagne scale-110 ring-2 ring-champagne/30" : "border-border/50 hover:scale-105"}`} style={{ backgroundColor: color }} title={color} />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border/50 rounded-xl">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 hover:bg-muted rounded-l-xl transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center text-sm font-bold text-foreground">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2.5 hover:bg-muted rounded-r-xl transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button onClick={handleAddToCart} className="flex-1 bg-castleton hover:bg-castleton-light text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button onClick={handleToggleWishlist} className={`px-4 py-3.5 rounded-xl border-2 font-bold text-sm flex items-center gap-2 transition-all ${isWishlisted ? "border-coral bg-coral/10 text-coral" : "border-border/50 text-foreground/70 hover:border-coral hover:text-coral"}`}>
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
              <button onClick={handleShare} className="px-4 py-3.5 rounded-xl border-2 border-border/50 text-foreground/70 hover:border-champagne hover:text-champagne transition-all">
                {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Seller Info */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src={product.seller.avatar} alt={product.seller.name} width={44} height={44} className="rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-foreground">{product.seller.name}</span>
                      {product.seller.verified && <Check className="w-3.5 h-3.5 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-champagne fill-champagne" /> {product.seller.rating}
                      <span>|</span> {product.seller.sales.toLocaleString()} sales
                    </div>
                  </div>
                </div>
                <Link href="/seller" className="text-xs font-semibold text-champagne hover:underline flex items-center gap-1"><Store className="w-3.5 h-3.5" /> Visit Store</Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Blockchain Verified", sub: "100% authentic" },
                { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free" },
              ].map((b) => (
                <div key={b.label} className="text-center p-3 bg-muted/30 rounded-xl">
                  <b.icon className="w-5 h-5 text-champagne mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-foreground">{b.label}</p>
                  <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-1 border-b border-border/50 mb-6">
            {(["details", "specs", "reviews"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${activeTab === tab ? "border-champagne text-champagne" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{tab}</button>
            ))}
          </div>

          {activeTab === "details" && (
            <div className="max-w-3xl">
              <h3 className="text-lg font-bold text-foreground mb-4">Product Details</h3>
              <p className="text-sm text-foreground/70 leading-relaxed mb-4">{product.description}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">This product is verified on the blockchain for authenticity. You will receive an NFT certificate of ownership with your purchase. All transactions are secure and transparent through our Web3-powered platform.</p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-3xl">
              <h3 className="text-lg font-bold text-foreground mb-4">Specifications</h3>
              <div className="border border-border/50 rounded-xl overflow-hidden">
                {product.specs.map((spec, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "bg-muted/30" : "bg-card"} px-5 py-3`}>
                    <span className="w-1/3 text-sm font-medium text-muted-foreground">{spec.label}</span>
                    <span className="w-2/3 text-sm font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-3xl">
              <h3 className="text-lg font-bold text-foreground mb-4">Customer Reviews ({productReviews.length})</h3>
              {productReviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reviews yet for this product. Be the first to review!</p>
              ) : (
                <div className="space-y-4">
                  {productReviews.map((r) => (
                    <div key={r.id} className="bg-card rounded-xl border border-border/50 p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Image src={r.avatar} alt={r.reviewer} width={36} height={36} className="rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-bold text-foreground">{r.reviewer}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-champagne fill-champagne" />)}</div>
                            <span className="text-xs text-muted-foreground">{r.date}</span>
                          </div>
                        </div>
                        {r.verified && <span className="ml-auto bg-green-500/10 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Verified</span>}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all hover:border-champagne/30">
                    <div className="aspect-square bg-muted overflow-hidden">
                      <Image src={p.image} alt={p.name} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-champagne transition-colors">{p.name}</h3>
                      <span className="text-lg font-bold text-castleton dark:text-champagne">${p.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
