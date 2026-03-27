<template>
  <section id="agenda">
    <div class="container">
      <div class="agenda-layout">
        <div class="agenda-intro reveal-l">
          <div class="tag">Session Agenda</div>
          <h2 class="section-title">3 Structured<br />Live Sessions</h2>
          <p class="section-sub">One topic per session — HTML, CSS, then JavaScript. Each week builds naturally on the last, giving you time to practice in between.</p>
          <div class="divider" style="margin-bottom:32px"></div>
          <div class="agenda-highlight">
            <p>Registered attendees also receive:</p>
            <div class="agenda-highlight-item" v-for="perk in perks" :key="perk">
              <i class="fa-solid fa-check"></i> {{ perk }}
            </div>
          </div>
        </div>

        <div class="timeline reveal-r">
          <template v-for="session in sessions" :key="session.label">
            <div class="tl-session-label">
              <i :class="session.icon"></i> {{ session.label }}
            </div>
            <div class="tl-item" v-for="item in session.items" :key="item.title">
              <div class="tl-dot"></div>
              <div class="tl-time"><i class="fa-regular fa-clock"></i> {{ item.time }}</div>
              <div class="tl-title">{{ item.title }}</div>
              <div class="tl-desc">{{ item.desc }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const perks = [
  'Code files & slides after each session',
  '7-day replay access to all 3 recordings',
  'Certificate of completion',
  'Curated learning roadmap'
]

const sessions = [
  {
    label: 'Session 1 — April 15, 2026',
    icon: 'fa-brands fa-html5',
    items: [
      { time: '7:00 PM', title: 'Welcome & Environment Setup', desc: 'Introductions, what to expect across all 3 sessions, and a quick setup check so everyone is ready to code.' },
      { time: '7:15 PM', title: 'HTML Document Structure', desc: 'How browsers read HTML — the doctype, head, body, and the concept of nesting elements inside each other.' },
      { time: '7:45 PM', title: 'Semantic Tags, Links & Forms', desc: 'Headings, paragraphs, images, anchor tags, input fields, and why semantic HTML matters for accessibility.' },
      { time: '8:20 PM', title: 'Build: Your First Webpage', desc: 'Write a complete HTML page from a blank file — structure, content, navigation, and a working contact form.' },
      { time: '8:50 PM', title: 'Q&A & Preview of Session 2', desc: 'Open questions, common HTML mistakes to avoid, and a look at what CSS will do to that plain page next week.' }
    ]
  },
  {
    label: 'Session 2 — April 22, 2026',
    icon: 'fa-brands fa-css3-alt',
    items: [
      { time: '7:00 PM', title: 'Quick Recap & Setup Check', desc: 'Review what we built in Session 1 and connect a stylesheet for the first time.' },
      { time: '7:15 PM', title: 'Selectors, Colors & Typography', desc: 'CSS selectors, properties vs values, fonts, colors, and how specificity determines which styles win.' },
      { time: '7:45 PM', title: 'Box Model, Spacing & Flexbox', desc: 'Margin, padding, borders, and width — then Flexbox to align and distribute elements with ease.' },
      { time: '8:15 PM', title: 'Responsive Design Basics', desc: 'Media queries and how to make the Session 1 webpage look great on mobile, tablet, and desktop.' },
      { time: '8:50 PM', title: 'Q&A & Preview of Session 3', desc: 'Open questions and a teaser of how JavaScript will make this styled page fully interactive next week.' }
    ]
  },
  {
    label: 'Session 3 — April 29, 2026',
    icon: 'fa-brands fa-js',
    items: [
      { time: '7:00 PM', title: 'Quick Recap & JS Introduction', desc: 'Review sessions 1 & 2, then write your first line of JavaScript and see it run in the browser console.' },
      { time: '7:15 PM', title: 'Variables, Functions & Logic', desc: 'Let, const, data types, if/else, loops, and writing reusable functions — the core building blocks of JS.' },
      { time: '7:45 PM', title: 'DOM Manipulation & Events', desc: 'Select elements, change their content and styles dynamically, and respond to clicks and form inputs in real time.' },
      { time: '8:15 PM', title: 'Live Project: Bring It All Together', desc: 'Add JavaScript to the page built in Sessions 1 & 2 — form validation, live feedback, and a dynamic UI element.' },
      { time: '8:50 PM', title: 'Final Q&A, Certificate & Next Steps', desc: 'Open floor for questions, certificate distribution, your recommended learning roadmap, and where to go from here.' }
    ]
  }
]
</script>

<style scoped>
#agenda { padding: 100px 0; background: var(--white); }
.agenda-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.agenda-intro { position: sticky; top: 100px; }
.agenda-intro .section-sub { margin-bottom: 32px; }
.agenda-highlight { background: var(--navy); color: #fff; border-radius: var(--radius); padding: 28px 30px; }
.agenda-highlight p { font-size: 0.85rem; line-height: 1.8; color: rgba(255,255,255,0.75); margin-bottom: 18px; }
.agenda-highlight-item { display: flex; align-items: center; gap: 10px; font-size: 0.82rem; color: rgba(255,255,255,0.9); margin-bottom: 10px; }
.agenda-highlight-item:last-child { margin-bottom: 0; }
.agenda-highlight-item i { color: var(--red); font-size: 0.75rem; }

.timeline { border-left: 2px solid var(--border); padding-left: 32px; }
.tl-session-label {
  font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  color: var(--navy); background: var(--light);
  padding: 8px 14px; border-radius: var(--radius);
  margin-bottom: 20px; margin-top: 36px; display: inline-flex; align-items: center; gap: 8px;
}
.tl-session-label:first-child { margin-top: 0; }
.tl-session-label i { color: var(--red); }
.tl-item { position: relative; margin-bottom: 28px; }
.tl-item:last-child { margin-bottom: 0; }
.tl-dot {
  position: absolute; left: -40px; top: 6px;
  width: 16px; height: 16px; border-radius: 50%;
  border: 2.5px solid var(--red); background: #fff; transition: background .3s;
}
.tl-item:hover .tl-dot { background: var(--red); }
.tl-time { font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--red); margin-bottom: 6px; }
.tl-title { font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.tl-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; font-weight: 400; }

@media (max-width: 1020px) { .agenda-layout { grid-template-columns: 1fr; gap: 50px; } .agenda-intro { position: static; } }
</style>
