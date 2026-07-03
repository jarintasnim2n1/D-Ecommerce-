"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { id: 1, name: "Sarah Chen", role: "Crypto Enthusiast", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rating: 5, text: "The Web3 integration is seamless. Paid with ETH and got my order verified on-chain. Love the transparency!", verified: true },
  { id: 2, name: "Marcus Rodriguez", role: "Tech Entrepreneur", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Best decentralized marketplace I've used. The product quality is top-notch and the delivery tracking is real-time.", verified: true },
  { id: 3, name: "Aisha Patel", role: "Digital Nomad", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Shop from anywhere in the world with crypto. No bank restrictions, no borders. This is the future of commerce.", verified: true },
  { id: 4, name: "James Wilson", role: "NFT Collector", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 5, text: "Earned crypto rewards on my purchases and redeemed them for exclusive NFT collectibles. Absolutely brilliant platform.", verified: true },
  { id: 5, name: "Elena Kowalski", role: "Fashion Blogger", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", rating: 5, text: "The curated collections are amazing. Love how I can verify product authenticity using blockchain. Trust is built-in.", verified: true },
  { id: 6, name: "David Kim", role: "Software Developer", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", rating: 5, text: "As a developer, I appreciate the smart contract transparency. Every transaction is verifiable. This is Web3 done right.", verified: true },
];

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">Loved by Thousands</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Join thousands of satisfied customers who shop with crypto and love our Web3 experience.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="bg-card rounded-2xl border border-border/50 p-6 hover:shadow-xl transition-all hover:border-champagne/30 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-champagne fill-champagne" />)}
                </div>
                <Quote className="w-8 h-8 text-champagne/30 mb-3" />
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  {t.verified && <span className="bg-castleton/10 dark:bg-champagne/10 text-castleton dark:text-champagne text-[10px] font-bold px-2 py-1 rounded-full uppercase">Verified</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
