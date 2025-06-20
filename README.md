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
