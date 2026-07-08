import { useState } from "react";
import { Phone, Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequestCart } from "@/hooks/use-request-cart";

const NAV = [
  { id: "catalog", label: "Каталог" },
  { id: "process", label: "Как работаем" },
  { id: "advantages", label: "Преимущества" },
  { id: "cases", label: "Кейсы" },
  { id: "contacts", label: "Контакты" },
];

export function Header({ onLead }: { onLead: () => void }) {
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useRequestCart();

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 group" aria-label="Главная">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-festive text-white shadow-soft">
            <span className="font-display text-base leading-none">Н</span>
          </span>
          <span className="font-display text-lg leading-tight tracking-tight">
            Новогодний<span className="text-bordeaux">.Дом</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="text-foreground/75 hover:text-bordeaux transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+79170284011"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-bordeaux"
          >
            <Phone className="h-4 w-4 text-gold" />
            +7 917 028-40-11
          </a>

          <button
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-full border hairline px-3 py-2 text-sm hover:bg-cream transition"
            aria-label="Заявка"
          >
            <ShoppingBag className="h-4 w-4 text-bordeaux" />
            <span className="hidden sm:inline">Заявка</span>
            {count > 0 && (
              <span className="ml-0.5 inline-grid h-5 min-w-5 place-items-center rounded-full bg-bordeaux px-1.5 text-[11px] font-semibold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>

          <Button
            onClick={onLead}
            className="hidden sm:inline-flex bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full px-5 shadow-soft"
          >
            Получить расчёт
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md hover:bg-cream"
            aria-label="Меню"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t hairline bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-left text-base text-foreground/85 py-1"
              >
                {n.label}
              </button>
            ))}
            <a href="tel:+79170284011" className="text-bordeaux font-medium pt-2">
              +7 917 028-40-11
            </a>
            <Button onClick={() => { setOpen(false); onLead(); }} className="bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full mt-2">
              Получить расчёт
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
