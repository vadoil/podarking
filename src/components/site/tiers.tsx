import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Wrench, Sparkles } from "lucide-react";

type Tier = {
  icon: typeof Package;
  volume: string;
  title: string;
  desc: string;
  features: string[];
  cta: string;
  target: string;
  accent: string;
};

const tiers: Tier[] = [
  {
    icon: Package,
    volume: "до 100 шт",
    title: "Готовые сладкие наборы",
    desc: "Проверенные комплекты с заводов России и Беларуси. Быстрый заказ и отгрузка.",
    features: ["12+ готовых решений", "Отгрузка от 3 дней", "Договор и закрывающие"],
    cta: "Выбрать набор",
    target: "catalog",
    accent: "from-gold/15 to-gold/0",
  },
  {
    icon: Wrench,
    volume: "от 100 до 500 шт",
    title: "Конструктор подарка",
    desc: "Соберите состав сами и добавьте брендирование: открытку, наклейку или упаковку с логотипом.",
    features: ["Свободный выбор состава", "Брендированная открытка", "Логотип на упаковке"],
    cta: "Собрать подарок",
    target: "constructor",
    accent: "from-bordeaux/12 to-bordeaux/0",
  },
  {
    icon: Sparkles,
    volume: "от 500 шт",
    title: "Эксклюзив под ключ",
    desc: "Индивидуальный состав из продукции заводов РФ и Беларуси и уникальный дизайн упаковки.",
    features: ["Дизайн упаковки с нуля", "Прямые контракты с заводами", "Персональный менеджер"],
    cta: "Обсудить проект",
    target: "lead",
    accent: "from-evergreen/15 to-evergreen/0",
  },
];

export function Tiers({ onLead }: { onLead: () => void }) {
  const handleClick = (target: string) => {
    if (target === "lead") return onLead();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="tiers" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-xs font-medium text-bordeaux">
            Три формата сотрудничества
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Выберите формат под ваш <span className="text-bordeaux">тираж</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            От готовых наборов до эксклюзивных проектов с собственным дизайном упаковки.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.article
                key={tier.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border hairline bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${tier.accent}`} />
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-festive text-white shadow-card">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-bordeaux/20 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-bordeaux">
                    {tier.volume}
                  </span>
                </div>

                <h3 className="font-display mt-6 text-2xl leading-tight">{tier.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.desc}</p>

                <ul className="mt-5 space-y-2 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-foreground/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleClick(tier.target)}
                  className="mt-7 w-full rounded-full bg-bordeaux text-white hover:bg-bordeaux/90 h-11"
                >
                  {tier.cta} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
