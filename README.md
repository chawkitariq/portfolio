# Portfolio

Fullstack monorepo — public blog + admin backoffice.

| | |
|---|---|
| Frontend | Next.js 16, Tailwind CSS, Shadcn/ui, Zustand, Tanstack Query/Table |
| Backend | NestJS 11, GraphQL, REST, TypeORM |
| Database | PostgreSQL 17 |
| Storage | MinIO (local) / AWS S3 (prod) |
| Infra | AWS ECS Fargate, RDS, ALB — Terraform |
| CI/CD | GitHub Actions (OIDC) |
| Package manager | pnpm 10 workspaces |

---

## Run locally

**Requirements:** Node.js ≥ 20, pnpm ≥ 10, Docker

```bash
git clone https://github.com/chawkitariq/portfolio.git
cd portfolio
pnpm install
docker compose up -d
cp packages/api/.env.example packages/api/.env
cp packages/web/.env.example packages/web/.env
```

```bash
pnpm start:api   # API  → http://localhost:3000
pnpm start:web   # Web  → http://localhost:3001
```

> **MinIO:** [http://localhost:9001](http://localhost:9001) — `minio` / `minio123` — create a bucket named `portfolio`.

---

## Admin backoffice

Access via `/admin` → redirects to `/sign-in` if not authenticated.  
JWT stored in `localStorage`, automatically attached to every request.  
Features: CRUD posts, Tiptap rich editor, S3 thumbnail upload.

---

## Infrastructure (Terraform)

```bash
cd terraform
terraform init && terraform apply -var-file=terraform.tfvars
```

Resources: ECR, ECS Fargate, RDS, ALB, ACM, Route 53, S3, CloudWatch, IAM OIDC.

---

## CI/CD (GitHub Actions)

Push to `main` touching `packages/api/**` → build image → push to ECR → redeploy ECS.
