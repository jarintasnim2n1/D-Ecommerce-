"use client";

import { ShoppingBag, Package, DollarSign, TrendingUp, Clock, CheckCircle, Truck, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/components/WalletProvider";
import { useAppSelector } from "@/store/hooks";
import { useTheme } from "@/components/ThemeProvider";

function shortenAddress(addr: string) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function DashboardPage() {
  const { connected, walletAddress, walletName } = useWallet();
  const { currency } = useTheme();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);
  const cartTotal = useAppSelector((state) => state.cart.totalAmount);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  const stats = [
    { label: "Cart Items", value: String(cartCount), change: cartCount > 0 ? `${currency === "USD" ? "$" : currency + " "}{cartTotal.toFixed(2)}` : "Empty cart", icon: ShoppingBag, color: "bg-castleton/10 text-castleton dark:bg-champagne/10 dark:text-champagne" },
    { label: "Wishlist", value: String(wishlistCount), change: wishlistCount > 0 ? "Items saved" : "No saved items", icon: Package, color: "bg-coral/10 text-coral" },
    { label: "Total Spent", value: "$0.00", change: "No orders yet", icon: DollarSign, color: "bg-green-500/10 text-green-600" },
    { label: "Rewards Earned", value: "0 ETH", change: "Start shopping to earn", icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {connected && (
        <div className="bg-gradient-to-r from-castleton to-castleton-dark rounded-2xl p-6 text-white">
          <h2 className="text-lg font-bold mb-1">Welcome, {walletName || "User"}!</h2>
          <p className="text-white/70 text-sm font-mono">{shortenAddress(walletAddress)}</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
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

      {cartCount > 0 ? (
        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground text-lg">Your Cart</h2>
            <span className="text-sm text-muted-foreground">{cartCount} items</span>
          </div>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-xl">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-castleton dark:text-champagne">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-bold text-foreground">Total: {currency === "USD" ? "$" : currency + " "}{cartTotal.toFixed(2)}</span>
            <Link href="/shop" className="bg-castleton text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-castleton-light transition-colors">Checkout</Link>
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border/50 p-8 text-center">
          <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-1">Your cart is empty</h3>
          <p className="text-sm text-muted-foreground mb-4">Browse products and add items to your cart.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-castleton text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-castleton-light transition-colors">
            <Plus className="w-4 h-4" /> Start Shopping
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-foreground text-lg">Quick Actions</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/shop" className="flex flex-col items-center gap-2 p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <ShoppingBag className="w-6 h-6 text-castleton dark:text-champagne" />
              <span className="text-sm font-medium text-foreground">Browse Shop</span>
            </Link>
            <Link href="/dashboard/wallet" className="flex flex-col items-center gap-2 p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <DollarSign className="w-6 h-6 text-green-500" />
              <span className="text-sm font-medium text-foreground">My Wallet</span>
            </Link>
            <Link href="/dashboard/wishlist" className="flex flex-col items-center gap-2 p-5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <TrendingUp className="w-6 h-6 text-coral" />
              <span className="text-sm font-medium text-foreground">Wishlist ({wishlistCount})</span>
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
