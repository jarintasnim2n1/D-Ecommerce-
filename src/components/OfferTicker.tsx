"use client";

import { Truck, Zap, Shield, Gift, Percent, Headphones } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const offers = [
  { icon: Truck, text: "Free Shipping on orders over $50" },
  { icon: Zap, text: "Flash Sale: Up to 60% OFF - Use code FLASH60" },
  { icon: Shield, text: "Blockchain-verified authenticity on all products" },
  { icon: Gift, text: "Buy 2 Get 1 Free on Fashion - Limited Time" },
  { icon: Percent, text: "Extra 20% OFF with Crypto payments - NEWUSERS20" },
  { icon: Headphones, text: "24/7 Support: support@encommerce.io" },
];

export default function OfferTicker() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <div className={`relative overflow-hidden ${dark ? "bg-champagne" : "bg-castleton"}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-28 ${dark ? "bg-castleton" : "bg-champagne"}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-28 ${dark ? "bg-castleton" : "bg-champagne"}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center h-10">
          <div className="flex-shrink-0 flex items-center gap-2 pr-4 mr-4">
            <Zap className={`w-3.5 h-3.5 ${dark ? "text-castleton" : "text-champagne"}`} />
            <span className={`text-xs font-bold whitespace-nowrap ${dark ? "text-castleton" : "text-champagne"}`}>OFFERS</span>
          </div>
          <div className="overflow-hidden relative flex-1">
            <div className="animate-[ticker_30s_linear_infinite] flex whitespace-nowrap gap-12">
              {[...offers, ...offers].map((offer, i) => (
                <span key={i} className={`flex items-center gap-2 text-xs ${dark ? "text-castleton-dark/80" : "text-white/80"}`}>
                  <offer.icon className={`w-3 h-3 flex-shrink-0 ${dark ? "text-castleton/60" : "text-champagne/60"}`} />
                  {offer.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
