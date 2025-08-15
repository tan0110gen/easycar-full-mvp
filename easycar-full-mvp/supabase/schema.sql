
-- Users are handled by Supabase Auth. We'll also keep a public profile table.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "profiles are viewable by everyone" on public.profiles for select using (true);
create policy "users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Listings
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner uuid references auth.users(id) on delete cascade,
  make text not null,
  model text not null,
  year int not null,
  mileage int not null,
  price int not null,
  city text not null,
  email text not null,
  description text not null,
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);
alter table public.listings enable row level security;
create policy "listings readable by all" on public.listings for select using (true);
create policy "authenticated can insert listing" on public.listings for insert with check (auth.role() = 'authenticated' and auth.uid() = owner);
create policy "owners can update own listing" on public.listings for update using (auth.uid() = owner);
create policy "owners can delete own listing" on public.listings for delete using (auth.uid() = owner);

-- Chat messages per listing
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade,
  sender uuid references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);
alter table public.messages enable row level security;
create policy "messages readable by all" on public.messages for select using (true);
create policy "auth users can insert messages" on public.messages for insert with check (auth.role() = 'authenticated');
