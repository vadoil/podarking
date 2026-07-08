import { useMemo } from "react";
import { Clock } from "lucide-react";

export function UrgencyBanner() {
  const days = useMemo(() => {
    const now = new Date();
    const ny = new Date(now.getFullYear(), 11, 31);
    if (now > ny) ny.setFullYear(now.getFullYear() + 1);
    return Math.max(1, Math.ceil((ny.getTime() - now.getTime()) / 86400000));
  }, []);

  return (
    <div className="bg-bordeaux text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm sm:px-6 lg:px-8">
        <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
        <span>
          До Нового года осталось <span className="font-semibold text-gold">{days}</span>{" "}
          {days % 10 === 1 && days % 100 !== 11 ? "день" : days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20) ? "дня" : "дней"}
          {" "}- успейте разместить заказ к&nbsp;корпоративу
        </span>
      </div>
    </div>
  );
}
