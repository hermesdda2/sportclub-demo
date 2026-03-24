/* ============================================
   SPORT CLUB PASEO — main.js
   ============================================ */

// ── Nav scroll ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Burger menu ───────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal (Intersection Observer) ─────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger siblings en grids
document.querySelectorAll('.values-grid, .inst-grid, .plans-grid, .hor-grid, .contact-cards').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
    revealObs.observe(el);
  });
});
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => sectionObs.observe(s));

// ── Hero Background Slider ─────────────────────
(function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.sdot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.idx));
      startTimer();
    });
  });

  startTimer();
})();

// ── Particle canvas ────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.r = Math.random() * 1.2 + 0.2;
      this.speed = Math.random() * 0.35 + 0.08;
      this.drift = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.4 + 0.08;
      const hue = 200 + Math.random() * 40;
      this.color = `hsla(${hue}, 80%, 75%, ${this.opacity})`;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── Counter animation on stats ─────────────────
function animateCount(el, target, suffix) {
  let n = 0;
  const step = target / 45;
  const t = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(t); }
    el.textContent = Math.round(n) + suffix;
  }, 30);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.hstat strong').forEach(el => {
      const raw = el.textContent.trim();
      const num = parseInt(raw.replace(/\D/g, ''));
      const suf = raw.replace(/[0-9\s]/g, '');
      if (!isNaN(num) && num > 0) animateCount(el, num, suf);
    });
    counterObs.unobserve(e.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.hero-stats').forEach(el => counterObs.observe(el));

// ── Tilt 3D en plan cards ─────────────────────
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ── Smooth cursor glow (efecto 21st.dev) ──────
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:400px; height:400px; border-radius:50%;
    background: radial-gradient(circle, rgba(6,122,192,0.07) 0%, transparent 70%);
    transform: translate(-50%,-50%);
    transition: opacity 0.3s ease;
    top:0; left:0;
  `;
  document.body.appendChild(glow);

  let mx = -500, my = -500;
  let gx = -500, gy = -500;

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animGlow() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animGlow);
  }
  animGlow();
})();

// ── Text shimmer en hero title ─────────────────
(function initShimmer() {
  const title = document.querySelector('.hero-left h1');
  if (!title) return;
  title.style.backgroundImage = 'none'; // reset any prior

  // Subtle ken-burns on slides ya está en CSS, aquí añadimos
  // number ticker ya hecho arriba
})();

// ── Gallery Slider ─────────────────────────────
(function initGallery() {
  const track   = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const progBar = document.getElementById('galleryProgress');
  const counter = document.getElementById('galleryCounter');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.gslide'));
  const total  = slides.length;
  let current  = 0;
  let autoTimer;
  const duration = 5000;

  function pad(n) { return String(n + 1).padStart(2, '0'); }

  function goTo(idx) {
    slides[current].classList.remove('g-active');
    current = (idx + total) % total;
    slides[current].classList.add('g-active');
    track.style.transform = `translateX(-${current * 100}%)`;
    counter.textContent = `${pad(current)} / ${pad(total - 1)}`;
    // Reset progress bar
    progBar.style.transition = 'none';
    progBar.style.width = '0%';
    requestAnimationFrame(() => {
      progBar.style.transition = `width ${duration}ms linear`;
      progBar.style.width = '100%';
    });
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), duration);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Swipe táctil
  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { goTo(current + (dx < 0 ? 1 : -1)); startAuto(); }
  });

  goTo(0);
  startAuto();
})();

// ── Plans Slider ───────────────────────────────
(function initPlansSlider() {
  const track     = document.getElementById('plansTrack');
  const slider    = document.getElementById('plansSlider');
  const prevBtn   = document.getElementById('planPrev');
  const nextBtn   = document.getElementById('planNext');
  const mobileNav = document.getElementById('plansMobileNav');
  const mobPrev   = document.getElementById('planMobPrev');
  const mobNext   = document.getElementById('planMobNext');
  const dotsWrap  = document.getElementById('planDots');
  const dotsDesktop = document.getElementById('planDotsDesktop');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.plan-card'));
  const total = cards.length;
  let current = 0;

  function isMobile() { return window.innerWidth <= 768; }

  function buildDots(wrap) {
    wrap.innerHTML = '';
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'pdot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      wrap.appendChild(d);
    });
  }

  function getAllDots() {
    return [...document.querySelectorAll('#planDots .pdot, #planDotsDesktop .pdot')];
  }

  // En mobile: 1 card a la vez. En desktop: lo que cabe.
  function visibleCount() {
    if (isMobile()) return 1;
    const cw = cards[0].offsetWidth + 20;
    if (!cw) return 3;
    return Math.max(1, Math.floor(slider.offsetWidth / cw));
  }

  // Ancho real de una card + gap
  function stepWidth() {
    // Leer el offsetWidth real de la primera card después de que el CSS la haya dimensionado
    const w = cards[0].offsetWidth;
    return (w || slider.offsetWidth) + 20;
  }

  function goTo(idx) {
    const maxIdx = Math.max(0, total - visibleCount());
    current = Math.max(0, Math.min(idx, maxIdx));
    track.style.transform = `translateX(-${current * stepWidth()}px)`;
    getAllDots().forEach((d, i) => d.classList.toggle('active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIdx;
    if (mobPrev) mobPrev.disabled = current === 0;
    if (mobNext) mobNext.disabled = current >= maxIdx;
  }

  buildDots(dotsWrap);
  buildDots(dotsDesktop);

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  if (mobPrev) mobPrev.addEventListener('click', () => goTo(current - 1));
  if (mobNext) mobNext.addEventListener('click', () => goTo(current + 1));

  // Swipe táctil
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  });

  function updateLayout() {
    if (isMobile()) {
      if (mobileNav) mobileNav.style.display = 'flex';
      if (dotsDesktop) dotsDesktop.style.display = 'none';
    } else {
      if (mobileNav) mobileNav.style.display = 'none';
      if (dotsDesktop) dotsDesktop.style.display = 'flex';
    }
    goTo(current);
  }

  updateLayout();
  window.addEventListener('resize', updateLayout, { passive: true });
})();

// ── Slider de Horarios + Tilt 3D + Spotlight ───────────────
(function initHorSlider() {
  const track    = document.getElementById('hcTrack');
  const viewport = document.getElementById('hcViewport');
  const btnPrev  = document.getElementById('hcPrev');
  const btnNext  = document.getElementById('hcNext');
  if (!track) return;

  const GAP = 20;
  let current = 0;

  function isMobile() { return window.innerWidth <= 768; }

  // En mobile: 1 card visible. En desktop: 4.
  function visibleCount() {
    return isMobile() ? 1 : 4;
  }

  // Ancho de cada card según viewport
  function cardWidth() {
    const vw = viewport.offsetWidth;
    const count = visibleCount();
    return (vw - GAP * (count - 1)) / count;
  }

  function setCardWidths() {
    const w = cardWidth();
    track.querySelectorAll('.hc').forEach(c => { c.style.width = w + 'px'; });
  }

  function totalCards() { return track.querySelectorAll('.hc').length; }

  function maxIdx() { return Math.max(0, totalCards() - visibleCount()); }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()));
    const offset = current * (cardWidth() + GAP);
    track.style.transform = `translateX(-${offset}px)`;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current >= maxIdx();
  }

  setCardWidths();
  goTo(0);

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // Swipe táctil
  let startX = 0;
  viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  });

  window.addEventListener('resize', () => { setCardWidths(); goTo(current); }, { passive: true });

  // ── Tilt 3D + Spotlight ──────────────────────────
  const MAX_TILT = 10;
  track.querySelectorAll('[data-tilt]').forEach(card => {
    const spotlight = card.querySelector('.hc-spotlight');

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotY =  ((x - rect.width  / 2) / (rect.width  / 2)) * MAX_TILT;
      const rotX = -((y - rect.height / 2) / (rect.height / 2)) * MAX_TILT;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
      if (spotlight) spotlight.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(6,122,192,0.22), transparent 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease';
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      if (spotlight) spotlight.style.background = '';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    });
  });
})();

// ── WhatsApp popup chat ─────────────────────────────────────
(function initWaChat() {
  const btn    = document.getElementById('waBtn');
  const popup  = document.getElementById('waPopup');
  const closeBtn = document.getElementById('waClose');
  const input  = document.getElementById('waInput');
  const send   = document.getElementById('waSend');
  if (!btn || !popup) return;

  const WA_NUMBER = '5212381870661';
  const DEFAULT_MSG = '¡Hola! Me gustaría obtener más información sobre las membresías de Sport Club Paseo.';

  function open() {
    popup.classList.add('open');
    btn.classList.add('active');
    setTimeout(() => input && input.focus(), 300);
  }
  function close() {
    popup.classList.remove('open');
    btn.classList.remove('active');
  }

  btn.addEventListener('click', () => {
    popup.classList.contains('open') ? close() : open();
  });

  if (closeBtn) closeBtn.addEventListener('click', close);

  // Actualiza el href del botón enviar con el texto del input
  function updateLink() {
    const msg = (input && input.value.trim()) ? input.value.trim() : DEFAULT_MSG;
    send.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  if (input) {
    input.addEventListener('input', updateLink);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { updateLink(); send.click(); }
    });
  }

  // Inicializar link con mensaje default
  updateLink();

  // El popup solo se abre con click en el botón, nunca automáticamente
})();

// ── Mobile Sliders (Values + Instalaciones) ────────────────
(function initMobileSliders() {
  function isMobile() { return window.innerWidth <= 768; }

  function buildMobileSlider(opts) {
    const { track, nav, prevBtn, nextBtn, dotsWrap } = opts;
    if (!track || !nav) return;

    // Ya inicializado — solo recalcular posición en resize
    if (track._sliderGoTo) {
      track._sliderGoTo(track._sliderCurrent || 0);
      return;
    }

    // El contenedor con overflow:hidden es el padre del track
    const viewport = track.parentElement;

    const items = Array.from(track.children);
    const total = items.length;
    let current = 0;

    // Generar dots
    dotsWrap.innerHTML = '';
    items.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'mob-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('.mob-dot'));

    function cardWidth() {
      const w = items[0].offsetWidth;
      return (w || viewport.offsetWidth) + 16;
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, total - 1));
      track._sliderCurrent = current;
      track.style.transform = `translateX(-${current * cardWidth()}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
    }

    // Registrar listeners solo una vez
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Swipe táctil — escuchar en el viewport (overflow:hidden), no en el track
    let startX = 0;
    viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
    });

    window.addEventListener('resize', () => { goTo(current); }, { passive: true });

    // Marcar como inicializado
    track._sliderGoTo = goTo;
    track._sliderCurrent = 0;

    goTo(0);
  }

  function initIfMobile() {
    // Values
    const valuesTrack = document.getElementById('valuesTrack');
    const valuesNav   = document.getElementById('valuesNav');

    // Inst
    const instTrack = document.getElementById('instTrack');
    const instNav   = document.getElementById('instNav');

    if (isMobile()) {
      // Mostrar navs
      if (valuesNav) valuesNav.style.display = 'flex';
      if (instNav)   instNav.style.display   = 'flex';

      buildMobileSlider({
        track:    valuesTrack,
        nav:      valuesNav,
        prevBtn:  document.getElementById('valuesPrev'),
        nextBtn:  document.getElementById('valuesNext'),
        dotsWrap: document.getElementById('valuesDots'),
      });
      buildMobileSlider({
        track:    instTrack,
        nav:      instNav,
        prevBtn:  document.getElementById('instPrev'),
        nextBtn:  document.getElementById('instNext'),
        dotsWrap: document.getElementById('instDots'),
      });
    } else {
      // Desktop: ocultar navs, resetear transforms
      if (valuesNav) valuesNav.style.display = 'none';
      if (instNav)   instNav.style.display   = 'none';
      if (valuesTrack) valuesTrack.style.transform = '';
      if (instTrack)   instTrack.style.transform   = '';
    }
  }

  initIfMobile();
  window.addEventListener('resize', initIfMobile, { passive: true });
})();
