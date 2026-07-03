"use client";

import { DollarSign, TrendingUp, Eye, ShoppingCart, Calendar, Package, Star, Plus } from "lucide-react";
import Link from "next/link";

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Analytics</h1><p className="text-sm text-muted-foreground mt-1">Track your store performance and revenue</p></div>
        <div className="flex items-center gap-2 bg-card border border-border/50 px-4 py-2.5 rounded-xl text-sm text-foreground/70"><Calendar className="w-4 h-4" /> Last 6 months</div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue", value: "$0.00", change: "No sales yet", icon: DollarSign, color: "bg-green-500/10 text-green-600" },
          { label: "Orders", value: "0", change: "No orders", icon: ShoppingCart, color: "bg-blue-500/10 text-blue-600" },
          { label: "Page Views", value: "0", change: "No views yet", icon: Eye, color: "bg-purple-500/10 text-purple-600" },
          { label: "Avg. Rating", value: "--", change: "No reviews", icon: Star, color: "bg-champagne/10 text-champagne-dark dark:text-champagne" },
        ].map((m) => (
          <div key={m.label} className="bg-card rounded-2xl border border-border/50 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{m.label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}><m.icon className="w-5 h-5" /></div>
            </div>
            <div className="text-2xl font-bold text-foreground">{m.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{m.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
        <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-bold text-foreground mb-1">No analytics data yet</h3>
        <p className="text-sm text-muted-foreground mb-6">Start selling to see your revenue, orders, and performance metrics.</p>
        <Link href="/seller/products" className="inline-flex items-center gap-2 bg-champagne text-castleton-dark px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">
          <Plus className="w-4 h-4" /> Add Products
        </Link>
      </div>
    </div>
  );
}
