import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileStickyCTA({ onLead }: { onLead: () => void }) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t hairline bg-background/95 backdrop-blur px-3 py-2.5 flex gap-2 shadow-[0_-8px_24px_-12px_rgba(185,28,28,0.18)]">
      <a
        href="tel:+78001234567"
        className="inline-flex items-center justify-center rounded-full border hairline w-12 h-12 text-bordeaux"
        aria-label="Позвонить"
      >
        <Phone className="h-5 w-5" />
      </a>
      <Button
        onClick={onLead}
        className="flex-1 h-12 rounded-full bg-bordeaux hover:bg-bordeaux/90 text-white text-base"
      >
        Получить расчёт
      </Button>
    </div>
  );
}
