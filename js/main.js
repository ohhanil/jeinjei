/* ==========================================================================
   J&J (제이앤제이) — 공통 인터랙션
   Motion spec: style-guide.md §5
   ========================================================================== */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const JNJ = (window.JNJ = window.JNJ || {});

  // 라이브러리 로드 실패 시 콘텐츠가 숨겨진 채 남지 않도록
  if (!hasGsap) document.documentElement.classList.remove('js');

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (hasGsap && !reduce && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), syncTouch: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  // 요소로 이동할 때는 CSS scroll-margin-top이 함께 적용됩니다.
  JNJ.scrollTo = (target, offset = 0) => {
    if (lenis) return lenis.scrollTo(target, { offset });
    const behavior = reduce ? 'auto' : 'smooth';
    if (typeof target === 'number') return window.scrollTo({ top: target, behavior });
    if (!offset) return target.scrollIntoView({ behavior });
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior });
  };

  /* ---------- Header / floating ---------- */
  const header = document.getElementById('header');
  const cover = document.querySelector('.hero, .sub-visual');
  const floating = document.getElementById('floating');
  const mBar = document.getElementById('m-donate-bar');
  if (!cover) header.classList.add('is-solid');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 80);
    const past = cover ? y > cover.offsetHeight - 120 : y > 300;
    floating?.classList.toggle('is-visible', past);
    mBar?.classList.toggle('is-visible', past);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const mMenu = document.getElementById('m-menu');
  const burger = document.querySelector('.hamburger');
  const setMenu = (open) => {
    mMenu.classList.toggle('is-open', open);
    mMenu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
    if (lenis) open ? lenis.stop() : lenis.start();
    (open ? mMenu.querySelector('.m-menu__close') : burger).focus();
  };
  burger?.addEventListener('click', () => setMenu(true));
  mMenu?.querySelector('.m-menu__close').addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mMenu?.classList.contains('is-open')) setMenu(false); });

  document.querySelector('.to-top')?.addEventListener('click', () => JNJ.scrollTo(0));

  /* ---------- Accordion (FAQ) ---------- */
  document.querySelectorAll('.acc__btn').forEach((btn) => {
    btn.addEventListener('click', () => btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true')));
  });

  /* ---------- 페이지 내 섹션 탭 (sticky) ---------- */
  const pageTabs = document.querySelector('.page-tabs');
  if (pageTabs) {
    const links = [...pageTabs.querySelectorAll('a[href^="#"]')];
    links.forEach((a) => a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      JNJ.scrollTo(t);
      history.replaceState(null, '', a.getAttribute('href'));
    }));
    const setActive = () => {
      const line = pageTabs.getBoundingClientRect().bottom + 160;
      let cur = links[0];
      links.forEach((a) => {
        const s = document.querySelector(a.getAttribute('href'));
        if (s && s.getBoundingClientRect().top <= line) cur = a;
      });
      links.forEach((a) => a.classList.toggle('is-active', a === cur));
      pageTabs.classList.toggle('is-stuck', pageTabs.getBoundingClientRect().top <= parseFloat(getComputedStyle(pageTabs).top) + 0.5);
    };
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  /* ---------- 동적 콘텐츠 등장 (소식·공지 목록 등) ---------- */
  JNJ.appear = (container) => {
    const kids = [...container.children];
    kids.forEach((el, i) => {
      el.style.setProperty('--i', Math.min(i, 5));
      el.classList.remove('appear');
      el.classList.add('appear-wait');
    });
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      kids.forEach((el) => { el.classList.remove('appear-wait'); void el.offsetWidth; el.classList.add('appear'); });
      io.disconnect();
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(container);
  };

  /* ---------- Hero slider ---------- */
  const heroEl = document.querySelector('.hero-swiper');
  if (heroEl && typeof window.Swiper !== 'undefined') {
    const cur = document.querySelector('.hero__count .cur');
    const bar = document.querySelector('.hero__progress span');
    const toggle = document.querySelector('.hero__toggle');
    const total = heroEl.querySelectorAll('.swiper-slide').length;
    document.querySelector('.hero__count .total').textContent = `/ ${String(total).padStart(2, '0')}`;

    const reveal = (swiper) => {
      swiper.slides.forEach((s) => s.querySelector('.hero__copy')?.classList.remove('is-revealed'));
      const active = swiper.slides[swiper.activeIndex];
      const copy = active?.querySelector('.hero__copy');
      if (copy) { void copy.offsetWidth; copy.classList.add('is-revealed'); }
      active?.classList.add('is-kb');
      cur.textContent = String(swiper.realIndex + 1).padStart(2, '0');
    };

    const heroSwiper = new Swiper(heroEl, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: reduce ? 0 : 1200,
      loop: true,
      autoplay: reduce ? false : { delay: 6000, disableOnInteraction: false },
      navigation: { nextEl: '.hero__next', prevEl: '.hero__prev' },
      a11y: { enabled: true, prevSlideMessage: '이전 슬라이드', nextSlideMessage: '다음 슬라이드' },
      on: {
        init(s) { setTimeout(() => reveal(s), reduce ? 0 : 200); },
        slideChangeTransitionStart(s) { reveal(s); },
        slideChangeTransitionEnd(s) { s.slides.forEach((sl, i) => i !== s.activeIndex && sl.classList.remove('is-kb')); },
        autoplayTimeLeft(s, time, progress) { bar.style.transform = `scaleX(${1 - progress})`; },
      },
    });

    let playing = !reduce;
    const setToggle = () => {
      toggle.setAttribute('aria-label', playing ? '자동 재생 일시정지' : '자동 재생 시작');
      toggle.querySelector('use').setAttribute('href', playing ? '#i-pause' : '#i-play');
    };
    setToggle();
    toggle.addEventListener('click', () => {
      if (reduce) return;
      playing = !playing;
      if (playing) heroSwiper.autoplay.start();
      else { heroSwiper.autoplay.stop(); bar.style.transform = 'scaleX(0)'; }
      setToggle();
    });
  }

  /* ---------- Hero (한 장) ---------- */
  const single = document.querySelector('.hero--single');
  if (single) {
    setTimeout(() => single.querySelector('.hero__copy')?.classList.add('is-revealed'), reduce ? 0 : 200);
    setTimeout(() => single.querySelector('.hero__script')?.classList.add('is-written'), reduce ? 0 : 900);
  }

  /* ---------- Sub visual 타이틀 리빌 ---------- */
  const sv = document.querySelector('.sub-visual__inner');
  if (sv) setTimeout(() => sv.classList.add('is-revealed'), reduce ? 0 : 150);

  /* ---------- Scroll animations ---------- */
  if (!hasGsap) return;
  const formatNum = (n) => Math.round(n).toLocaleString('ko-KR');

  if (reduce) {
    document.querySelectorAll('[data-counter]').forEach((el) => (el.textContent = formatNum(+el.dataset.counter)));
    return;
  }

  // A. Fade Up
  gsap.utils.toArray('[data-anim="fade-up"]').forEach((el) => {
    gsap.to(el, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  // C. Stagger (최대 6개까지 누적 딜레이)
  gsap.utils.toArray('[data-anim="stagger"]').forEach((group) => {
    gsap.to(group.children, {
      y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: (i) => Math.min(i, 5) * 0.1,
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });

  // D. Image reveal
  gsap.utils.toArray('[data-anim="img"]').forEach((el) => {
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
      .to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power2.inOut' }, 0)
      .to(el.querySelector('img'), { scale: 1, duration: 1.6, ease: 'expo.out' }, 0);
  });

  // E. Parallax (Tablet 이상)
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': () => {
      gsap.utils.toArray('[data-parallax-bg]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -8 }, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    },
  });

  // F. Counter
  gsap.utils.toArray('[data-counter]').forEach((el, i) => {
    const obj = { v: 0 };
    const unit = el.nextElementSibling;
    if (unit) gsap.set(unit, { opacity: 0 });
    gsap.to(obj, {
      v: +el.dataset.counter, duration: 2, ease: 'power2.out', delay: (i % 4) * 0.15,
      onUpdate: () => (el.textContent = formatNum(obj.v)),
      onComplete: () => unit && gsap.to(unit, { opacity: 1, duration: 0.3 }),
      scrollTrigger: { trigger: el, start: 'top 70%', once: true },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
  JNJ.refreshScroll = () => ScrollTrigger.refresh();
})();
