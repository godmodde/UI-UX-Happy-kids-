This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy to GitHub Pages

The project is configured for static export (`output: 'export'` in `next.config.ts`)
and ships a workflow at [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
(repo root) that builds `happy-kids/out` and publishes it to GitHub Pages.

One-time setup in the GitHub repository:

1. **Settings → Pages → Source → "GitHub Actions"**.
2. Push to `main` — the workflow builds and deploys automatically.

Notes:

- `basePath` is set from the repo name via `NEXT_PUBLIC_BASE_PATH` in CI, so the site
  works under `https://<user>.github.io/<repo>/`. Locally the var is empty (site at `/`).
- Images use `unoptimized: true` (Pages has no image optimizer); local `public/` assets
  are prefixed with `basePath` via `src/app/_lib/asset.ts`.
- Catalog filtering runs client-side (from the URL) so it works on static hosting.

Build the static site manually:

```bash
NEXT_PUBLIC_BASE_PATH=/<repo-name> pnpm build   # output in ./out
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
