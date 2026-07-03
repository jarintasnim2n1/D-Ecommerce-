"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, ChevronLeft, Menu, Store, LogOut, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/components/WalletProvider";

const nav = [
  { label: "Overview", href: "/seller", icon: LayoutDashboard },
  { label: "Products", href: "/seller/products", icon: Package },
  { label: "Orders", href: "/seller/orders", icon: ShoppingBag },
  { label: "Analytics", href: "/seller/analytics", icon: BarChart3 },
  { label: "Reviews", href: "/seller/reviews", icon: Star },
  { label: "Settings", href: "/seller/settings", icon: Settings },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { connected, walletAddress, walletName, disconnect } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected, router]);

  return (
    <div className="min-h-screen bg-background flex">
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border/50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-border/50 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-champagne rounded-xl flex items-center justify-center"><Store className="w-5 h-5 text-castleton-dark" /></div>
            <span className="text-lg font-black text-foreground">Seller<span className="text-champagne">Hub</span></span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1 text-muted-foreground hover:text-foreground"><ChevronLeft className="w-5 h-5" /></button>
        </div>

        {connected && (
          <div className="px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-3 bg-champagne/10 rounded-xl px-3 py-2.5">
              <Store className="w-4 h-4 text-champagne flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{walletName || "Seller"} Account</p>
                <p className="text-[11px] font-mono text-muted-foreground truncate">{walletAddress}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href + item.label} href={item.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? "bg-champagne text-castleton-dark shadow-md" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`}>
                <item.icon className="w-[18px] h-[18px]" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50">
          {connected && (
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all">
              <ShoppingBag className="w-[18px] h-[18px]" /> Buyer Dashboard
            </Link>
          )}
          {connected && (
            <button onClick={() => { disconnect(); window.location.href = "/"; }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all">
              <LogOut className="w-[18px] h-[18px]" /> Disconnect
            </button>
          )}
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"><Menu className="w-5 h-5" /></button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Welcome back, {walletName || "Seller"}!</h1>
            <p className="text-sm text-muted-foreground">Manage your products, orders, and store analytics.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/seller/products" className="bg-champagne text-castleton-dark px-4 py-2 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">+ Add Product</Link>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
