import { motion } from "framer-motion";
import { Factory, BadgeCheck, Wallet, PenTool, Truck, FileSignature } from "lucide-react";
import { SectionHeading } from "./decor";

const ITEMS = [
  { icon: Factory, t: "Прямые поставки с кондитерских заводов", d: "Работаем напрямую с заводами России и Беларуси — без посредников." },
  { icon: BadgeCheck, t: "Сертификаты и соответствие ГОСТ", d: "Каждая позиция проходит контроль качества и имеет полный пакет документов." },
  { icon: Wallet, t: "Любой бюджет и тираж", d: "Подбираем составы от 350 ₽ до 3000+ ₽ за подарок. Тиражи от 500 шт." },
  { icon: PenTool, t: "Брендирование под клиента", d: "Логотип, фирменные цвета, индивидуальная упаковка и открытки." },
  { icon: Truck, t: "Доставка по всей России", d: "Транспортные компании, собственная логистика по Москве и СПб." },
  { icon: FileSignature, t: "Договор и закрывающие документы", d: "Работаем по договору с юрлицами и ИП, НДС, полный комплект документов." },
];

export function Advantages() {
  return (
    <section id="advantages" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Преимущества"
          title="Почему B2B-клиенты выбирают нас"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ icon: Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className="rounded-2xl border hairline bg-card p-7 shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <Icon className="h-7 w-7 text-bordeaux" strokeWidth={1.4} />
              <h3 className="font-display text-lg mt-4">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
