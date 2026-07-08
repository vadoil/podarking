import { motion } from "framer-motion";
import { Stamp, Palette, ScrollText, Boxes } from "lucide-react";
import { SectionHeading } from "./decor";

const ITEMS = [
  { icon: Stamp, t: "Логотип на упаковке", d: "Тиснение, шелкография, цифровая печать на коробке или ленте." },
  { icon: Palette, t: "Фирменные цвета", d: "Подбираем упаковку и ленту в корпоративных цветах компании." },
  { icon: ScrollText, t: "Открытка от руководства", d: "Индивидуальные вкладыши и поздравительные открытки." },
  { icon: Boxes, t: "Эксклюзивная упаковка", d: "Разработка уникальной упаковки по вашему техническому заданию." },
];

export function Branding() {
  return (
    <section id="branding" className="py-20 sm:py-24 bg-cream/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Брендирование"
          title="Каждый подарок работает на ваш бренд"
          subtitle="Логотип на упаковке, фирменные цвета, открытка от руководителя. Превращаем сладкий набор в&nbsp;инструмент HR-маркетинга - без потери премиальности."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-2xl border hairline bg-card p-7 shadow-soft hover:shadow-card transition"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-festive text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
