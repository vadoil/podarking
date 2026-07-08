import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "./decor";

const LOGOS = ["СтройИнвест", "ТехноПром", "АльфаГрупп", "МедСервис", "ЛогистикПро", "БизнесЛайн"];

const CASES = [
  { c: "Производственный холдинг", q: "3 200 шт", r: "Подарки для сотрудников и их детей. Брендированная упаковка, доставка на 4 склада в РФ." },
  { c: "IT-компания", q: "850 шт", r: "Премиальные подарки в текстильных мешочках для партнёров и ключевых клиентов." },
  { c: "Сеть медицинских клиник", q: "1 400 шт", r: "Универсальные наборы с логотипом для медперсонала всех филиалов." },
];

const REVIEWS = [
  { who: "Анна, HR-директор", co: "Логистическая компания", t: "Заказывали 1500 подарков для сотрудников. Менеджер на связи каждый день, упаковка с нашим логотипом — точно в срок. Будем работать дальше." },
  { who: "Дмитрий, директор по маркетингу", co: "Финансовый сектор", t: "Премиальные деревянные ларцы для VIP-клиентов произвели нужное впечатление. Качество продукции — на высоте." },
];

export function Cases() {
  return (
    <section id="cases" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Кейсы и клиенты" title="От региональных заводов до федеральных сетей — доставляем в срок" subtitle="Реальные проекты сезона: тиражи, состав, брендирование и сроки." />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {LOGOS.map((l) => (
            <div
              key={l}
              className="h-16 rounded-xl border hairline bg-card grid place-items-center text-sm font-display text-foreground/55"
            >
              {l}
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.div
              key={c.c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-2xl border hairline bg-card p-6 shadow-soft"
            >
              <div className="text-xs uppercase tracking-widest text-bordeaux">{c.c}</div>
              <div className="font-display text-3xl text-gold mt-2">{c.q}</div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{c.r}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <div key={r.who} className="rounded-2xl border hairline bg-cream/60 p-6">
              <Quote className="h-6 w-6 text-gold" />
              <p className="mt-3 text-base leading-relaxed text-foreground/85 italic">«{r.t}»</p>
              <div className="mt-4 text-sm">
                <div className="font-semibold">{r.who}</div>
                <div className="text-muted-foreground">{r.co}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
