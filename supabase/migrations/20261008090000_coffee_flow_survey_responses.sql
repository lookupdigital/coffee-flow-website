-- Coffee Flow — customer satisfaction survey (QR-code page, e.g. /survey/elbit).
-- Adds public.survey_responses. Additive only: no existing data is touched.
-- Aborts WITHOUT changing anything if run twice.

do $$
begin
  if to_regclass('public.survey_responses') is not null then
    raise exception 'survey_responses migration aborted: it is already applied. Nothing was changed.';
  end if;
end
$$;

create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  survey text not null check (survey ~ '^[a-z0-9-]{1,40}$'),
  coffee_taste smallint not null check (coffee_taste between 1 and 5),
  machine_experience smallint not null check (machine_experience between 1 and 5),
  comments text check (char_length(comments) <= 2000),
  -- Generated once per page view; makes a retried submission idempotent.
  submission_id uuid unique
);

comment on table public.survey_responses is 'Coffee Flow: anonymous survey answers. Insert via server-side service role only; admins read.';

create index survey_responses_survey_created_idx on public.survey_responses (survey, created_at desc);

alter table public.survey_responses enable row level security;

create policy "survey_responses: admin read"
  on public.survey_responses for select to authenticated using ((select public.is_admin()));

revoke all on public.survey_responses from anon, authenticated;
grant select on public.survey_responses to authenticated;
grant all on public.survey_responses to service_role;
