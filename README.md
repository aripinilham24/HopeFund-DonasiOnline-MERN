# HopeFund — DonasiOnline MERN

Platform donasi online berbasis MERN Stack (MongoDB, Express 5, React 19, Node.js) dengan integrasi pembayaran Midtrans Snap.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui |
| **Backend** | Express 5 + Mongoose 8 |
| **Database** | MongoDB (via Mongoose ODM) |
| **Auth** | JWT (access 15m + refresh 7d) — Zustand persist |
| **Payment** | Midtrans Snap (sandbox) |
| **File Upload** | Multer → `server/uploads/image/campaign/` |

---

## Fitur

- **Autentikasi** — Register, Login, JWT token, refresh token, guest donation
- **Manajemen Campaign** — CRUD campaign dengan upload gambar & kategori
- **Filter Kategori** — Filter campaign berdasarkan kategori (live)
- **Donasi** — Form donasi dengan nominal pilihan/input, identitas, Midtrans Snap
- **Slider Banner** — Hero carousel dengan Swiper (fade effect, autoplay, navigasi)
- **Donatur List** — List donatur per campaign dengan load more (5 per klik)
- **Responsive** — Mobile-first, sidebar/dropdown navigasi

---

## Struktur Proyek

```
HopeFund-DonasiOnline/
├── client/                         # React frontend (Vite)
│   ├── src/
│   │   ├── api/axios.js            # Axios instance + base URL
│   │   ├── components/
│   │   │   ├── auth/               # Login, Register, ForgotPw
│   │   │   ├── skeletons/          # CampaignSkeleton, TableSkeleton
│   │   │   ├── ui/                 # shadcn/ui components (.tsx)
│   │   │   ├── Buttoon.jsx         # Tombol Kembali
│   │   │   ├── CampaignCard.jsx    # Card campaign
│   │   │   ├── CampaignForm.jsx    # Form create/update campaign
│   │   │   ├── Footer.jsx          # Footer dengan 4 kolom
│   │   │   ├── Navbar.jsx          # Navbar glassmorphism + sticky
│   │   │   └── Slider.jsx          # Hero carousel (Swiper)
│   │   ├── pages/
│   │   │   ├── about/About.jsx
│   │   │   ├── campaign/detailCampaign.jsx
│   │   │   ├── campaign/UpdateCampaign.jsx
│   │   │   ├── dashboard/index.jsx
│   │   │   ├── donations/CreateDonation.jsx
│   │   │   ├── donations/DonationPage.jsx
│   │   │   └── howtWorks/HowItWorks.jsx
│   │   ├── assets/index.js         # Icon & kategori data
│   │   ├── store.jsx               # Zustand store (user)
│   │   ├── utils/utils.js          # Helper (rupiahFormatter)
│   │   ├── App.jsx                 # Routing utama
│   │   ├── index.css               # Tailwind v4 + shadcn vars
│   │   └── lib/utils.js            # cn() utility (clsx + twMerge)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json               # Untuk komponen shadcn (.tsx)
│   └── .env.development / .env.production
│
├── server/                         # Express backend
│   ├── config/db.js                # Koneksi MongoDB
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── campaignController.js
│   │   └── donateController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── Campaign.js
│   │   ├── Donor.js
│   │   ├── Transaction.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── campaignRoutes.js
│   │   └── donateRoutes.js
│   ├── seed/seed.js                # Seeder database
│   ├── uploads/image/
│   │   ├── campaign/               # Upload campaign images
│   │   ├── profile/                # Profile images
│   │   └── slide-banner/           # Banner images
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
├── AGENTS.md
└── .gitignore
```

---

## Commands

### Client (`cd client`)

| Command | Keterangan |
|---|---|
| `npm run dev` | Vite dev server (:5173) |
| `npm run build` | Production build |
| `npm run lint` | ESLint 9 (flat config) |
| `npm run preview` | Preview build |

### Server (`cd server`)

| Command | Keterangan |
|---|---|
| `npm run server` | Nodemon dev (:5000) |
| `npm start` | Production start |
| `npm run seed` | Seed sample data |

---

## API Routes

### Auth — `/api/auth`

| Method | Path | Auth | Fungsi |
|---|---|---|---|
| POST | `/register` | — | Register user baru |
| POST | `/login` | — | Login user |
| POST | `/google` | — | Login via Google |
| GET | `/profile` | Bearer JWT | Profile user |

### Campaigns — `/api/campaigns`

| Method | Path | Fungsi |
|---|---|---|
| GET | `/` | List semua campaign (support `?category=`) |
| GET | `/title/:id` | Judul campaign by ID |
| GET | `/:id` | Detail campaign + transactions |
| GET | `/creator/:creatorId` | Campaign by creator |
| POST | `/create` | Buat campaign (multipart) |
| PUT | `/:id` | Update campaign (multipart) |
| DELETE | `/:id` | Hapus campaign |

### Payment — `/api/payment`

| Method | Path | Fungsi |
|---|---|---|
| GET | `/config` | Midtrans client key |
| POST | `/create` | Buat Snap transaksi |
| POST | `/notification` | Midtrans webhook |

---

## Environment Variables

### Server (`server/.env`)

| Variable | Contoh | Keterangan |
|---|---|---|
| `MODE` | `DEVELOPMENT` | `DEVELOPMENT` / `PRODUCTION` |
| `MONGO_URI` | `mongodb+srv://...` | MongoDB connection string |
| `MIDTRANS_CLIENT_KEY` | `SB-Mid-client-...` | Midtrans Snap client key |
| `MIDTRANS_SERVER_KEY` | `SB-Mid-server-...` | Midtrans Snap server key |
| `JWT_SECRET` | `random-string` | Signing access token (15m) |
| `JWT_REFRESH_SECRET` | `random-string` | Signing refresh token (7d) |
| `URL_FE` | `https://...` | CORS origin (production) |

### Client

| File | Variable | Contoh |
|---|---|---|
| `.env.development` | `VITE_API_URL` | `http://localhost:5000` |
| `.env.production` | `VITE_API_URL` | `https://...vercel.app` |

---

## Routing Client

| Path | Halaman |
|---|---|
| `/` | Home (Slider + filter kategori + grid campaign) |
| `/about/` | About |
| `/create-donation` | Buat Campaign + tabel campaign milik user |
| `/updateCampaign/:id` | Edit Campaign |
| `/how-it-works` | Cara Kerja (tabs + accordion FAQ) |
| `/detailcampaign/:id` | Detail Campaign + donatur list |
| `/donation/:id` | Form Donasi (Midtrans Snap) |
| `/login` | Login |
| `/register` | Register |
| `/forgot-pw` | Lupa Password |

---

## Deployment

- **Client**: Vercel SPA (`vercel.json` rewrites `/*` → `/index.html`)
- **Server**: Vercel serverless atau VPS

---

## Catatan

- Modul ES (`"type": "module"`) digunakan di client dan server
- TypeScript hanya untuk file shadcn/ui `.tsx` — aplikasi tetap `.jsx`
- `mysql2` & `sequelize` ada di dependencies server tapi **tidak digunakan**
- Path alias `@/` → `src/` (Vite resolve + tsconfig paths)

---

## Lisensi

Hak cipta © 2026 HopeFund. All rights reserved.
