
# Portfolio

Fullstack monorepo used as a personal portfolio, including a blog with backoffice. The backend (NestJS) and frontend (Next.js) work together to provide complete management of content and projects.


## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Tailwind CSS, Radix UI, TanStack Query |
| Backend | NestJS, GraphQL (Apollo), TypeORM |
| Database | PostgreSQL |
| File storage | MinIO (S3 compatible, local only) |
| Package manager | pnpm (workspaces) |

---


## Prerequisites

- [Node.js](https://nodejs.org) v20+
- [pnpm](https://pnpm.io) v10+
- [Docker](https://www.docker.com)

---


## Run the project locally

### 1. Clone and install dependencies

```bash
git clone https://github.com/chawkitariq/portfolio.git
cd portfolio
pnpm install
```

### 2. Start infrastructure (database + storage)

```bash
docker compose up -d
```

This will start:
- **PostgreSQL** on port `5433`
- **MinIO** on port `9000` (S3 API) and `9001` (web console)

### 3. Create the "portfolio" bucket in MinIO

1. Open the MinIO console: [http://localhost:9001](http://localhost:9001)
2. Log in with:
   - **Username**: `minio`
   - **Password**: `minio123`
3. Click "Create Bucket" and name it: `portfolio`

> This bucket is required for file storage (uploads, images, etc).

---

### 4. Configure environment variables

**Backend**
```bash
cp packages/api/.env.example packages/api/.env
```

**Frontend**
```bash
cp packages/web/.env.example packages/web/.env
```

The default values in `.env.example` are compatible with `docker-compose.yaml`, so no changes are needed for local development.

### 5. Start the backend

```bash
cd packages/api
pnpm start:dev
```

The API is available at [http://localhost:3000](http://localhost:3000).  
GraphQL playground: [http://localhost:3000/graphql](http://localhost:3000/graphql)

### 6. Start the frontend

In another terminal:

```bash
cd packages/web
pnpm dev
```

The app is available at [http://localhost:3001](http://localhost:3001).

---

## MinIO access (console)

File management interface: [http://localhost:9001](http://localhost:9001)  
Login: `minio` / `minio123`
