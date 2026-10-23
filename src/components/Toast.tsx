"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";

const ToastContext = createContext<(msg: string) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toast = useCallback((m: string) => {
    setMsg(m);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 3200);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
        <Check aria-hidden /> <span>{msg}</span>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
