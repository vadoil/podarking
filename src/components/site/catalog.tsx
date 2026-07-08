import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Info, Weight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./decor";
import { useCatalog, lowestPrice } from "@/hooks/use-catalog";
import { useRequestCart } from "@/hooks/use-request-cart";
import { fmtPrice, fmtNum } from "@/lib/format";
import type { GiftSet } from "@/data/types";
import { ProductSheet } from "./product-sheet";

const BUDGET = ["Все", "Эконом", "Стандарт", "Премиум"] as const;
const PACKAGING = ["Все", "Картон", "Жесть", "Текстиль", "Дерево"] as const;
const AUDIENCE = ["Все", "взрослый", "детский"] as const;

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 text-sm transition " +
        (active
          ? "bg-bordeaux text-white border-bordeaux shadow-soft"
          : "border-foreground/12 bg-background hover:bg-cream text-foreground/80")
      }
    >
      {children}
    </button>
  );
}

export function Catalog() {
  const { data, loading } = useCatalog();
  const { add } = useRequestCart();
  const [budget, setBudget] = useState<(typeof BUDGET)[number]>("Все");
  const [pack, setPack] = useState<(typeof PACKAGING)[number]>("Все");
  const [aud, setAud] = useState<(typeof AUDIENCE)[number]>("Все");
  const [active, setActive] = useState<GiftSet | null>(null);

  const filtered = useMemo(() => {
    return data.filter((s) =>
      (budget === "Все" || s.budget_tier === budget) &&
      (pack === "Все" || s.packaging_type === pack) &&
      (aud === "Все" || s.audience === aud),
    );
  }, [data, budget, pack, aud]);

  return (
    <section id="catalog" className="py-20 sm:py-24 bg-cream/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Каталог · сезон 2026–2027"
          title="24 готовых набора — от 420 ₽ напрямую с завода"
          subtitle="Свежая продукция, полный пакет документов, упаковка на выбор: картон (в т.ч. дизайнерский), жесть, текстиль, дерево. Отгружаем точно в срок — успеваем даже в декабрьский ажиотаж."
        />

        <div className="mt-10 space-y-3">
          <FilterRow label="По бюджету" items={BUDGET} value={budget} onChange={setBudget} />
          <FilterRow label="По упаковке" items={PACKAGING} value={pack} onChange={setPack} />
          <FilterRow
            label="Аудитория"
            items={AUDIENCE}
            value={aud}
            onChange={setAud}
            render={(v) => (v === "Все" ? "Все" : v === "детский" ? "Детские" : "Взрослые")}
          />
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[460px] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
                className="group flex flex-col overflow-hidden rounded-2xl border hairline bg-card shadow-soft hover:shadow-lift tilt-on-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden product-tile">
                  <img
                    src={s.image_url}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-[1.06] drop-shadow-[0_18px_24px_rgba(80,20,30,0.18)]"
                  />
                  <div className="absolute left-3 top-3 z-10 flex gap-2">
                    <span className="rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-bordeaux backdrop-blur">
                      {s.budget_tier}
                    </span>
                    <span className="rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur">
                      {s.packaging_type}
                    </span>
                  </div>
                  <span className="absolute right-3 top-3 z-10 rounded-full bg-bordeaux/95 px-2.5 py-1 text-[11px] font-medium text-white shadow-soft">
                    от {fmtNum(s.min_qty)} шт
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl leading-tight">{s.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-foreground/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Weight className="h-3.5 w-3.5 text-gold" /> {s.weight_g} г
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Package className="h-3.5 w-3.5 text-gold" /> {s.packaging_type}
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline justify-between border-t hairline pt-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">от</div>
                      <div className="font-display text-2xl text-bordeaux leading-none">
                        {fmtPrice(lowestPrice(s.price_tiers))}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">за шт.</div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full border-foreground/12 hover:bg-cream"
                      onClick={() => setActive(s)}
                    >
                      <Info className="h-4 w-4 mr-1.5" />
                      Подробнее
                    </Button>
                    <Button
                      className="flex-1 rounded-full bg-bordeaux hover:bg-bordeaux/90 text-white"
                      onClick={() => add(s)}
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      В заявку
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">Ничего не найдено по выбранным фильтрам.</p>
        )}
      </div>

      <ProductSheet set={active} onClose={() => setActive(null)} />
    </section>
  );
}

function FilterRow<T extends string>({
  label, items, value, onChange, render,
}: {
  label: string;
  items: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render?: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs uppercase tracking-widest text-muted-foreground">{label}:</span>
      {items.map((v) => (
        <Chip key={v} active={v === value} onClick={() => onChange(v)}>
          {render ? render(v) : v}
        </Chip>
      ))}
    </div>
  );
}
