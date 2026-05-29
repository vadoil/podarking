import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Factory, Boxes } from "lucide-react";
import heroImg from "@/assets/hero-gifts.jpg";

export function Hero({ onLead, onCatalog }: { onLead: () => void; onCatalog: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 sparkle-bg opacity-60 pointer-events-none" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-xs font-medium text-bordeaux">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Сезон 2025–2026 · Принимаем заявки
          </span>

          <h1 className="font-display mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Новогодние подарки <span className="text-bordeaux">оптом</span>
            <br />
            для вашего бизнеса
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Собираем сладкие подарки из продукции кондитерских заводов России и&nbsp;Беларуси.
            Любой бюджет, брендирование, доставка по&nbsp;всей России.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={onLead}
              className="bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full px-7 h-12 text-base shadow-card"
            >
              Получить каталог и&nbsp;прайс <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onCatalog}
              className="rounded-full px-7 h-12 text-base border-foreground/15 hover:bg-cream"
            >
              Рассчитать заказ
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
            {[
              { icon: Factory, t: "Прямые поставки с заводов" },
              { icon: ShieldCheck, t: "Сертификаты качества" },
              { icon: Boxes, t: "от 50 шт" },
              { icon: Truck, t: "Доставка по РФ" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-start gap-2 text-foreground/80">
                <Icon className="mt-0.5 h-4 w-4 text-gold shrink-0" />
                <span className="leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gold-soft/40 blur-2xl" />
          <div className="overflow-hidden rounded-[1.75rem] border hairline bg-card shadow-lift">
            <img
              src={heroImg}
              alt="Премиальные новогодние подарочные наборы со сладостями"
              width={1600}
              height={1200}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="absolute -bottom-5 -left-4 rounded-2xl border hairline bg-background/95 px-4 py-3 shadow-card backdrop-blur">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">от</div>
            <div className="font-display text-2xl text-bordeaux leading-none">350 ₽ / шт</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
