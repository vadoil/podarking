import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Factory, Boxes, Mail, Send, Sparkles } from "lucide-react";

type HeroProps = {
  onLead: () => void;
  onCatalog: () => void;
  onLeadChannel?: (c: "email" | "telegram") => void;
};

const BOXES = [
  { src: "/boxes/box-2.webp", rot: -6,  top: "4%",  left: "8%",  w: "56%", delay: 0,   z: 30 },
  { src: "/boxes/box-6.jpg",  rot:  4,  top: "10%", left: "48%", w: "52%", delay: 0.4, z: 20 },
  { src: "/boxes/box-9.png",  rot: -3,  top: "46%", left: "2%",  w: "44%", delay: 0.8, z: 25 },
  { src: "/boxes/box-7.jpg",  rot:  6,  top: "52%", left: "44%", w: "50%", delay: 1.2, z: 35 },
];

const MARQUEE = [
  "/boxes/box-1.webp", "/boxes/box-2.webp", "/boxes/box-3.webp", "/boxes/box-4.webp",
  "/boxes/box-5.jpg",  "/boxes/box-6.jpg",  "/boxes/box-7.jpg",  "/boxes/box-8.webp",
  "/boxes/box-9.png",  "/boxes/box-10.png",
];
const MARQUEE_LOOP = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];

export function Hero({ onLead, onCatalog, onLeadChannel }: HeroProps) {
  const handleChannel = (c: "email" | "telegram") => (onLeadChannel ? onLeadChannel(c) : onLead());
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 sparkle-bg opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-gold-soft/50 blur-3xl" />
      <div className="absolute top-20 -right-24 -z-10 h-[460px] w-[460px] rounded-full bg-[color:var(--bordeaux)]/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 flex flex-col justify-center"
        >
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-full border border-gold/50 bg-gradient-to-r from-gold-soft/70 via-white to-gold-soft/70 px-4 py-1.5 text-xs font-semibold text-bordeaux shadow-[0_8px_24px_-8px_rgba(191,149,63,0.45)] backdrop-blur"
          >
            <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[shimmer-x_2.6s_ease-in-out_infinite]" />
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/50 opacity-75" />
              <Sparkles className="relative h-3.5 w-3.5 text-gold" />
            </span>
            <span className="relative tracking-wide">
              Сезон <span className="text-shimmer font-display text-sm">2026-2027</span>
              <span className="mx-2 text-gold/60">·</span>
              Открыт приём заявок
            </span>
            <span className="relative ml-1 rounded-full bg-bordeaux px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">New</span>
          </motion.span>

          <h1 className="font-display mt-6 text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-[4rem]">
            Любой подарок,<br />
            <span className="text-shimmer">под любую задачу и бюджет</span><br />
            <span className="text-foreground/85">оперативно и в любом объёме</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Собираем корпоративные новогодние подарки индивидуально: состав, упаковка, брендирование&nbsp;- под ваши цели и бюджет.
            Быстро и&nbsp;надёжно&nbsp;- от&nbsp;компании, которая специализируется на&nbsp;оптовых поставках продуктов питания
            с&nbsp;заводов России и&nbsp;Беларуси.
          </p>

          <div className="mt-8 rounded-2xl border hairline bg-card/85 p-4 shadow-card backdrop-blur">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Презентация с подарками, ценами и сроками
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Button
                size="lg"
                onClick={() => handleChannel("email")}
                className="bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full h-12 shadow-card"
              >
                <Mail className="mr-2 h-4 w-4" /> Получить на e-mail
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-evergreen hover:bg-evergreen/90 text-white rounded-full h-12 shadow-card"
              >
                <a
                  href="https://t.me/new_world10RM?text=Заявка%20по%20новогодним%20подаркам"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="mr-2 h-4 w-4" /> Получить в Telegram
                </a>
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

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
            {[
              { icon: Factory, t: "Прямые поставки с заводов" },
              { icon: ShieldCheck, t: "Сертификаты качества" },
              { icon: Boxes, t: "Тираж от 500 шт" },
              { icon: Truck, t: "Доставка по РФ" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-start gap-2 text-foreground/80">
                <Icon className="mt-0.5 h-4 w-4 text-gold shrink-0" />
                <span className="leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Floating boxes collage */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-[600px]">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-soft/60 via-cream to-[color:var(--bordeaux)]/8 blur-2xl" />
          {BOXES.map((b, i) => (
            <motion.div
              key={b.src + i}
              initial={{ opacity: 0, scale: 0.85, y: 30, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: b.rot }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                top: b.top,
                left: b.left,
                width: b.w,
                zIndex: b.z,
                ["--rot" as string]: `${b.rot}deg`,
                animationDelay: `${b.delay}s`,
              }}
              className="absolute animate-float drop-shadow-[0_30px_40px_rgba(80,20,30,0.18)]"
            >
              <div className="overflow-hidden rounded-2xl border hairline bg-white">
                <img
                  src={b.src}
                  alt="Новогодняя подарочная коробка"
                  loading="eager"
                  className="block h-auto w-full object-cover"
                />
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="absolute bottom-2 left-2 z-40 rounded-2xl border hairline bg-background/95 px-4 py-3 shadow-card backdrop-blur"
          >
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">от</div>
            <div className="font-display text-2xl text-bordeaux leading-none">350 ₽ / шт</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="absolute right-1 top-2 z-40 rounded-full border border-gold/40 bg-card/95 px-3.5 py-1.5 text-[11px] font-medium text-bordeaux shadow-soft backdrop-blur"
          >
            ★ 200+ корпоративных клиентов
          </motion.div>
        </div>
      </div>

      {/* Boxes marquee strip */}
      <div className="relative border-y hairline bg-card/60 py-5 overflow-hidden">
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max gap-6 animate-marquee">
          {MARQUEE_LOOP.map((src, i) => (
            <div
              key={src + i}
              className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border hairline bg-white shadow-soft"
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
