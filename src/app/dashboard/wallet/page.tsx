"use client";

import { Wallet, ArrowUpRight, ArrowDownLeft, Copy, ExternalLink, TrendingUp, CreditCard, Banknote, Coins } from "lucide-react";
import { useWallet } from "@/components/WalletProvider";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

function shortenAddress(addr: string) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function WalletPage() {
  const { connected, walletAddress } = useWallet();
  const { currency } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-castleton to-castleton-dark rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">My Wallet</h1>
        <p className="text-white/70 text-sm">Manage your crypto payments and transaction history.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Balance", value: "$0.00", sub: `0 ETH`, icon: Wallet, color: "bg-castleton/10 text-castleton dark:bg-champagne/10 dark:text-champagne" },
          { label: "Total Spent", value: "$0.00", sub: "0 orders", icon: CreditCard, color: "bg-coral/10 text-coral" },
          { label: "Cashback Earned", value: "$0.00", sub: "0 ETH", icon: Coins, color: "bg-green-500/10 text-green-600" },
          { label: "Pending", value: "$0.00", sub: "0 transactions", icon: TrendingUp, color: "bg-orange-500/10 text-orange-500" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="w-5 h-5" /></div>
            </div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-2xl border border-border/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-foreground text-lg">Transaction History</h2>
          {connected && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">{shortenAddress(walletAddress)}</span>
              <button onClick={handleCopy} className="p-1.5 text-muted-foreground hover:text-foreground">
                {copied ? <span className="text-xs text-green-500">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
        {connected ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-1">No transactions yet</h3>
            <p className="text-sm text-muted-foreground">Your transaction history will appear here once you make a purchase.</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Connect your wallet</h3>
            <p className="text-sm text-muted-foreground">Connect a wallet to view your transactions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
