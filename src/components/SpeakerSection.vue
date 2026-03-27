<template>
  <section id="speaker">
    <div class="container">
      <div class="speaker-grid">
        <div class="speaker-img-box reveal-l">
          <img
            src="/speaker.png"
            alt="Senior Developer Speaker"
            loading="lazy"
          />
          <div class="speaker-badge">
            <strong>8+</strong>
            <span>Yrs Experience</span>
          </div>
        </div>
        <div class="reveal-r">
          <div class="tag">Your Instructor</div>
          <div class="speaker-name">Sophia Taylor</div>
          <div class="speaker-role">
            Full-Stack Engineer &amp; Web Development Educator
          </div>
          <div class="speaker-divider"></div>
          <p class="speaker-bio">
            With over eight years of professional experience building web
            applications and educating thousands of students, our instructor
            specialises in making complex technical concepts feel approachable
            and achievable. She has delivered more than 50 live webinars and has
            a reputation for practical, no-fluff teaching that gets beginners
            writing real code on day one.
          </p>
          <div class="speaker-stats">
            <div class="spk-stat" v-for="s in speakerStats" :key="s.label">
              <span class="spk-num">{{ s.value }}</span>
              <span class="spk-label">{{ s.label }}</span>
            </div>
          </div>
          <div class="speaker-tags">
            <div class="speaker-tag" v-for="tag in tags" :key="tag">
              <i class="fa-solid fa-circle"></i> {{ tag }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const speakerStats = [
  { value: "5,000+", label: "Students Taught" },
  { value: "50+", label: "Webinars Hosted" },
  { value: "4.9", label: "Average Rating" },
];
const tags = ["HTML & CSS", "JavaScript", "React", "Node.js", "UX Design"];
</script>

<style scoped>
#speaker {
  padding: 100px 0;
  background: var(--light);
}
.speaker-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 80px;
  align-items: center;
}
.speaker-img-box {
  position: relative;
}
.speaker-img-box img {
  width: 100%;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}
.speaker-img-box::before {
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  border: 2px solid var(--red);
  border-radius: var(--radius);
  z-index: -1;
}
.speaker-badge {
  position: absolute;
  bottom: -18px;
  right: -18px;
  background: var(--navy);
  color: #fff;
  padding: 16px 22px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  text-align: center;
}
.speaker-badge strong {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  display: block;
}
.speaker-badge span {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 1px;
}
.speaker-name {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 4px;
}
.speaker-role {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--red);
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}
.speaker-divider {
  width: 40px;
  height: 2px;
  background: var(--red);
  margin-bottom: 22px;
}
.speaker-bio {
  font-size: 0.96rem;
  color: var(--muted);
  line-height: 1.85;
  font-weight: 400;
  margin-bottom: 32px;
}
.speaker-stats {
  display: flex;
  gap: 40px;
  padding: 28px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 32px;
}
.spk-num {
  font-family: "Playfair Display", serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--navy);
  display: block;
  line-height: 1;
}
.spk-label {
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 4px;
  font-weight: 400;
  display: block;
}
.speaker-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.speaker-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(26, 46, 74, 0.06);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--navy);
}
.speaker-tag i {
  color: var(--red);
  font-size: 0.65rem;
}

@media (max-width: 1020px) {
  .speaker-grid {
    grid-template-columns: 300px 1fr;
    gap: 50px;
  }
}
@media (max-width: 820px) {
  .speaker-grid {
    grid-template-columns: 1fr;
  }
  .speaker-img-box {
    max-width: 340px;
  }
  .speaker-img-box::before {
    display: none;
  }
}
</style>
