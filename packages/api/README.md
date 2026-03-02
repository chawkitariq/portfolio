# @portfolio/api

NestJS backend — exposes a REST API and a GraphQL endpoint. Handles authentication, posts and file uploads.

> Part of the [portfolio monorepo](../../README.md).

---

## Run

```bash
# From the monorepo root
pnpm start:api

# Or directly
cd packages/api && pnpm start:dev
```

API available at **http://localhost:3000**

---

## REST endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | No | Health check |
| `POST` | `/auth/sign-in` | No | Sign in, returns a JWT |
| `GET` | `/posts` | No | List all posts |
| `GET` | `/posts/:id` | No | Get a single post |
| `POST` | `/upload` | JWT | Upload a file to S3 |
| `GET` | `/assets/:filename` | No | Retrieve a file from S3 |

## GraphQL

Playground: **http://localhost:3000/graphql** (development only)

Main operations: `postOne`, `posts`, `createPost`, `updatePost`, `deletePost`

---

## Shared types

DTOs and interfaces are exported from `src/index.ts` and consumed by `@portfolio/web`:

```typescript
import { CreatePostInput, UpdatePostInput, Post, AuthSignInDto } from '@portfolio/api';
```

---

## Docker

```bash
# From the monorepo root
docker build -t portfolio-api -f packages/api/Dockerfile --network host .
```

Container startup: migrations → admin seed → NestJS server

---

## Migrations

```bash
MIGRATION_NAME=CreateTable pnpm migration:generate
pnpm migration:run
pnpm migration:revert
```

---

## Tests

```bash
pnpm test          # Unitaires
pnpm test:e2e      # End-to-end
pnpm test:cov      # Couverture
```
