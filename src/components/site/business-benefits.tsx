import { motion } from "framer-motion";
import { Heart, Users, Award, Handshake, Sparkles } from "lucide-react";

const items = [
  { icon: Heart, t: "Повышение лояльности сотрудников", d: "Праздничное внимание, которое запоминается до следующего года." },
  { icon: Users, t: "Забота о семьях", d: "Подарки детям сотрудников — самый трогательный жест компании." },
  { icon: Award, t: "Укрепление HR-бренда", d: "Конкурентное преимущество в найме и удержании команды." },
  { icon: Handshake, t: "Внимание к партнёрам и клиентам", d: "Поддерживает отношения и открывает двери для новых сделок." },
  { icon: Sparkles, t: "Позитивная атмосфера в коллективе", d: "Совместный праздник укрепляет команду и культуру." },
];

export function BusinessBenefits() {
  return (
    <section className="relative bg-cream/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background px-3 py-1 text-xs font-medium text-bordeaux">
            HR-бренд · лояльность · мотивация
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Подарок — это <span className="text-bordeaux">инструмент</span>, а не сладость
          </h2>
          <p className="mt-4 text-muted-foreground">
            Один хороший набор возвращается лояльностью сотрудников, партнёров и&nbsp;клиентов на&nbsp;весь следующий год.
          </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl border hairline bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-soft text-bordeaux">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg leading-snug">{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
