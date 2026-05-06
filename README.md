# AIMA Support Help Center

This folder is the source package for the separate `aima-support` repo and its Vercel project at `support.useaima.com`.

## What is included
- `index.html`: Google Help Center-style shell with product collections, directory view, and article view
- `styles.css`: static responsive styling for the support frontend
- `app.js`: client-side routing, search, support collection/article rendering, shared-settings fetch, and support form submission
- `vercel.json`: SPA fallback rules so `/article/<slug>` and `/collection/<slug>` load directly on Vercel
- `build.mjs`: simple static build copier for the support shell assets

## Static frontend, shared backend

The support site stays lightweight on purpose so it remains fast, cheap, and easy to maintain.

For the CMS/CRM rollout it now consumes the shared company backend through the public blog control plane at `blog.useaima.com` for:

- shared company and support settings
- live support collections and support articles
- support request submission into the common inbox / CRM model

That keeps the support experience lightweight while still participating in the new shared operational backend.
