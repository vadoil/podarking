import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Factory, Boxes, Mail, Send } from "lucide-react";
import heroImg from "@/assets/hero-gifts.jpg";

type HeroProps = {
  onLead: () => void;
  onCatalog: () => void;
  onLeadChannel?: (c: "email" | "telegram") => void;
};

export function Hero({ onLead, onCatalog, onLeadChannel }: HeroProps) {
  const handleChannel = (c: "email" | "telegram") => (onLeadChannel ? onLeadChannel(c) : onLead());
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

          <div className="mt-8 rounded-2xl border hairline bg-card/80 p-4 shadow-soft backdrop-blur">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Получите презентацию с подарками, ценами и сроками
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button
                size="lg"
                onClick={() => handleChannel("email")}
                className="bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full h-12 text-sm sm:text-base shadow-card"
              >
                <Mail className="mr-2 h-4 w-4" /> Получить по e-mail
              </Button>
              <Button
                size="lg"
                onClick={() => handleChannel("telegram")}
                className="bg-evergreen hover:bg-evergreen/90 text-white rounded-full h-12 text-sm sm:text-base shadow-card"
              >
                <Send className="mr-2 h-4 w-4" /> Получить в Telegram
              </Button>
            </div>
            <button
              type="button"
              onClick={onCatalog}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-bordeaux"
            >
              или сразу посмотреть готовые наборы <ArrowRight className="h-3.5 w-3.5" />
            </button>
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
