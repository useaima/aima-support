# EVA Support Help Center

This folder is the source package for the separate `aima-support` repo and its Vercel project at `support.useaima.com`.

## What is included
- `index.html`: support shell with directory + article views
- `styles.css`: static responsive styling
- `app.js`: client-side routing, search, article rendering, shared-settings fetch, and support form submission
- `data.json`: help-center article content
- `vercel.json`: rewrite rules so `/articles/<id>` loads directly on Vercel

## Static by design, shared by backend

The support site stays static on purpose so it remains fast, cheap, and easy to extend.

For the first CMS/CRM rollout it now consumes the shared company-site backend through the public blog control plane at `blog.useaima.com` for:

- shared support email and contact metadata
- support request submission into the common inbox / CRM model

That keeps the support experience lightweight while still participating in the new shared operational backend.
