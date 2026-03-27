<template>
  <section id="stats">
    <div class="stats-inner">
      <div v-for="(stat, i) in stats" :key="i" class="stat-item reveal" :style="{ transitionDelay: `${0.05 * (i+1)}s` }">
        <div class="stat-icon"><i :class="stat.icon"></i></div>
        <div class="stat-num-big">{{ stat.value }}</div>
        <div class="stat-desc">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { icon: 'fa-solid fa-graduation-cap', value: '5,000+', label: 'Students Taught' },
  { icon: 'fa-solid fa-star',           value: '4.9 / 5', label: 'Average Rating' },
  { icon: 'fa-solid fa-chalkboard-user',value: '50+',     label: 'Webinars Hosted' },
  { icon: 'fa-solid fa-hand-holding-heart', value: '100%', label: 'Completely Free' }
]
</script>

<style scoped>
#stats { background: var(--white); border-bottom: 1px solid var(--border); }
.stats-inner {
  display: grid; grid-template-columns: repeat(4, 1fr);
  max-width: 1140px; margin: 0 auto;
}
.stat-item { padding: 40px 36px; border-right: 1px solid var(--border); }
.stat-item:last-child { border-right: none; }
.stat-icon {
  width: 44px; height: 44px; border-radius: var(--radius);
  background: rgba(217,43,58,0.08);
  display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
}
.stat-icon i { color: var(--red); font-size: 1rem; }
.stat-num-big {
  font-family: 'Playfair Display', serif;
  font-size: 2rem; font-weight: 700; color: var(--navy); line-height: 1; margin-bottom: 4px;
}
.stat-desc { font-size: 0.82rem; color: var(--muted); font-weight: 400; }

@media (max-width: 820px) {
  .stats-inner { grid-template-columns: 1fr 1fr; }
  .stat-item:nth-child(2) { border-right: none; }
  .stat-item { padding: 28px 24px; }
}
</style>
