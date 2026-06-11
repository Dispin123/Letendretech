# Letendre Tech — letendretch.com

Full-stack MSP + web agency website built on Next.js 15, Neon PostgreSQL, Netlify, and SendGrid.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15, App Router, TypeScript |
| Database | Neon PostgreSQL (serverless) via `@neondatabase/serverless` |
| Hosting | Netlify + `@netlify/plugin-nextjs` |
| Email | SendGrid transactional API |
| Auth | JWT via `jose` + `bcryptjs` |
| Fonts | Space Mono + DM Sans |

## Project Structure

```
letendretech/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Full design system
│   ├── contact/page.tsx            # Contact + estimate form
│   ├── services/[slug]/page.tsx    # Dynamic service pages
│   ├── work/[slug]/page.tsx        # Case study pages
│   └── admin/
│       ├── page.tsx                # Login
│       ├── leads/                  # Lead management
│       ├── jobs/                   # Project tracking
│       └── images/                 # Site image management
├── components/
│   ├── LeadForm.tsx                # Form with honeypot + Netlify fallback
│   ├── AdminSidebar.tsx            # Admin nav
│   ├── SiteHeader.tsx
│   └── SiteFooter.tsx
├── lib/
│   ├── db.ts                       # Neon connection singleton
│   ├── auth.ts                     # JWT cookie auth
│   ├── ensure-tables.ts            # Cold-start table guard
│   └── sendgrid.ts                 # Email notification
├── scripts/
│   └── init-db.ts                  # DB init (run once)
├── netlify.toml
└── .env.local.example
```

## Setup

### 1. Clone and install

```bash
git clone <your-repo>
cd letendretech
npm install
```

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
DATABASE_URL=postgresql://...          # From Neon dashboard
JWT_SECRET=your-32+-char-secret       # Random string
ADMIN_PASSWORD=your-secure-password   # Admin panel password
SENDGRID_API_KEY=SG.xxx               # SendGrid API key
SENDGRID_FROM_EMAIL=hello@letendretech.com
OWNER_EMAIL=nathan@letendretech.com
NEXT_PUBLIC_SITE_URL=https://letendretech.com
```

### 3. Initialize the database

```bash
npm run init-db
```

This creates all tables with nullable columns from the start — no migration headaches later.

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Deploy to Netlify

1. Push to GitHub
2. Import repo in Netlify
3. Add all environment variables in Netlify UI (Site Settings → Environment Variables)
4. Deploy — `netlify.toml` handles the build config

## Service Pages

Service pages are statically generated from the data in `app/services/[slug]/page.tsx`.

Current slugs: `managed-it`, `web-design`, `local-seo`, `cybersecurity`, `ecommerce`, `maintenance`

## Case Studies

Add case studies in `app/work/[slug]/page.tsx` by adding entries to the `CASE_STUDIES` object.

## Admin Dashboard

- **Leads** — View, filter, and update status of all form submissions
- **Projects** — Track client projects with status, value, and dates
- **Images** — Paste URLs to manage site images by section

## Key Design Decisions (from J. McKinnon lessons)

- `email TEXT` nullable from day one — no NOT NULL migrations
- `updated_at TIMESTAMPTZ DEFAULT NOW()` on settings table
- `town` and `business_type` columns in leads from the start
- `ensureTables()` called on every API cold start
- `LeadForm` shows visible errors — never silent `catch {}`
- Netlify Forms `data-netlify="true"` as fallback on every form
- Honeypot field on every form
- Admin sidebar includes all admin pages from the start
