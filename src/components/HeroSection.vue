<template>
  <section id="hero">
    <div
      class="hero-bg"
      :style="{ transform: `translateY(${parallaxY}px)` }"
    ></div>
    <div class="hero-overlay"></div>

    <div class="hero-content reveal">
      <h1>
        Learn the Fundamentals of <br />
        <em>Web Development</em><br />Across 3 Sessions
      </h1>
      <p class="hero-sub">
        A free 3-part live series covering web development from the ground up —
        HTML, then CSS, then JavaScript. Each session builds on the last, giving
        you time to practice before the next. Designed for absolute beginners.
      </p>
      <div class="hero-meta">
        <div class="hero-meta-item">
          <i class="fa-solid fa-layer-group"></i> 3 Sessions Completed
        </div>
        <div class="hero-meta-item">
          <i class="fa-regular fa-calendar"></i> Mar 28, Apr 4 &amp; 11, 2026
        </div>
        <div class="hero-meta-item">
          <i class="fa-regular fa-clock"></i> 7:00 PM Philippine Time
        </div>
        <div class="hero-meta-item">
          <i class="fa-solid fa-video"></i> Now Concluded
        </div>
      </div>
      <div class="hero-btns">
        <span class="btn-closed"
          ><i class="fa-solid fa-lock"></i> Registration Closed</span
        >
        <RouterLink to="/#agenda" class="btn-outline"
          ><i class="fa-regular fa-file-lines"></i> View Agenda</RouterLink
        >
      </div>
    </div>

    <div class="hero-countdown-wrap">
      <div class="hero-countdown-inner">
        <div class="cd-label">
          All Sessions Completed
          <strong>Mar 28, Apr 4 &amp; 11, 2026 · 7:00 PM PHT</strong>
        </div>
        <CountdownTimer />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CountdownTimer from "./CountdownTimer.vue";

const parallaxY = ref(0);

function onScroll() {
  if (window.innerWidth > 820) parallaxY.value = window.scrollY * 0.35;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
#hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 40px 0;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url("/hero-pic.png") center center / cover no-repeat;
  will-change: transform;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    135deg,
    rgba(15, 24, 42, 0.88) 0%,
    rgba(15, 24, 42, 0.75) 60%,
    rgba(26, 46, 74, 0.65) 100%
  );
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  padding: 7px 18px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 28px;
}
.hero-eyebrow i {
  color: #f59e0b;
  font-size: 0.7rem;
}

h1 {
  font-family: "Playfair Display", serif;
  font-size: clamp(2.6rem, 5.5vw, 4.2rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 22px;
}
h1 em {
  color: var(--red);
  font-style: normal;
}

.hero-sub {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
  font-weight: 300;
  max-width: 580px;
  margin-bottom: 38px;
}
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 40px;
}
.hero-meta-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}
.hero-meta-item i {
  color: var(--red);
  font-size: 0.85rem;
}

.hero-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.btn-red {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--red);
  color: #fff;
  padding: 15px 34px;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 6px 24px rgba(217, 43, 58, 0.45);
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.btn-red:hover {
  background: var(--red-d);
  transform: translateY(-2px);
}
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  padding: 15px 34px;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(6px);
  transition:
    background 0.2s,
    border-color 0.2s;
}
.btn-outline:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.6);
}
.btn-closed {
  display: inline-flex; align-items: center; gap: 9px;
  background: rgba(255, 255, 255, 0.12); color: rgba(255, 255, 255, 0.45);
  padding: 15px 34px; border-radius: var(--radius);
  font-size: 0.9rem; font-weight: 600;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  cursor: not-allowed;
}

.hero-countdown-wrap {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.07);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  margin-top: 72px;
  padding: 36px 0;
}
.hero-countdown-inner {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
}
.cd-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}
.cd-label strong {
  display: block;
  font-size: 0.95rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0;
  margin-top: 4px;
}
.cd-register {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--red);
  color: #fff;
  padding: 13px 28px;
  border-radius: var(--radius);
  font-size: 0.82rem;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(217, 43, 58, 0.4);
  transition:
    background 0.2s,
    transform 0.2s;
  white-space: nowrap;
}
.cd-register:hover {
  background: var(--red-d);
  transform: translateY(-1px);
}

@media (max-width: 820px) {
  #hero {
    padding: 100px 24px 0;
  }
  .hero-countdown-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
}
@media (max-width: 580px) {
  .hero-countdown-inner {
    padding: 0 16px;
  }
  .hero-countdown-wrap {
    padding: 28px 0;
  }
}
</style>
