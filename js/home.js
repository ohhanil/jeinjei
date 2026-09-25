/* 메인페이지 — 최근 소식 3건 · 공지사항 5건 */
(async () => {
  const { store, util, appear, refreshScroll } = window.JNJ;
  const newsEl = document.getElementById('home-news');
  const noticeEl = document.getElementById('home-notice');

  try {
    const [{ items: news }, { items: notices }] = await Promise.all([
      store.list('news', { page: 1, perPage: 3 }),
      store.list('notice', { page: 1, perPage: 5 }),
    ]);

    newsEl.innerHTML = news.length ? news.map((n) => `
      <a href="news.html?id=${encodeURIComponent(n.id)}" class="h-news">
        <div class="h-news__thumb">${n.thumbnail ? `<img src="${util.esc(n.thumbnail)}" alt="" loading="lazy" />` : ''}</div>
        <div>
          <span class="chip">${util.esc(n.category)}</span>
          <h3 class="n-card__title">${util.esc(n.title)}</h3>
          <time class="n-card__date" datetime="${util.esc(n.date)}">${util.fmtDate(n.date)}</time>
        </div>
      </a>`).join('') : '<p class="empty">등록된 소식이 없습니다.</p>';

    noticeEl.innerHTML = notices.length ? notices.map((t) => `
      <a href="notice.html?id=${encodeURIComponent(t.id)}">
        <span class="t">${t.pinned ? '<span class="pin-badge">공지</span>' : ''}<span>${util.esc(t.title)}</span>${util.isNew(t.date) ? '<i class="new-badge" aria-label="새 글">N</i>' : ''}</span>
        <span class="d">${util.fmtDate(t.date)}</span>
      </a>`).join('') : '<p class="empty">등록된 공지사항이 없습니다.</p>';
  } catch (e) {
    console.error(e);
    newsEl.innerHTML = noticeEl.innerHTML = '<p class="empty">게시물을 불러오지 못했습니다.</p>';
  }
  appear(newsEl);
  appear(noticeEl);
  refreshScroll?.();
})();
