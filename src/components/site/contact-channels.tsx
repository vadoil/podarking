import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send, PhoneCall, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { toast } from "sonner";
import { submitLead } from "@/hooks/use-lead";

const callbackSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(120),
  phone: z.string().trim().min(6, "Укажите телефон").max(32),
});

const emailSchema = z.string().trim().email("Неверный email").max(200);

export function ContactChannels() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [callbackSending, setCallbackSending] = useState(false);

  const [subEmail, setSubEmail] = useState("");
  const [subSending, setSubSending] = useState(false);

  const sendCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = callbackSchema.safeParse({ name, phone });
    if (!r.success) return toast.error(r.error.issues[0]?.message ?? "Проверьте поля");
    setCallbackSending(true);
    try {
      await submitLead({ ...r.data, source: "callback" });
      toast.success("Перезвоним в ближайший рабочий час");
      setName(""); setPhone("+7 ");
    } catch (err) {
      console.error(err); toast.error("Не удалось отправить. Попробуйте позже.");
    } finally { setCallbackSending(false); }
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = emailSchema.safeParse(subEmail);
    if (!r.success) return toast.error(r.error.issues[0]?.message ?? "Неверный email");
    setSubSending(true);
    try {
      await submitLead({
        name: "Подписка на рассылку",
        phone: "-",
        email: r.data,
        source: "newsletter",
      });
      toast.success("Вы подписаны. Спасибо!");
      setSubEmail("");
    } catch (err) {
      console.error(err); toast.error("Не удалось подписать. Попробуйте позже.");
    } finally { setSubSending(false); }
  };

  return (
    <section id="contacts" className="bg-cream/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">
            Забронируйте цену сезона - <span className="text-bordeaux">свяжитесь удобным способом</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Чем раньше заявка - тем выше приоритет производства и&nbsp;ниже цена за&nbsp;штуку. Менеджер ответит в&nbsp;течение рабочего часа.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border hairline bg-card p-7 shadow-soft"
          >
            <h3 className="font-display text-xl">Прямой контакт</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href="tel:+79170284011" className="group flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-bordeaux/10 text-bordeaux">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">Отдел корпоративных продаж</span>
                    <span className="block font-display text-lg text-foreground group-hover:text-bordeaux">+7 917 028-40-11</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+79013880777" className="group flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-bordeaux/10 text-bordeaux">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">Менеджер проектов</span>
                    <span className="block font-display text-lg text-foreground group-hover:text-bordeaux">+7 901 388-07-77</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:aliva063@xmail.ru" className="group flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-bordeaux/10 text-bordeaux">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">E-mail отдела продаж</span>
                    <span className="block font-display text-lg text-foreground group-hover:text-bordeaux">aliva063@xmail.ru</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="https://t.me/new_world10RM" target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-evergreen/10 text-evergreen">
                    <Send className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">Telegram</span>
                    <span className="block font-display text-lg text-foreground group-hover:text-bordeaux">@new_world10RM</span>
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Callback */}
          <motion.form
            onSubmit={sendCallback}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border hairline bg-card p-7 shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl">Заказать звонок</h3>
                <p className="mt-1 text-sm text-muted-foreground">Перезвоним в течение часа.</p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-soft text-bordeaux">
                <PhoneCall className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-xl" />
              <Input type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl" />
            </div>
            <Button type="submit" disabled={callbackSending} className="mt-4 w-full rounded-full bg-bordeaux text-white hover:bg-bordeaux/90 h-11">
              {callbackSending ? "Отправляем…" : "Жду звонка"}
            </Button>
          </motion.form>

          {/* Newsletter */}
          <motion.form
            onSubmit={subscribe}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border hairline bg-festive p-7 text-white shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl text-white">Подписка для бизнеса</h3>
                <p className="mt-1 text-sm text-white/80">
                  Раз в неделю - новинки и спецпредложения для корпоративных клиентов.
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white">
                <Inbox className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-5">
              <Input
                type="email"
                placeholder="ваш@email.ru"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                className="h-11 rounded-xl border-white/30 bg-white/10 text-white placeholder:text-white/60"
              />
            </div>
            <Button type="submit" disabled={subSending} className="mt-4 w-full rounded-full bg-white text-bordeaux hover:bg-white/90 h-11">
              {subSending ? "Подписываем…" : "Подписаться"}
            </Button>
            <p className="mt-2 text-center text-[11px] text-white/70">Без спама. Отписаться можно в один клик.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
