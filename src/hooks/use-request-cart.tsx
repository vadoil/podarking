import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartItem, GiftSet } from "@/data/types";
import { priceForQty } from "@/hooks/use-catalog";

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;
  add: (set: GiftSet, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function RequestCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((set: GiftSet, qty = Math.max(50, set.min_qty)) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.set.id === set.id);
      if (existing) {
        return prev.map((i) =>
          i.set.id === set.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { set, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.set.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.set.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, total } = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce(
      (s, i) => s + priceForQty(i.set.price_tiers, i.qty) * i.qty,
      0,
    );
    return { count, total };
  }, [items]);

  const value: CartCtx = {
    items, count, total, add, remove, setQty, clear,
    isOpen, open: () => setOpen(true), close: () => setOpen(false),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRequestCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useRequestCart must be used inside RequestCartProvider");
  return v;
}
