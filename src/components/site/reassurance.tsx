import { motion } from "framer-motion";
import { FileText, Factory, UserCheck, PackageCheck } from "lucide-react";

const items = [
  {
    icon: FileText,
    t: "Полный пакет документов",
    d: "Договор, счёт, УПД, акты и все закрывающие документы для юрлиц и ИП.",
  },
  {
    icon: Factory,
    t: "Прямые поставки с заводов",
    d: "Кондитерские фабрики России и Беларуси. Сертификаты, декларации, актуальные сроки годности.",
  },
  {
    icon: UserCheck,
    t: "Персональный менеджер",
    d: "Один человек ведёт ваш проект от первого звонка до подписания закрывающих.",
  },
  {
    icon: PackageCheck,
    t: "Под ключ от и до",
    d: "Подбор → производство и сборка → маркировка → доставка по всей России.",
  },
];

export function Reassurance() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-xs font-medium text-bordeaux">
            Работа с юрлицами · договор · закрывающие
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Свежий продукт, точно в&nbsp;срок - <span className="text-bordeaux">без вашей головной боли</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Контроль сроков годности на&nbsp;каждой партии, персональный менеджер и&nbsp;единая ответственность за&nbsp;результат: от&nbsp;первого звонка до&nbsp;подписания закрывающих.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border hairline bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-bordeaux/10 text-bordeaux">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-5 text-lg leading-snug">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
