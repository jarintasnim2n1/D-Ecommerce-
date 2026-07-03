"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type UserRole = "buyer" | "seller" | null;

interface WalletContextType {
  connected: boolean;
  walletAddress: string;
  walletName: string;
  role: UserRole;
  connect: (walletId: string, address: string, name: string, role: UserRole) => void;
  setRole: (role: UserRole) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  walletAddress: "",
  walletName: "",
  role: null,
  connect: () => {},
  setRole: () => {},
  disconnect: () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletName, setWalletName] = useState("");
  const [role, setRoleState] = useState<UserRole>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("encom-wallet");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setConnected(true);
        setWalletAddress(data.address);
        setWalletName(data.name);
        setRoleState(data.role || "buyer");
      } catch {}
    }
    setLoaded(true);
  }, []);

  const connect = useCallback((walletId: string, address: string, name: string, userRole: UserRole) => {
    setConnected(true);
    setWalletAddress(address);
    setWalletName(name);
    setRoleState(userRole);
    localStorage.setItem("encom-wallet", JSON.stringify({ walletId, address, name, role: userRole }));
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    const saved = localStorage.getItem("encom-wallet");
    if (saved) {
      const data = JSON.parse(saved);
      data.role = newRole;
      localStorage.setItem("encom-wallet", JSON.stringify(data));
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setWalletAddress("");
    setWalletName("");
    setRoleState(null);
    localStorage.removeItem("encom-wallet");
  }, []);

  if (!loaded) return null;

  return (
    <WalletContext.Provider value={{ connected, walletAddress, walletName, role, connect, setRole, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}
