<template>
  <nav id="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-logo">
        <div class="nav-logo-mark"><i class="fa-solid fa-code"></i></div>
        <span class="nav-logo-text">Code<span>Launch</span></span>
      </RouterLink>
      <ul class="nav-links">
        <li>
          <a :href="homeLink('#learn')" :class="{ 'nav-active': isHome }" @click.prevent="scrollTo('#learn')">
            Curriculum
          </a>
        </li>
        <li>
          <a :href="homeLink('#speaker')" :class="{ 'nav-active': isHome }" @click.prevent="scrollTo('#speaker')">
            Instructor
          </a>
        </li>
        <li>
          <a :href="homeLink('#agenda')" :class="{ 'nav-active': isHome }" @click.prevent="scrollTo('#agenda')">
            Agenda
          </a>
        </li>
        <li>
          <RouterLink to="/modules" class="nav-page-link">
            Modules
          </RouterLink>
        </li>
        <li>
          <a :href="homeLink('#faq')" :class="{ 'nav-active': isHome }" @click.prevent="scrollTo('#faq')">
            FAQ
          </a>
        </li>
        <li>
          <a :href="homeLink('#register')" class="nav-cta" @click.prevent="scrollTo('#register')">
            Reserve My Seat
          </a>
        </li>
      </ul>
      <div class="nav-hamburger" :class="{ open: menuOpen }" @click="toggleMenu" aria-label="Menu">
        <span></span><span></span><span></span>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <a @click="scrollTo('#learn');  menuOpen = false">Curriculum</a>
      <a @click="scrollTo('#speaker'); menuOpen = false">Instructor</a>
      <a @click="scrollTo('#agenda'); menuOpen = false">Agenda</a>
      <RouterLink to="/modules" @click="menuOpen = false">Modules</RouterLink>
      <a @click="scrollTo('#faq');    menuOpen = false">FAQ</a>
      <a @click="scrollTo('#register'); menuOpen = false" class="mobile-cta">Reserve My Seat</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route  = useRoute()
const router = useRouter()
const isScrolled = ref(false)
const menuOpen   = ref(false)

const isHome = computed(() => route.path === '/')

function homeLink(hash) { return isHome.value ? hash : `/${hash}` }

async function scrollTo(hash) {
  if (!isHome.value) {
    await router.push('/')
    await new Promise(r => setTimeout(r, 300))
  }
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  menuOpen.value = false
}

function onScroll() { isScrolled.value = window.scrollY > 50 }
function toggleMenu() { menuOpen.value = !menuOpen.value }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
#nav {
  position: fixed; inset: 0 0 auto 0; z-index: 200;
  background: rgba(255,255,255,0.97);
  border-bottom: 1px solid transparent;
  transition: border-color .3s, box-shadow .3s;
}
#nav.scrolled { border-color: var(--border); box-shadow: 0 2px 20px rgba(26,46,74,0.08); }

.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 72px; max-width: 1140px; margin: 0 auto; padding: 0 40px;
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo-mark {
  width: 38px; height: 38px; background: var(--navy); border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s;
}
.nav-logo:hover .nav-logo-mark { background: var(--red); }
.nav-logo-mark i { color: #fff; font-size: 1rem; }
.nav-logo-text { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--navy); }
.nav-logo-text span { color: var(--red); }

/* ── Nav Links ── */
.nav-links { display: flex; align-items: center; gap: 6px; list-style: none; }
.nav-links a,
.nav-links .nav-page-link {
  display: inline-flex; align-items: center;
  font-size: 0.82rem; font-weight: 500; color: var(--muted);
  letter-spacing: 0.3px; padding: 6px 12px; border-radius: var(--radius);
  position: relative; cursor: pointer; transition: color .2s, background .2s;
  text-decoration: none;
}

/* Underline indicator */
.nav-links a::after,
.nav-links .nav-page-link::after {
  content: ''; position: absolute; bottom: 0; left: 12px; right: 12px; height: 2px;
  background: var(--red); border-radius: 2px;
  transform: scaleX(0); transform-origin: center;
  transition: transform .25s ease;
}

/* Hover state */
.nav-links a:hover,
.nav-links .nav-page-link:hover {
  color: var(--navy); background: rgba(26,46,74,0.05);
}
.nav-links a:hover::after,
.nav-links .nav-page-link:hover::after { transform: scaleX(1); }

/* Active state — current page */
.nav-links .router-link-active,
.nav-links .router-link-exact-active,
.nav-links .nav-page-link.router-link-active,
.nav-links .nav-page-link.router-link-exact-active {
  color: var(--navy); font-weight: 700;
  background: rgba(217,43,58,0.06);
}
.nav-links .router-link-exact-active::after,
.nav-links .nav-page-link.router-link-exact-active::after { transform: scaleX(1); }

/* CTA button */
.nav-cta {
  background: var(--red) !important; color: #fff !important;
  padding: 10px 22px !important; border-radius: var(--radius);
  font-weight: 600 !important;
  box-shadow: 0 4px 14px rgba(217,43,58,0.35);
}
.nav-cta::after { display: none !important; }
.nav-cta:hover { background: var(--red-d) !important; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(217,43,58,0.45); }

/* Hamburger */
.nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; }
.nav-hamburger span {
  display: block; width: 24px; height: 2px; background: var(--navy);
  border-radius: 2px; transition: all .3s;
}
.nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.nav-hamburger.open span:nth-child(2) { opacity: 0; }
.nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* Mobile menu */
.mobile-menu {
  display: none; flex-direction: column;
  background: #fff; border-top: 1px solid var(--border);
  max-height: 0; overflow: hidden;
  transition: max-height .35s ease;
}
.mobile-menu.open { max-height: 500px; }
.mobile-menu a,
.mobile-menu .router-link-active {
  display: block; padding: 14px 28px;
  font-size: 0.88rem; font-weight: 500; color: var(--navy);
  border-bottom: 1px solid var(--border);
  transition: background .2s, color .2s;
  text-decoration: none; cursor: pointer;
}
.mobile-menu a:hover { background: var(--light); color: var(--red); }
.mobile-menu .router-link-exact-active { color: var(--red); font-weight: 700; background: rgba(217,43,58,0.04); }
.mobile-cta { color: var(--red) !important; font-weight: 700 !important; border-bottom: none !important; }

@media (max-width: 820px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
  .mobile-menu { display: flex; }
  .nav-inner { padding: 0 24px; }
}
</style>
