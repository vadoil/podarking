import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { submitLead } from "@/hooks/use-lead";
import { useRequestCart } from "@/hooks/use-request-cart";

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(120),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().min(6, "Укажите телефон").max(32),
  email: z.string().trim().email("Неверный email").max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  quantity: z.string().trim().max(60).optional().or(z.literal("")),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  inn: z.string().trim().max(20).optional().or(z.literal("")),
});

export type LeadChannel = "email" | "telegram" | null;

export function LeadDialog({
  open,
  onOpenChange,
  channel,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  channel?: LeadChannel;
}) {
  const { items, clear } = useRequestCart();
  const [form, setForm] = useState({
    name: "", company: "", phone: "+7 ", email: "", budget: "", quantity: "", comment: "", inn: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Проверьте поля");
      return;
    }
    setSubmitting(true);
    try {
      const src = channel === "telegram"
        ? "lead_form_telegram"
        : channel === "email"
          ? "lead_form_email"
          : items.length ? "lead_form_with_cart" : "lead_form";
      await submitLead({ ...r.data, items, source: src });
      setDone(true);
      clear();
      toast.success("Заявка отправлена");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    onOpenChange(false);
    setTimeout(() => {
      setDone(false);
      setForm({ name: "", company: "", phone: "+7 ", email: "", budget: "", quantity: "", comment: "", inn: "" });
    }, 250);
  };

  const title = done
    ? "Спасибо!"
    : channel === "telegram"
      ? "Получить презентацию в Telegram"
      : channel === "email"
        ? "Получить презентацию на e-mail"
        : "Получить расчёт и каталог";
  const description = done
    ? "Менеджер свяжется с вами в течение рабочего дня и пришлёт расчёт и каталог."
    : channel === "telegram"
      ? "Оставьте контакты — пришлём презентацию с подарками, ценами и сроками в Telegram."
      : channel === "email"
        ? "Оставьте контакты — пришлём презентацию с подарками, ценами и сроками на e-mail."
        : "Заполните форму — пришлём подборку и коммерческое предложение в течение дня.";

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogContent className="max-w-lg bg-background max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl sm:text-3xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="mt-4 rounded-2xl border hairline bg-cream/60 p-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-festive text-white shadow-card">
              <Check className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm text-foreground/80">
              Если вопрос срочный — звоните{" "}
              <a href="tel:+79170284011" className="text-bordeaux font-medium">+7 917 028-40-11</a>.
            </p>
            <Button onClick={close} className="mt-5 rounded-full bg-bordeaux hover:bg-bordeaux/90 text-white">
              Закрыть
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-2 grid gap-3">
            <Input required placeholder="Имя*" value={form.name} onChange={set("name")} />
            <Input placeholder="Компания" value={form.company} onChange={set("company")} />
            <div className="grid grid-cols-2 gap-3">
              <Input required type="tel" placeholder="Телефон*" value={form.phone} onChange={set("phone")} />
              <Input type="email" placeholder="Email" value={form.email} onChange={set("email")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Бюджет на 1 подарок" value={form.budget} onChange={set("budget")} />
              <Input placeholder="Количество, шт" value={form.quantity} onChange={set("quantity")} />
            </div>
            <Input placeholder="ИНН (опционально)" value={form.inn} onChange={set("inn")} />
            <Textarea rows={3} placeholder="Комментарий" value={form.comment} onChange={set("comment")} />

            {items.length > 0 && (
              <div className="rounded-xl bg-cream/60 border hairline p-3 text-xs text-foreground/75">
                В заявке: <span className="font-semibold">{items.length}</span> позиций
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="bg-bordeaux hover:bg-bordeaux/90 text-white rounded-full h-12 mt-2"
            >
              {submitting ? "Отправляем…" : "Отправить заявку"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь на&nbsp;обработку персональных данных.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
