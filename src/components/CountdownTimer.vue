<template>
  <div class="countdown">
    <div class="cd-block">
      <span class="cd-num" :class="{ tick: ticking.d }">{{ pad(time.d) }}</span>
      <div class="cd-unit">Days</div>
    </div>
    <div class="cd-sep">:</div>
    <div class="cd-block">
      <span class="cd-num" :class="{ tick: ticking.h }">{{ pad(time.h) }}</span>
      <div class="cd-unit">Hours</div>
    </div>
    <div class="cd-sep">:</div>
    <div class="cd-block">
      <span class="cd-num" :class="{ tick: ticking.m }">{{ pad(time.m) }}</span>
      <div class="cd-unit">Minutes</div>
    </div>
    <div class="cd-sep">:</div>
    <div class="cd-block">
      <span class="cd-num" :class="{ tick: ticking.s }">{{ pad(time.s) }}</span>
      <div class="cd-unit">Seconds</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

const TARGET = new Date('2026-04-15T19:00:00+08:00').getTime()

const time = reactive({ d: 0, h: 0, m: 0, s: 0 })
const ticking = reactive({ d: false, h: false, m: false, s: false })

function pad(n) { return String(n).padStart(2, '0') }

function triggerTick(key) {
  ticking[key] = false
  requestAnimationFrame(() => { ticking[key] = true })
}

let timer = null

function update() {
  const diff = Math.max(0, TARGET - Date.now())
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)

  if (d !== time.d) { time.d = d; triggerTick('d') }
  if (h !== time.h) { time.h = h; triggerTick('h') }
  if (m !== time.m) { time.m = m; triggerTick('m') }
  if (s !== time.s) { time.s = s; triggerTick('s') }
}

onMounted(() => { update(); timer = setInterval(update, 1000) })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.countdown { display: flex; align-items: center; gap: 6px; }
.cd-block { text-align: center; min-width: 76px; }
.cd-num {
  display: block; font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #fff; line-height: 1;
}
.cd-num.tick { animation: cdTick .3s ease; }
@keyframes cdTick {
  0%   { transform: translateY(-6px); opacity: 0; }
  100% { transform: translateY(0);    opacity: 1; }
}
.cd-unit {
  font-size: 0.65rem; font-weight: 500; letter-spacing: 1.5px;
  text-transform: uppercase; color: rgba(255,255,255,0.5); margin-top: 5px;
}
.cd-sep { font-size: 2rem; color: var(--red); font-weight: 700; line-height: 1; padding-bottom: 16px; }

@media (max-width: 580px) {
  .countdown { gap: 4px; }
  .cd-block { min-width: 60px; }
}
@media (max-width: 400px) {
  .countdown { gap: 2px; }
  .cd-block { min-width: 52px; }
  .cd-num { font-size: 1.6rem; }
  .cd-sep { font-size: 1.4rem; padding-bottom: 12px; }
  .cd-unit { font-size: 0.55rem; letter-spacing: 1px; }
}
</style>
