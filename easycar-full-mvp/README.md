
# EasyCar — Full MVP (Next.js + Supabase + Cloudinary)

Modern, working peer‑to‑peer car marketplace:
- Auth (Supabase email magic link by default)
- Create/list/search listings (stored in Supabase)
- Upload images to Cloudinary (unsigned preset)
- Listing details with gallery
- Simple per‑listing chat (Supabase Realtime)
- Mobile‑first UI (Tailwind)

## 1) Create Supabase project
- Go to supabase.com → New project.
- In Settings → API copy:
  - **Project URL** (use as `NEXT_PUBLIC_SUPABASE_URL`)
  - **Anon Key** (use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- In SQL Editor → run contents of `supabase/schema.sql`.

## 2) Create Cloudinary unsigned upload
- cloudinary.com → Settings → Upload → Upload presets → Add unsigned preset.
- Note the **Cloud Name** and **Upload Preset**.
- Put into `.env.local` as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

## 3) Local run
```bash
npm i
cp .env.example .env.local # then fill it
npm run dev
```

## 4) Deploy
- Push this repo to GitHub.
- Vercel → Import project → Environment Variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
- Deploy.

