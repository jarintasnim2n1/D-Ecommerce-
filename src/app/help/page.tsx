"use client";

import { ChevronRight, ChevronDown, Search, MessageSquare, Phone, Mail, Shield, Truck, CreditCard, RotateCcw, Package, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  { q: "How do I connect my crypto wallet?", a: "Click the 'Connect Wallet' button in the top navigation bar. We support MetaMask, WalletConnect, Coinbase Wallet, and Phantom. Simply select your wallet provider and approve the connection request in your wallet extension." },
  { q: "What cryptocurrencies do you accept?", a: "We accept Ethereum (ETH), Bitcoin (BTC), USDT, USDC, and Solana (SOL). You can also link your credit/debit card for traditional payments through our secure payment processor." },
  { q: "How does blockchain-verified authenticity work?", a: "Every product on our platform has a unique digital certificate stored on the Ethereum blockchain. When you purchase an item, you receive an NFT-based certificate of authenticity that proves the product's origin and genuineness." },
  { q: "What is the return policy?", a: "We offer a 30-day hassle-free return policy on all products. If you're not satisfied, initiate a return from your dashboard. Refunds are processed in the same cryptocurrency used for the purchase, typically within 3-5 business days." },
  { q: "How do crypto cashback rewards work?", a: "For every purchase, you earn 1-5% cashback in ETH, depending on your membership tier. Rewards are automatically credited to your connected wallet within 24 hours of order completion." },
  { q: "Is my personal data stored on the blockchain?", a: "No. Only transaction records and product authenticity certificates are stored on-chain. Your personal information (name, address, email) is encrypted and stored securely off-chain, giving you full control over your data." },
  { q: "How do I track my order?", a: "Go to Dashboard > Tracking to see real-time updates on your order. Each stage (confirmed, processing, shipped, out for delivery, delivered) is verified on-chain for complete transparency." },
  { q: "What are the transaction fees?", a: "We charge a small platform fee of 2.5% per transaction. Network gas fees vary depending on blockchain congestion but are typically under $1 for most transactions. We optimize gas usage automatically." },
];

const quickLinks = [
  { icon: Shield, label: "Security & Privacy", desc: "How we protect your data", href: "/help" },
  { icon: Truck, label: "Shipping Info", desc: "Delivery times & methods", href: "/help" },
  { icon: CreditCard, label: "Payment Methods", desc: "Crypto & fiat options", href: "/help" },
  { icon: RotateCcw, label: "Returns & Refunds", desc: "30-day return policy", href: "/help" },
  { icon: Package, label: "Order Issues", desc: "Problems with your order", href: "/help" },
  { icon: Wallet, label: "Wallet Setup", desc: "Getting started guide", href: "/help" },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-castleton to-castleton-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="w-3.5 h-3.5" /><span className="text-white">Help Center</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">How can we help?</h1>
          <p className="text-white/70 max-w-lg mb-8">Search our FAQ or browse the topics below to find answers to your questions.</p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for answers..." className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-champagne text-sm" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="bg-card rounded-2xl border border-border/50 p-5 hover:shadow-md transition-all hover:border-champagne/30 flex items-start gap-4 group">
                <div className="w-11 h-11 bg-champagne/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-champagne/20 transition-colors"><link.icon className="w-5 h-5 text-champagne" /></div>
                <div><h3 className="font-bold text-foreground text-sm">{link.label}</h3><p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p></div>
              </Link>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-sm text-muted-foreground mt-2">Can&apos;t find what you&apos;re looking for? <Link href="/contact" className="text-champagne hover:underline">Contact our support team</Link></p>
            </div>
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-md transition-all">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="font-bold text-foreground text-sm pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 text-sm text-foreground/70 leading-relaxed border-t border-border/50 pt-4">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-champagne to-champagne-dark rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-castleton-dark mb-3">Still have questions?</h3>
            <p className="text-castleton-dark/70 mb-6 max-w-md mx-auto">Our support team is available 24/7 to help you with any questions or issues.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="bg-castleton text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-castleton-dark transition-colors flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Contact Support</Link>
              <a href="mailto:support@encommerce.io" className="bg-white/50 text-castleton-dark px-6 py-3 rounded-xl font-bold text-sm hover:bg-white transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> Email Us</a>
              <a href="tel:+15551234567" className="bg-white/50 text-castleton-dark px-6 py-3 rounded-xl font-bold text-sm hover:bg-white transition-colors flex items-center gap-2"><Phone className="w-4 h-4" /> Call Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
