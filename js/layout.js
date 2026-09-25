/* ==========================================================================
   공통 레이아웃 — 헤더 · 모바일 메뉴 · 푸터 · 플로팅 버튼 · 아이콘
   각 페이지 <body data-page="..."> 값으로 현재 메뉴를 표시합니다.
   ========================================================================== */
(() => {
  const cfg = window.JNJ_CONFIG || {};
  const org = cfg.org || {};
  const page = document.body.dataset.page || 'home';
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const NAV = [
    { key: 'about', label: '소개', href: 'about.html' },
    { key: 'donate', label: '후원하기', href: 'donate.html' },
    { key: 'news', label: '소식', href: 'news.html' },
    { key: 'notice', label: '공지사항', href: 'notice.html' },
  ];

  const icons = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <symbol id="i-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></symbol>
    <symbol id="i-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></symbol>
    <symbol id="i-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></symbol>
    <symbol id="i-arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></symbol>
    <symbol id="i-chev-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></symbol>
    <symbol id="i-chev-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></symbol>
    <symbol id="i-pause" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="5" width="3" height="14" rx="1"/><rect x="14" y="5" width="3" height="14" rx="1"/></symbol>
    <symbol id="i-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4.5v15l12-7.5-12-7.5Z"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></symbol>
    <symbol id="i-list" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></symbol>
    <symbol id="i-church" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v5"/><path d="M10 4h4"/><path d="m6 11 6-4 6 4"/><path d="M6 11v10h12V11"/><path d="M3 21h18"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/><path d="M6 14H3v7"/><path d="M18 14h3v7"/></symbol>
    <symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></symbol>
    <symbol id="i-sprout" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></symbol>
    <symbol id="i-house-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></symbol>
    <symbol id="i-file-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></symbol>
    <symbol id="i-landmark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 18v-7"/><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></symbol>
    <symbol id="i-calendar-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21.3 15.3a2.4 2.4 0 0 0-3.4 0l-.4.4-.4-.4a2.4 2.4 0 0 0-3.4 3.4l3.8 3.8 3.8-3.8a2.4 2.4 0 0 0 0-3.4Z"/></symbol>
    <symbol id="i-hand-coins" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></symbol>
    <symbol id="i-map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>
    <symbol id="i-quote" viewBox="0 0 24 24" fill="currentColor"><path d="M9.6 5C5.9 6.3 3 9.5 3 14.2 3 17.2 4.8 19 7.1 19c2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.9.1-1 .1.3-2.2 2.2-4.5 4.2-5.4L9.6 5Zm10 0c-3.7 1.3-6.6 4.5-6.6 9.2 0 3 1.8 4.8 4.1 4.8 2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.9.1-1 .1.3-2.2 2.2-4.5 4.2-5.4L19.6 5Z"/></symbol>
  </defs></svg>`;

  const logo = () => `
    <a href="index.html" class="logo" aria-label="${esc(org.name)} 메인으로">
      <img class="logo__img" src="images/logo-sm.png" alt="" width="161" height="88" />
      <span class="logo__text"><span class="logo__name">${esc(org.name)}</span></span>
    </a>`;

  const navLinks = NAV.map((n) =>
    `<li class="gnb__item"><a class="gnb__link${n.key === page ? ' is-active' : ''}" href="${n.href}"${n.key === page ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');

  const header = `
  <a class="skip-link" href="#main">본문 바로가기</a>
  <header class="header" id="header">
    <div class="container header__inner">
      ${logo()}
      <nav class="gnb" aria-label="주 메뉴"><ul class="gnb__list">${navLinks}</ul></nav>
      <div class="header__util">
        <a href="donate.html" class="btn btn--donate header__donate" data-donate><svg class="i-heart" aria-hidden="true"><use href="#i-heart"/></svg>후원 참여하기</a>
        <button type="button" class="hamburger" aria-label="전체 메뉴 열기" aria-controls="m-menu" aria-expanded="false"><span></span></button>
      </div>
    </div>
  </header>
  <div class="m-menu" id="m-menu" aria-hidden="true">
    <div class="m-menu__top">
      ${logo()}
      <button type="button" class="m-menu__close" aria-label="전체 메뉴 닫기"><svg aria-hidden="true"><use href="#i-x"/></svg></button>
    </div>
    <nav class="m-menu__body" aria-label="모바일 메뉴">
      <ul>${NAV.map((n) => `<li class="m-menu__item"><a href="${n.href}"${n.key === page ? ' aria-current="page"' : ''}>${n.label}<svg aria-hidden="true"><use href="#i-arrow-right"/></svg></a></li>`).join('')}</ul>
    </nav>
    <div class="m-menu__foot">
      <a href="donate.html" class="btn btn--donate" data-donate><svg class="i-heart" aria-hidden="true"><use href="#i-heart"/></svg>후원 참여하기</a>
    </div>
  </div>`;

  const footer = `
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        ${logo()}
        <nav class="footer__links" aria-label="하단 메뉴">
          ${NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
          <a href="#" class="strong">개인정보처리방침</a>
          <a href="#">이메일무단수집거부</a>
        </nav>
      </div>
      <div class="footer__mid">
        <div class="footer__info">
          <dl>
            <div><dt>단체명</dt><dd>${esc(org.legalName)}</dd></div>
            <div><dt>대표자</dt><dd>${esc(org.ceo)}</dd></div>
            <div><dt>등록번호</dt><dd>${esc(org.bizNo)}</dd></div>
          </dl>
          <dl><div><dt>주소</dt><dd>${esc(org.address)}</dd></div></dl>
          <dl>
            <div><dt>대표전화</dt><dd>${esc(org.tel)}</dd></div>
            ${org.fax ? `<div><dt>팩스</dt><dd>${esc(org.fax)}</dd></div>` : ''}
            <div><dt>이메일</dt><dd>${esc(org.email)}</dd></div>
          </dl>
        </div>
        <div class="account">
          <h3>후원 계좌 안내</h3>
          <ul>${(org.accounts || []).map((a) => `<li><span>${esc(a.bank)}</span><b>${esc(a.number)}</b></li>`).join('')}</ul>
          <small>예금주: ${esc(org.accountHolder)} · 입금 후 사무국으로 연락 주시면 확인해 드립니다.</small>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copy">© ${new Date().getFullYear()} ${esc(org.nameEn)}. All rights reserved.</p>
        <a href="admin.html" class="footer__admin">관리자</a>
      </div>
    </div>
  </footer>
  <div class="floating" id="floating">
    <button type="button" class="to-top" aria-label="맨 위로"><svg aria-hidden="true"><use href="#i-arrow-up"/></svg></button>
    <a href="donate.html" class="fab-donate" aria-label="후원 참여하기" data-donate><svg aria-hidden="true"><use href="#i-heart"/></svg><span class="fab-donate__label">후원 참여하기</span></a>
  </div>
  <nav class="m-donate-bar" id="m-donate-bar" aria-label="빠른 후원">
    <a href="donate.html" data-donate><svg aria-hidden="true"><use href="#i-heart"/></svg>후원 참여하기</a>
    <a href="donate.html">후원 안내</a>
  </nav>`;

  document.body.insertAdjacentHTML('afterbegin', icons + header);
  document.body.insertAdjacentHTML('beforeend', footer);

  // 후원 버튼 → 외부 후원 페이지 (config.donateUrl)
  window.JNJ = window.JNJ || {};
  window.JNJ.applyDonateLinks = (root = document) => {
    if (!cfg.donateUrl) return;
    root.querySelectorAll('[data-donate]').forEach((a) => {
      a.href = cfg.donateUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  };
  window.JNJ.applyDonateLinks();
})();
