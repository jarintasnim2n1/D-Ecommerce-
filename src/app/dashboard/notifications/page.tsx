"use client";

import { Bell, CheckCircle, Truck, DollarSign, AlertCircle, Star, Settings, Trash2 } from "lucide-react";

const notifications = [
  { id: 1, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10", title: "Order Delivered!", message: "Your MacBook Pro 16\" has been delivered successfully.", time: "2 hours ago", unread: true },
  { id: 2, icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10", title: "Shipment Update", message: "Sony WH-1000XM5 is out for delivery. Expected by 5 PM.", time: "5 hours ago", unread: true },
  { id: 3, icon: DollarSign, color: "text-champagne", bg: "bg-champagne/10", title: "Cashback Received", message: "You earned 0.005 ETH cashback from your recent purchase.", time: "1 day ago", unread: true },
  { id: 4, icon: Star, color: "text-orange-500", bg: "bg-orange-500/10", title: "Rate Your Purchase", message: "How was your MacBook Pro? Leave a review and earn rewards.", time: "2 days ago", unread: false },
  { id: 5, icon: AlertCircle, color: "text-coral", bg: "bg-coral/10", title: "Payment Confirmed", message: "Payment of $349.99 confirmed on Ethereum blockchain.", time: "3 days ago", unread: false },
  { id: 6, icon: Settings, color: "text-purple-500", bg: "bg-purple-500/10", title: "Security Alert", message: "New wallet connected from Chrome on Windows.", time: "5 days ago", unread: false },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Notifications</h1><p className="text-sm text-muted-foreground mt-1">{notifications.filter((n) => n.unread).length} unread</p></div>
        <div className="flex items-center gap-2">
          <button className="text-sm font-semibold text-castleton dark:text-champagne hover:underline">Mark all read</button>
          <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className={`bg-card rounded-2xl border p-5 flex items-start gap-4 hover:shadow-md transition-all cursor-pointer ${n.unread ? "border-champagne/30" : "border-border/50"}`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${n.bg}`}><n.icon className={`w-5 h-5 ${n.color}`} /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-foreground text-sm">{n.title}</h3>
                {n.unread && <span className="w-2 h-2 bg-coral rounded-full flex-shrink-0" />}
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">{n.message}</p>
              <span className="text-xs text-muted-foreground mt-2 block">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
