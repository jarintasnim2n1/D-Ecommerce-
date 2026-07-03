"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store/store";
import { WalletProvider, useWallet } from "@/components/WalletProvider";
import { ToastProvider } from "@/components/Toast";
import { useAppDispatch } from "@/store/hooks";
import { loadCart } from "@/store/slices/cartSlice";
import { loadWishlist } from "@/store/slices/wishlistSlice";

function CartWishlistSync() {
  const dispatch = useAppDispatch();
  const { connected, walletAddress } = useWallet();
  const prevAddress = useRef<string>("");

  useEffect(() => {
    if (connected && walletAddress) {
      const savedCart = localStorage.getItem(`encom-${walletAddress}-cart`);
      if (savedCart) {
        try { dispatch(loadCart(JSON.parse(savedCart))); } catch {}
      }
      const savedWishlist = localStorage.getItem(`encom-${walletAddress}-wishlist`);
      if (savedWishlist) {
        try { dispatch(loadWishlist(JSON.parse(savedWishlist))); } catch {}
      }
    } else {
      dispatch(loadCart([]));
      dispatch(loadWishlist([]));
    }
    prevAddress.current = walletAddress;
  }, [connected, walletAddress, dispatch]);

  return null;
}

function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const { connected, walletAddress } = useWallet();
  const prevAddress = useRef<string>("");

  useEffect(() => {
    if (!connected || !walletAddress) return;
    const unsub = storeRef.current!.subscribe(() => {
      const state = storeRef.current!.getState();
      localStorage.setItem(`encom-${walletAddress}-cart`, JSON.stringify(state.cart.items));
      localStorage.setItem(`encom-${walletAddress}-wishlist`, JSON.stringify(state.wishlist.items));
    });
    return () => unsub();
  }, [connected, walletAddress]);

  return (
    <Provider store={storeRef.current}>
      <CartWishlistSync />
      {children}
    </Provider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <StoreProvider>
        <ToastProvider>{children}</ToastProvider>
      </StoreProvider>
    </WalletProvider>
  );
}
