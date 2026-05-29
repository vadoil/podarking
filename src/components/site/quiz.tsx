import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Check, Gift } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { submitLead } from "@/hooks/use-lead";

type Step = {
  key: string;
  question: string;
  options: string[];
};

const steps: Step[] = [
  { key: "volume", question: "Сколько подарков планируете?", options: ["До 100", "100–500", "500–1000", "Более 1000"] },
  { key: "branding", question: "Нужно ли брендирование?", options: ["Не нужно", "Логотип на упаковке", "Полный индивидуальный дизайн"] },
  { key: "audience", question: "Для кого подарки?", options: ["Сотрудникам", "Детям сотрудников", "Партнёрам и клиентам", "Промо / мероприятие"] },
];

const contactSchema = z.object({
  company: z.string().trim().min(2, "Укажите компанию").max(200),
  name: z.string().trim().min(2, "Укажите имя").max(120),
  phone: z.string().trim().min(6, "Укажите телефон").max(32),
  email: z.string().trim().email("Неверный email").max(200).optional().or(z.literal("")),
});

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const total = steps.length + 2; // +company +contact
  const progress = Math.round(((step + (done ? 1 : 0)) / total) * 100);

  const pickAnswer = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  };

  const submit = async () => {
    const r = contactSchema.safeParse({ company, name, phone, email });
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Проверьте поля");
      return;
    }
    setSubmitting(true);
    try {
      await submitLead({
        name: r.data.name,
        phone: r.data.phone,
        email: r.data.email || undefined,
        company: r.data.company,
        quantity: answers.volume,
        comment: `Брендирование: ${answers.branding ?? "—"}. Аудитория: ${answers.audience ?? "—"}.`,
        source: "quiz",
      });
      setDone(true);
      toast.success("Заявка отправлена");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  };

  const goCatalog = () =>
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });

  const isQuizStep = step < steps.length;
  const isCompanyStep = step === steps.length;
  const isContactStep = step === steps.length + 1;

  return (
    <section id="quiz" className="relative bg-cream/60 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background px-3 py-1 text-xs font-medium text-bordeaux">
            Подбор за 60 секунд
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Подберём подарок под <span className="text-bordeaux">ваш бюджет и задачу</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ответьте на 5 коротких вопросов — пришлём персональный расчёт и презентацию.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border hairline bg-card shadow-lift">
          {/* Manager bar */}
          <div className="flex items-center gap-4 border-b hairline bg-background/70 px-6 py-4 sm:px-8">
            <div
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-festive font-display text-lg text-white shadow-card"
            >
              А
            </div>
            <div className="flex-1">
              <div className="font-display text-base leading-tight">Анна, персональный менеджер</div>
              <div className="text-xs text-muted-foreground">Поможет с подбором и расчётом</div>
            </div>
            <div className="hidden text-right text-xs text-muted-foreground sm:block">
              Шаг {Math.min(step + 1, total)} из {total}
            </div>
          </div>

          {/* Progress */}
          <div className="h-1 w-full bg-cream">
            <div
              className="h-full bg-festive transition-all duration-500"
              style={{ width: `${done ? 100 : progress}%` }}
            />
          </div>

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-festive text-white shadow-card">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="font-display mt-5 text-2xl sm:text-3xl">Спасибо!</h3>
                  <p className="mt-3 text-muted-foreground">
                    Пришлём расчёт и презентацию в течение рабочего дня.
                    <br />А пока загляните в готовые наборы — самые популярные решения.
                  </p>
                  <Button
                    onClick={goCatalog}
                    className="mt-6 rounded-full bg-bordeaux text-white hover:bg-bordeaux/90 h-11 px-6"
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Открыть готовые наборы
                  </Button>
                </motion.div>
              ) : isQuizStep ? (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl">{steps[step].question}</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {steps[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => pickAnswer(steps[step].key, opt)}
                        className="group flex items-center justify-between rounded-2xl border hairline bg-background px-5 py-4 text-left text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-bordeaux/40 hover:shadow-card"
                      >
                        <span>{opt}</span>
                        <ArrowRight className="h-4 w-4 text-bordeaux opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : isCompanyStep ? (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl">Название вашей компании</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Чтобы менеджер подготовил персональный расчёт.
                  </p>
                  <Input
                    autoFocus
                    placeholder="Например, ООО «Ромашка»"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-5 h-12 rounded-xl"
                  />
                  <div className="mt-6 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                      <ArrowLeft className="mr-1.5 h-4 w-4" /> Назад
                    </Button>
                    <Button
                      onClick={() => {
                        if (company.trim().length < 2) return toast.error("Укажите компанию");
                        setStep((s) => s + 1);
                      }}
                      className="rounded-full bg-bordeaux text-white hover:bg-bordeaux/90 h-11 px-6"
                    >
                      Далее <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : isContactStep ? (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl">Куда отправить расчёт?</h3>
                  <div className="mt-5 grid gap-3">
                    <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" />
                    <Input type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl" />
                    <Input type="email" placeholder="Email (опционально)" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" />
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                      <ArrowLeft className="mr-1.5 h-4 w-4" /> Назад
                    </Button>
                    <Button
                      onClick={submit}
                      disabled={submitting}
                      className="rounded-full bg-bordeaux text-white hover:bg-bordeaux/90 h-11 px-6"
                    >
                      {submitting ? "Отправляем…" : "Получить расчёт"}
                    </Button>
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
