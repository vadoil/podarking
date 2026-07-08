import { motion } from "framer-motion";

const logos = [
  "АЛЬФА", "СЕВЕРСТАЛЬ", "МЕГАПОЛИС", "ВЕКТОР", "ТЕХНО+", "ЛОГИСТ",
  "АГРОСИЛА", "ФАРМЛАЙН", "ИНЖСТРОЙ", "ОПТИМА", "ГРАНД", "ПРОФИ",
];

export function SocialProof() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl">
            Более 1&nbsp;800 компаний уже доверили нам <span className="text-bordeaux">корпоративный Новый год</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            От региональных производств до федеральных ритейлеров - собираем подарки для команд любого масштаба и возвращаемся к нам сезон за сезоном.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border hairline bg-border sm:grid-cols-4 lg:grid-cols-6">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="grid aspect-[16/9] place-items-center bg-card transition-colors hover:bg-cream/60"
            >
              <span
                className="font-display text-base tracking-widest text-foreground/40 sm:text-lg"
                style={{ letterSpacing: "0.15em" }}
              >
                {name}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Логотипы заменим на реальные клиентские после согласования.
        </p>
      </div>
    </section>
  );
}
