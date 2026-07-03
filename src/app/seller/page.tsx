"use client";

import { Package, DollarSign, TrendingUp, ShoppingBag, Plus } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/components/WalletProvider";
import { useTheme } from "@/components/ThemeProvider";

function shortenAddress(addr: string) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function SellerDashboardPage() {
  const { connected, walletAddress, walletName } = useWallet();
  const { currency } = useTheme();

  return (
    <div className="space-y-6">
      {connected && (
        <div className="bg-gradient-to-r from-champagne to-champagne-dark rounded-2xl p-6 text-castleton-dark">
          <h2 className="text-lg font-bold mb-1">Seller Dashboard</h2>
          <p className="text-castleton-dark/70 text-sm font-mono">{shortenAddress(walletAddress)}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$0.00", change: "No sales yet", icon: DollarSign, color: "bg-green-500/10 text-green-600" },
          { label: "Total Orders", value: "0", change: "No orders received", icon: ShoppingBag, color: "bg-blue-500/10 text-blue-600" },
          { label: "Products Listed", value: "0", change: "Add your first product", icon: Package, color: "bg-champagne/10 text-champagne-dark dark:text-champagne" },
          { label: "Avg. Rating", value: "--", change: "No reviews yet", icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border/50 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground text-lg">Quick Actions</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/seller/products" className="flex flex-col items-center gap-2 p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <Package className="w-6 h-6 text-champagne" />
              <span className="text-sm font-medium text-foreground">My Products</span>
            </Link>
            <Link href="/seller/orders" className="flex flex-col items-center gap-2 p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <ShoppingBag className="w-6 h-6 text-blue-500" />
              <span className="text-sm font-medium text-foreground">Orders</span>
            </Link>
            <Link href="/seller/analytics" className="flex flex-col items-center gap-2 p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <DollarSign className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-foreground">Analytics</span>
            </Link>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <h2 className="font-bold text-foreground text-lg mb-4">Account Info</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="text-sm text-muted-foreground">Wallet</span>
              <span className="text-sm font-medium text-foreground font-mono">{connected ? shortenAddress(walletAddress) : "Not connected"}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="text-sm text-muted-foreground">Currency</span>
              <span className="text-sm font-medium text-foreground">{currency}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`text-sm font-medium ${connected ? "text-green-500" : "text-orange-500"}`}>{connected ? "Active" : "Offline"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
