"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, X, ShoppingCart, Heart, Share2, AlertCircle } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
  icon: ReactNode;
}

interface ToastContextType {
  toast: (message: string, type?: "success" | "error" | "info", icon?: ReactNode) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "success", icon?: ReactNode) => {
    const id = Date.now();
    const defaultIcon = type === "success" ? <CheckCircle2 className="w-4 h-4" /> : type === "error" ? <AlertCircle className="w-4 h-4" /> : null;
    setToasts((prev) => [...prev, { id, message, type, icon: icon || defaultIcon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[200] space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-top-4 border ${
              t.type === "success" ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" :
              t.type === "error" ? "bg-red-500/10 text-red-500 border-red-500/20" :
              "bg-champagne/10 text-champagne border-champagne/20"
            }`}
          >
            {t.icon}
            <span>{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="ml-2 p-0.5 hover:bg-muted/50 rounded transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
