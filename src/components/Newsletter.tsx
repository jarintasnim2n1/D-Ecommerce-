"use client";

import { useState } from "react";
import { Shield, Truck, Zap, RotateCcw, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Shield, title: "Secure & Private", desc: "Wallet-based authentication. No passwords to remember." },
  { icon: Truck, title: "Free Shipping", desc: "Free worldwide shipping on orders over $50." },
  { icon: Zap, title: "Instant Payments", desc: "Lightning-fast crypto payments with low fees." },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns with full refund." },
];

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };
  return (
    <>
      <section className="py-16 lg:py-24 bg-muted/30 dark:bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, index) => (
              <motion.div
                key={f.title}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow h-full">
                  <div className="w-11 h-11 rounded-xl bg-castleton/10 dark:bg-champagne/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-castleton dark:text-champagne" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-castleton to-castleton-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-60 h-60 bg-champagne/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-coral/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-champagne font-semibold text-sm uppercase tracking-widest">Stay Updated</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">Get Web3 Deals in Your Inbox</h2>
            <p className="text-white/60 mb-8">Subscribe for exclusive crypto discounts, new arrivals, and blockchain shopping tips.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne" />
              <button type="submit" className="bg-champagne text-castleton-dark px-8 py-3 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors whitespace-nowrap">
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </form>
            <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime. We respect your privacy.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
