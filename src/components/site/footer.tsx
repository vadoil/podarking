import { Phone, Mail, MessageCircle, Send } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacts" className="bg-foreground text-background mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-festive">
                <span className="font-display text-base text-white">Н</span>
              </span>
              <span className="font-display text-lg text-background">
                Новогодний<span className="text-gold">.Дом</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-background/65 leading-relaxed">
              Корпоративные новогодние подарки оптом. Работаем по&nbsp;договору с&nbsp;юридическими лицами и&nbsp;ИП.
            </p>
          </div>

          <div>
            <h4 className="font-display text-base text-background">Контакты</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="tel:+78001234567" className="inline-flex items-center gap-2 text-background/85 hover:text-gold"><Phone className="h-4 w-4" />+7 800 123-45-67</a></li>
              <li><a href="mailto:b2b@ng-dom.ru" className="inline-flex items-center gap-2 text-background/85 hover:text-gold"><Mail className="h-4 w-4" />b2b@ng-dom.ru</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 text-background/85 hover:text-gold"><MessageCircle className="h-4 w-4" />WhatsApp</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 text-background/85 hover:text-gold"><Send className="h-4 w-4" />Telegram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base text-background">Навигация</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#catalog" className="text-background/75 hover:text-gold">Каталог</a></li>
              <li><a href="#process" className="text-background/75 hover:text-gold">Как работаем</a></li>
              <li><a href="#advantages" className="text-background/75 hover:text-gold">Преимущества</a></li>
              <li><a href="#branding" className="text-background/75 hover:text-gold">Брендирование</a></li>
              <li><a href="#cases" className="text-background/75 hover:text-gold">Кейсы</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base text-background">Реквизиты</h4>
            <p className="mt-4 text-sm text-background/65 leading-relaxed">
              ООО «Новогодний Дом»<br />
              ИНН 7700000000 · КПП 770000000<br />
              г.&nbsp;Москва, ул.&nbsp;Примерная, д.&nbsp;1<br />
              <span className="text-gold/90">Работаем по&nbsp;договору · НДС</span>
            </p>
          </div>
        </div>

        <div className="divider-gold mt-12 opacity-30" />
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-background/55">
          <div>© {new Date().getFullYear()} Новогодний.Дом — корпоративные сладкие подарки.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Политика конфиденциальности</a>
            <a href="#" className="hover:text-gold">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
