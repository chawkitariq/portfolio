
# Portfolio

Fullstack monorepo — personal portfolio with a blog and a backoffice. Built with NestJS (API) and Next.js (frontend).


## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Tailwind CSS, Radix UI |
| Backend | NestJS, GraphQL (Apollo), TypeORM |
| Database | PostgreSQL |
| File storage | MinIO (local) / AWS S3 (production) |
| Infrastructure | AWS ECS Fargate, RDS, ALB — managed with Terraform |
| CI/CD | GitHub Actions |
| Package manager | pnpm workspaces |

---


## Run locally

**Prerequisites:** Node.js v20+, pnpm v10+, Docker

```bash
# Clone and install
git clone https://github.com/chawkitariq/portfolio.git
cd portfolio
pnpm install

# Start PostgreSQL + MinIO
docker compose up -d

# Copy env files
cp packages/api/.env.example packages/api/.env
cp packages/web/.env.example packages/web/.env
```

> The default `.env` values work out of the box with `docker-compose.yaml`.

Then open two terminals:

```bash
# Terminal 1 — API (http://localhost:3000)
cd packages/api && pnpm start:dev

# Terminal 2 — Web (http://localhost:3001)
cd packages/web && pnpm dev
```

MinIO console: [http://localhost:9001](http://localhost:9001) — login `minio` / `minio123`  
Create a bucket named `portfolio` to enable file uploads.

---


## Deployment

Infrastructure lives in `terraform/` and is deployed to AWS. The CI/CD pipeline in `.github/workflows/deploy-api.yml` automatically builds and deploys the API on every push to `main`.

### How it works

1. **Build** — Docker image is built and pushed to ECR
2. **Deploy** — ECS service is force-redeployed and the workflow waits for stability

Migrations and the admin seed run automatically at container startup.
