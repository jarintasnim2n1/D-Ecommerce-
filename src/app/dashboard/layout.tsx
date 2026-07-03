"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Package, Heart, Wallet, Bell, Star, Settings, LogOut, HelpCircle, ChevronLeft, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/components/WalletProvider";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Tracking", href: "/dashboard/tracking", icon: Package },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
            <div className="w-9 h-9 bg-castleton rounded-xl flex items-center justify-center"><span className="text-white font-black">E</span></div>
            <span className="text-lg font-black text-foreground">EN<span className="text-champagne">COM</span></span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-1 text-muted-foreground hover:text-foreground"><ChevronLeft className="w-5 h-5" /></button>
        </div>

        {connected && (
          <div className="px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-3 bg-green-500/10 rounded-xl px-3 py-2.5">
              <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{walletName}</p>
                <p className="text-[11px] font-mono text-muted-foreground truncate">{walletAddress}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active ? "bg-castleton text-white shadow-md" : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}>
                <item.icon className="w-[18px] h-[18px]" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50 space-y-1">
          <Link href="/help" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all">
            <HelpCircle className="w-[18px] h-[18px]" /> Help Center
          </Link>
          {connected && (
            <button onClick={() => { disconnect(); window.location.href = "/"; }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all">
              <LogOut className="w-[18px] h-[18px]" /> Disconnect Wallet
            </button>
          )}
        </div>
      </aside>
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"><Menu className="w-5 h-5" /></button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Welcome back, {walletName || "User"}!</h1>
            <p className="text-sm text-muted-foreground">Manage your orders, wallet, and settings.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/notifications" className="relative p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"><Bell className="w-5 h-5" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full" /></Link>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne to-coral flex items-center justify-center">
              <span className="text-white font-bold text-sm">{connected ? walletAddress.slice(2, 4).toUpperCase() : "0x"}</span>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
