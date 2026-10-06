-- OPTIONAL example: fill the site settings row with SQL instead of Admin → Site settings.
-- The Admin screen is the normal way; use this only for scripted setups. Replace every value, then run once.
-- Never commit a copy that contains a client's real details to the Starter repository.
update public.site_settings set
  site_name     = 'REPLACE: site name',
  business_name = 'REPLACE: legal or trading name',
  site_url      = 'https://www.example.com',
  phone         = null,  -- e.g. national format as shown on the site
  whatsapp      = null,
  email         = null,
  address       = null,
  service_area  = null
where id = 1;
-- Left untouched on purpose (switch them in Admin when the site is really ready):
-- indexing_enabled, local_business_schema_enabled, consent_default, gtm_id.
