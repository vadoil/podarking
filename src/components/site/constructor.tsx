import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "./decor";
import { Check, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { submitLead } from "@/hooks/use-lead";

const PACK = ["Картон", "Жесть", "Текстиль", "Дерево"];
const BUDGET = ["до 500 ₽", "500-1000 ₽", "1000-2000 ₽", "от 2000 ₽"];
const THEME = ["Классика", "Минимализм", "Детский", "Премиум VIP", "Брендированный"];

export function Constructor() {
  const [pack, setPack] = useState(PACK[0]);
  const [budget, setBudget] = useState(BUDGET[1]);
  const [theme, setTheme] = useState(THEME[0]);
  const [qty, setQty] = useState("100");
  const [contact, setContact] = useState({ name: "", phone: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.phone.trim()) {
      toast.error("Укажите имя и телефон");
      return;
    }
    setSubmitting(true);
    try {
      await submitLead({
        name: contact.name,
        phone: contact.phone,
        quantity: qty,
        budget,
        comment: `Конструктор: упаковка - ${pack}, тема - ${theme}. ${contact.comment}`.trim(),
        source: "constructor",
      });
      setDone(true);
      toast.success("Спасибо! Свяжемся в течение дня.");
    } catch (err) {
      toast.error("Не удалось отправить. Попробуйте позже.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="constructor" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 sparkle-bg opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Конструктор"
          title="Соберите подарок сами - по цене от завода"
          subtitle="Выбираете состав и упаковку - мы фиксируем цену за штуку в КП. Без сюрпризов, без наценок посредников, без онлайн-оплаты."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="rounded-3xl border hairline bg-card p-7 shadow-card">
            <Step n={1} title="Упаковка">
              <ChipRow items={PACK} value={pack} onChange={setPack} />
            </Step>
            <Step n={2} title="Бюджет на подарок">
              <ChipRow items={BUDGET} value={budget} onChange={setBudget} />
            </Step>
            <Step n={3} title="Тема и стиль">
              <ChipRow items={THEME} value={theme} onChange={setTheme} />
            </Step>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border hairline bg-festive p-7 text-white shadow-lift"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/85">
              <Wand2 className="h-3.5 w-3.5 text-gold" /> Заявка на расчёт
            </div>
            <h3 className="font-display text-2xl mt-2">Пришлём подборку и цену</h3>

            {done ? (
              <div className="mt-6 rounded-2xl bg-white/10 p-5 text-sm leading-relaxed">
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="h-4 w-4 text-gold" /> Заявка отправлена
                </div>
                <p className="mt-2 text-white/85">
                  Менеджер свяжется в&nbsp;течение рабочего дня и&nbsp;пришлёт каталог и&nbsp;расчёт.
                </p>
              </div>
            ) : (
              <div className="mt-5 grid gap-3">
                <Input
                  required
                  placeholder="Ваше имя"
                  value={contact.name}
                  maxLength={120}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  className="bg-white/95 text-foreground border-transparent"
                />
                <Input
                  required
                  type="tel"
                  placeholder="Телефон +7"
                  value={contact.phone}
                  maxLength={32}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  className="bg-white/95 text-foreground border-transparent"
                />
                <Input
                  type="number"
                  placeholder="Примерное количество, шт"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="bg-white/95 text-foreground border-transparent"
                />
                <Textarea
                  rows={3}
                  placeholder="Комментарий (опционально)"
                  value={contact.comment}
                  maxLength={1000}
                  onChange={(e) => setContact((c) => ({ ...c, comment: e.target.value }))}
                  className="bg-white/95 text-foreground border-transparent"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-gold-gradient text-bordeaux font-semibold hover:opacity-90 rounded-full h-12"
                >
                  {submitting ? "Отправляем…" : "Получить расчёт"}
                </Button>
                <p className="text-xs text-white/70 text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </p>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 first:pt-0 last:pb-0 border-b last:border-b-0 hairline">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-display text-2xl text-gold">{n}.</span>
        <h4 className="font-display text-lg">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function ChipRow({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          type="button"
          key={it}
          onClick={() => onChange(it)}
          className={
            "rounded-full border px-4 py-1.5 text-sm transition " +
            (it === value
              ? "bg-bordeaux text-white border-bordeaux"
              : "border-foreground/12 hover:bg-cream text-foreground/80")
          }
        >
          {it}
        </button>
      ))}
    </div>
  );
}
