/* ==========================================================================
   소식 / 공지사항 게시판 — 목록 · 검색 · 분류 · 페이지네이션 · 상세(?id=)
   <body data-board="news|notice">
   ========================================================================== */
(async () => {
  const { store, util, appear, scrollTo, refreshScroll } = window.JNJ;
  const cfg = window.JNJ_CONFIG;
  const type = document.body.dataset.board;
  const isNews = type === 'news';
  const PER_PAGE = isNews ? 9 : 10;
  const base = `${type}.html`;
  const label = isNews ? '소식' : '공지사항';

  const listView = document.getElementById('list-view');
  const detailView = document.getElementById('detail-view');
  const listEl = document.getElementById('board-list');
  const countEl = document.getElementById('board-count');
  const pagerEl = document.getElementById('pagination');
  const form = document.getElementById('search-form');
  const filterEl = document.getElementById('filter');

  const params = new URLSearchParams(location.search);
  const state = { page: Math.max(1, +params.get('page') || 1), q: params.get('q') || '', category: params.get('category') || '' };

  const syncUrl = () => {
    const p = new URLSearchParams();
    if (state.page > 1) p.set('page', state.page);
    if (state.q) p.set('q', state.q);
    if (state.category) p.set('category', state.category);
    history.replaceState(null, '', p.toString() ? `${base}?${p}` : base);
  };

  /* ---------- 목록 ---------- */
  const newsCard = (n) => `
    <a href="${base}?id=${encodeURIComponent(n.id)}" class="n-card">
      <div class="n-card__thumb">${n.thumbnail ? `<img src="${util.esc(n.thumbnail)}" alt="" loading="lazy" />` : ''}</div>
      <div class="n-card__body">
        <span class="chip">${util.esc(n.category || '소식')}</span>
        <h2 class="n-card__title">${util.esc(n.title)}</h2>
        <time class="n-card__date" datetime="${util.esc(n.date)}">${util.fmtDate(n.date)}</time>
      </div>
    </a>`;

  const noticeRow = (t, no) => `
    <a href="${base}?id=${encodeURIComponent(t.id)}" class="board__row${t.pinned ? ' board__row--pin' : ''}" role="listitem">
      <span class="board__no">${t.pinned ? '<span class="pin-badge">공지</span>' : no}</span>
      <span class="board__title"><span>${util.esc(t.title)}</span>${util.isNew(t.date) ? '<i class="new-badge" aria-label="새 글">N</i>' : ''}</span>
      <span class="board__date">${util.fmtDate(t.date)}</span>
    </a>`;

  const renderPager = (total) => {
    const pages = Math.max(1, Math.ceil(total / PER_PAGE));
    if (pages <= 1) { pagerEl.innerHTML = ''; return; }
    const start = Math.max(1, Math.min(state.page - 2, pages - 4));
    const end = Math.min(pages, start + 4);
    let html = `<button type="button" data-page="${state.page - 1}" aria-label="이전 페이지" ${state.page === 1 ? 'disabled' : ''}><svg aria-hidden="true"><use href="#i-chev-left"/></svg></button>`;
    for (let i = start; i <= end; i++) html += `<button type="button" data-page="${i}"${i === state.page ? ' aria-current="page"' : ''}>${i}</button>`;
    html += `<button type="button" data-page="${state.page + 1}" aria-label="다음 페이지" ${state.page === pages ? 'disabled' : ''}><svg aria-hidden="true"><use href="#i-chev-right"/></svg></button>`;
    pagerEl.innerHTML = html;
  };

  const loadList = async ({ scroll = false } = {}) => {
    syncUrl();
    try {
      const { items, total } = await store.list(type, { page: state.page, perPage: PER_PAGE, q: state.q, category: state.category });
      countEl.innerHTML = `총 <b>${total.toLocaleString('ko-KR')}</b>건`;
      if (!items.length) {
        listEl.innerHTML = `<div class="empty"><strong>${state.q ? '검색 결과가 없습니다' : `등록된 ${label}이 없습니다`}</strong>${state.q ? '다른 검색어로 다시 찾아보세요.' : ''}</div>`;
      } else if (isNews) {
        listEl.innerHTML = items.map(newsCard).join('');
      } else {
        // 고정 공지는 항상 앞에 정렬되므로, 전체 순번으로 계산하면 일반 글 번호가 1까지 이어집니다.
        const offset = (state.page - 1) * PER_PAGE;
        listEl.innerHTML = items.map((t, i) => noticeRow(t, total - offset - i)).join('');
      }
      renderPager(total);
      appear(listEl);
      refreshScroll?.();
      if (scroll) scrollTo(document.querySelector('.board-top'), -120);
    } catch (e) {
      console.error(e);
      listEl.innerHTML = '<div class="empty"><strong>게시물을 불러오지 못했습니다</strong>잠시 후 다시 시도해 주세요.</div>';
    }
  };

  /* ---------- 상세 ---------- */
  const loadDetail = async (id) => {
    listView.hidden = true;
    detailView.hidden = false;
    try {
      const item = await store.get(type, id);
      if (!item) {
        detailView.innerHTML = `<div class="empty"><strong>게시물을 찾을 수 없습니다</strong>삭제되었거나 주소가 잘못되었습니다.<div style="margin-top:32px"><a href="${base}" class="btn btn--ghost">목록으로</a></div></div>`;
        return;
      }
      document.title = `${item.title} | ${label} | 제이앤제이(J&J)`;
      const { newer, older } = await store.adjacent(type, id);
      const navRow = (it, txt) => it
        ? `<a href="${base}?id=${encodeURIComponent(it.id)}"><span>${txt}</span><strong>${util.esc(it.title)}</strong></a>`
        : `<a aria-disabled="true" style="pointer-events:none"><span>${txt}</span><strong style="color:var(--text-disabled)">${txt}이 없습니다</strong></a>`;
      detailView.innerHTML = `
        <article class="detail">
          <header class="detail__head">
            ${isNews ? `<span class="chip">${util.esc(item.category || '소식')}</span>` : item.pinned ? '<span class="pin-badge" style="margin-bottom:16px">공지</span>' : ''}
            <h2 class="detail__title">${util.esc(item.title)}</h2>
            <div class="detail__meta"><time datetime="${util.esc(item.date)}">${util.fmtDate(item.date)}</time></div>
          </header>
          ${isNews && item.thumbnail ? `<figure class="detail__cover"><img src="${util.esc(item.thumbnail)}" alt="" /></figure>` : ''}
          <div class="detail__body">${util.toParagraphs(item.content)}</div>
          <nav class="detail__nav" aria-label="이전 글 다음 글">
            ${navRow(newer, '다음 글')}
            ${navRow(older, '이전 글')}
          </nav>
          <div class="detail__foot"><a href="${base}" class="btn btn--ghost"><svg aria-hidden="true"><use href="#i-list"/></svg>목록</a></div>
        </article>`;
      appear(detailView);
      refreshScroll?.();
    } catch (e) {
      console.error(e);
      detailView.innerHTML = '<div class="empty"><strong>게시물을 불러오지 못했습니다</strong></div>';
    }
  };

  /* ---------- 이벤트 ---------- */
  if (filterEl) {
    const cats = ['', ...(cfg.newsCategories || [])];
    filterEl.innerHTML = cats.map((c) => `<button type="button" data-cat="${util.esc(c)}" aria-pressed="${c === state.category}">${c ? util.esc(c) : '전체'}</button>`).join('');
    filterEl.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      state.category = b.dataset.cat;
      state.page = 1;
      filterEl.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      loadList();
    });
  }
  form.q.value = state.q;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.q = form.q.value.trim();
    state.page = 1;
    loadList();
  });
  pagerEl.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-page]');
    if (!b || b.disabled) return;
    state.page = +b.dataset.page;
    loadList({ scroll: true });
  });

  const id = params.get('id');
  if (id) loadDetail(id);
  else loadList();
})();
