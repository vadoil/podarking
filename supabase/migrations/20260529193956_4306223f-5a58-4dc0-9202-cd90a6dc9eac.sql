
CREATE TABLE public.gift_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  composition text[] NOT NULL DEFAULT '{}',
  weight_g integer NOT NULL DEFAULT 0,
  packaging_type text NOT NULL DEFAULT 'Картон',
  budget_tier text NOT NULL DEFAULT 'Стандарт',
  audience text NOT NULL DEFAULT 'взрослый',
  image_url text NOT NULL DEFAULT '',
  price_tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  min_qty integer NOT NULL DEFAULT 50,
  available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  phone text NOT NULL,
  email text,
  budget text,
  quantity text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  comment text,
  inn text,
  source text NOT NULL DEFAULT 'lead_form',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gift_sets TO anon, authenticated;
GRANT ALL ON public.gift_sets TO service_role;
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.gift_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "gift_sets readable by everyone" ON public.gift_sets
  FOR SELECT TO anon, authenticated USING (available = true);

CREATE POLICY "anyone can submit a lead" ON public.leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);
