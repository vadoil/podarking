import { motion } from "framer-motion";
import { Mail, Send, FileText, BadgeCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LeadMagnet({ onLead }: { onLead: (channel?: "email" | "telegram") => void }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-cream/70" />
      <div className="absolute inset-0 -z-10 sparkle-bg opacity-50" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border hairline bg-card p-8 shadow-lift sm:p-12"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-xs font-medium text-bordeaux">
                <FileText className="h-3.5 w-3.5" />
                Бесплатно · за 5 минут
              </span>

              <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Получите <span className="text-bordeaux">цены с завода</span><br />
                — до&nbsp;того, как поднимутся все остальные
              </h2>

              <ul className="mt-6 space-y-2 text-sm text-foreground/80">
                {[
                  "PDF-каталог на сезон 2025–2026",
                  "Цены по тиражам от 500 до 10 000+ шт",
                  "Сроки производства и доставки по РФ",
                  "Примеры брендирования и упаковки",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3">
              <button
                onClick={() => onLead("email")}
                className="group relative overflow-hidden rounded-2xl border hairline bg-background p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-bordeaux text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg leading-tight">Получить по e-mail</div>
                    <div className="text-xs text-muted-foreground">Презентация придёт в течение 5 минут</div>
                  </div>
                </div>
              </button>

              <a
                href="https://t.me/new_world10RM?text=Заявка%20по%20новогодним%20подаркам"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border hairline bg-background p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-evergreen text-white">
                    <Send className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg leading-tight">Получить в Telegram</div>
                    <div className="text-xs text-muted-foreground">Напишем в @new_world10RM — заявка по новогодним подаркам</div>
                  </div>
                </div>
              </a>

              <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-gold" />
                Без спама. Менеджер свяжется только по делу.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function LeadMagnetStrip({ onLead }: { onLead: () => void }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border hairline bg-festive p-6 text-white shadow-card sm:flex-row sm:p-7">
          <div>
            <div className="font-display text-xl sm:text-2xl">Готовы посмотреть полный каталог и цены?</div>
            <div className="mt-1 text-sm text-white/80">Пришлём презентацию с актуальными ценами на сезон.</div>
          </div>
          <Button
            onClick={onLead}
            size="lg"
            className="shrink-0 rounded-full bg-white text-bordeaux hover:bg-white/90 h-11 px-6"
          >
            Получить презентацию
          </Button>
        </div>
      </div>
    </section>
  );
}
