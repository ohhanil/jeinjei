# 관리자 게시판 연결 (Supabase)

지금은 **데모 모드**라서 관리자가 올린 글이 그 브라우저에만 저장됩니다.
방문자 모두에게 보이게 하려면 아래 순서로 Supabase(무료 플랜 가능)를 연결하세요.

1. https://supabase.com 에서 새 프로젝트를 만듭니다.
2. **SQL Editor**에 `supabase/schema.sql` 내용을 붙여넣고 실행합니다.
   - `news`(소식), `notices`(공지사항) 테이블과 `images` 저장소가 만들어집니다.
3. **Authentication → Users → Add user**에서 관리자 이메일·비밀번호를 만듭니다.
   - **Authentication → Sign In / Providers**에서 “Allow new users to sign up”을 꺼두세요.
     (켜두면 누구나 가입해 글을 쓸 수 있습니다.)
4. **Project Settings → API**에서 `Project URL`과 `anon public` 키를 복사해
   `js/config.js`의 `supabaseUrl`, `supabaseAnonKey`에 넣습니다.
5. `admin.html`에서 3번의 계정으로 로그인해 글을 올립니다.

> anon 키는 공개되어도 되는 키입니다. 쓰기 권한은 RLS 정책으로 로그인한 관리자에게만 열려 있습니다.
> `service_role` 키는 절대 config.js에 넣지 마세요.
