"use client";

import { Package, MapPin, Clock, CheckCircle, Truck, Box, CircleCheck } from "lucide-react";

const orders = [
  {
    id: "EC-7821", product: "MacBook Pro 16\" M3 Max", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop", status: "Delivered", date: "Dec 24, 2026", amount: "$2,499.00",
    timeline: [
      { icon: CircleCheck, label: "Order Confirmed", time: "Dec 22, 2:30 PM", done: true },
      { icon: Box, label: "Processing & Packed", time: "Dec 22, 6:45 PM", done: true },
      { icon: Truck, label: "Shipped via DHL", time: "Dec 23, 9:15 AM", done: true },
      { icon: MapPin, label: "Out for Delivery", time: "Dec 24, 8:30 AM", done: true },
      { icon: CheckCircle, label: "Delivered", time: "Dec 24, 2:15 PM", done: true },
    ],
  },
  {
    id: "EC-7820", product: "Sony WH-1000XM5 Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop", status: "In Transit", date: "Dec 25, 2026", amount: "$349.99",
    timeline: [
      { icon: CircleCheck, label: "Order Confirmed", time: "Dec 25, 10:00 AM", done: true },
      { icon: Box, label: "Processing & Packed", time: "Dec 25, 3:20 PM", done: true },
      { icon: Truck, label: "Shipped via FedEx", time: "Dec 26, 7:00 AM", done: true },
      { icon: MapPin, label: "Out for Delivery", time: "Pending", done: false },
      { icon: CheckCircle, label: "Delivered", time: "Pending", done: false },
    ],
  },
  {
    id: "EC-7819", product: "Nike Air Max 97 Silver", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop", status: "Processing", date: "Dec 27, 2026", amount: "$189.99",
    timeline: [
      { icon: CircleCheck, label: "Order Confirmed", time: "Dec 27, 11:30 AM", done: true },
      { icon: Box, label: "Processing & Packed", time: "In Progress", done: false },
      { icon: Truck, label: "Shipped", time: "Pending", done: false },
      { icon: MapPin, label: "Out for Delivery", time: "Pending", done: false },
      { icon: CheckCircle, label: "Delivered", time: "Pending", done: false },
    ],
  },
];

const statusColor: Record<string, string> = {
  "Delivered": "bg-green-500/10 text-green-600", "In Transit": "bg-blue-500/10 text-blue-600", "Processing": "bg-orange-500/10 text-orange-600",
};

export default function TrackingPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-castleton to-castleton-dark rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Order Tracking</h1>
        <p className="text-white/70 text-sm">Track your orders in real-time with blockchain-verified shipping updates.</p>
      </div>
      <div className="space-y-6">
        {orders.map((o) => (
          <div key={o.id} className="bg-card rounded-2xl border border-border/50 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <img src={o.image} alt={o.product} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-foreground">{o.product}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{o.id}</span>
                    <span className="text-xs text-muted-foreground">{o.date}</span>
                    <span className="text-sm font-bold text-foreground">{o.amount}</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full self-start ${statusColor[o.status]}`}>{o.status}</span>
            </div>
            <div className="relative ml-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              {o.timeline.map((t, i) => (
                <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0">
                  <div className={`absolute left-0 w-3 h-3 rounded-full border-2 -translate-x-[7px] mt-1 ${t.done ? "bg-champagne border-champagne" : "bg-card border-border"}`} />
                  <div className="pl-4">
                    <div className="flex items-center gap-2">
                      <t.icon className={`w-4 h-4 ${t.done ? "text-champagne" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${t.done ? "text-foreground" : "text-muted-foreground"}`}>{t.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-6">{t.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
