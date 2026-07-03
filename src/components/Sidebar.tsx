"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, MapPin, Heart, Wallet, Settings, User,
  HelpCircle, Star, Shield, Bell,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/orders", icon: Package },
  { label: "Live Tracking", href: "/dashboard/tracking", icon: MapPin },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Help Center", href: "/help", icon: HelpCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col bg-card border-r border-border w-[260px] sticky top-20 h-[calc(100vh-5rem)] z-30">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-castleton to-castleton-light flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-foreground truncate">Alex Morgan</h3>
            <p className="text-[11px] text-muted-foreground truncate">alex@encommerce.io</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 bg-castleton/5 rounded-lg px-3 py-2">
          <Shield className="w-3.5 h-3.5 text-castleton" />
          <span className="text-[11px] font-medium text-castleton">Web3 Verified</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
              isActive ? "bg-castleton text-white shadow-md shadow-castleton/20" : "text-foreground/60 hover:text-castleton hover:bg-castleton/5"
            }`}>
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-champagne rounded-r-full" />}
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-champagne" : ""}`} />
              <span className="truncate">{item.label}</span>
              {item.label === "Live Tracking" && <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
