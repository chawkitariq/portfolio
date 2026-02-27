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
ENV DB_LOGGING=false
ENV DB_SYNCHRONIZE=false

# Download the AWS RDS global certificate bundle so Node.js trusts the RDS TLS
# certificate. NODE_EXTRA_CA_CERTS appends it to Node's built-in CA store
# without requiring any code changes.
RUN wget -q -O /usr/local/share/rds-global-bundle.pem \
    https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/rds-global-bundle.pem

# Production node_modules from the pruned deploy stage
COPY --from=deploy /prod ./

# Compiled output from the build stage
COPY --from=build /app/packages/api/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
