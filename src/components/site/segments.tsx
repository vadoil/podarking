import { motion } from "framer-motion";
import { Users, Baby, Handshake, PartyPopper } from "lucide-react";
import { SectionHeading } from "./decor";

const SEG = [
  { icon: Users, t: "Сотрудникам", d: "Универсальные наборы для всех сотрудников компании — от линейного персонала до руководства." },
  { icon: Baby, t: "Детям сотрудников", d: "Яркие детские подарки с любимыми сладостями и небольшим сюрпризом внутри." },
  { icon: Handshake, t: "Партнёрам и клиентам", d: "Премиальные подарки в текстильной или деревянной упаковке с брендированием." },
  { icon: PartyPopper, t: "Промо и мероприятия", d: "Тиражные наборы под корпоративы, конференции и новогодние утренники." },
];

export function Segments() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Для кого"
          title="Один поставщик — все внутренние аудитории"
          subtitle="Сотрудники, дети, партнёры, VIP. Соберём под каждую задачу и удержим единую цену — без переплаты за посредников."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SEG.map(({ icon: Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl border hairline bg-card p-7 shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gold-soft/60 text-bordeaux group-hover:bg-festive group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
