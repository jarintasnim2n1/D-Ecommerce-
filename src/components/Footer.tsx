"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "Flash Deals", href: "/deals" },
    { label: "Gift Cards", href: "/shop" },
  ],
  Categories: [
    { label: "Electronics", href: "/shop/electronics" },
    { label: "Fashion", href: "/shop/fashion" },
    { label: "Accessories", href: "/shop/accessories" },
    { label: "Home & Living", href: "/shop" },
    { label: "Sports", href: "/shop" },
  ],
  Account: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Orders", href: "/dashboard/orders" },
    { label: "Wishlist", href: "/dashboard/wishlist" },
    { label: "Wallet", href: "/dashboard/wallet" },
    { label: "Settings", href: "/dashboard/settings" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "About Us", href: "/about" },
    { label: "Shipping Info", href: "/help" },
    { label: "Returns", href: "/help" },
  ],
};

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-castleton text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-castleton rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">E</span>
              </div>
              <span className="text-xl font-black text-white">EN<span className="text-champagne">COM</span></span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">The future of e-commerce. Shop with crypto, verify on-chain, own your data.</p>
            <div className="flex items-center gap-3 mb-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="w-9 h-9 rounded-full bg-white/10 hover:bg-champagne hover:text-castleton-dark text-white/60 flex items-center justify-center transition-all" aria-label={s.label}>
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {["ETH", "BTC", "USDT", "SOL", "Visa", "MC"].map((c) => (
                <span key={c} className="bg-white/10 text-white/60 px-2.5 py-1 rounded text-[10px] font-bold">{c}</span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-champagne text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/60 hover:text-champagne text-sm transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">&copy; 2026 Encommerce. All rights reserved. Built on Ethereum.</p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <Link href="/help" className="hover:text-champagne transition-colors">Privacy Policy</Link>
            <Link href="/help" className="hover:text-champagne transition-colors">Terms of Service</Link>
            <Link href="/help" className="hover:text-champagne transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
