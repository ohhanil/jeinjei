/* 메인페이지 — 후원자 명단 */
(() => {
  const donors = (window.JNJ_CONFIG.donors || []).filter((d) => d.name);
  const section = document.querySelector('.donors');
  if (!section) return;
  if (!donors.length) { section.hidden = true; return; }
  const esc = window.JNJ.util.esc;
  const regular = donors.filter((d) => d.type === '정기').length;
  document.getElementById('donors-count').innerHTML =
    `정기 후원 <b>${regular}</b>분${donors.length > regular ? ` · 일시 후원 <b>${donors.length - regular}</b>분` : ''}`;
  document.getElementById('donors-list').innerHTML = donors.map((d) => `<li>${esc(d.name)} 후원자님 (${esc(d.type)} 후원)</li>`).join('');

  // 끊김 없는 흐름을 위해 화면 폭보다 길어질 때까지 반복
  const chip = (d) => `<span class="donor-chip"><svg aria-hidden="true"><use href="#i-heart"/></svg><b>${esc(d.name)}</b> 후원자님<i>${esc(d.type)}</i></span>`;
  let items = [...donors];
  while (items.length < 16) items = items.concat(donors);
  const group = `<div class="marquee__group">${items.map(chip).join('')}</div>`;
  const track = document.getElementById('donors-track');
  track.innerHTML = group + group;
  track.style.setProperty('--dur', `${Math.max(40, items.length * 3.5)}s`);
})();

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
