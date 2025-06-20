# 🧪 Fullstack App with Next.js, PostgreSQL, Prisma, Vitest and Playwright

This project is a fullstack web application built with:

- ✅ **Next.js** (App Router)
- 💾 **PostgreSQL** via Docker
- 🔍 **Prisma** for database access
- 📬 **React Hook Form** and **Zod** for validation
- 🧪 **Vitest** for unit tests
- 🎭 **Playwright** for end-to-end testing

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later)
- [Docker & Docker Compose](https://docs.docker.com/compose/install/)
- [npm](https://www.npmjs.com/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:alexfqc/next-auth-tasks.git
cd next-auth-tasks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Copy the environment file and configure it

```bash
cp sample.ev .env
```

Create the file `.env.test` and add the env vars

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/test_db"
IS_TEST=true
```

Create the file `.env.playwright` and add the env var

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/playwright"
IS_TEST=true
```

### 4. Start PostgreSQL (and pgAdmin) with Docker

```bash
docker compose up -d
```

This will spin up:

- postgres_dev (port 5432)
- postgres_test (port 5433)
- postgres_playwright (port 5434)
- pgadmin (port 5050)

### 5. Push the Prisma schema to the database

```bash
npx prisma db push
```

Generate the Prisma Client:

```bash
npx prisma generate
```

## 🧑‍💻 Run the Application

```bash
npm run dev
```

Visit http://localhost:3000 to access the app.

## 🧪 Run Unit Tests

### ✅ Server-side tests

```bash
npm run test:server
```

### ✅ UI tests

```bash
npm run test:ui
```

## 🧭 Run End-to-End Tests (Playwright)

### 1. Run the development server SPECIFIC FOR E2E TESTS (it runs over playwright database)

```bash
  npm run dev:e2e
```

### 2. Run the Playwright tests

```bash
  npm run test:e2e
```

## 🛠 Tips

Access pgAdmin at http://localhost:5050

Email: admin@admin.com

Password: admin

Hostnames (Connections tab):

postgres_dev → port 5432 → username postgres → password postgres → maintenance database dev_db

postgres_test → port 5432 → username postgres → password postgres → maintenance database test_db

postgres_playwright → port 5432 → username postgres → password postgres → maintenance database playwright

If prisma db push fails, ensure Docker is running and .env is properly set.
