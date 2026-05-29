import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestCart } from "@/hooks/use-request-cart";
import { priceForQty } from "@/hooks/use-catalog";
import { fmtPrice } from "@/lib/format";
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react";

export function RequestCartSheet({ onCheckout }: { onCheckout: () => void }) {
  const { isOpen, close, items, setQty, remove, total, count } = useRequestCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && close()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-2xl">Ваша заявка</SheetTitle>
          <SheetDescription>
            {count === 0 ? "Пока пусто. Добавьте подарки из каталога." : `${count} шт. в заявке`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-4 -mx-2 px-2 space-y-3">
          {items.length === 0 && (
            <div className="grid place-items-center py-16 text-center text-muted-foreground">
              <ShoppingBag className="h-10 w-10 text-gold mb-3" />
              <p className="text-sm">Здесь появятся выбранные подарки.</p>
            </div>
          )}

          {items.map((it) => {
            const price = priceForQty(it.set.price_tiers, it.qty);
            return (
              <div key={it.set.id} className="flex gap-3 rounded-2xl border hairline bg-card p-3">
                <img
                  src={it.set.image_url}
                  alt={it.set.name}
                  className="h-20 w-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-sm leading-tight">{it.set.name}</div>
                    <button
                      onClick={() => remove(it.set.id)}
                      className="text-muted-foreground hover:text-bordeaux p-1 -mr-1 -mt-1"
                      aria-label="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {it.set.budget_tier} · {it.set.packaging_type}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setQty(it.set.id, it.qty - 10)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={it.qty}
                        onChange={(e) => setQty(it.set.id, Number(e.target.value) || 1)}
                        className="h-7 w-16 text-center text-sm"
                      />
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setQty(it.set.id, it.qty + 10)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{fmtPrice(price)} × {it.qty}</div>
                      <div className="font-display text-bordeaux">{fmtPrice(price * it.qty)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="border-t hairline pt-4 mt-2 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Примерная сумма</span>
              <span className="font-display text-2xl text-bordeaux">{fmtPrice(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Итоговая цена фиксируется в&nbsp;коммерческом предложении после согласования состава и&nbsp;тиража.
            </p>
            <Button
              size="lg"
              className="w-full bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full h-12"
              onClick={() => { close(); onCheckout(); }}
            >
              Оформить заявку
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
