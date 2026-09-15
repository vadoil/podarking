# Festive Gifts Pro

Build a light, elegant, premium B2B website for a company that creates New Year sweet gift sets ("новогодние подарки") assembled from confectionery factories across Russia and Belarus. The audience is BUSINESSES ordering in bulk: gifts for employees, employees' children, partners, and clients. This is a lead-generation B2B site, NOT a B2C store with online payment — the goal is to get a request for a price calculation / commercial offer (КП).

## Localization

- ALL user-facing copy in RUSSIAN.

- Currency: Russian Ruble, shown as "от 350 ₽" style (price "from", since it's wholesale).

- Phone format +7. Mention delivery across Russia.

## Brand & visual identity

- LIGHT, festive, premium. Warm white / cream background (#FFFFFF, #FBF7F2), NOT dark.

- Festive accent palette: deep New Year red / bordeaux (#B91C1C), warm gold (#C9A227), evergreen (#1F6B4A). Dark charcoal text (#1F1F1F).

- Elegant, refined feel: serif display headings (Playfair Display or Cormorant) + clean sans body (Inter). Generous whitespace.

- Subtle, tasteful New Year motifs used sparingly — thin snowflakes, a fir-branch detail, soft gold sparkle, garland accent lines. Premium and clean, NOT childish or cluttered.

- Rounded cards, soft shadows, gentle hover/scroll animations (framer-motion). Smooth, classy micro-interactions.

- Fully responsive: clean centered layout on desktop, comfortable on mobile.

## Tech stack

- React + Vite + TypeScript + Tailwind CSS, shadcn/ui, lucide-react, framer-motion.

- Use Supabase for the product catalog and incoming requests (leads). If not connected yet, fall back to a local typed data file, but keep data behind hooks (useCatalog, useRequestCart, useLead) so it can be swapped to Supabase later.

- Clean structure: /components, /pages, /sections, /hooks, /lib, /data.

## Page structure (single-page landing + catalog)

1. HEADER (sticky): logo, nav (Каталог, Как работаем, Преимущества, Кейсы, Контакты), phone number, and a primary CTA button "Получить расчёт".

2. HERO

   - Strong B2B value prop: "Новогодние подарки оптом для вашего бизнеса" + subtitle "Собираем сладкие подарки из продукции кондитерских заводов России и Беларуси. Любой бюджет, брендирование, доставка по всей России."

   - Two CTAs: "Получить каталог и прайс" (primary) and "Рассчитать заказ".

   - Trust strip: e.g. "Прямые поставки с заводов · Сертификаты качества · от 50 шт · Доставка по РФ".

   - Beautiful hero image of premium New Year gift boxes with sweets.

3. "ДЛЯ КОГО" — segments as cards: Сотрудникам, Детям сотрудников, Партнёрам и клиентам, Промо и мероприятия. Each with icon + short description.

4. CATALOG of gift sets — visually rich product cards. Each card: large photo, name (e.g. "Подарок 'Морозко'"), short composition summary, weight (г), packaging type, "от X ₽ / шт", min order badge ("от 100 шт"), and buttons "Подробнее" + "В заявку".

   - Category/filter chips: По бюджету (Эконом / Стандарт / Премиум), По типу упаковки (Картон / Жесть / Текстиль / Дерево), Детские / Взрослые.

   - Seed ~12 realistic gift sets with different price tiers and high-quality photo placeholders (Unsplash: gift box, chocolate, sweets).

5. PRODUCT DETAIL (slide-up sheet or page): big photo gallery, full composition list (состав — конкретные конфеты/шоколад с заводов), weight, packaging, price tiers by quantity (e.g. от 50 шт — 690 ₽, от 200 шт — 590 ₽, от 500 шт — 490 ₽), quantity input, comment field, "Добавить в заявку".

6. GIFT CONSTRUCTOR section "Соберите свой подарок" — a simple builder: choose packaging → choose budget per gift → choose contents/theme → leave a request. (Can be a guided form that produces a custom request, not full e-commerce.)

7. БРЕНДИРОВАНИЕ section: logo printing, custom packaging, corporate colors, individual inserts/postcards. Show it's possible to brand gifts with the client's identity.

8. ПРЕИМУЩЕСТВА (Why us): Прямые поставки с кондитерских заводов РФ и РБ, Сертификаты и соответствие ГОСТ, Любой бюджет и тираж, Брендирование под клиента, Доставка по всей России, Договор и закрывающие документы для юрлиц. Clean icon grid.

9. КАК МЫ РАБОТАЕМ — numbered process: 1) Заявка 2) Подбор и расчёт / КП 3) Согласование и договор 4) Производство и сборка 5) Доставка. Horizontal stepper.

10. КЕЙСЫ / КЛИЕНТЫ: logos row + 2–3 short case cards (company type, tираж, result) + testimonials. Placeholder content.

11. REQUEST CART (заявка) — instead of checkout. A floating "Заявка (N)" button opens a side sheet listing chosen sets with quantities and a "Оформить заявку" CTA leading to the lead form. Recalculates an approximate total live ("Примерная сумма: X ₽", with a note that final price is fixed in КП).

12. LEAD FORM "Получить расчёт": name, company, phone (+7), email, желаемый бюджет на подарок, примерное количество, comment. Optional ИНН field. Inline validation. On submit → success state ("Спасибо! Пришлём расчёт и каталог в течение дня") and save the lead to Supabase.

13. FOOTER: contacts, phone, email, messengers (WhatsApp/Telegram), legal/requisites placeholder (ООО, ИНН), nav, social, copyright. Reassure B2B buyers (работаем по договору, для юридических лиц).

## Persistent data model (Supabase)

- gift_sets: id, name, description, composition (text[]), weight_g, packaging_type, budget_tier, image_url, price_tiers (jsonb: [{min_qty, price}]), audience ('детский'|'взрослый'), available.

- leads: id, name, company, phone, email, budget, quantity, items (jsonb of requested sets), comment, inn, created_at, status.

## Conversion priorities

- Make "Получить расчёт" / "Получить каталог и прайс" CTAs prominent across the page.

- Add a subtle sticky bottom CTA on mobile.

- Optional lightweight "callback" / "Заказать звонок" mini-form.

Start with the design system (light festive palette + typography), then Hero and Catalog, then the request-cart + lead form flow. Prioritize trust, clarity, and a premium festive feel.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://podarking.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f4c0e613-737b-4610-a7bb-a193cc606eeb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
