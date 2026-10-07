# Coffee Flow — client notes

Operational record for this site. No secrets here: keys live in Vercel → Environment Variables and in the local,
git-ignored `.env.local`.

## Infrastructure
- Lookup Starter **v1.2.0** (tag `v1.2.0` = `a24bd3b`), integrated 2026-10-06.
- Supabase project: `coffee-flow-website`, region Central EU (Frankfurt), organisation Lookup (Pro).
- Vercel project: `coffee-flow-website`.

## Database
- Installed with `supabase/install/fresh-install.sql` on 2026-10-06 — migrations 1–8 in one transaction, so
  migration 8 (post Open Graph title/description and follow/nofollow) is already applied.
- Public sign-up is disabled in Supabase → Authentication; the first admin was created and added to `admin_users`
  with `supabase/install/first-admin.sql`.
- Next upgrade: apply only the new files from `supabase/migrations`, in filename order, and record them here.

## Environment variables (Vercel: Production, Preview, Development)
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public (Config).
- `SUPABASE_SERVICE_ROLE_KEY` — secret, server only.
- Not configured yet: Turnstile, `LEAD_RATE_LIMIT_SALT`, the lead webhook, GTM and `LOOKUP_SITE_URL`.

## Site specifics
- Registered routes (editable in Admin → Pages & SEO): `/`, `/machines`, `/beans`, `/service`, `/privacy`,
  `/accessibility`, `/blog`. Catalogue pages (`/products/[slug]`) and solution pages (`/solutions/[audience]`) are
  generated from `src/lib/data.ts` and keep their own metadata.
- The catalogue, service and legal pages are registered with `nav: false`: they stay in SEO and the sitemap while the
  designed Coffee Flow menu is unchanged. The blog is listed in the footer once a post is published.
- The contact form (`src/components/interactive.tsx`) posts to the shared lead engine. The business type is stored as
  the lead topic; company, city and employee count are stored as the lead message.
- Header and footer contact details still come from `src/lib/data.ts`, not from Admin → Site settings.

## Launch status
- Indexing is OFF. Going live happens in Admin → Launch, in the Production deployment, after the site details and
  SEO defaults are filled in.
