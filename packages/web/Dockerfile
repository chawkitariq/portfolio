# ─── Base ────────────────────────────────────────────────────────────────────
FROM node:24.14-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ─── Build ───────────────────────────────────────────────────────────────────
FROM base AS build
WORKDIR /app

# Copy workspace manifests for both packages (web depends on api)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

# Install all deps (pnpm symlinks @portfolio/api into web's node_modules)
RUN pnpm install --frozen-lockfile

# Build the API so dist/ (types + JS) exists before next build resolves them
COPY packages/api ./packages/api
RUN pnpm --filter @portfolio/api build

COPY packages/web ./packages/web
RUN pnpm --filter @portfolio/web build

# ─── Production ──────────────────────────────────────────────────────────────
FROM node:24.14-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Next.js standalone output is rooted at outputFileTracingRoot (monorepo root),
# so the full tree is preserved inside .next/standalone/
COPY --from=build /app/packages/web/.next/standalone ./

# Static assets (JS/CSS chunks) are NOT included in standalone — copy separately
COPY --from=build /app/packages/web/.next/static ./packages/web/.next/static

# Public folder (images, fonts, etc.)
COPY --from=build /app/packages/web/public ./packages/web/public

USER node

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "packages/web/server.js"]
