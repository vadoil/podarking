import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { GiftSet, PriceTier } from "@/data/types";

export function useCatalog() {
  const [data, setData] = useState<GiftSet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("gift_sets")
        .select("*")
        .eq("available", true)
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      if (error) {
        console.error("[catalog]", error);
        setData([]);
      } else {
        setData(
          (data ?? []).map((r: Record<string, unknown>) => ({
            ...(r as object),
            price_tiers: (r.price_tiers as PriceTier[]) ?? [],
            composition: (r.composition as string[]) ?? [],
          })) as GiftSet[],
        );
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}

export function lowestPrice(tiers: PriceTier[]): number {
  if (!tiers.length) return 0;
  return Math.min(...tiers.map((t) => t.price));
}

export function priceForQty(tiers: PriceTier[], qty: number): number {
  const sorted = [...tiers].sort((a, b) => a.min_qty - b.min_qty);
  let price = sorted[0]?.price ?? 0;
  for (const t of sorted) {
    if (qty >= t.min_qty) price = t.price;
  }
  return price;
}
