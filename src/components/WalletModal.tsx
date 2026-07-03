"use client";

import { useState } from "react";
import { X, Wallet, ExternalLink, CheckCircle2, Copy, AlertCircle, ShoppingBag, Store } from "lucide-react";
import { useWallet } from "@/components/WalletProvider";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
}

const wallets = [
  { id: "metamask", name: "MetaMask", icon: "\uD83E\uDD8A", description: "Connect using browser extension" },
  { id: "walletconnect", name: "WalletConnect", icon: "\uD83D\uDD17", description: "Scan QR code with mobile wallet" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "\uD83D\uDD35", description: "Connect using Coinbase" },
  { id: "phantom", name: "Phantom", icon: "\uD83D\uDC7B", description: "Solana wallet" },
];

function shortenAddress(addr: string) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export default function WalletModal({ open, onClose }: WalletModalProps) {
  const { connect, connected, walletAddress, walletName, role } = useWallet();
  const [step, setStep] = useState<"select" | "connecting" | "role" | "connected" | "error">("select");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [pendingAddress, setPendingAddress] = useState("");
  const [pendingName, setPendingName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConnect = async (walletId: string) => {
    const wallet = wallets.find((w) => w.id === walletId);
    setSelectedWallet(walletId);
    setStep("connecting");
    setErrorMsg("");

    if (walletId === "walletconnect") {
      setTimeout(() => {
        setPendingAddress("0x9b3f...4a7e");
        setPendingName("WalletConnect");
        setStep("role");
      }, 2500);
      return;
    }

    if (walletId === "phantom") {
      const phantom = (window as any).phantom?.solana;
      if (!phantom) {
        setErrorMsg("Phantom wallet is not installed.");
        setStep("error");
        return;
      }
      try {
        const resp = await phantom.connect();
        setPendingAddress(shortenAddress(resp.publicKey.toString()));
        setPendingName("Phantom");
        setStep("role");
      } catch (err: any) {
        setErrorMsg(err?.message || "Failed to connect to Phantom.");
        setStep("error");
      }
      return;
    }

    // MetaMask / Coinbase
    const eth = (window as any).ethereum;
    if (!eth) {
      setErrorMsg("No wallet detected. Please install " + wallet?.name + " from its official website.");
      setStep("error");
      return;
    }

    let provider = eth;
    if (eth.providers?.length) {
      if (walletId === "metamask") {
        provider = eth.providers.find((p: any) => p.isMetaMask) || eth;
      } else if (walletId === "coinbase") {
        provider = eth.providers.find((p: any) => p.isCoinbaseWallet) || eth;
      }
    }

    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) {
        setErrorMsg("No accounts found. Please unlock your wallet.");
        setStep("error");
        return;
      }
      setPendingAddress(shortenAddress(accounts[0]));
      setPendingName(wallet?.name || walletId);
      setStep("role");
    } catch (err: any) {
      console.error("Wallet error:", err);
      if (err?.code === 4001) {
        setErrorMsg("Connection rejected. Please approve the request in your wallet popup.");
      } else if (err?.code === -32002) {
        setErrorMsg("A request is already pending. Open your wallet extension and approve it.");
      } else {
        setErrorMsg(err?.message || "Connection failed. Please try again.");
      }
      setStep("error");
    }
  };

  const handleRoleSelect = (selectedRole: "buyer" | "seller") => {
    connect(selectedWallet || "", pendingAddress, pendingName, selectedRole);
    setStep("connected");
  };

  const handleClose = () => {
    setStep("select");
    setSelectedWallet(null);
    setPendingAddress("");
    setPendingName("");
    setErrorMsg("");
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-border/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-champagne" />
            <h2 className="font-bold text-foreground">{connected ? "Wallet Connected" : "Connect Wallet"}</h2>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          {connected && step === "select" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{walletName}</p>
                  <p className="text-xs font-mono text-muted-foreground">{walletAddress}</p>
                  <span className="text-[10px] font-bold text-champagne uppercase">{role}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Connected as <strong>{role}</strong>.</p>
              <button onClick={handleClose} className="w-full bg-champagne text-castleton-dark px-4 py-3 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">
                {role === "seller" ? "Go to Seller Dashboard" : "Start Shopping"}
              </button>
            </div>
          )}

          {step === "select" && !connected && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">Choose your preferred wallet to connect to Encommerce</p>
              {wallets.map((wallet) => {
                const eth = (window as any).ethereum;
                let detected = false;
                if (eth) {
                  if (eth.providers?.length) {
                    detected = wallet.id === "metamask"
                      ? eth.providers.some((p: any) => p.isMetaMask)
                      : wallet.id === "coinbase"
                        ? eth.providers.some((p: any) => p.isCoinbaseWallet)
                        : false;
                  } else {
                    detected = wallet.id === "metamask" ? !!eth.isMetaMask : wallet.id === "coinbase" ? !!eth.isCoinbaseWallet : false;
                  }
                }
                return (
                  <button key={wallet.id} onClick={() => handleConnect(wallet.id)} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border/50 bg-muted/30 hover:bg-muted/60 hover:border-champagne/30 transition-all hover:shadow-md">
                    <span className="text-3xl">{wallet.icon}</span>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-foreground">{wallet.name}</h3>
                        {wallet.id !== "walletconnect" && wallet.id !== "phantom" && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${detected ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-500"}`}>
                            {detected ? "Detected" : "Not Installed"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{wallet.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          )}

          {step === "role" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-champagne/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-champagne" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Wallet Connected!</h3>
              <p className="text-sm text-muted-foreground mb-2">{pendingName} - {pendingAddress}</p>
              <p className="text-sm text-muted-foreground mb-6">How do you want to use Encommerce?</p>
              <div className="space-y-3">
                <button onClick={() => handleRoleSelect("buyer")} className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-border/50 bg-muted/30 hover:border-champagne/50 hover:bg-champagne/5 transition-all text-left">
                  <div className="w-12 h-12 bg-castleton/10 rounded-xl flex items-center justify-center"><ShoppingBag className="w-6 h-6 text-castleton" /></div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">I want to Shop</h4>
                    <p className="text-xs text-muted-foreground">Browse products, buy with crypto, track orders</p>
                  </div>
                </button>
                <button onClick={() => handleRoleSelect("seller")} className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-border/50 bg-muted/30 hover:border-champagne/50 hover:bg-champagne/5 transition-all text-left">
                  <div className="w-12 h-12 bg-champagne/10 rounded-xl flex items-center justify-center"><Store className="w-6 h-6 text-champagne-dark" /></div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">I want to Sell</h4>
                    <p className="text-xs text-muted-foreground">List products, manage orders, track analytics</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === "connecting" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-champagne/20 border-t-champagne rounded-full animate-spin mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-1">Connecting...</h3>
              <p className="text-sm text-muted-foreground">Approve the request in your {wallets.find((w) => w.id === selectedWallet)?.name} popup</p>
            </div>
          )}

          {step === "error" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Connection Failed</h3>
              <p className="text-sm text-muted-foreground mb-6 px-4">{errorMsg}</p>
              <div className="flex gap-3">
                <button onClick={handleClose} className="flex-1 border border-border/50 text-foreground px-4 py-3 rounded-xl font-bold text-sm hover:bg-muted transition-colors">Cancel</button>
                <button onClick={() => { setStep("select"); setErrorMsg(""); }} className="flex-1 bg-champagne text-castleton-dark px-4 py-3 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">Try Again</button>
              </div>
            </div>
          )}

          {step === "connected" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-bold text-foreground mb-1">All Set!</h3>
              <p className="text-sm text-muted-foreground mb-4">Connected as <strong>{role}</strong></p>
              <div className="flex items-center justify-center gap-2 bg-muted rounded-xl px-4 py-3 mb-6">
                <span className="text-sm font-mono text-foreground">{pendingAddress}</span>
                <button onClick={handleCopy} className="text-muted-foreground hover:text-champagne transition-colors">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <button onClick={handleClose} className="w-full bg-champagne text-castleton-dark px-6 py-3 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">
                {role === "seller" ? "Go to Seller Dashboard" : "Start Shopping"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}