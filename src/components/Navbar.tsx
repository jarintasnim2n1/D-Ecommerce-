"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, ShoppingCart, Menu, X, User, Wallet, Sun, Moon, LogOut, Store, ChevronDown,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useTheme } from "@/components/ThemeProvider";
import { useWallet } from "@/components/WalletProvider";
import WalletModal from "@/components/WalletModal";

const allNavLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
  { label: "Dashboard", href: "/dashboard", role: "buyer" as const },
  { label: "Seller", href: "/seller", role: "seller" as const },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const { connected, walletAddress, walletName, disconnect, role } = useWallet();

  const navLinks = allNavLinks.filter((l) => !l.role || l.role === role);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (!connected) setAccountOpen(false); }, [connected]);

  const dashboardHref = role === "seller" ? "/seller" : "/dashboard";

  return (
    <>
      <nav className="bg-card border-b border-border sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-castleton rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <span className="text-xl font-bold text-castleton-dark dark:text-champagne tracking-tight">Encommerce</span>
                <span className="text-[10px] block text-champagne-dark dark:text-champagne font-medium -mt-1 tracking-widest uppercase">Web3 Store</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-castleton dark:hover:text-champagne transition-colors rounded-lg hover:bg-muted">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-2 bg-muted rounded-full px-4 py-2.5 text-sm text-muted-foreground hover:bg-border transition-colors w-48 lg:w-64">
                <Search className="w-4 h-4" />
                <span>Search products...</span>
              </button>

              {/* Connect / Connected wallet button */}
              {mounted && connected ? (
                <button
                  onClick={() => setWalletOpen(true)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{walletAddress}</span>
                </button>
              ) : (
                <button onClick={() => setWalletOpen(true)} className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-castleton dark:text-champagne hover:bg-castleton/5 dark:hover:bg-champagne/10 rounded-lg transition-colors">
                  <Wallet className="w-4 h-4" />
                  <span>Connect</span>
                </button>
              )}

              <button onClick={() => setTheme(dark ? "light" : "dark")} className="p-2.5 text-foreground/70 hover:text-champagne hover:bg-muted rounded-lg transition-colors" aria-label="Toggle theme">
                {mounted && dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link href="/dashboard" className="relative p-2.5 text-foreground/70 hover:text-castleton hover:bg-castleton/5 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-champagne text-castleton-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Account button: opens wallet if not connected, shows dropdown if connected */}
              <div className="relative hidden sm:block">
                {mounted && connected ? (
                  <>
                    <button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-1.5 p-2.5 text-foreground/70 hover:text-castleton hover:bg-castleton/5 rounded-lg transition-colors">
                      <User className="w-5 h-5" />
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {accountOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl border border-border/50 shadow-xl z-50 py-2 overflow-hidden">
                          <div className="px-4 py-3 border-b border-border/50">
                            <p className="text-xs font-medium text-muted-foreground">Connected as</p>
                            <p className="text-sm font-bold text-foreground">{walletName}</p>
                            <p className="text-xs font-mono text-muted-foreground">{walletAddress}</p>
                            <span className="inline-block mt-1 text-[10px] font-bold text-champagne uppercase bg-champagne/10 px-2 py-0.5 rounded-full">{role}</span>
                          </div>
                          <Link href={dashboardHref} onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted transition-colors">
                            <LayoutDashboardIcon /> Dashboard
                          </Link>
                          <Link href="/dashboard/settings" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted transition-colors">
                            <SettingsIcon /> Settings
                          </Link>
                          <div className="border-t border-border/50 mt-1 pt-1">
                            <button onClick={() => { disconnect(); setAccountOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                              <LogOut className="w-4 h-4" /> Disconnect
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <button onClick={() => setWalletOpen(true)} className="flex items-center gap-1.5 p-2.5 text-foreground/70 hover:text-castleton hover:bg-castleton/5 rounded-lg transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                )}
              </div>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2.5 text-foreground/70 hover:text-castleton hover:bg-castleton/5 rounded-lg transition-colors">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="px-4 py-4 space-y-1">
              <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3 text-sm text-muted-foreground mb-3">
                <Search className="w-4 h-4" />
                <span>Search products...</span>
              </div>
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-castleton hover:bg-muted rounded-lg transition-colors">
                  {link.label}
                </Link>
              ))}
              {mounted && connected ? (
                <>
                  <Link href={dashboardHref} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-castleton hover:bg-muted rounded-lg transition-colors">Dashboard</Link>
                  <button onClick={() => { disconnect(); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-green-600 dark:text-green-400 w-full hover:bg-green-500/10 rounded-lg transition-colors">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{walletAddress}</span>
                    <LogOut className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </>
              ) : (
                <button onClick={() => { setWalletOpen(true); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-castleton dark:text-champagne w-full hover:bg-muted rounded-lg transition-colors">
                  <Wallet className="w-4 h-4" /> Connect Wallet
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} />
    </>
  );
}

function LayoutDashboardIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
}
function SettingsIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
