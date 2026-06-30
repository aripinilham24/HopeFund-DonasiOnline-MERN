# HopeFund DonasiOnline — Agent Guide

## Overview

MERN crowdfunding app (Indonesian donation platform). Two independent `package.json` projects (no workspace tooling) — both use **ES modules** (`"type": "module"`). No TypeScript, no test framework, no CI.

## Project layout

```
client/   React 19 + Vite 7 + Tailwind CSS 4 + shadcn/ui (v4 via CLI, components in `src/components/ui/`)
server/   Express 5 + Mongoose 8 + MongoDB
```

## Commands

Run from the respective subdirectory:

| Directory | Command | Action |
|---|---|---|
| `client/` | `npm run dev` | Vite dev server on :5173 |
| `client/` | `npm run build` | Vite production build |
| `client/` | `npm run lint` | ESLint 9 (flat config, frontend only) |
| `server/` | `npm run server` | Nodemon dev on :5000 |
| `server/` | `npm run seed` | Seed DB with sample campaigns/users/transactions |
| `server/` | `npm start` | `node server.js` (production) |

No test command exists (placeholder `echo "Error: no test specified" && exit 1`).

## Client architecture

- **TypeScript**: `tsconfig.json` at client root — only for shadcn component files (`.tsx`). Application pages and logic remain `.jsx`.
- **Path alias**: `@/` → `src/` via Vite resolve + tsconfig `paths`.
- **UI**: shadcn/ui v4 components in `src/components/ui/*.tsx`. No DaisyUI. Uses `lucide-react` for icons.
- **CSS**: Tailwind CSS v4 via `@import "tailwindcss"` in `index.css`. shadcn CSS variables defined in `@theme` block.
- **Store**: Zustand 5 with `persist` middleware → localStorage under key `user-store`.

## Architecture notes

- **Auth**: JWT access token (15m) + refresh token (7d). Tokens stored in Zustand persist (localStorage). Auth middleware checks `Authorization: Bearer <token>` header.
- **Payments**: Midtrans Snap (sandbox). Server config loaded from `.env`. Client dynamically injects `snap.js` script.
- **File uploads**: Multer disk storage → `server/uploads/image/campaign/`. Campaign create/update use `multipart/form-data`.
- **Image serving**: `server/server.js:22` — static files at `/uploads/image/`.
- **CORS**: Single origin via `MODE` env var (development → `http://localhost:5173`, production → `URL_FE`).
- **Sequelize/MySQL** listed in `server/package.json` but **not used** in any controller or route.
- **API prefix**: `/api/auth`, `/api/campaigns`, `/api/payment`.

## Environment

- `server/.env` — all backend secrets (Mongo URI, Midtrans keys, JWT secrets).
- `client/.env.development` / `.env.production` — only `VITE_API_URL`.

## Deployment

- **Client**: Vercel SPA (`vercel.json` rewrites `/*` → `/index.html`).
- **Server**: Vercel serverless (based on production CORS URL).
