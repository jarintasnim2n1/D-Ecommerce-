"use client";

import { Star, ThumbsUp, MessageSquare, Edit } from "lucide-react";
import Image from "next/image";
import { reviews } from "@/lib/data";

const myReviews = reviews.slice(0, 3).map((r) => ({ ...r, helpful: Math.floor(Math.random() * 20) + 1 }));

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">My Reviews</h1><p className="text-sm text-muted-foreground mt-1">{myReviews.length} reviews written</p></div>
        <button className="flex items-center gap-2 bg-castleton text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-castleton-light transition-colors"><Edit className="w-4 h-4" /> Write Review</button>
      </div>
      <div className="space-y-4">
        {myReviews.map((r) => (
          <div key={r.id} className="bg-card rounded-2xl border border-border/50 p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image src={r.avatar} alt={r.reviewer} width={44} height={44} className="rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-foreground text-sm">{r.product}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-champagne fill-champagne" />)}</div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                </div>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"><Edit className="w-3 h-3" /> Edit</button>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">{r.text}</p>
            <div className="flex items-center gap-4 pt-3 border-t border-border/50">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-castleton dark:hover:text-champagne transition-colors"><ThumbsUp className="w-3.5 h-3.5" /> Helpful ({r.helpful})</button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-castleton dark:hover:text-champagne transition-colors"><MessageSquare className="w-3.5 h-3.5" /> Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
