import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { RequestCartProvider } from "@/hooks/use-request-cart";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { UrgencyBanner } from "@/components/site/urgency-banner";
import { Tiers } from "@/components/site/tiers";
import { BusinessBenefits } from "@/components/site/business-benefits";
import { LeadMagnet, LeadMagnetStrip } from "@/components/site/lead-magnet";
import { Quiz } from "@/components/site/quiz";
import { SocialProof } from "@/components/site/social-proof";
import { Stats } from "@/components/site/stats";
import { Reassurance } from "@/components/site/reassurance";
import { ContactChannels } from "@/components/site/contact-channels";
import { Segments } from "@/components/site/segments";
import { Catalog } from "@/components/site/catalog";
import { Constructor } from "@/components/site/constructor";
import { Branding } from "@/components/site/branding";
import { Advantages } from "@/components/site/advantages";
import { Process } from "@/components/site/process";
import { Cases } from "@/components/site/cases";
import { Footer } from "@/components/site/footer";
import { RequestCartSheet } from "@/components/site/request-cart-sheet";
import { LeadDialog, type LeadChannel } from "@/components/site/lead-dialog";
import { MobileStickyCTA } from "@/components/site/mobile-sticky-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Сладкие новогодние подарки оптом для бизнеса - Новогодний.Дом" },
      {
        name: "description",
        content:
          "Корпоративные новогодние подарки оптом: сладкие наборы с кондитерских заводов России и Беларуси. Брендирование, доставка по РФ, договор для юрлиц. От 350 ₽ / шт.",
      },
      { property: "og:title", content: "Сладкие новогодние подарки оптом для бизнеса" },
      {
        property: "og:description",
        content:
          "Сладкие наборы с заводов России и Беларуси. Брендирование, договор, доставка по РФ. От 350 ₽ / шт.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [channel, setChannel] = useState<LeadChannel>(null);

  const openLead = (c: LeadChannel = null) => {
    setChannel(c);
    setLeadOpen(true);
  };
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <RequestCartProvider>
      <div className="min-h-screen flex flex-col">
        <UrgencyBanner />
        <Header onLead={() => openLead()} />
        <main className="flex-1 pb-20 lg:pb-0">
          <Hero
            onLead={() => openLead()}
            onCatalog={() => scrollTo("catalog")}
            onLeadChannel={(c) => openLead(c)}
          />
          <Tiers onLead={() => openLead()} />
          <BusinessBenefits />
          <LeadMagnet onLead={(c) => openLead(c ?? null)} />
          <Segments />
          <Catalog />
          <Quiz />
          <Constructor />
          <Branding />
          <Reassurance />
          <Stats />
          <SocialProof />
          <Cases />
          <Advantages />
          <Process />
          <LeadMagnetStrip onLead={() => openLead()} />
          <ContactChannels />
        </main>
        <Footer />

        <RequestCartSheet onCheckout={() => openLead()} />
        <LeadDialog open={leadOpen} onOpenChange={setLeadOpen} channel={channel} />
        <MobileStickyCTA onLead={() => openLead()} />
        <Toaster richColors position="top-center" />
      </div>
    </RequestCartProvider>
  );
}
