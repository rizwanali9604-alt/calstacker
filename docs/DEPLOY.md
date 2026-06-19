# CalStacker — Cloudflare Deploy

## If live site is behind GitHub `main`

1. Open **Cloudflare Dashboard** → **Workers & Pages** → **calstacker**
2. Check **Production branch** is set to **`main`** (not `cloudflare/workers-autoconfig`)
3. Open **Deployments** → find latest commit `86faf4e` or newer
4. If failed, open build log; common fixes:
   - `_redirects` must use relative paths only (no absolute `workers.dev` URLs)
   - Production branch must match where you push
5. Click **Retry deployment** or **Create deployment** from latest `main`

## Verify after deploy

```bash
curl -I https://calstacker.com/guides/hra-exemption-guide/
curl -s https://calstacker.com/sitemap.xml | findstr hra-exemption
curl -s https://calstacker.com/calculators/emi/ | findstr calc-seo-section
```

Expected: HRA guide **200**, sitemap contains **hra-exemption**, EMI page contains **calc-seo-section**.

## Manual deploy (optional)

```bash
npx wrangler pages deploy . --project-name calstacker --branch main
```

Requires Cloudflare API token with Pages edit permission.
