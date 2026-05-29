import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/data/types";

export type LeadInput = {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  budget?: string;
  quantity?: string;
  comment?: string;
  inn?: string;
  source?: string;
  items?: CartItem[];
};

export async function submitLead(input: LeadInput) {
  const payload = {
    name: input.name.trim(),
    company: input.company?.trim() || null,
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
    budget: input.budget?.trim() || null,
    quantity: input.quantity?.trim() || null,
    comment: input.comment?.trim() || null,
    inn: input.inn?.trim() || null,
    source: input.source ?? "lead_form",
    items: (input.items ?? []).map((i) => ({
      id: i.set.id,
      name: i.set.name,
      qty: i.qty,
      comment: i.comment ?? null,
    })),
  };
  const { error } = await supabase.from("leads").insert(payload);
  if (error) throw new Error(error.message);
}
