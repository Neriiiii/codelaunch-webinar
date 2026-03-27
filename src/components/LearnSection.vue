<template>
  <section id="learn">
    <div class="container">
      <div class="learn-header reveal">
        <div class="tag">Curriculum</div>
        <h2 class="section-title">Everything You'll Cover<br />Across 3 Sessions</h2>
        <p class="section-sub">No prior experience needed. Spread across 3 live sessions so every topic gets the time it deserves — nothing crammed, nothing rushed.</p>
        <div class="divider"></div>
      </div>
      <div class="learn-grid">
        <RouterLink
          v-for="(card, i) in cards" :key="i"
          :to="`/modules/${card.id}`"
          class="learn-card reveal"
          :style="{ transitionDelay: `${0.05 * (i+1)}s` }"
        >
          <div class="learn-card-icon"><i :class="card.icon"></i></div>
          <div class="learn-num">Module {{ String(i+1).padStart(2,'0') }}</div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.desc }}</p>
          <div class="learn-card-link">Learn more <i class="fa-solid fa-arrow-right"></i></div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  { id: 'html-foundations',       icon: 'fa-brands fa-html5',         title: 'HTML Foundations',       desc: 'Understand how webpages are structured — tags, elements, attributes, headings, links, images, and semantic markup.' },
  { id: 'semantic-tags-forms',    icon: 'fa-brands fa-css3-alt',      title: 'Styling with CSS',       desc: 'Apply colors, typography, spacing, and layouts using selectors and the box model. Introduction to Flexbox for alignment.' },
  { id: 'css-selectors-typography', icon: 'fa-brands fa-js',          title: 'JavaScript Basics',      desc: 'Variables, data types, functions, conditionals, and loops — the core building blocks of every interactive web experience.' },
  { id: 'box-model-flexbox',      icon: 'fa-solid fa-sitemap',        title: 'DOM Manipulation',       desc: 'Select elements from your page and modify them dynamically using JavaScript — the bridge between HTML and behaviour.' },
  { id: 'javascript-basics',      icon: 'fa-solid fa-computer-mouse', title: 'Events & Interactivity', desc: 'Handle clicks, keyboard events, and form inputs to create pages that respond to your users in real time.' },
  { id: 'events-live-project',    icon: 'fa-solid fa-rocket',         title: 'Live Project Build',     desc: 'Put it all together by building a real working mini-project live during the webinar — something you can show right away.' }
]
</script>

<style scoped>
#learn { padding: 100px 0; background: var(--white); }
.learn-header { margin-bottom: 60px; }
.learn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.learn-card {
  padding: 36px 32px; border: 1px solid var(--border); border-radius: var(--radius);
  transition: box-shadow .3s, border-color .3s, transform .3s;
  position: relative; overflow: hidden;
}
.learn-card::after {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--red); transform: scaleY(0); transform-origin: bottom; transition: transform .3s ease;
}
.learn-card:hover { box-shadow: var(--shadow-md); border-color: #d0d8e8; transform: translateY(-4px); }
.learn-card:hover::after { transform: scaleY(1); }
.learn-card-icon {
  width: 52px; height: 52px; border-radius: var(--radius);
  background: rgba(26,46,74,0.06);
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
}
.learn-card-icon i { font-size: 1.2rem; color: var(--navy); }
.learn-num { font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; color: var(--red); text-transform: uppercase; margin-bottom: 8px; }
.learn-card h3 { font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 10px; line-height: 1.4; }
.learn-card p { font-size: 0.875rem; color: var(--muted); line-height: 1.75; font-weight: 400; }
.learn-card-link {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 18px; font-size: 0.8rem; font-weight: 600; color: var(--navy);
  border-bottom: 1px solid var(--border); padding-bottom: 2px; transition: color .2s, border-color .2s;
}
.learn-card:hover .learn-card-link { color: var(--red); border-color: var(--red); }
.learn-card-link i { font-size: 0.65rem; transition: transform .2s; }
.learn-card:hover .learn-card-link i { transform: translateX(3px); }

@media (max-width: 820px) { .learn-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 580px) { .learn-grid { grid-template-columns: 1fr; } }
</style>
