UPDATE public.gift_sets SET
  name = replace(replace(name, '—', '-'), '–', '-'),
  description = replace(replace(description, '—', '-'), '–', '-');