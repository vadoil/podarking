import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = { value: number; suffix?: string; label: string; decimals?: number };

const stats: Stat[] = [
  { value: 12, suffix: "+", label: "лет на рынке корпоративных подарков" },
  { value: 1800, suffix: "+", label: "реализованных B2B-проектов" },
  { value: 540000, label: "наборов отгружено за последние сезоны" },
  { value: 187, label: "городов доставки по России" },
  { value: 4.9, decimals: 1, label: "средняя оценка клиентов" },
  { value: 42, label: "кондитерских завода-партнёра РФ и РБ" },
];

function CountUp({ end, decimals = 0, suffix = "" }: { end: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  const display = decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString("ru-RU");

  return <span ref={ref}>{display}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--evergreen) 95%, black), color-mix(in oklab, var(--evergreen) 75%, var(--gold) 25%))" }} />
      <div className="absolute inset-0 -z-10 sparkle-bg opacity-30" />
      <div className="mx-auto max-w-7xl px-4 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Цифры — лучший аргумент
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl text-white">
            Опыт, которому <span className="text-gold">доверяют</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/15 backdrop-blur lg:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-evergreen/85 p-6 sm:p-8"
            >
              <div className="font-display text-4xl leading-none text-gold sm:text-5xl">
                <CountUp end={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm leading-snug text-white/85">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
