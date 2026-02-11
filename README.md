# Nano URL

Nano URL is a lightweight URL shortening service built with Node.js, Express with TypeScript, and Prisma. It converts long URLs into short, shareable links and safely redirects users through a preview page while tracking usage statistics. The project also provides an interactive API documentation using Swagger (OpenAPI), allowing endpoints to be explored and tested directly from the browser. This project was developed during spare time as a personal learning exercise to deepen my understanding of backend fundamentals such as routing, database persistence, and HTTP behavior.

## Features

- Generate short URLs
- Redirect to original URLs
- Click tracking (hit counter)
- Persistent storage using SQLite (via Prisma ORM)

## How it works

The service creates a unique short code for each URL and stores it in the database.
When a user accesses the short link, the server looks up the code, increments the click counter atomically, and redirects the user to the original URL.

## Prerequisites

- Node.js 20+ (recommended: 20 LTS)
- npm (comes with Node)

### Install Dependencies

```
npm install
```

### Environment Variables

Create `.env` file in the project root

```
BASE_URL=http://localhost:9099
DATABASE_URL="file:./dev.db"
```

SQLite database file `dev.db` will be created automatically after migration.

### Prisma Setup

Generate client and create database tables:

```
npx prisma generate
npx prisma migrate dev --name init
```

### Run the Server

#### Development:

```
npm run dev
```

Server will run at `http://localhost:9099`

#### Production Build (Probably?)

```
npm run build
npm start
```

## Swagger OpenAPI Docs
```
http://localhost:9099/docs
```
