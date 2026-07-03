"use client";

import { User, Shield, Bell, Palette, Wallet, Check, Monitor, Camera, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useWallet } from "@/components/WalletProvider";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

function shortenAddress(addr: string) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "..." + addr.slice(-4);
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

interface ProfileData {
  displayName: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

function getStorageKey(walletAddress: string, key: string) {
  return `encom-${walletAddress}-${key}`;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const { theme, setTheme, accentColor, setAccentColor, currency, setCurrency } = useTheme();
  const { connected, walletAddress, walletName, disconnect } = useWallet();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [securityToggles, setSecurityToggles] = useState<SecurityToggle[]>([
    { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", enabled: true },
    { label: "Login Notifications", desc: "Get notified of new login attempts", enabled: true },
    { label: "Auto-Lock Wallet", desc: "Automatically lock wallet after 5 minutes of inactivity", enabled: false },
    { label: "Transaction Signing", desc: "Require wallet signature for all transactions", enabled: true },
  ]);

  const [notifToggles, setNotifToggles] = useState<NotificationToggle[]>([
    { label: "Order Updates", desc: "Receive notifications about order status changes", enabled: true },
    { label: "Promotions", desc: "Get notified about sales and special offers", enabled: true },
    { label: "Price Alerts", desc: "Alerts when wishlist items change price", enabled: false },
    { label: "Security Alerts", desc: "Important security notifications", enabled: true },
  ]);

  const [profile, setProfile] = useState<ProfileData>({
    displayName: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
  });

  useEffect(() => {
    if (!walletAddress) return;

    const savedProfile = localStorage.getItem(getStorageKey(walletAddress, "profile"));
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile({
        displayName: walletName || "New User",
        email: "",
        phone: "",
        location: "",
        avatar: "",
      });
    }

    const savedSecurity = localStorage.getItem(getStorageKey(walletAddress, "security"));
    if (savedSecurity) {
      setSecurityToggles(JSON.parse(savedSecurity));
    }

    const savedNotifs = localStorage.getItem(getStorageKey(walletAddress, "notifications"));
    if (savedNotifs) {
      setNotifToggles(JSON.parse(savedNotifs));
    }
  }, [walletAddress, walletName]);

  const toggleSecurity = (index: number) => {
    const next = [...securityToggles];
    next[index].enabled = !next[index].enabled;
    setSecurityToggles(next);
    if (walletAddress) {
      localStorage.setItem(getStorageKey(walletAddress, "security"), JSON.stringify(next));
    }
  };

  const toggleNotification = (index: number) => {
    const next = [...notifToggles];
    next[index].enabled = !next[index].enabled;
    setNotifToggles(next);
    if (walletAddress) {
      localStorage.setItem(getStorageKey(walletAddress, "notifications"), JSON.stringify(next));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const updated = { ...profile, avatar: dataUrl };
      setProfile(updated);
      if (walletAddress) {
        localStorage.setItem(getStorageKey(walletAddress, "profile"), JSON.stringify(updated));
      }
    };
    reader.readAsDataURL(file);
  };

  const updateProfileField = (field: keyof ProfileData, value: string) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
  };

  const handleSaveProfile = () => {
    if (walletAddress) {
      localStorage.setItem(getStorageKey(walletAddress, "profile"), JSON.stringify(profile));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Settings</h1><p className="text-sm text-muted-foreground mt-1">Manage your account preferences and configurations</p></div>
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-2xl border border-border/50 p-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? "bg-castleton text-white" : "text-foreground/70 hover:bg-muted"}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border/50 p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground">Profile Settings</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative group">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-champagne to-coral flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{connected ? walletAddress.slice(2, 4).toUpperCase() : "0x"}</span>
                    </div>
                  )}
                  <button onClick={() => fileInputRef.current?.click()} className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </div>
                <div>
                  <button onClick={() => fileInputRef.current?.click()} className="text-sm font-semibold text-castleton dark:text-champagne hover:underline">Change Avatar</button>
                  <p className="text-xs text-muted-foreground mt-1">
                    {connected ? `Connected: ${shortenAddress(walletAddress)}` : "Connect wallet to set up profile"}
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { field: "displayName" as const, label: "Display Name", placeholder: "Enter display name" },
                  { field: "email" as const, label: "Email", placeholder: "you@example.com" },
                  { field: "phone" as const, label: "Phone", placeholder: "+1 (555) 000-0000" },
                  { field: "location" as const, label: "Location", placeholder: "City, Country" },
                ].map((f) => (
                  <div key={f.field}>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{f.label}</label>
                    <input
                      value={profile[f.field]}
                      onChange={(e) => updateProfileField(f.field, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50"
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleSaveProfile} className="bg-castleton text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-castleton-light transition-colors">
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          )}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-foreground">Security Settings</h2>
              <div className="space-y-4">
                {securityToggles.map((s, i) => (
                  <div key={s.label} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div><h3 className="text-sm font-medium text-foreground">{s.label}</h3><p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p></div>
                    <button onClick={() => toggleSecurity(i)} className={`w-12 h-6 rounded-full transition-colors relative ${s.enabled ? "bg-castleton" : "bg-border"}`}>
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
                    <button onClick={() => toggleNotification(i)} className={`w-12 h-6 rounded-full transition-colors relative ${n.enabled ? "bg-castleton" : "bg-border"}`}>
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
                      <button key={t.value} onClick={() => setTheme(t.value)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${theme === t.value ? "bg-castleton text-white" : "bg-muted text-foreground/70 hover:bg-muted/80"}`}>
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
                      <button key={c.value} onClick={() => setAccentColor(c.value)} className={`w-10 h-10 rounded-full ${c.color} ring-2 ring-offset-2 ring-offset-card transition-all ${accentColor === c.value ? "ring-castleton scale-110" : "ring-transparent hover:ring-border"}`} title={c.label} />
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
                  {(["USD", "ETH", "BTC", "USDT"] as const).map((c) => (
                    <button key={c} onClick={() => setCurrency(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${currency === c ? "bg-castleton text-white" : "bg-muted text-foreground/70 hover:bg-muted/80"}`}>{c}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
