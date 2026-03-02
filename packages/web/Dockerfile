# ─── Base ────────────────────────────────────────────────────────────────────
FROM node:24.14-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ─── Build ───────────────────────────────────────────────────────────────────
FROM base AS build
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/web/package.json ./packages/web/

RUN pnpm install --frozen-lockfile

COPY packages/api ./packages/api
RUN pnpm --filter @portfolio/api build

COPY packages/web ./packages/web
RUN pnpm --filter @portfolio/web build

# ─── Production ──────────────────────────────────────────────────────────────
FROM node:24.14-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/packages/web/.next/standalone ./

COPY --from=build /app/packages/web/.next/static ./packages/web/.next/static

COPY --from=build /app/packages/web/public ./packages/web/public

USER node

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "packages/web/server.js"]
