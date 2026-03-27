<template>
  <div v-if="module">
    <NavBar />

    <!-- Header -->
    <section class="detail-hero">
      <div class="detail-hero-overlay"></div>
      <div class="container detail-hero-content">
        <div class="breadcrumb">
          <RouterLink to="/"><i class="fa-solid fa-house"></i> Home</RouterLink>
          <i class="fa-solid fa-chevron-right sep"></i>
          <RouterLink to="/modules">Modules</RouterLink>
          <i class="fa-solid fa-chevron-right sep"></i>
          <span>{{ module.title }}</span>
        </div>
        <div class="module-num-badge">{{ module.num }}</div>
        <h1>{{ module.title }}</h1>
        <p>{{ module.desc }}</p>
        <div class="detail-meta">
          <span><i class="fa-regular fa-clock"></i> {{ module.duration }}</span>
          <span><i class="fa-solid fa-signal"></i> Beginner</span>
          <span><i class="fa-solid fa-video"></i> Live via Zoom</span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="detail-body">
      <div class="container detail-layout">
        <!-- Main content -->
        <div class="detail-main">
          <div class="detail-card">
            <h2><i class="fa-solid fa-list-check"></i> What You Will Learn</h2>
            <ul class="topics-list">
              <li v-for="t in module.topics" :key="t">
                <div class="topic-icon"><i class="fa-solid fa-check"></i></div>
                <span>{{ t }}</span>
              </li>
            </ul>
          </div>

          <div class="detail-card">
            <h2><i class="fa-solid fa-code"></i> What You Will Build</h2>
            <p class="build-desc">{{ module.build }}</p>
          </div>

          <div class="detail-card">
            <h2>
              <i class="fa-solid fa-lightbulb"></i> Why This Module Matters
            </h2>
            <p class="why-desc">{{ module.why }}</p>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="detail-sidebar">
          <div class="sidebar-card">
            <div class="sidebar-icon"><i :class="module.icon"></i></div>
            <div class="sidebar-stat">
              <span>Duration</span><strong>{{ module.duration }}</strong>
            </div>
            <div class="sidebar-stat">
              <span>Session</span><strong>{{ module.session }}</strong>
            </div>
            <div class="sidebar-stat">
              <span>Level</span><strong>Beginner</strong>
            </div>
            <div class="sidebar-stat">
              <span>Format</span><strong>Live via Zoom</strong>
            </div>
            <RouterLink to="/#register" class="sidebar-cta">
              <i class="fa-solid fa-pen-to-square"></i> Register for Free
            </RouterLink>
          </div>

          <div class="sidebar-card prereq-card">
            <h4><i class="fa-solid fa-circle-info"></i> Prerequisites</h4>
            <p>{{ module.prereq }}</p>
          </div>

          <div class="sidebar-nav">
            <RouterLink to="/modules" class="back-btn">
              <i class="fa-solid fa-arrow-left"></i> All Modules
            </RouterLink>
            <RouterLink
              v-if="nextModule"
              :to="`/modules/${nextModule.id}`"
              class="next-btn"
            >
              Next Module <i class="fa-solid fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>

  <!-- 404 fallback -->
  <div v-else class="not-found">
    <NavBar />
    <div class="not-found-content container">
      <i class="fa-solid fa-circle-xmark"></i>
      <h2>Module not found</h2>
      <RouterLink to="/modules" class="back-btn">Back to Modules</RouterLink>
    </div>
    <FooterSection />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "../components/NavBar.vue";
import FooterSection from "../components/FooterSection.vue";

const route = useRoute();

const allModules = [
  {
    id: "html-foundations",
    num: "Module 01",
    session: "Session 1 · April 15, 2026",
    icon: "fa-brands fa-html5",
    duration: "30 min",
    title: "HTML Foundations",
    desc: "Understand exactly how browsers read and render HTML — the language that gives every webpage its structure and meaning.",
    prereq: "No experience needed. Just bring a laptop and a browser.",
    build:
      "A complete HTML document skeleton with proper head, meta tags, and body structure — the base of everything you will build going forward.",
    why: "HTML is the backbone of the entire web. Every website — from Google to Netflix — starts with HTML. Understanding it deeply means you understand how the web actually works.",
    topics: [
      "What HTML is and how browsers parse it",
      "Document structure: doctype, html, head, body",
      "Block vs inline elements and when to use each",
      "Nesting and indentation best practices",
      "Viewing page source and using DevTools",
    ],
  },
  {
    id: "semantic-tags-forms",
    num: "Module 02",
    session: "Session 1 · April 15, 2026",
    icon: "fa-solid fa-file-code",
    duration: "45 min",
    title: "Semantic Tags, Links & Forms",
    desc: "Go beyond div soup. Write meaningful HTML that makes your content accessible, readable, and search-engine friendly.",
    prereq: "Module 01 — HTML Foundations.",
    build:
      "A full webpage with navigation, sections, images, links, and a working contact form using only HTML.",
    why: "Semantic HTML directly impacts accessibility for screen readers, search engine rankings, and code maintainability. It separates good developers from great ones.",
    topics: [
      "Semantic elements: header, nav, main, section, article, footer",
      "Headings hierarchy (h1–h6) and paragraphs",
      "Images with alt text and lazy loading",
      "Anchor tags — internal, external, and mailto links",
      "Forms: input types, select, textarea, labels, and submit",
    ],
  },
  {
    id: "css-selectors-typography",
    num: "Module 03",
    session: "Session 2 · April 22, 2026",
    icon: "fa-brands fa-css3-alt",
    duration: "35 min",
    title: "Selectors, Colors & Typography",
    desc: "Learn how CSS targets HTML elements and applies styles. Master colors, fonts, and text properties to create a polished visual identity.",
    prereq: "Modules 01 and 02 — HTML is required before styling it.",
    build:
      "Transform the plain HTML page from Session 1 by adding a color palette, custom fonts from Google Fonts, and professional typography styles.",
    why: "Design is not just decoration — it communicates trust and quality. Learning CSS gives you the power to make things look exactly the way you envision them.",
    topics: [
      "Linking a CSS stylesheet to an HTML file",
      "Element, class, and ID selectors",
      "The cascade and specificity — which styles win and why",
      "Colors: hex, rgb, rgba, and hsl",
      "Google Fonts integration and web-safe typography",
    ],
  },
  {
    id: "box-model-flexbox",
    num: "Module 04",
    session: "Session 2 · April 22, 2026",
    icon: "fa-solid fa-table-cells-large",
    duration: "50 min",
    title: "Box Model, Spacing & Flexbox",
    desc: "Every element on a webpage is a box. Understand how margin, padding, and borders work — then use Flexbox to build real layouts.",
    prereq: "Module 03 — CSS Selectors & Typography.",
    build:
      "A fully styled and responsive version of the Session 1 webpage — with proper spacing, a navigation bar, and a card layout that works on mobile and desktop.",
    why: "Layout is one of the hardest things to learn in CSS. Flexbox makes it logical. Once you understand the box model and Flexbox, you can build any layout you can imagine.",
    topics: [
      "The CSS box model: content, padding, border, margin",
      "Width, height, overflow, and box-sizing",
      "Introduction to Flexbox and flex containers",
      "Justify-content, align-items, flex-wrap, and gap",
      "Media queries and building responsive layouts",
    ],
  },
  {
    id: "javascript-basics",
    num: "Module 05",
    session: "Session 3 · April 29, 2026",
    icon: "fa-brands fa-js",
    duration: "45 min",
    title: "JavaScript Basics & DOM",
    desc: "Write your first real JavaScript — variables, functions, conditionals, and loops. Then connect JS to your HTML using the DOM.",
    prereq:
      "Modules 01–04. A basic understanding of HTML and CSS helps greatly.",
    build:
      "A live JavaScript-powered element that reads data from your HTML, performs logic, and updates the page content in real time without refreshing.",
    why: "JavaScript is what makes the web alive. Every button click, form submission, animation, and live update on modern websites is powered by JavaScript.",
    topics: [
      "Variables: let and const — when to use each",
      "Data types: string, number, boolean, null, undefined",
      "Functions, parameters, return values, and arrow functions",
      "Conditionals: if, else if, else, and ternary operators",
      "Loops: for, while, and array forEach",
      "Selecting DOM elements with querySelector",
    ],
  },
  {
    id: "events-live-project",
    num: "Module 06",
    session: "Session 3 · April 29, 2026",
    icon: "fa-solid fa-rocket",
    duration: "60 min",
    title: "Events & Live Project Build",
    desc: "Handle user interactions with event listeners. Then apply everything — HTML, CSS, and JavaScript — to build a real project live during the session.",
    prereq:
      "All previous modules — this is the capstone that brings everything together.",
    build:
      "A complete interactive to-do list application built from scratch live during the session — with add, delete, complete, and filter functionality.",
    why: "Building a real project is where everything clicks. You will see how HTML structures the app, CSS makes it look great, and JavaScript makes it work — all together.",
    topics: [
      "Event listeners: click, input, keydown, submit",
      "Dynamically creating and removing DOM elements",
      "Working with arrays to manage application state",
      "Form validation and user feedback patterns",
      "Deploying a project online for free",
    ],
  },
];

const module = computed(() => allModules.find((m) => m.id === route.params.id));
const currentIndex = computed(() =>
  allModules.findIndex((m) => m.id === route.params.id),
);
const nextModule = computed(() => allModules[currentIndex.value + 1] || null);
</script>

<style scoped>
.detail-hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: flex-end;
  padding-top: 72px;
  overflow: hidden;
}
.detail-hero-bg {
  position: absolute;
  inset: 0;
  background: url("/hero-pic.png") center center / cover no-repeat;
  background-attachment: fixed;
}
.detail-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 24, 42, 0.93) 0%,
    rgba(26, 46, 74, 0.82) 100%
  );
}
.detail-hero-content {
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
  flex-wrap: wrap;
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
  color: rgba(255, 255, 255, 0.35);
}
.module-num-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--red);
  background: rgba(217, 43, 58, 0.15);
  border: 1px solid rgba(217, 43, 58, 0.3);
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 14px;
}
.detail-hero-content h1 {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 14px;
}
.detail-hero-content p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
  max-width: 600px;
  margin-bottom: 24px;
}
.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.detail-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}
.detail-meta i {
  color: var(--red);
}

/* Body */
.detail-body {
  padding: 80px 0;
  background: var(--light);
}
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}

.detail-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 36px;
  margin-bottom: 24px;
  box-shadow: var(--shadow);
}
.detail-card:last-child {
  margin-bottom: 0;
}
.detail-card h2 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.detail-card h2 i {
  color: var(--red);
}

.topics-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.topics-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.topic-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgba(217, 43, 58, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.topic-icon i {
  font-size: 0.6rem;
  color: var(--red);
}
.topics-list span {
  font-size: 0.9rem;
  color: var(--navy);
  line-height: 1.6;
  font-weight: 500;
}

.build-desc,
.why-desc {
  font-size: 0.93rem;
  color: var(--muted);
  line-height: 1.85;
}

/* Sidebar */
.detail-sidebar {
  position: sticky;
  top: 96px;
}
.sidebar-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
}
.sidebar-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius);
  background: rgba(26, 46, 74, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
}
.sidebar-icon i {
  font-size: 1.4rem;
  color: var(--navy);
}
.sidebar-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.sidebar-stat:last-of-type {
  border-bottom: none;
  margin-bottom: 20px;
}
.sidebar-stat span {
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 400;
}
.sidebar-stat strong {
  font-size: 0.85rem;
  color: var(--navy);
  font-weight: 700;
}
.sidebar-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 100%;
  padding: 13px;
  background: var(--red);
  color: #fff;
  border-radius: var(--radius);
  font-size: 0.88rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(217, 43, 58, 0.35);
  transition:
    background 0.2s,
    transform 0.2s;
}
.sidebar-cta:hover {
  background: var(--red-d);
  transform: translateY(-1px);
}

.prereq-card h4 {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.prereq-card h4 i {
  color: var(--red);
}
.prereq-card p {
  font-size: 0.83rem;
  color: var(--muted);
  line-height: 1.7;
}

.sidebar-nav {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border-radius: var(--radius);
  border: 1.5px solid var(--border);
  background: var(--white);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--navy);
  transition:
    border-color 0.2s,
    background 0.2s;
}
.back-btn:hover {
  border-color: var(--navy);
  background: var(--light);
}
.next-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border-radius: var(--radius);
  background: var(--navy);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 0.2s;
}
.next-btn:hover {
  background: var(--navy-2);
}

/* Not found */
.not-found-content {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
}
.not-found-content i {
  font-size: 3rem;
  color: var(--red);
}
.not-found-content h2 {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  color: var(--navy);
}

@media (max-width: 1020px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
  .detail-sidebar {
    position: static;
  }
}
</style>
