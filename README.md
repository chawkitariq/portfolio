# Portfolio

A fullstack monorepo for a personal portfolio and blog with a backoffice.  
Built with NestJS and Next.js, deployed on AWS with zero-downtime CI/CD.

---

## Stack

| Layer          | Tech                                                          |
| -------------- | ------------------------------------------------------------- |
| Frontend       | Next.js 16, Tailwind CSS, Shadcn/ui, Zustand, Tanstack Query/Table |
| Backend        | NestJS 11, GraphQL, REST, TypeORM                             |
| Database       | PostgreSQL 17                                                 |
| Storage        | MinIO (local) / AWS S3 (prod)                                 |
| Infra          | AWS ECS Fargate, RDS, ALB — Terraform                        |
| CI/CD          | GitHub Actions (OIDC)                                         |
| Package manager | pnpm 10 workspaces                                           |

---

## Getting Started

**Requirements:** Node.js ≥ 20, pnpm ≥ 10, Docker

**1. Clone and install dependencies**

```bash
git clone https://github.com/chawkitariq/portfolio.git
cd portfolio
pnpm install
```

**2. Copy environment files**

```bash
cp packages/api/.env.example packages/api/.env
cp packages/web/.env.example packages/web/.env
```

**3. Start infrastructure**

```bash
docker compose up -d
```

MinIO Console: <http://localhost:9001>
- username: `minio`
- password: `minio123`

**4. Start the apps**

```bash
pnpm start
```

| Service | URL                   |
| ------- | --------------------- |
| API     | http://localhost:3000 |
| Web     | http://localhost:3001 |

---

## Admin Backoffice

Navigate to `/admin` — unauthenticated users are redirected to `/sign-in`.

- JWT is stored in `localStorage` and automatically attached to every request
- CRUD posts with a Tiptap rich-text editor
- S3 image upload

---

## Infrastructure

All resources are managed with Terraform:  
ECR, ECS Fargate, RDS, ALB, ACM, Route 53, S3, CloudWatch, IAM OIDC.

```bash
cd terraform
terraform init
terraform apply -var-file=terraform.tfvars
```

---

## CI/CD

Pushing to `main` with changes under `packages/api/**` or `packages/web/**` triggers a GitHub Actions workflow that:

1. Builds the Docker image
2. Pushes it to ECR
3. Redeploys the ECS service with zero downtime
