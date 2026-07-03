"use client";

import { Store, Save, Camera, Shield, Bell, Palette, Wallet, Check, Monitor } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useWallet } from "@/components/WalletProvider";

function shortenAddress(addr: string) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function getStorageKey(walletAddress: string, key: string) {
  return `encom-seller-${walletAddress}-${key}`;
}

interface StoreProfile {
  storeName: string;
  description: string;
  email: string;
  phone: string;
  storeUrl: string;
  avatar: string;
}

interface SecurityToggle {
  label: string;
  desc: string;
  enabled: boolean;
}

interface NotificationToggle {
  label: string;
  desc: string;
  enabled: boolean;
}

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState("store");
  const [saved, setSaved] = useState(false);
  const { theme, setTheme, accentColor, setAccentColor, currency, setCurrency } = useTheme();
  const { connected, walletAddress, walletName, disconnect } = useWallet();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [storeProfile, setStoreProfile] = useState<StoreProfile>({
    storeName: "",
    description: "",
    email: "",
    phone: "",
    storeUrl: "",
    avatar: "",
  });

  const [securityToggles, setSecurityToggles] = useState<SecurityToggle[]>([
    { label: "Two-Factor Authentication", desc: "Secure your seller account with 2FA", enabled: true },
    { label: "Login Notifications", desc: "Get notified of new login attempts", enabled: true },
    { label: "Auto-Lock Wallet", desc: "Automatically lock wallet after inactivity", enabled: false },
    { label: "Transaction Signing", desc: "Require wallet signature for all transactions", enabled: true },
    { label: "Payout Notifications", desc: "Get notified when payouts are processed", enabled: true },
  ]);

  const [notifToggles, setNotifToggles] = useState<NotificationToggle[]>([
    { label: "New Orders", desc: "Get notified when a buyer places an order", enabled: true },
    { label: "Order Updates", desc: "Receive notifications about order status changes", enabled: true },
    { label: "Product Reviews", desc: "Get notified when buyers leave reviews", enabled: true },
    { label: "Payout Alerts", desc: "Alerts when payouts are processed to your wallet", enabled: true },
    { label: "Promotions", desc: "Get notified about seller platform updates", enabled: false },
  ]);

  useEffect(() => {
    if (!walletAddress) return;

    const savedProfile = localStorage.getItem(getStorageKey(walletAddress, "profile"));
    if (savedProfile) {
      setStoreProfile(JSON.parse(savedProfile));
    } else {
      setStoreProfile({
        storeName: walletName ? `${walletName} Store` : "My Store",
        description: "",
        email: "",
        phone: "",
        storeUrl: "",
        avatar: "",
      });
    }

    const savedSecurity = localStorage.getItem(getStorageKey(walletAddress, "security"));
    if (savedSecurity) setSecurityToggles(JSON.parse(savedSecurity));

    const savedNotifs = localStorage.getItem(getStorageKey(walletAddress, "notifications"));
    if (savedNotifs) setNotifToggles(JSON.parse(savedNotifs));
  }, [walletAddress, walletName]);

  const toggleSecurity = (index: number) => {
    const next = [...securityToggles];
    next[index].enabled = !next[index].enabled;
    setSecurityToggles(next);
    if (walletAddress) localStorage.setItem(getStorageKey(walletAddress, "security"), JSON.stringify(next));
  };

  const toggleNotification = (index: number) => {
    const next = [...notifToggles];
    next[index].enabled = !next[index].enabled;
    setNotifToggles(next);
    if (walletAddress) localStorage.setItem(getStorageKey(walletAddress, "notifications"), JSON.stringify(next));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const updated = { ...storeProfile, avatar: dataUrl };
      setStoreProfile(updated);
      if (walletAddress) localStorage.setItem(getStorageKey(walletAddress, "profile"), JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (walletAddress) localStorage.setItem(getStorageKey(walletAddress, "profile"), JSON.stringify(storeProfile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "store", label: "Store Profile", icon: Store },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Store Settings</h1><p className="text-sm text-muted-foreground mt-1">Manage your store profile and preferences</p></div>
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl border border-border/50 p-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? "bg-champagne text-castleton-dark" : "text-foreground/70 hover:bg-muted"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border/50 p-6">
          {activeTab === "store" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground">Store Profile</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative group">
                  {storeProfile.avatar ? (
                    <img src={storeProfile.avatar} alt="Store Avatar" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-champagne to-coral flex items-center justify-center">
                      <Store className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </div>
                <div>
                  <button onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold text-champagne hover:underline">Change Store Logo</button>
                  <p className="text-xs text-muted-foreground mt-1">{connected ? `Connected: ${shortenAddress(walletAddress)}` : "Connect wallet"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Store Name</label><input value={storeProfile.storeName} onChange={(e) => setStoreProfile({ ...storeProfile, storeName: e.target.value })} placeholder="My Store" className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label><textarea rows={3} value={storeProfile.description} onChange={(e) => setStoreProfile({ ...storeProfile, description: e.target.value })} placeholder="Describe your store..." className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50 resize-none" /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Email</label><input value={storeProfile.email} onChange={(e) => setStoreProfile({ ...storeProfile, email: e.target.value })} placeholder="store@example.com" className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
                  <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</label><input value={storeProfile.phone} onChange={(e) => setStoreProfile({ ...storeProfile, phone: e.target.value })} placeholder="+1 (555) 000-0000" className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
                </div>
                <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Store URL</label><input value={storeProfile.storeUrl} onChange={(e) => setStoreProfile({ ...storeProfile, storeUrl: e.target.value })} placeholder="mystore.encommerce.io" className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
              </div>
            </div>
          )}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground">Security Settings</h2>
              <div className="space-y-4">
                {securityToggles.map((s, i) => (
                  <div key={s.label} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div><h3 className="text-sm font-medium text-foreground">{s.label}</h3><p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p></div>
                    <button onClick={() => toggleSecurity(i)} className={`w-12 h-6 rounded-full transition-colors relative ${s.enabled ? "bg-champagne" : "bg-border"}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${s.enabled ? "left-6" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground">Notification Preferences</h2>
              <div className="space-y-4">
                {notifToggles.map((n, i) => (
                  <div key={n.label} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div><h3 className="text-sm font-medium text-foreground">{n.label}</h3><p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p></div>
                    <button onClick={() => toggleNotification(i)} className={`w-12 h-6 rounded-full transition-colors relative ${n.enabled ? "bg-champagne" : "bg-border"}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${n.enabled ? "left-6" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground">Appearance</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-xl">
                  <h3 className="text-sm font-medium text-foreground mb-3">Theme</h3>
                  <div className="flex gap-3">
                    {([
                      { value: "light" as const, label: "Light" },
                      { value: "dark" as const, label: "Dark" },
                      { value: "system" as const, label: "System" },
                    ]).map((t) => (
                      <button key={t.value} onClick={() => setTheme(t.value)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${theme === t.value ? "bg-champagne text-castleton-dark" : "bg-muted text-foreground/70 hover:bg-muted/80"}`}>
                        {theme === t.value && <Check className="w-4 h-4" />}
                        {t.value === "system" && <Monitor className="w-4 h-4" />}
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl">
                  <h3 className="text-sm font-medium text-foreground mb-3">Accent Color</h3>
                  <div className="flex gap-3">
                    {([
                      { value: "green" as const, color: "bg-castleton", label: "Green" },
                      { value: "coral" as const, color: "bg-coral", label: "Coral" },
                      { value: "gold" as const, color: "bg-champagne", label: "Gold" },
                      { value: "purple" as const, color: "bg-purple-500", label: "Purple" },
                    ]).map((c) => (
                      <button key={c.value} onClick={() => setAccentColor(c.value)} className={`w-10 h-10 rounded-full ${c.color} ring-2 ring-offset-2 ring-offset-card transition-all ${accentColor === c.value ? "ring-champagne scale-110" : "ring-transparent hover:ring-border"}`} title={c.label} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "wallet" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground">Wallet Settings</h2>
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground">Connected Wallet</h3>
                  {connected ? (
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Connected</span>
                  ) : (
                    <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full">Not Connected</span>
                  )}
                </div>
                {connected ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center"><span className="text-white text-xs font-bold">{walletName?.charAt(0) || "W"}</span></div>
                      <div><p className="text-sm font-medium text-foreground">{walletName}</p><p className="text-xs text-muted-foreground font-mono">{shortenAddress(walletAddress)}</p></div>
                    </div>
                    <button onClick={() => { disconnect(); window.location.href = "/"; }} className="text-sm font-semibold text-red-500 hover:underline">Disconnect Wallet</button>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Connect a wallet from the navbar to manage it here.</p>
                )}
              </div>
              <div className="p-4 bg-muted/30 rounded-xl">
                <h3 className="text-sm font-medium text-foreground mb-3">Default Currency</h3>
                <div className="flex gap-3">
                  {(["ETH", "USDT", "USD", "BTC"] as const).map((c) => (
                    <button key={c} onClick={() => setCurrency(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${currency === c ? "bg-champagne text-castleton-dark" : "bg-muted text-foreground/70 hover:bg-muted/80"}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl">
                <h3 className="text-sm font-medium text-foreground mb-3">Payment Settings</h3>
                <div className="space-y-3">
                  <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Receiving Address</label><div className="mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground font-mono">{connected ? walletAddress : "Connect wallet"}</div></div>
                  <div className="text-xs text-muted-foreground">Platform Fee: 2.5% per transaction</div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-6">
            <button onClick={handleSave} className="bg-champagne text-castleton-dark px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" /> {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
