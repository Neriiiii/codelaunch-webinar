<template>
  <div>
    <NavBar />
    <HeroSection />
    <StatsBar />
    <LearnSection />
    <SpeakerSection />
    <AgendaSection />
    <RegisterForm />
    <FaqSection />
    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar       from '../components/NavBar.vue'
import HeroSection  from '../components/HeroSection.vue'
import StatsBar     from '../components/StatsBar.vue'
import LearnSection from '../components/LearnSection.vue'
import SpeakerSection from '../components/SpeakerSection.vue'
import AgendaSection  from '../components/AgendaSection.vue'
import RegisterForm   from '../components/RegisterForm.vue'
import FaqSection     from '../components/FaqSection.vue'
import FooterSection  from '../components/FooterSection.vue'

onMounted(() => {
  const revealAll = document.querySelectorAll('.reveal, .reveal-l, .reveal-r')
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    })
  }, { threshold: 0.1 })
  revealAll.forEach(el => io.observe(el))
})
</script>
