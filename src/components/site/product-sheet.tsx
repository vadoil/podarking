import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Check } from "lucide-react";
import { useRequestCart } from "@/hooks/use-request-cart";
import { priceForQty } from "@/hooks/use-catalog";
import { fmtPrice, fmtNum } from "@/lib/format";
import type { GiftSet } from "@/data/types";

export function ProductSheet({ set, onClose }: { set: GiftSet | null; onClose: () => void }) {
  const { add } = useRequestCart();
  const [qty, setQty] = useState(50);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (set) {
      setQty(Math.max(set.min_qty, set.price_tiers[0]?.min_qty ?? 50));
      setComment("");
    }
  }, [set]);

  if (!set) return null;
  const price = priceForQty(set.price_tiers, qty);

  return (
    <Sheet open={!!set} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto bg-background">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl sm:text-3xl">{set.name}</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {set.budget_tier} · {set.packaging_type} · {set.weight_g} г · {set.audience === "детский" ? "Детский" : "Взрослый"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-5 overflow-hidden rounded-2xl border hairline">
          <img src={set.image_url} alt={set.name} className="aspect-[4/3] w-full object-cover" />
        </div>

        <p className="mt-5 text-sm leading-relaxed text-foreground/80">{set.description}</p>

        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-bordeaux">Состав</h4>
          <ul className="mt-3 space-y-2">
            {set.composition.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-gold shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 rounded-2xl border hairline bg-cream/60 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-bordeaux">Цена по тиражу</h4>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {set.price_tiers.map((t) => (
              <div
                key={t.min_qty}
                className={
                  "rounded-xl border bg-background px-3 py-3 text-center " +
                  (qty >= t.min_qty ? "border-bordeaux shadow-soft" : "border-foreground/10")
                }
              >
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">от {fmtNum(t.min_qty)} шт</div>
                <div className="font-display text-lg text-bordeaux">{fmtPrice(t.price)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Количество, шт</label>
            <div className="mt-2 flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setQty((q) => Math.max(1, q - 10))}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={qty}
                min={1}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 0))}
                className="text-center w-28"
              />
              <Button variant="outline" size="icon" onClick={() => setQty((q) => q + 10)}>
                <Plus className="h-4 w-4" />
              </Button>
              <div className="ml-auto text-right">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Примерно</div>
                <div className="font-display text-xl text-bordeaux">{fmtPrice(price * qty)}</div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Комментарий (опционально)</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Например, нужно брендирование логотипом или индивидуальная открытка"
              className="mt-2 bg-background"
              rows={3}
            />
          </div>

          <Button
            size="lg"
            className="bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full h-12"
            onClick={() => {
              add(set, qty);
              onClose();
            }}
          >
            Добавить в заявку
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Финальная цена фиксируется в коммерческом предложении.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
