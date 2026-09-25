/* ==========================================================================
   관리자 — 소식 / 공지사항 작성 · 수정 · 삭제
   ========================================================================== */
(() => {
  const { store, util } = window.JNJ;
  const cfg = window.JNJ_CONFIG;
  const $ = (id) => document.getElementById(id);
  const isDemo = store.mode === 'demo';

  let type = 'news';
  let editing = null; // 수정 중인 게시물
  let thumbnail = ''; // 현재 대표 이미지 URL

  const toast = (msg) => {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('is-show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove('is-show'), 2400);
  };

  /* ---------- 로그인 ---------- */
  const showLogin = () => {
    $('app-view').hidden = true;
    $('login-view').hidden = false;
    $('email-field').hidden = isDemo;
    $('email').required = !isDemo;
    $('login-mode').textContent = isDemo
      ? `데모 모드 · 임시 비밀번호: config.js의 demoPassword`
      : 'Supabase에 등록된 관리자 계정으로 로그인하세요.';
    (isDemo ? $('password') : $('email')).focus();
  };
  const showApp = () => {
    $('login-view').hidden = true;
    $('app-view').hidden = false;
    $('demo-banner').hidden = !isDemo;
    moveInd();
    loadTable();
  };

  $('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.submitter;
    btn.disabled = true;
    $('login-error').textContent = '';
    try {
      await store.auth.signIn($('email').value.trim(), $('password').value);
      $('password').value = '';
      showApp();
    } catch (err) {
      $('login-error').textContent = err.message;
    } finally {
      btn.disabled = false;
    }
  });
  $('logout').addEventListener('click', async () => { await store.auth.signOut(); showLogin(); });

  /* ---------- 탭 ---------- */
  const tabs = [...document.querySelectorAll('[role="tab"][data-type]')];
  const ind = document.querySelector('.seg-tabs__ind');
  function moveInd() {
    const t = tabs.find((x) => x.getAttribute('aria-selected') === 'true');
    ind.style.width = `${t.offsetWidth}px`;
    ind.style.transform = `translateX(${t.offsetLeft}px)`;
  }
  tabs.forEach((t) => t.addEventListener('click', () => {
    type = t.dataset.type;
    tabs.forEach((x) => x.setAttribute('aria-selected', String(x === t)));
    moveInd();
    loadTable();
  }));
  window.addEventListener('resize', moveInd);

  /* ---------- 목록 ---------- */
  async function loadTable() {
    const head = $('table-head');
    const body = $('table-body');
    head.innerHTML = type === 'news'
      ? '<th class="c-thumb">이미지</th><th>제목</th><th class="c-cat">분류</th><th class="c-date">게시일</th><th class="c-act"><span class="sr-only">관리</span></th>'
      : '<th>제목</th><th class="c-cat">구분</th><th class="c-date">게시일</th><th class="c-act"><span class="sr-only">관리</span></th>';
    body.innerHTML = `<tr><td class="a-empty" colspan="5">불러오는 중…</td></tr>`;
    try {
      const { items } = await store.list(type, {});
      if (!items.length) {
        body.innerHTML = `<tr><td class="a-empty" colspan="5">등록된 게시물이 없습니다. ‘새 글 작성’을 눌러 첫 글을 올려보세요.</td></tr>`;
        return;
      }
      const page = type === 'news' ? 'news.html' : 'notice.html';
      body.innerHTML = items.map((it) => `
        <tr data-id="${util.esc(it.id)}">
          ${type === 'news' ? `<td class="c-thumb">${it.thumbnail ? `<img class="thumb" src="${util.esc(it.thumbnail)}" alt="" loading="lazy" />` : '<span class="thumb"></span>'}</td>` : ''}
          <td class="c-title"><a href="${page}?id=${encodeURIComponent(it.id)}" target="_blank" rel="noopener">${util.esc(it.title)}</a></td>
          <td class="c-cat">${type === 'news' ? `<span class="chip">${util.esc(it.category || '-')}</span>` : it.pinned ? '<span class="pin-badge">고정</span>' : '<span style="color:var(--text-muted)">일반</span>'}</td>
          <td class="c-date">${util.fmtDate(it.date)}</td>
          <td class="c-act">
            <button type="button" class="btn btn--ghost btn--xs" data-act="edit">수정</button>
            <button type="button" class="btn btn--danger btn--xs" data-act="delete">삭제</button>
          </td>
        </tr>`).join('');
    } catch (err) {
      console.error(err);
      body.innerHTML = `<tr><td class="a-empty" colspan="5">목록을 불러오지 못했습니다: ${util.esc(err.message)}</td></tr>`;
    }
  }

  $('table-body').addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const id = btn.closest('tr').dataset.id;
    if (btn.dataset.act === 'edit') {
      const item = await store.get(type, id);
      if (item) openEditor(item);
    } else if (btn.dataset.act === 'delete') {
      const title = btn.closest('tr').querySelector('.c-title').textContent.trim();
      if (!confirm(`“${title}”\n이 게시물을 삭제할까요? 삭제하면 되돌릴 수 없습니다.`)) return;
      try {
        await store.remove(type, id);
        toast('삭제했습니다');
        loadTable();
      } catch (err) { alert(`삭제하지 못했습니다: ${err.message}`); }
    }
  });

  /* ---------- 에디터 ---------- */
  const editor = $('editor');
  const form = $('editor-form');
  $('f-category').innerHTML = (cfg.newsCategories || []).map((c) => `<option value="${util.esc(c)}">${util.esc(c)}</option>`).join('');

  const setPreview = (url) => {
    thumbnail = url || '';
    $('upload-preview').hidden = !thumbnail;
    if (thumbnail) $('upload-preview').src = thumbnail; else $('upload-preview').removeAttribute('src');
    document.querySelector('.upload__empty').hidden = !!thumbnail;
    $('upload-remove').hidden = !thumbnail;
  };

  function openEditor(item = null) {
    editing = item;
    form.reset();
    $('editor-error').textContent = '';
    form.querySelectorAll('.is-error').forEach((f) => f.classList.remove('is-error'));
    form.querySelectorAll('[data-only]').forEach((el) => (el.hidden = el.dataset.only !== type));
    $('editor-title').textContent = `${type === 'news' ? '소식' : '공지사항'} ${item ? '수정' : '작성'}`;
    form.title.value = item?.title || '';
    form.date.value = item?.date || util.today();
    form.content.value = item?.content || '';
    form.category.value = item?.category || (cfg.newsCategories || [])[0] || '';
    form.pinned.checked = !!item?.pinned;
    setPreview(item?.thumbnail || '');
    editor.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => form.title.focus(), 50);
  }
  const closeEditor = () => {
    if (form.dataset.dirty === '1' && !confirm('작성 중인 내용이 저장되지 않습니다. 닫을까요?')) return;
    editor.hidden = true;
    form.dataset.dirty = '';
    document.body.style.overflow = '';
  };
  $('new-post').addEventListener('click', () => openEditor());
  editor.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeEditor(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !editor.hidden) closeEditor(); });
  form.addEventListener('input', () => (form.dataset.dirty = '1'));

  // 이미지 업로드
  const upload = $('upload');
  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('이미지 파일만 올릴 수 있습니다.'); return; }
    upload.classList.add('is-busy');
    try {
      setPreview(await store.uploadImage(file));
      form.dataset.dirty = '1';
    } catch (err) {
      alert(`이미지를 올리지 못했습니다: ${err.message}`);
    } finally {
      upload.classList.remove('is-busy');
      $('f-file').value = '';
    }
  };
  $('f-file').addEventListener('change', (e) => handleFile(e.target.files[0]));
  const drop = $('upload-drop');
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('is-over'); }));
  drop.addEventListener('drop', (e) => handleFile(e.dataTransfer.files[0]));
  $('upload-remove').addEventListener('click', () => { setPreview(''); form.dataset.dirty = '1'; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const required = ['title', 'date', 'content'];
    let bad = null;
    required.forEach((name) => {
      const empty = !form[name].value.trim();
      form[name].closest('.field').classList.toggle('is-error', empty);
      if (empty && !bad) bad = form[name];
    });
    if (bad) { $('editor-error').textContent = '필수 항목(*)을 입력해 주세요.'; bad.focus(); return; }

    const data = { title: form.title.value.trim(), date: form.date.value, content: form.content.value.trim() };
    if (type === 'news') Object.assign(data, { category: form.category.value, thumbnail });
    else data.pinned = form.pinned.checked;
    if (editing) data.id = editing.id;

    const btn = $('editor-submit');
    btn.disabled = true;
    btn.textContent = '저장 중…';
    try {
      await store.save(type, data);
      form.dataset.dirty = '';
      editor.hidden = true;
      document.body.style.overflow = '';
      toast(editing ? '수정했습니다' : '게시했습니다');
      loadTable();
    } catch (err) {
      $('editor-error').textContent = `저장하지 못했습니다: ${err.message}`;
    } finally {
      btn.disabled = false;
      btn.textContent = '저장';
    }
  });

  $('demo-reset').addEventListener('click', () => {
    if (!confirm('이 브라우저에 저장된 데모 게시물을 모두 지울까요? 되돌릴 수 없습니다.')) return;
    store.resetDemo();
    loadTable();
    toast('모두 지웠습니다');
  });

  /* ---------- 시작 ---------- */
  store.auth.session().then((s) => (s ? showApp() : showLogin())).catch(showLogin);
})();
