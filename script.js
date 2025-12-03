/* ============================================
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