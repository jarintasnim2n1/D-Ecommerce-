"use client";

import { Star, ThumbsUp, MessageSquare, Plus } from "lucide-react";
import { useWallet } from "@/components/WalletProvider";
import Link from "next/link";

export default function SellerReviewsPage() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
        <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-bold text-foreground mb-1">Connect your wallet</h3>
        <p className="text-sm text-muted-foreground">Connect your wallet to view customer reviews.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-champagne/10 rounded-xl flex items-center justify-center"><Star className="w-5 h-5 text-champagne" /></div>
        <div><h1 className="text-2xl font-bold text-foreground">Customer Reviews</h1><p className="text-sm text-muted-foreground">0 reviews</p></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-3xl font-bold text-foreground">--</p>
          <div className="flex justify-center gap-0.5 my-1">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-muted" />)}</div>
          <p className="text-xs text-muted-foreground">Average Rating</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-3xl font-bold text-foreground">0</p>
          <p className="text-xs text-muted-foreground mt-1">Total Reviews</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-3xl font-bold text-foreground">0%</p>
          <p className="text-xs text-muted-foreground mt-1">Positive Reviews</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
        <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-bold text-foreground mb-1">No reviews yet</h3>
        <p className="text-sm text-muted-foreground mb-6">Customer reviews will appear here once buyers rate your products.</p>
        <Link href="/seller/products" className="inline-flex items-center gap-2 bg-champagne text-castleton-dark px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">
          <Plus className="w-4 h-4" /> Add Products
        </Link>
      </div>
    </div>
  );
}
