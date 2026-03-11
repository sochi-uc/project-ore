/* ============================================
<<<<<<< HEAD
   I LOVE ORE - JAVASCRIPT
   ============================================ */

// Configuration
const IMAGE_COUNT = 16;  // Total number of images (1.jpg to 16.jpg)
const VIDEO_COUNT = 22;  // Total number of videos (1.mp4 to 22.mp4)
const INTERVAL = 9000;   // 9 seconds per slide

// State variables
let order = [];
let current = 0;
let timer = null;
let playing = true;

// DOM Elements
const slidesContainer = document.getElementById('slides');
const caption = document.getElementById('caption');
const dots = document.getElementById('dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

/**
 * Build slides from images and videos
 */
function buildSlides() {
  slidesContainer.innerHTML = '';
  dots.innerHTML = '';
  
  const items = [];
  
  // Add all images
  for (let i = 1; i <= IMAGE_COUNT; i++) {
    items.push({
      type: 'img',
      src: `images/${i}.jpg`,
      caption: `Memory ${i}`
    });
  }
  
  // Add all videos
  for (let j = 1; j <= VIDEO_COUNT; j++) {
    items.push({
      type: 'video',
      src: `videos/${j}.mp4`,
      caption: `Video ${j}`
    });
  }
  
  // Shuffle items randomly
  order = shuffle(items);
  
  // Create slide elements
  order.forEach((item, idx) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.dataset.index = idx;
    
    if (item.type === 'img') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption;
      slide.appendChild(img);
    } else {
      const video = document.createElement('video');
      video.src = item.src;
      video.alt = item.caption;
      video.muted = true;
      video.loop = true;
      video.autoplay = false;
      slide.appendChild(video);
    }
    
    slidesContainer.appendChild(slide);
    
    // Create dot navigation button
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      goTo(idx);
      resetTimer();
    });
    dots.appendChild(dot);
  });
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Show specific slide by index
 */
function show(index) {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;
  
  // Wrap around at boundaries
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  
  // Hide all slides and pause videos
  slides.forEach(s => {
    s.classList.remove('show');
    const video = s.querySelector('video');
    if (video) video.pause();
  });
  
  // Show current slide
  slides[index].classList.add('show');
  current = index;
  
  // Play video if it's a video slide
  const currentVideo = slides[index].querySelector('video');
  if (currentVideo) {
    currentVideo.currentTime = 0;
    currentVideo.play();
  }
  
  // Update caption
  caption.textContent = (order[index] && order[index].caption) 
    ? order[index].caption 
    : '';
  
  // Update dot indicators
  const dotButtons = dots.querySelectorAll('button');
  dotButtons.forEach(b => b.classList.remove('active'));
  if (dotButtons[index]) dotButtons[index].classList.add('active');
}

/**
 * Navigate to next slide
 */
function next() {
  show(current + 1);
}

/**
 * Navigate to previous slide
 */
function prev() {
  show(current - 1);
}

/**
 * Go to specific slide
 */
function goTo(i) {
  show(i);
  current = i;
}

/**
 * Start auto-play timer
 */
function startTimer() {
  stopTimer();
  timer = setInterval(() => {
    next();
  }, INTERVAL);
  playBtn.textContent = '⏸';
  playing = true;
}

/**
 * Stop auto-play timer
 */
function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
  playBtn.textContent = '▶';
  playing = false;
}

/**
 * Reset timer (stop and start)
 */
function resetTimer() {
  stopTimer();
  startTimer();
}

/**
 * Initialize scroll reveal animations
 */
function initReveal() {
  const elements = document.querySelectorAll('.letter-card, .poem, .slideshow, .footer');
  
  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all .9s cubic-bezier(.2,.9,.2,1)';
  });
  
  function onScroll() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }
    });
  }
  
    const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      toggleBtn.textContent = "☀️"; // Light icon
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙"; // Dark icon
      localStorage.setItem("theme", "light");
    }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial check
}

/**
 * Initialize floating particles
 */
function initParticles() {
  const layer = document.getElementById('particle-layer');
  const count = 24;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = 6 + Math.random() * 28;
    particle.style.width = particle.style.height = size + 'px';
    particle.style.left = (Math.random() * 100) + '%';
    particle.style.top = (Math.random() * 100) + '%';
    particle.style.background = Math.random() > 0.5 
      ? 'radial-gradient(circle, #ffb6c1, #ff8ab8)' 
      : 'radial-gradient(circle, #4eece6, #9beff0)';
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.opacity = 0.6 + Math.random() * 0.4;
    particle.style.pointerEvents = 'none';
    
    layer.appendChild(particle);
    animateParticle(particle);
  }
  
  // Mouse parallax effect
  window.addEventListener('mousemove', (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const nx = (e.clientX - w / 2) / w;
    const ny = (e.clientY - h / 2) / h;
    
    document.querySelectorAll('.particle').forEach((el, i) => {
      const depth = (i % 6) / 6;
      el.style.transform = `translate3d(${-nx * 20 * (1 - depth)}px, ${-ny * 20 * (1 - depth)}px, 0)`;
    });
  });
}

/**
 * Animate individual particle
 */
function animateParticle(element) {
  const duration = 6000 + Math.random() * 9000;
  const dx = (Math.random() - 0.5) * 80;
  const dy = (Math.random() - 0.5) * 80;
  
  element.animate([
    { transform: 'translate3d(0, 0, 0)' },
    { transform: `translate3d(${dx}px, ${dy}px, 0)` },
    { transform: 'translate3d(0, 0, 0)' }
  ], {
    duration: duration,
    iterations: Infinity,
    easing: 'cubic-bezier(.2, .9, .2, 1)'
  });
}

// ============================================
// Event Listeners
// ============================================

// Control button listeners
prevBtn.addEventListener('click', () => {
  prev();
  resetTimer();
});

nextBtn.addEventListener('click', () => {
  next();
  resetTimer();
});

playBtn.addEventListener('click', () => {
  if (playing) stopTimer();
  else startTimer();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    next();
    resetTimer();
  }
  if (e.key === 'ArrowLeft') {
    prev();
    resetTimer();
  }
  if (e.key === ' ') {
    e.preventDefault();
    if (playing) stopTimer();
    else startTimer();
  }
});

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Build and show slides
  buildSlides();
  show(0);
  startTimer();
  
  // Initialize animations
  initReveal();
  initParticles();
  
  // Pause slideshow on hover
  const slideshow = document.getElementById('slideshow');
  slideshow.addEventListener('mouseenter', () => stopTimer());
  slideshow.addEventListener('mouseleave', () => startTimer());
});
=======
   I LOVE ORE — SCRIPT v3
   Calm · Complete · Alive
   ============================================ */

'use strict';

// ── Config ──────────────────────────────────
const IMAGE_COUNT = 27;
const VIDEO_COUNT = 36;
const INTERVAL    = 10000;   // 10s — calm pace

// ── State ────────────────────────────────────
let order   = [];
let current = 0;
let timer   = null;
let playing = true;

// ── DOM ──────────────────────────────────────
const slidesEl   = document.getElementById('slides');
const ribbonNum  = document.getElementById('ribbon-num');
const ribbonCap  = document.getElementById('ribbon-caption');
const gsCur      = document.getElementById('gs-cur');
const gsTot      = document.getElementById('gs-tot');
const gsFill     = document.getElementById('gs-fill');
const gsThumbs   = document.getElementById('gs-thumbs');
const prevBtn    = document.getElementById('prev');
const nextBtn    = document.getElementById('next');
const playBtn    = document.getElementById('play');
const stageEl    = document.getElementById('stage');
const stageWrap  = document.getElementById('stage-wrap');

// ══════════════════════════════════════════
// 1. CUSTOM CURSOR
// ══════════════════════════════════════════
const ring = document.getElementById('c-ring');
const dot  = document.getElementById('c-dot');
let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
});

// Add hover class to body for CSS ring expansion
document.querySelectorAll('a, button, .poem-card, .pillar, .gs-thumb')
  .forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

(function tickCursor() {
  rx += (mx - rx) * 0.10;   // slower lag = calmer
  ry += (my - ry) * 0.10;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(tickCursor);
})();

// ══════════════════════════════════════════
// 2. AURORA CANVAS
// ══════════════════════════════════════════
function initAurora() {
  const canvas = document.getElementById('aurora');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const waves = [
    { r:255,g:126,b:179, amp:0.15, freq:0.5,  phase:0,    speed:0.00035 },
    { r:90,g:228,b:222,  amp:0.11, freq:0.35, phase:2.2,  speed:0.00025 },
    { r:245,g:208,b:138, amp:0.08, freq:0.75, phase:4.1,  speed:0.00040 },
    { r:200,g:100,b:220, amp:0.06, freq:0.45, phase:1.0,  speed:0.00020 },
  ];

  function drawWave(w, ts) {
    w.phase += w.speed;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 4) {
      const y = H * 0.5
        + Math.sin(x * w.freq * 0.007 + w.phase) * H * w.amp
        + Math.sin(x * 0.003 + ts * 0.00015) * H * 0.03;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fillStyle = `rgba(${w.r},${w.g},${w.b},0.038)`;
    ctx.fill();
  }

  let last = 0;
  const render = ts => {
    ctx.clearRect(0, 0, W, H);
    waves.forEach(w => drawWave(w, ts));
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

// ══════════════════════════════════════════
// 3. CONSTELLATION FOOTER CANVAS
// ══════════════════════════════════════════
function initConstellation() {
  const canvas = document.getElementById('constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const footer = document.querySelector('.footer-section');
  if (!footer) return;

  let W, H, stars = [];

  const resize = () => {
    W = canvas.width  = footer.offsetWidth;
    H = canvas.height = footer.offsetHeight;
    buildStars();
  };

  function buildStars() {
    stars = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.4 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        opacity: 0.2 + Math.random() * 0.6,
        twinkle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '255,126,179' : '90,228,222',
      });
    }
  }

  const MAX_DIST = 100;

  function render(ts) {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,126,179,${0.12 * (1 - d / MAX_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw & move stars
    stars.forEach(s => {
      s.twinkle += 0.01;
      const a = s.opacity * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color},${a})`;
      ctx.fill();
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
    });

    requestAnimationFrame(render);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(render);
}

// ══════════════════════════════════════════
// 4. THEME
// ══════════════════════════════════════════
function initTheme() {
  const btn  = document.getElementById('theme-btn');
  const icon = document.getElementById('theme-icon');
  if (localStorage.getItem('ore-theme') === 'light') {
    document.body.classList.add('light'); icon.textContent = '☀️';
  }
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    icon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('ore-theme', isLight ? 'light' : 'dark');
    if (window.gsap) gsap.from(icon, { scale: 0.3, rotation: 120, duration: 0.6, ease: 'back.out(2)' });
  });
}

// ══════════════════════════════════════════
// 5. GSAP SCROLL ANIMATIONS
// ══════════════════════════════════════════
function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Default fadeUp
  gsap.utils.toArray('[data-gsap="fadeUp"]').forEach((el, i) => {
    const delay = parseFloat(el.dataset.delay || 0) / 1000;
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 1.6, ease: 'power3.out', delay,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    gsap.set(el, { y: 32 });
  });

  // Slide in from sides
  gsap.utils.toArray('[data-gsap="slideIn"]').forEach(el => {
    const dir   = el.dataset.dir === 'right' ? 60 : -60;
    const delay = parseFloat(el.dataset.delay || 0) / 1000;
    gsap.set(el, { x: dir });
    gsap.to(el, {
      opacity: 1, x: 0,
      duration: 1.8, ease: 'power3.out', delay,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Sec markers
  gsap.utils.toArray('.sec-marker').forEach(el => {
    gsap.from(el.querySelectorAll('.sec-line'), {
      scaleX: 0, duration: 1.8, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
    gsap.from([el.querySelector('.sec-num'), el.querySelector('.sec-title')], {
      opacity: 0, y: 10, duration: 1.2, ease: 'power2.out', stagger: 0.15,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Letter drop cap
  gsap.from('.drop-cap', {
    opacity: 0, scale: 0.6, duration: 1.6, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '.letter-wrap', start: 'top 80%', once: true },
  });

  // Footer name
  gsap.from('.fs-name', {
    opacity: 0, scale: 0.85, duration: 2, ease: 'power3.out',
    scrollTrigger: { trigger: '.fs-name', start: 'top 85%', once: true },
  });

  // Pillars stagger
  gsap.from('.pillar', {
    opacity: 0, y: 40, duration: 1.4, ease: 'power3.out', stagger: 0.2,
    scrollTrigger: { trigger: '.footer-pillars', start: 'top 85%', once: true },
  });
}

// ══════════════════════════════════════════
// 6. GALLERY
// ══════════════════════════════════════════
function pad(n) { return String(n).padStart(2, '0'); }

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGallery() {
  slidesEl.innerHTML = '';
  gsThumbs.innerHTML = '';
  order = [];

  const items = [];
  for (let i = 1; i <= IMAGE_COUNT; i++) items.push({ type:'img',   src:`images/${i}.jpg`,  cap:`Memory ${i}` });
  for (let j = 1; j <= VIDEO_COUNT; j++) items.push({ type:'video', src:`videos/${j}.mp4`,  cap:`Video ${j}` });
  order = shuffle(items);

  if (gsTot) gsTot.textContent = pad(order.length);

  order.forEach((item, idx) => {
    // ── Slide ──
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.dataset.index = idx;

    if (item.type === 'img') {
      const img = document.createElement('img');
      img.src = item.src; img.alt = item.cap; img.loading = 'lazy';
      slide.appendChild(img);
    } else {
      const vid = document.createElement('video');
      vid.src = item.src; vid.muted = true; vid.loop = true;
      vid.autoplay = false; vid.playsInline = true;
      vid.setAttribute('aria-label', item.cap);
      slide.appendChild(vid);
    }
    slidesEl.appendChild(slide);

    // ── Thumbnail ──
    const thumb = document.createElement('div');
    thumb.className = 'gs-thumb';
    thumb.dataset.index = idx;

    if (item.type === 'img') {
      const img = document.createElement('img');
      img.src = item.src; img.alt = item.cap; img.loading = 'lazy';
      thumb.appendChild(img);
    } else {
      const vid = document.createElement('video');
      vid.src = item.src; vid.muted = true; vid.preload = 'metadata';
      thumb.appendChild(vid);
    }
    thumb.addEventListener('click', () => { goTo(idx); resetTimer(); });
    gsThumbs.appendChild(thumb);
  });
}

// ── Adaptive stage sizing — handles 16:9, 4:3, 9:16 and everything between ──
function adaptStage(media) {
  if (!media || !stageEl) return;

  // Max height caps
  const maxH      = window.innerHeight * 0.82;
  const wrapWidth = stageEl.parentElement?.clientWidth || window.innerWidth - 60;

  function apply(natW, natH) {
    if (!natW || !natH) return;

    const ratio   = natH / natW;  // > 1 = portrait, < 1 = landscape, ≈ 0.75 = 4:3
    const isPortrait = ratio > 1.05;

    if (isPortrait) {
      // 9:16 or similar — narrow the stage and let it be taller
      const maxPortraitW = Math.min(420, wrapWidth * 0.52, wrapWidth);
      const targetH      = Math.min(maxPortraitW * ratio, maxH);
      const stageW       = targetH / ratio;
      stageEl.style.width    = stageW + 'px';
      stageEl.style.height   = targetH + 'px';
      stageEl.style.maxWidth = '';
      stageEl.style.margin   = '0 auto';
    } else {
      // 16:9, 4:3, or custom landscape — fill available width
      const targetH = Math.min(wrapWidth * ratio, maxH);
      stageEl.style.width    = '100%';
      stageEl.style.height   = targetH + 'px';
      stageEl.style.maxWidth = '';
      stageEl.style.margin   = '';
    }
  }

  if (media.tagName === 'IMG') {
    if (media.complete && media.naturalWidth) {
      apply(media.naturalWidth, media.naturalHeight);
    } else {
      media.addEventListener('load', () => apply(media.naturalWidth, media.naturalHeight), { once: true });
    }
  } else {
    // VIDEO
    if (media.videoWidth && media.videoHeight) {
      apply(media.videoWidth, media.videoHeight);
    } else {
      media.addEventListener('loadedmetadata', () => apply(media.videoWidth, media.videoHeight), { once: true });
      // Fallback: if metadata fires but dimensions are still 0 (some browsers/formats)
      media.addEventListener('canplay', () => {
        if (media.videoWidth && media.videoHeight) apply(media.videoWidth, media.videoHeight);
      }, { once: true });
    }
  }
}


window.addEventListener('resize', () => {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  const media = slides[current]?.querySelector('img,video');
  if (media) adaptStage(media);
});

// ── Show slide ─────────────────────────────
function show(idx) {
  const slides = document.querySelectorAll('.slide');
  const thumbs = document.querySelectorAll('.gs-thumb');
  if (!slides.length) return;
  if (idx < 0) idx = slides.length - 1;
  if (idx >= slides.length) idx = 0;

  // Exit current
  const prevSlide = slides[current];
  if (prevSlide && current !== idx) {
    prevSlide.classList.add('exit');
    setTimeout(() => prevSlide.classList.remove('show', 'exit'), 1200);
  }
  slides.forEach(s => { const v = s.querySelector('video'); if (v) v.pause(); });

  // Show
  current = idx;
  slides[idx].classList.add('show');

  const media = slides[idx].querySelector('img,video');
  adaptStage(media);

  if (media?.tagName === 'VIDEO') {
    media.currentTime = 0;
    const tryPlay = () => media.play().catch(() => {});
    media.readyState >= 1 ? tryPlay() : media.addEventListener('loadedmetadata', tryPlay, { once: true });
  }

  // Ribbon
  if (ribbonNum) ribbonNum.textContent = pad(idx + 1);
  if (ribbonCap) ribbonCap.textContent = order[idx]?.cap || '';

  // Counter + bar
  if (gsCur) gsCur.textContent = pad(idx + 1);
  if (gsFill) gsFill.style.width = ((idx + 1) / order.length * 100) + '%';

  // Thumbs
  thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
  // Ensure the active thumbnail is visible inside the thumbnail strip without scrolling the whole page.
  const activeThumb = thumbs[idx];
  if (gsThumbs && activeThumb) {
    const container = gsThumbs;
    const thumbLeft = activeThumb.offsetLeft;
    const thumbRight = thumbLeft + activeThumb.offsetWidth;
    const visibleLeft = container.scrollLeft;
    const visibleRight = visibleLeft + container.clientWidth;
    if (thumbLeft < visibleLeft) {
      container.scrollTo({ left: Math.max(0, thumbLeft - 8), behavior: 'smooth' });
    } else if (thumbRight > visibleRight) {
      container.scrollTo({ left: Math.max(0, thumbRight - container.clientWidth + 8), behavior: 'smooth' });
    }
  } else {
    // Fallback: if no container, fall back to element scrollIntoView (may scroll page)
    activeThumb?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // Play icon swap
  updatePlayIcon();
}

function next() { show(current + 1); }
function prev() { show(current - 1); }
function goTo(i) { show(i); }

function updatePlayIcon() {
  const icon = document.getElementById('play-icon');
  if (!icon) return;
  if (playing) {
    icon.innerHTML = '<rect x="5" y="4" width="4" height="12" rx="1"/><rect x="11" y="4" width="4" height="12" rx="1"/>';
  } else {
    icon.innerHTML = '<polygon points="6,4 16,10 6,16"/>';
  }
}

function startTimer() {
  stopTimer();
  timer = setInterval(next, INTERVAL);
  playing = true; updatePlayIcon();
}
function stopTimer() {
  clearInterval(timer); timer = null;
  playing = false; updatePlayIcon();
}
function resetTimer() { stopTimer(); startTimer(); }

// ══════════════════════════════════════════
// 7. FILM STRIP TICKER
// ══════════════════════════════════════════
function buildFilmStrip() {
  const track = document.getElementById('film-track');
  if (!track) return;
  // Two copies for seamless loop
  for (let copy = 0; copy < 2; copy++) {
    for (let i = 0; i < 30; i++) {
      const hole = document.createElement('div');
      hole.className = 'film-hole';
      track.appendChild(hole);
    }
  }
}

// ══════════════════════════════════════════
// 8. FOOTER TICKER
// ══════════════════════════════════════════
function buildFooterTicker() {
  const track = document.getElementById('ft-track');
  if (!track) return;
  const phrases = [
    'For Ore', '✦', 'Always', '·', 'Keep Shining', '✦',
    'Isaiah 60:1', '·', 'Arise and Shine', '✦', 'Made with Love', '·',
    'For Ore', '✦', 'Always', '·', 'Keep Shining', '✦',
    'Isaiah 60:1', '·', 'Arise and Shine', '✦', 'Made with Love', '·',
  ];
  phrases.forEach((p, i) => {
    const el = document.createElement('span');
    el.className = p === '✦' || p === '·' ? 'ft-sep' : 'ft-item';
    el.textContent = p;
    track.appendChild(el);
  });
}

// ══════════════════════════════════════════
// 9. AMBIENT PARTICLES
// ══════════════════════════════════════════
function initParticles() {
  const world = document.querySelector('.world');
  if (!world) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    const size = 5 + Math.random() * 18;
    Object.assign(p.style, {
      position:     'absolute',
      width:        size + 'px', height: size + 'px',
      borderRadius: '50%',
      left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
      background: Math.random() > 0.5
        ? 'radial-gradient(circle, rgba(255,126,179,0.6), transparent 70%)'
        : 'radial-gradient(circle, rgba(90,228,222,0.5), transparent 70%)',
      opacity: String(0.15 + Math.random() * 0.3),
      pointerEvents: 'none', filter: `blur(${1 + Math.random() * 3}px)`,
    });
    world.appendChild(p);

    const dur = 14000 + Math.random() * 20000;
    const dx  = (Math.random() - 0.5) * 120;
    const dy  = (Math.random() - 0.5) * 120;
    p.animate([
      { transform:'translate3d(0,0,0)' },
      { transform:`translate3d(${dx}px,${dy}px,0)` },
      { transform:'translate3d(0,0,0)' }
    ], { duration: dur, iterations: Infinity, easing:'ease-in-out', delay: Math.random() * 8000 });
  }

  // Orb mouse parallax
  window.addEventListener('mousemove', e => {
    const nx = (e.clientX / window.innerWidth  - 0.5);
    const ny = (e.clientY / window.innerHeight - 0.5);
    document.querySelectorAll('.orb').forEach((orb, i) => {
      const s = 20 + i * 10;
      orb.style.transform = `translate(${-nx * s}px, ${-ny * s}px)`;
    });
  }, { passive: true });
}

// ══════════════════════════════════════════
// 14. SCRIPTURE SHUFFLER
// ══════════════════════════════════════════
const SCRIPTURES = [
  { ref: 'Romans 8:19', text: '"For the earnest expectation of the creature waiteth for the manifestation of the daughters of God."' },
  { ref: 'Romans 8:38–39', text: '"For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."' },
  { ref: 'Romans 1:9', text: '"For God is my witness, whom I serve with my spirit in the gospel of his Son, that without ceasing I make mention of you always in my prayers."' },
  { ref: 'Isaiah 59:1', text: '"Behold, the Lord\'s hand is not shortened, that it cannot save; neither his ear heavy, that it cannot hear."' },
  { ref: 'Isaiah 43:2', text: '"When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee."' },
  { ref: 'Zephaniah 3:17', text: '"The Lord thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing."' },
  { ref: 'Isaiah 62:3', text: '"Thou shalt also be a crown of glory in the hand of the Lord, and a royal diadem in the hand of thy God."' },
  { ref: 'Jeremiah 31:3', text: '"The Lord hath appeared of old unto me, saying, Yea, I have loved thee with an everlasting love: therefore with lovingkindness have I drawn thee."' },
  { ref: 'Psalm 46:5', text: '"God is in the midst of her; she shall not be moved: God shall help her, and that right early."' },
  { ref: 'Isaiah 43:4', text: '"Since thou wast precious in my sight, thou hast been honorable, and I have loved thee: therefore will I give men for thee, and people for thy life."' },
  { ref: 'Matthew 10:30–31', text: '"But the very hairs of your head are all numbered. Fear ye not therefore, ye are of more value than many sparrows."' },
  { ref: '1 Corinthians 6:20', text: '"For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God\'s."' },
  { ref: 'Proverbs 31:30', text: '"Favour is deceitful, and beauty is vain: but a woman that feareth the Lord, she shall be praised."' },
  { ref: 'Proverbs 31:25', text: '"Strength and honour are her clothing; and she shall rejoice in time to come."' },
  { ref: 'Ezekiel 16:11–13', text: '"I decked thee also with ornaments... and I put a jewel on thy forehead, and earrings in thine ears, and a beautiful crown upon thine head... and thou wast exceeding beautiful, and thou didst prosper into a kingdom."' },
  { ref: 'Psalm 68:5', text: '"A father of the fatherless, and a judge of the widows, is God in his holy habitation."' },
  { ref: 'Romans 8:15', text: '"For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father."' },
  { ref: 'John 1:12', text: '"But as many as received him, to them gave he power to become the daughters of God, even to them that believe on his name."' },
  { ref: 'Isaiah 66:13', text: '"As one whom his mother comforteth, so will I comfort you..."' },
  { ref: 'Isaiah 60:1–2', text: '"Arise, shine; for thy light is come, and the glory of the Lord is risen upon thee."' },
];

let ssIdx = 0;
let ssOrder = [];

function shuffleScriptures() {
  ssOrder = SCRIPTURES.slice().sort(() => Math.random() - 0.5);
  ssIdx = 0;
}

function renderScripture(idx, animate = false) {
  const card   = document.getElementById('ss-card');
  const refEl  = document.getElementById('ss-ref');
  const textEl = document.getElementById('ss-text');
  const dotsEl = document.getElementById('ss-dots');
  if (!card || !refEl || !textEl) return;

  const s = ssOrder[idx];

  if (animate) {
    card.classList.add('fading');
    setTimeout(() => {
      refEl.textContent  = s.ref;
      textEl.textContent = s.text;
      card.classList.remove('fading');
    }, 500);
  } else {
    refEl.textContent  = s.ref;
    textEl.textContent = s.text;
  }

  // Dots — show up to 7 around current
  if (dotsEl) {
    dotsEl.innerHTML = '';
    const total = ssOrder.length;
    const show  = Math.min(total, 9);
    const start = Math.max(0, Math.min(idx - 4, total - show));
    for (let i = start; i < start + show; i++) {
      const d = document.createElement('div');
      d.className = 'ss-dot' + (i === idx ? ' active' : '');
      d.addEventListener('click', () => { ssIdx = i; renderScripture(ssIdx, true); });
      dotsEl.appendChild(d);
    }
  }
}

function initScriptures() {
  // Always show Romans 8:19 first, then shuffle the rest
  const first = SCRIPTURES.find(s => s.ref === 'Romans 8:19');
  const rest  = SCRIPTURES.filter(s => s.ref !== 'Romans 8:19').sort(() => Math.random() - 0.5);
  ssOrder = first ? [first, ...rest] : rest;
  ssIdx = 0;
  renderScripture(0);

  let ssTimer = null;

  function startSsTimer() {
    clearInterval(ssTimer);
    ssTimer = setInterval(() => {
      ssIdx = (ssIdx + 1) % ssOrder.length;
      renderScripture(ssIdx, true);
    }, 14000); // 14 seconds — calm but not too slow
  }

  const btn = document.getElementById('ss-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      ssIdx = (ssIdx + 1) % ssOrder.length;
      renderScripture(ssIdx, true);
      startSsTimer(); // reset timer so it doesn't double-advance
    });
  }

  startSsTimer();
}



const yearEl = document.getElementById('sig-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ══════════════════════════════════════════
// 11. KEYBOARD
// ══════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { next(); resetTimer(); }
  if (e.key === 'ArrowLeft')  { prev(); resetTimer(); }
  if (e.key === ' ')          { e.preventDefault(); playing ? stopTimer() : startTimer(); }
});

// ══════════════════════════════════════════
// 12. BUTTON LISTENERS
// ══════════════════════════════════════════
prevBtn?.addEventListener('click', () => { prev(); resetTimer(); });
nextBtn?.addEventListener('click', () => { next(); resetTimer(); });
playBtn?.addEventListener('click', () => { playing ? stopTimer() : startTimer(); });

// Gallery hover pause
stageWrap?.addEventListener('mouseenter', stopTimer);
stageWrap?.addEventListener('mouseleave', startTimer);

// ══════════════════════════════════════════
// 13. INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initAurora();
  initTheme();
  initParticles();
  buildFilmStrip();
  buildFooterTicker();
  buildGallery();
  show(0);
  startTimer();
  initConstellation();
  initScriptures();
  initGSAP();
});
>>>>>>> 3ac43a0 (Ore website 2.0 update with gallery videos and animations)
