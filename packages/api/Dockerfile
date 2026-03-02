# ─── Base ────────────────────────────────────────────────────────────────────
FROM node:24.14-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Activate the exact pnpm version declared in root package.json
RUN corepack enable


# ─── Build ───────────────────────────────────────────────────────────────────
FROM base AS build
WORKDIR /app

# Copy workspace manifests first to leverage layer caching
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/api/package.json ./packages/api/

# Install all deps (dev included) with the lockfile frozen
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY packages/api ./packages/api
RUN pnpm --filter @portfolio/api build


# ─── Deploy ──────────────────────────────────────────────────────────────────
# pnpm deploy prunes the workspace package to production-only dependencies
# and copies them to a clean directory — the official pnpm way for monorepos.
FROM base AS deploy
WORKDIR /app
COPY --from=build /app ./
RUN pnpm --filter @portfolio/api deploy --prod /prod


# ─── Production ──────────────────────────────────────────────────────────────
FROM node:24.14-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV HASH_ROUNDS=12
ENV DB_LOGGING=false
ENV DB_SYNCHRONIZE=false
ENV DB_SSL=true
ENV S3_BUCKET_UPLOAD_PREFIX_KEY=uploads/

# Production node_modules from the pruned deploy stage
COPY --from=deploy /prod ./

# Compiled output from the build stage
COPY --from=build /app/packages/api/dist ./dist

COPY ./packages/api/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT [ "docker-entrypoint.sh" ]

USER node

EXPOSE 3000

CMD ["node", "dist/main"]
