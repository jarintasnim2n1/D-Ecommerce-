"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, Zap, Clock, ArrowRight, ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { useToast } from "@/components/Toast";

const flashDeals = [
  { id: "fd1", name: "AirPods Pro 2nd Gen", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop", originalPrice: 249.99, price: 149.99, sold: 87, badge: "Flash Deal" },
  { id: "fd2", name: "Kindle Paperwhite", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=400&fit=crop", originalPrice: 149.99, price: 89.99, sold: 65, badge: "Flash Deal" },
  { id: "fd3", name: "Anker Power Bank", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop", originalPrice: 79.99, price: 39.99, sold: 92, badge: "Flash Deal" },
  { id: "fd4", name: "Logitech MX Master 3S", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop", originalPrice: 99.99, price: 59.99, sold: 78, badge: "Flash Deal" },
];

const onSale = [
  { id: "os1", name: "Canon EOS R50 Camera", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop", originalPrice: 679.99, price: 549.99, badge: "20% OFF" },
  { id: "os2", name: "Dyson V15 Vacuum", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop", originalPrice: 749.99, price: 599.99, badge: "20% OFF" },
  { id: "os3", name: "Bose QuietComfort 45", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop", originalPrice: 329.99, price: 249.99, badge: "24% OFF" },
];

export default function DealsPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-coral to-coral-dark rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4"><Flame className="w-8 h-8 text-champagne" /><h1 className="text-3xl font-bold">Flash Deals</h1></div>
          <p className="text-white/80 mb-6 max-w-lg">Limited-time offers with blockchain-verified pricing. Pay with crypto for extra savings!</p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60">Ends in:</span>
            <div className="flex gap-2">{["04", "23", "17"].map((t, i) => <div key={i} className="bg-white/20 rounded-lg px-3 py-2 text-center"><span className="font-bold text-lg">{t}</span><span className="text-[10px] block text-white/60">{i === 0 ? "HRS" : i === 1 ? "MIN" : "SEC"}</span></div>)}</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {flashDeals.map((deal) => (
            <div key={deal.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all hover:border-coral/30 group">
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image src={deal.image} alt={deal.name} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-coral text-white px-3 py-1 rounded-lg text-xs font-bold">{deal.badge}</span>
                <div className="absolute bottom-3 left-3 right-3 bg-card/90 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{deal.sold}% claimed</span><span className="font-bold text-coral">{100 - deal.sold} left</span></div>
                  <div className="w-full bg-border rounded-full h-1.5"><div className="bg-coral h-1.5 rounded-full" style={{ width: `${deal.sold}%` }} /></div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground text-sm mb-2 line-clamp-1">{deal.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-coral">${deal.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">${deal.originalPrice.toFixed(2)}</span>
                </div>
                <button onClick={() => { dispatch(addToCart({ id: deal.id, name: deal.name, price: deal.price, image: deal.image, quantity: 1 })); toast(`${deal.name} added to cart!`, "success", <ShoppingCart className="w-4 h-4" />); }} className="w-full bg-coral hover:bg-coral-dark text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div><h2 className="text-2xl font-bold text-foreground">On Sale Now</h2><p className="text-sm text-muted-foreground mt-1">Discounted products across all categories</p></div>
            <Link href="/shop" className="flex items-center gap-1 text-sm font-semibold text-champagne hover:underline">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {onSale.map((item) => (
              <div key={item.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all hover:border-champagne/30 group">
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <Image src={item.image} alt={item.name} width={600} height={450} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-champagne text-castleton-dark px-3 py-1 rounded-lg text-xs font-bold">{item.badge}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-base mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-champagne">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
                    </div>
                    <button onClick={() => { dispatch(addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 })); toast(`${item.name} added to cart!`, "success", <ShoppingCart className="w-4 h-4" />); }} className="bg-castleton hover:bg-castleton-light text-white p-2.5 rounded-xl transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
