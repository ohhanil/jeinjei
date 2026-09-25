-- ==========================================================================
-- 제이앤제이 게시판 스키마 (Supabase SQL Editor에 붙여넣고 실행)
-- ==========================================================================

-- 소식
create table if not exists public.news (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null default '미자립교회',
  date        date not null default current_date,
  thumbnail   text,
  content     text not null default '',
  created_at  timestamptz not null default now()
);

-- 공지사항
create table if not exists public.notices (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date        date not null default current_date,
  pinned      boolean not null default false,
  content     text not null default '',
  created_at  timestamptz not null default now()
);

create index if not exists news_date_idx on public.news (date desc, created_at desc);
create index if not exists notices_order_idx on public.notices (pinned desc, date desc, created_at desc);

-- RLS: 누구나 읽기, 로그인한 관리자만 쓰기
alter table public.news enable row level security;
alter table public.notices enable row level security;

create policy "public read news"    on public.news    for select using (true);
create policy "admin write news"    on public.news    for all to authenticated using (true) with check (true);
create policy "public read notices" on public.notices for select using (true);
create policy "admin write notices" on public.notices for all to authenticated using (true) with check (true);

-- 이미지 저장소 (공개 읽기, 관리자만 업로드/삭제)
insert into storage.buckets (id, name, public) values ('images', 'images', true)
on conflict (id) do nothing;

create policy "public read images"  on storage.objects for select using (bucket_id = 'images');
create policy "admin upload images" on storage.objects for insert to authenticated with check (bucket_id = 'images');
create policy "admin update images" on storage.objects for update to authenticated using (bucket_id = 'images');
create policy "admin delete images" on storage.objects for delete to authenticated using (bucket_id = 'images');
