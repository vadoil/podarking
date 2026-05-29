export const fmtPrice = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " ₽";

export const fmtNum = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n);
