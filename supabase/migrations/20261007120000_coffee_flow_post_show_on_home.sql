-- Coffee Flow — choose which blog posts appear on the home page.
-- Adds posts.show_on_home (default false). Additive only: no existing data is rewritten.
-- Aborts WITHOUT changing anything if run twice.

do $$
begin
  if exists (
    select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'posts' and column_name = 'show_on_home'
  ) then
    raise exception 'show_on_home migration aborted: it is already applied. Nothing was changed.';
  end if;
end
$$;

alter table public.posts
  add column show_on_home boolean not null default false;

comment on column public.posts.show_on_home is 'true = shown in the home page blog section (published posts only, newest first, up to 3).';
