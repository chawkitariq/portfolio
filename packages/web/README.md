# @portfolio/web

Next.js 16 frontend — public site (blog, about, contact) + protected admin backoffice.

> Part of the [portfolio monorepo](../../README.md).

---

## Run

```bash
# From the monorepo root
pnpm start:web

# Or directly
cd packages/web && pnpm dev
```

App available at **http://localhost:3001**

---

## Environment variables

```bash
cp packages/web/.env.example packages/web/.env
```

---

## Admin backoffice

Accessible at `/admin`, protected by JWT.

1. Sign in at `/sign-in`
2. JWT is stored in `localStorage` (Zustand)
3. Axios automatically attaches the token to every request
4. A response interceptor redirects to `/sign-in` on `401`

**Admin routes:**

| Route | Description |
|---|---|
| `/admin/posts` | List all posts |
| `/admin/posts/new` | Create a post |
| `/admin/posts/:id/edit` | Edit a post |

**Tiptap** rich editor (images, code blocks, typography). Thumbnails are uploaded to S3/MinIO.

---

## Docker

```bash
# From the monorepo root
docker build -t portfolio-web -f packages/web/Dockerfile \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.com \
  --network host .
```

Uses Next.js `standalone` output — no `node_modules` needed at runtime.

---

## Scripts

```bash
pnpm dev      # Dev server (Turbopack)
pnpm build    # Production build
pnpm start    # Production server
pnpm lint     # ESLint
```

---
