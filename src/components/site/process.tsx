import { motion } from "framer-motion";
import { SectionHeading } from "./decor";

const STEPS = [
  { n: "01", t: "Заявка", d: "Оставляете заявку или звоните. Уточняем задачу, бюджет и тираж." },
  { n: "02", t: "Подбор и КП", d: "Готовим 2–3 варианта составов и присылаем коммерческое предложение." },
  { n: "03", t: "Согласование и договор", d: "Утверждаем макет и состав, подписываем договор с юрлицом." },
  { n: "04", t: "Производство и сборка", d: "Закупаем продукцию с заводов, печатаем упаковку, собираем подарки." },
  { n: "05", t: "Доставка", d: "Доставляем в офис или на склады по всей России точно к дате." },
];

export function Process() {
  return (
    <section id="process" className="py-20 sm:py-24 bg-cream/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Как мы работаем" title="От заявки до подарков под ёлкой — 5 понятных шагов" subtitle="Прозрачный процесс с закреплёнными сроками на каждом этапе — вы всегда знаете, где ваш заказ." />

        <div className="mt-14 relative">
          <div className="hidden lg:block absolute left-0 right-0 top-10 h-px divider-gold" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative rounded-2xl border hairline bg-card p-6 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-festive text-white font-display text-base shadow-soft">
                  {s.n}
                </div>
                <h3 className="font-display text-lg mt-4">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
