"use client";

import Link from "next/link";
import { Link2, Smartphone, Globe, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function BannerSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-castleton to-castleton-dark rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-champagne/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-4"><Link2 className="w-6 h-6 text-champagne" /></div>
              <h3 className="text-white text-2xl font-bold mb-3">Powered by Web3</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed max-w-sm">Pay with cryptocurrency, verify product authenticity on the blockchain, and own your shopping data.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {["ETH", "BTC", "USDT", "SOL"].map((c) => <span key={c} className="bg-white/10 text-white/80 px-3 py-1.5 rounded-lg text-xs font-bold">{c}</span>)}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 bg-champagne text-castleton-dark px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">Learn More</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-champagne to-champagne-dark rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-castleton/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-castleton/20 rounded-xl flex items-center justify-center mb-4"><Smartphone className="w-6 h-6 text-castleton" /></div>
              <h3 className="text-castleton-dark text-2xl font-bold mb-3">Shop on the Go</h3>
              <p className="text-castleton-dark/60 text-sm mb-6 leading-relaxed max-w-sm">Download the Encommerce app for a seamless mobile shopping experience with wallet integration.</p>
              <div className="flex gap-3">
                <Link href="/dashboard" className="bg-castleton text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-castleton-dark transition-colors flex items-center gap-2"><Globe className="w-4 h-4" /> Web App</Link>
                <button className="bg-white/50 text-castleton-dark px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white transition-colors flex items-center gap-2"><Lock className="w-4 h-4" /> DApp Browser</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
