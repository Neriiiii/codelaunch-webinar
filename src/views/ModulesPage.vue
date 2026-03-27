<template>
  <div>
    <NavBar />

    <!-- Page Header -->
    <section class="page-hero">
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content container">
        <div class="breadcrumb">
          <RouterLink to="/"><i class="fa-solid fa-house"></i> Home</RouterLink>
          <i class="fa-solid fa-chevron-right sep"></i>
          <span>Modules</span>
        </div>
        <div class="tag">Curriculum</div>
        <h1>Course Modules</h1>
        <p>
          Six focused modules spread across 3 live sessions. Each one builds on
          the last — from writing your first HTML tag to making a fully
          interactive JavaScript project.
        </p>
      </div>
    </section>

    <!-- Session Tabs -->
    <section class="session-nav-section">
      <div class="container">
        <div class="session-tabs">
          <button
            v-for="s in sessions"
            :key="s.id"
            class="session-tab"
            :class="{ active: activeSession === s.id }"
            @click="setActiveSession(s.id)"
          >
            <i :class="s.icon"></i>
            <span>{{ s.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Modules Grid -->
    <section class="modules-section">
      <div class="container">
        <div class="session-header" v-if="currentSession">
          <div class="session-info">
            <div class="session-badge">
              <i :class="currentSession.icon"></i> {{ currentSession.label }}
            </div>
            <h2 class="section-title">{{ currentSession.title }}</h2>
            <p class="section-sub">{{ currentSession.desc }}</p>
            <div class="session-meta">
              <span
                ><i class="fa-regular fa-calendar"></i>
                {{ currentSession.date }}</span
              >
              <span><i class="fa-regular fa-clock"></i> 7:00 PM PHT</span>
              <span><i class="fa-solid fa-video"></i> Live via Zoom</span>
            </div>
          </div>
        </div>

        <div class="modules-grid" v-if="currentSession">
          <RouterLink
            v-for="mod in currentSession.modules"
            :key="mod.id"
            :to="`/modules/${mod.id}`"
            class="module-card"
          >
            <div class="module-card-top">
              <div class="module-icon"><i :class="mod.icon"></i></div>
              <div class="module-num">{{ mod.num }}</div>
            </div>
            <h3>{{ mod.title }}</h3>
            <p>{{ mod.desc }}</p>
            <ul class="module-topics">
              <li v-for="t in mod.topics" :key="t">
                <i class="fa-solid fa-circle-dot"></i> {{ t }}
              </li>
            </ul>
            <div class="module-footer">
              <span class="module-duration"
                ><i class="fa-regular fa-clock"></i> {{ mod.duration }}</span
              >
              <span class="module-link"
                >View Details <i class="fa-solid fa-arrow-right"></i
              ></span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="modules-cta">
      <div class="container">
        <div class="cta-box">
          <div class="cta-left">
            <h2>Ready to Start Learning?</h2>
            <p>
              All 6 modules are covered live across 3 free sessions. Register
              once — get access to everything.
            </p>
          </div>
          <RouterLink to="/#register" class="btn-red">
            <i class="fa-solid fa-arrow-right"></i> Reserve My Free Seat
          </RouterLink>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import NavBar from "../components/NavBar.vue";
import FooterSection from "../components/FooterSection.vue";

const activeSession = ref("session1");

const setActiveSession = (sessionId) => {
  activeSession.value = sessionId;
};

const currentSession = computed(() => {
  return sessions.find((s) => s.id === activeSession.value);
});

const sessions = [
  {
    id: "session1",
    label: "Session 1",
    icon: "fa-brands fa-html5",
    title: "HTML — Building the Structure",
    date: "April 15, 2026",
    desc: "Learn how every webpage is built from the ground up. By the end of this session you will have written and published your very first webpage.",
    modules: [
      {
        id: "html-foundations",
        num: "Module 01",
        icon: "fa-brands fa-html5",
        title: "HTML Foundations",
        desc: "Understand exactly how browsers read and render HTML — the language that gives every webpage its structure and meaning.",
        duration: "30 min",
        topics: [
          "What HTML is and how browsers parse it",
          "Document structure: doctype, html, head, body",
          "Block vs inline elements",
          "Nesting and indentation best practices",
          "Viewing page source and DevTools intro",
        ],
      },
      {
        id: "semantic-tags-forms",
        num: "Module 02",
        icon: "fa-solid fa-file-code",
        title: "Semantic Tags, Links & Forms",
        desc: "Go beyond div soup. Write meaningful HTML that makes your content accessible, readable, and search-engine friendly.",
        duration: "45 min",
        topics: [
          "Semantic elements: header, nav, main, section, footer",
          "Headings, paragraphs, lists, and images",
          "Anchor tags and linking between pages",
          "Creating forms with input, select, textarea",
          "Accessibility and why it matters",
        ],
      },
    ],
  },
  {
    id: "session2",
    label: "Session 2",
    icon: "fa-brands fa-css3-alt",
    title: "CSS — Styling & Layout",
    date: "April 22, 2026",
    desc: "Transform your plain HTML page into a beautiful, responsive design using CSS — the language of style on the web.",
    modules: [
      {
        id: "css-selectors-typography",
        num: "Module 03",
        icon: "fa-brands fa-css3-alt",
        title: "Selectors, Colors & Typography",
        desc: "Learn how CSS targets HTML elements and applies styles. Master colors, fonts, and text properties to create a polished visual identity.",
        duration: "35 min",
        topics: [
          "How to link a CSS file to HTML",
          "Element, class, and ID selectors",
          "The cascade and specificity explained",
          "Colors: hex, rgb, and hsl values",
          "Google Fonts and web typography",
        ],
      },
      {
        id: "box-model-flexbox",
        num: "Module 04",
        icon: "fa-solid fa-table-cells-large",
        title: "Box Model, Spacing & Flexbox",
        desc: "Every element on a webpage is a box. Understand how margin, padding, and borders work — then use Flexbox to build real layouts.",
        duration: "50 min",
        topics: [
          "The CSS box model: content, padding, border, margin",
          "Width, height, and box-sizing",
          "Introduction to Flexbox",
          "Aligning and distributing items with Flexbox",
          "Responsive design with media queries",
        ],
      },
    ],
  },
  {
    id: "session3",
    label: "Session 3",
    icon: "fa-brands fa-js",
    title: "JavaScript — Making It Interactive",
    date: "April 29, 2026",
    desc: "Bring your HTML and CSS to life. Learn the JavaScript fundamentals needed to build pages that react, respond, and engage users.",
    modules: [
      {
        id: "javascript-basics",
        num: "Module 05",
        icon: "fa-brands fa-js",
        title: "JavaScript Basics & DOM",
        desc: "Write your first real JavaScript — variables, functions, conditionals, and loops. Then connect JS to your HTML using the DOM.",
        duration: "45 min",
        topics: [
          "Variables: let, const, and data types",
          "Functions, parameters, and return values",
          "Conditionals: if, else, else if",
          "Loops: for, while, forEach",
          "Selecting and modifying DOM elements",
        ],
      },
      {
        id: "events-live-project",
        num: "Module 06",
        icon: "fa-solid fa-rocket",
        title: "Events & Live Project Build",
        desc: "Handle user interactions with event listeners. Then apply everything — HTML, CSS, and JavaScript — to build a real project live.",
        duration: "60 min",
        topics: [
          "Event listeners: click, input, submit",
          "Dynamically adding and removing elements",
          "Form validation with JavaScript",
          "Live project: interactive to-do list",
          "Deploying your project online",
        ],
      },
    ],
  },
];

onMounted(() => {
  const revealAll = document.querySelectorAll(".reveal, .reveal-l, .reveal-r");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  revealAll.forEach((el) => io.observe(el));
});
</script>

<style scoped>
/* ── Page Hero ── */
.page-hero {
  position: relative;
  min-height: 380px;
  display: flex;
  align-items: flex-end;
  padding-top: 72px;
  overflow: hidden;
}
.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 24, 42, 0.92) 0%,
    rgba(26, 46, 74, 0.8) 100%
  );
}
.page-hero-content {
  position: relative;
  z-index: 2;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100%;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
}
.breadcrumb a {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}
.breadcrumb a:hover {
  color: #fff;
}
.breadcrumb .sep {
  font-size: 0.55rem;
  color: rgba(255, 255, 255, 0.4);
}
.page-hero-content .tag {
  color: rgba(255, 255, 255, 0.7);
}
.page-hero-content .tag::before {
  background: rgba(255, 255, 255, 0.5);
}
.page-hero-content h1 {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 16px;
}
.page-hero-content p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
  font-weight: 300;
  max-width: 640px;
}

/* ── Session Tabs ── */
.session-nav-section {
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 72px;
  z-index: 100;
}
.session-tabs {
  display: flex;
  gap: 0;
  overflow-x: auto;
}
.session-tab {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 18px 32px;
  font-family: "Poppins", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}
.session-tab:hover {
  color: var(--navy);
  background: var(--light);
}
.session-tab.active {
  color: var(--navy);
  border-bottom-color: var(--red);
}
.session-tab i {
  font-size: 1rem;
}
.session-tab.active i {
  color: var(--red);
}

/* ── Session Header ── */
.modules-section {
  padding: 70px 0 60px;
  background: var(--white);
}
.session-header {
  margin-bottom: 50px;
}
.session-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(217, 43, 58, 0.08);
  border: 1px solid rgba(217, 43, 58, 0.2);
  color: var(--red);
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.session-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  margin-top: 20px;
}
.session-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--muted);
  font-weight: 500;
}
.session-meta i {
  color: var(--red);
  font-size: 0.8rem;
}

/* ── Modules Grid ── */
.modules-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}
.module-card {
  display: block;
  text-decoration: none;
  padding: 36px 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--white);
  transition:
    box-shadow 0.3s,
    border-color 0.3s,
    transform 0.3s;
  position: relative;
  overflow: hidden;
}
.module-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}
.module-card:hover {
  box-shadow: var(--shadow-md);
  border-color: #c8d2e0;
  transform: translateY(-4px);
}
.module-card:hover::before {
  transform: scaleX(1);
}

.module-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.module-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius);
  background: rgba(26, 46, 74, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}
.module-icon i {
  font-size: 1.3rem;
  color: var(--navy);
}
.module-num {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--red);
  background: rgba(217, 43, 58, 0.07);
  padding: 4px 12px;
  border-radius: 100px;
}
.module-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 10px;
  line-height: 1.3;
}
.module-card p {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.75;
  margin-bottom: 22px;
}

.module-topics {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
}
.module-topics li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 0.82rem;
  color: var(--navy);
  font-weight: 500;
  line-height: 1.5;
}
.module-topics i {
  color: var(--red);
  font-size: 0.55rem;
  margin-top: 5px;
  flex-shrink: 0;
}

.module-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.module-duration {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.module-duration i {
  color: var(--red);
}
.module-link {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--navy);
  display: flex;
  align-items: center;
  gap: 6px;
  transition:
    color 0.2s,
    gap 0.2s;
}
.module-card:hover .module-link {
  color: var(--red);
  gap: 10px;
}

/* ── CTA ── */
.modules-cta {
  padding: 80px 0;
  background: var(--light);
}
.cta-box {
  background: var(--navy);
  border-radius: var(--radius);
  padding: 52px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
  box-shadow: var(--shadow-md);
}
.cta-left h2 {
  font-family: "Playfair Display", serif;
  font-size: clamp(1.6rem, 2.5vw, 2.1rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}
.cta-left p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  max-width: 500px;
}
.btn-red {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--red);
  color: #fff;
  padding: 16px 36px;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 6px 24px rgba(217, 43, 58, 0.4);
  transition:
    background 0.2s,
    transform 0.2s;
}
.btn-red:hover {
  background: var(--red-d);
  transform: translateY(-2px);
}

@media (max-width: 820px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }
  .cta-box {
    padding: 36px 28px;
    flex-direction: column;
    align-items: flex-start;
  }
  .session-tab {
    padding: 14px 20px;
    font-size: 0.8rem;
  }
}
</style>
