"use client";

import Link from "next/link";
import { Flame, ArrowRight, Gift, Zap, Percent } from "lucide-react";
import { motion } from "framer-motion";

const deals = [
  { id: "1", title: "Flash Sale", description: "Up to 60% off on premium electronics", icon: Zap, color: "from-coral to-coral-dark", badge: "Ends in 04:23:17", link: "/deals" },
  { id: "2", title: "Bundle & Save", description: "Buy 2 get 1 free on all fashion", icon: Gift, color: "from-castleton to-castleton-dark", badge: "This Week Only", link: "/deals" },
  { id: "3", title: "New User Bonus", description: "Extra 20% off your first Web3 purchase", icon: Percent, color: "from-champagne to-champagne-dark", textColor: "text-castleton-dark", badge: "Limited Time", link: "/deals" },
];

export default function DealsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30 dark:bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Don&apos;t Miss Out</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">Hot Deals & Offers</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Grab exclusive deals before they expire. Pay with crypto for extra savings!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={deal.link} className="block group h-full">
                <div className={`bg-gradient-to-br ${deal.color} rounded-2xl p-6 lg:p-8 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><deal.icon className="w-6 h-6 text-white" /></div>
                      <span className="text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full">{deal.badge}</span>
                    </div>
                    <h3 className={`text-2xl font-bold ${deal.textColor || "text-white"} mb-2`}>{deal.title}</h3>
                    <p className={`${deal.textColor ? "text-castleton-dark/70" : "text-white/80"} text-sm mb-6`}>{deal.description}</p>
                    <div className={`inline-flex items-center gap-2 font-bold text-sm ${deal.textColor || "text-white"} group-hover:gap-3 transition-all`}>
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 bg-castleton rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-champagne/20 rounded-xl flex items-center justify-center"><Flame className="w-7 h-7 text-champagne" /></div>
            <div>
              <h3 className="text-white font-bold text-lg">Mega Weekend Sale</h3>
              <p className="text-white/60 text-sm">Extra 15% off on all products with code WEEKEND15</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {["04", "23", "17"].map((time, i) => (
              <div key={i} className="text-center">
                <div className="bg-white/10 rounded-xl w-16 h-16 flex items-center justify-center"><span className="text-white font-bold text-2xl">{time}</span></div>
                <span className="text-white/50 text-[10px] mt-1 block uppercase">{i === 0 ? "Hours" : i === 1 ? "Mins" : "Secs"}</span>
              </div>
            ))}
          </div>
          <Link href="/deals" className="bg-champagne text-castleton-dark px-8 py-3 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors whitespace-nowrap">Shop the Sale</Link>
        </motion.div>
      </div>
    </section>
  );
}
