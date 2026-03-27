<template>
  <section id="faq">
    <div class="container">
      <div class="faq-layout">
        <div class="faq-intro reveal-l">
          <div class="tag">FAQ</div>
          <h2 class="section-title">Common<br />Questions</h2>
          <p class="section-sub">Everything you need to know before joining the webinar.</p>
          <div class="divider" style="margin-bottom:32px"></div>
          <div class="faq-contact">
            <i class="fa-regular fa-envelope"></i>
            <div>
              <strong>Still have questions?</strong>
              <a href="mailto:hello@codelaunch.io">hello@codelaunch.io</a>
            </div>
          </div>
        </div>

        <div class="faq-list reveal-r">
          <div
            v-for="(item, i) in faqs" :key="i"
            class="faq-item"
            :class="{ open: openIndex === i }"
          >
            <div class="faq-q" @click="toggle(i)">
              {{ item.q }}
              <span class="faq-chevron"><i class="fa-solid fa-chevron-down"></i></span>
            </div>
            <div class="faq-a">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

function toggle(i) { openIndex.value = openIndex.value === i ? null : i }

const faqs = [
  { q: 'Is this webinar really free?',                     a: 'Yes — 100% free. No hidden fees, no credit card required. Simply register and show up on the day.' },
  { q: 'Do I need prior coding experience?',               a: 'Not at all. This series is designed for absolute beginners. All you need is a laptop, a browser, and the willingness to learn.' },
  { q: 'What tools or software do I need?',                a: 'A modern web browser (Chrome or Firefox) and a free text editor like VS Code. We will guide you through setup at the start of Session 1.' },
  { q: 'Do I need to attend all 3 sessions?',              a: 'We strongly recommend attending all 3 as each session builds on the previous one. However, recordings are available for 7 days after each session.' },
  { q: 'Will I receive a certificate?',                    a: 'Yes. Attendees who complete all 3 sessions receive a digital certificate of completion via email within 24 hours of Session 3.' },
  { q: 'What happens after the webinar series?',           a: 'We will share a curated learning roadmap and next steps. You will also receive early-access details for our full HTML-to-JavaScript course.' },
  { q: 'How many seats are available?',                    a: 'Seats are capped to keep the sessions intimate and interactive. Once the limit is reached, registration closes. Register early.' }
]
</script>

<style scoped>
#faq { padding: 100px 0; background: var(--white); }
.faq-layout { display: grid; grid-template-columns: 320px 1fr; gap: 80px; align-items: start; }
.faq-intro { position: sticky; top: 100px; }
.faq-intro .section-sub { margin-bottom: 28px; }
.faq-contact { display: flex; align-items: center; gap: 12px; padding: 20px 22px; border: 1px solid var(--border); border-radius: var(--radius); }
.faq-contact i { color: var(--red); font-size: 1rem; }
.faq-contact div { font-size: 0.8rem; }
.faq-contact strong { display: block; color: var(--navy); margin-bottom: 2px; }
.faq-contact a { color: var(--red); font-weight: 600; }

.faq-list { display: flex; flex-direction: column; gap: 10px; }
.faq-item { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: border-color .3s; }
.faq-item.open { border-color: var(--navy); }
.faq-q { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; cursor: pointer; user-select: none; font-size: 0.9rem; font-weight: 600; color: var(--navy); transition: background .2s; }
.faq-q:hover { background: var(--light); }
.faq-chevron { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform .3s, background .3s, border-color .3s; }
.faq-chevron i { font-size: 0.6rem; color: var(--navy); transition: transform .3s; }
.faq-item.open .faq-chevron { background: var(--navy); border-color: var(--navy); }
.faq-item.open .faq-chevron i { color: #fff; transform: rotate(180deg); }
.faq-a { max-height: 0; overflow: hidden; transition: max-height .4s ease, padding .3s ease; font-size: 0.875rem; color: var(--muted); line-height: 1.8; font-weight: 400; padding: 0 24px; }
.faq-item.open .faq-a { max-height: 200px; padding: 0 24px 22px; }

@media (max-width: 1020px) { .faq-layout { grid-template-columns: 1fr; gap: 40px; } .faq-intro { position: static; } }
</style>
