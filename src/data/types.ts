export type PriceTier = { min_qty: number; price: number };

export type GiftSet = {
  id: string;
  name: string;
  description: string;
  composition: string[];
  weight_g: number;
  packaging_type: "Картон" | "Жесть" | "Текстиль" | "Дерево" | string;
  budget_tier: "Эконом" | "Стандарт" | "Премиум" | string;
  audience: "детский" | "взрослый" | string;
  image_url: string;
  price_tiers: PriceTier[];
  min_qty: number;
  available: boolean;
};

export type CartItem = {
  set: GiftSet;
  qty: number;
  comment?: string;
};
