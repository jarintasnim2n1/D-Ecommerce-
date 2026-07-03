"use client";

import { Search, Filter, Package, Plus } from "lucide-react";
import Link from "next/link";

export default function SellerOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-foreground">Orders</h1><p className="text-sm text-muted-foreground mt-1">Manage incoming orders from buyers</p></div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input placeholder="Search orders..." className="pl-10 pr-4 py-2.5 bg-card border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50 w-48" /></div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border/50 rounded-xl text-sm text-foreground/70 hover:bg-muted transition-colors"><Filter className="w-4 h-4" /> Filter</button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
        <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-bold text-foreground mb-1">No orders yet</h3>
        <p className="text-sm text-muted-foreground mb-6">Orders from buyers will appear here once they purchase your products.</p>
        <Link href="/seller/products" className="inline-flex items-center gap-2 bg-champagne text-castleton-dark px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">
          <Plus className="w-4 h-4" /> Add Products
        </Link>
      </div>
    </div>
  );
}
