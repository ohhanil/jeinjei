/* ==========================================================================
   게시물 저장소 (소식 / 공지사항)
   - config.js에 Supabase 값이 있으면 Supabase, 없으면 데모 모드(localStorage)
   - 모든 메서드는 Promise를 반환합니다.
   ========================================================================== */
(() => {
  const cfg = window.JNJ_CONFIG || {};
  const TABLE = { news: 'news', notice: 'notices' };
  const useSupabase = !!(cfg.supabaseUrl && cfg.supabaseAnonKey);

  /* ---------- 공통 유틸 ---------- */
  const util = {
    esc(s = '') {
      return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },
    // 줄바꿈 텍스트 → 문단 HTML (이스케이프 후 변환, URL은 링크로)
    toParagraphs(text = '') {
      return String(text).trim().split(/\n{2,}/).map((p) => {
        const html = util.esc(p)
          .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
          .replace(/\n/g, '<br />');
        return `<p>${html}</p>`;
      }).join('');
    },
    excerpt(text = '', n = 90) {
      const t = String(text).replace(/\s+/g, ' ').trim();
      return t.length > n ? `${t.slice(0, n)}…` : t;
    },
    fmtDate(d) { return d ? d.replaceAll('-', '.') : ''; },
    isNew(d, days = 3) {
      if (!d) return false;
      return (Date.now() - new Date(`${d}T00:00:00`).getTime()) / 86400000 <= days;
    },
    today() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    // 이미지 리사이즈 (긴 변 maxSize px, JPEG)
    resizeImage(file, maxSize = 1600, quality = 0.82) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * scale);
          c.height = Math.round(img.height * scale);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          URL.revokeObjectURL(url);
          c.toBlob((b) => (b ? resolve({ blob: b, dataUrl: c.toDataURL('image/jpeg', quality) }) : reject(new Error('이미지 변환 실패'))), 'image/jpeg', quality);
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('이미지를 읽을 수 없습니다')); };
        img.src = url;
      });
    },
  };

  const sortItems = (type, items) => items.sort((a, b) => {
    if (type === 'notice' && !!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
    return (b.date || '').localeCompare(a.date || '') || String(b.created_at || '').localeCompare(String(a.created_at || ''));
  });

  const filterItems = (items, { category, q } = {}) => items.filter((it) =>
    (!category || it.category === category) &&
    (!q || `${it.title} ${it.content}`.toLowerCase().includes(q.toLowerCase())));

  /* ---------- 데모 모드 (localStorage) ---------- */
  const demo = {
    key: (type) => `jnj_${type}_v2`,
    read(type) {
      try {
        const raw = localStorage.getItem(demo.key(type));
        if (raw) return JSON.parse(raw);
      } catch (e) { /* 저장소 접근 불가 시 초기 데이터 사용 */ }
      const seed = JSON.parse(JSON.stringify((window.JNJ_SEED || {})[type] || []));
      demo.write(type, seed);
      return seed;
    },
    write(type, items) {
      try { localStorage.setItem(demo.key(type), JSON.stringify(items)); }
      catch (e) {
        if (e.name === 'QuotaExceededError') throw new Error('브라우저 저장 공간이 가득 찼습니다. 이미지 크기를 줄이거나 오래된 게시물을 삭제해 주세요.');
        throw e;
      }
    },
    async all(type) { return sortItems(type, demo.read(type)); },
    async list(type, opts = {}) {
      const items = filterItems(await demo.all(type), opts);
      const { page = 1, perPage = items.length || 1 } = opts;
      return { items: items.slice((page - 1) * perPage, page * perPage), total: items.length };
    },
    async get(type, id) { return demo.read(type).find((it) => it.id === id) || null; },
    async save(type, item) {
      const items = demo.read(type);
      if (item.id) {
        const i = items.findIndex((it) => it.id === item.id);
        if (i < 0) throw new Error('게시물을 찾을 수 없습니다');
        items[i] = { ...items[i], ...item };
      } else {
        item = { ...item, id: `${type[0]}${Date.now().toString(36)}`, created_at: new Date().toISOString() };
        items.push(item);
      }
      demo.write(type, items);
      return item;
    },
    async remove(type, id) { demo.write(type, demo.read(type).filter((it) => it.id !== id)); },
    async uploadImage(file) { return (await util.resizeImage(file, 1200, 0.8)).dataUrl; },
    auth: {
      async session() { try { return sessionStorage.getItem('jnj_admin') === '1' ? { user: { email: 'demo' } } : null; } catch (e) { return null; } },
      async signIn(_email, password) {
        if (password !== cfg.demoPassword) throw new Error('비밀번호가 올바르지 않습니다');
        try { sessionStorage.setItem('jnj_admin', '1'); } catch (e) { /* noop */ }
        return true;
      },
      async signOut() { try { sessionStorage.removeItem('jnj_admin'); } catch (e) { /* noop */ } },
    },
    reset() { ['news', 'notice'].forEach((t) => { try { localStorage.removeItem(demo.key(t)); } catch (e) { /* noop */ } }); },
  };

  /* ---------- Supabase ---------- */
  let sbClient = null;
  const loadSupabase = () => new Promise((resolve, reject) => {
    if (window.supabase) return resolve();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = resolve;
    s.onerror = () => reject(new Error('Supabase 라이브러리를 불러오지 못했습니다'));
    document.head.appendChild(s);
  });
  const sb = async () => {
    if (!sbClient) {
      await loadSupabase();
      sbClient = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    }
    return sbClient;
  };
  const check = ({ data, error, count }) => { if (error) throw new Error(error.message); return { data, count }; };
  const cols = { news: 'id,title,category,date,thumbnail,content,created_at', notice: 'id,title,date,pinned,content,created_at' };

  const remote = {
    async all(type) {
      const c = await sb();
      let q = c.from(TABLE[type]).select(cols[type]);
      if (type === 'notice') q = q.order('pinned', { ascending: false });
      q = q.order('date', { ascending: false }).order('created_at', { ascending: false });
      return check(await q).data;
    },
    async list(type, opts = {}) {
      const { page = 1, perPage = 1000, category, q: search } = opts;
      const c = await sb();
      let q = c.from(TABLE[type]).select(cols[type], { count: 'exact' });
      if (category) q = q.eq('category', category);
      if (search) q = q.or(`title.ilike.%${search.replace(/[%,()]/g, '')}%,content.ilike.%${search.replace(/[%,()]/g, '')}%`);
      if (type === 'notice') q = q.order('pinned', { ascending: false });
      q = q.order('date', { ascending: false }).order('created_at', { ascending: false })
        .range((page - 1) * perPage, page * perPage - 1);
      const { data, count } = check(await q);
      return { items: data, total: count || 0 };
    },
    async get(type, id) {
      const c = await sb();
      return check(await c.from(TABLE[type]).select(cols[type]).eq('id', id).maybeSingle()).data;
    },
    async save(type, item) {
      const c = await sb();
      const { id, created_at, ...fields } = item;
      const res = id
        ? await c.from(TABLE[type]).update(fields).eq('id', id).select().single()
        : await c.from(TABLE[type]).insert(fields).select().single();
      return check(res).data;
    },
    async remove(type, id) {
      const c = await sb();
      check(await c.from(TABLE[type]).delete().eq('id', id));
    },
    async uploadImage(file) {
      const c = await sb();
      const { blob } = await util.resizeImage(file, 1600, 0.85);
      const path = `${new Date().getFullYear()}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
      check(await c.storage.from('images').upload(path, blob, { contentType: 'image/jpeg' }));
      return c.storage.from('images').getPublicUrl(path).data.publicUrl;
    },
    auth: {
      async session() { const c = await sb(); return (await c.auth.getSession()).data.session; },
      async signIn(email, password) {
        const c = await sb();
        const { error } = await c.auth.signInWithPassword({ email, password });
        if (error) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다');
        return true;
      },
      async signOut() { const c = await sb(); await c.auth.signOut(); },
    },
  };

  const impl = useSupabase ? remote : demo;

  window.JNJ = window.JNJ || {};
  window.JNJ.util = util;
  window.JNJ.store = {
    mode: useSupabase ? 'supabase' : 'demo',
    list: (type, opts) => impl.list(type, opts),
    get: (type, id) => impl.get(type, id),
    save: (type, item) => impl.save(type, item),
    remove: (type, id) => impl.remove(type, id),
    uploadImage: (file) => impl.uploadImage(file),
    auth: impl.auth,
    // 상세 페이지 이전/다음 글
    async adjacent(type, id) {
      const all = await impl.all(type);
      const i = all.findIndex((it) => it.id === id);
      return { newer: i > 0 ? all[i - 1] : null, older: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
    },
    resetDemo: () => (useSupabase ? null : demo.reset()),
  };
})();
