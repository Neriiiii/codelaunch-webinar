<template>
  <section id="register">
    <div class="container">
      <div class="closed-wrap reveal">
        <div class="closed-card">
          <div class="closed-icon-wrap">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h2 class="closed-title">Registration is Now Closed</h2>
          <p class="closed-sub">
            This webinar series concluded on April 11, 2026.<br />
            Thank you to everyone who attended!
          </p>
          <div class="closed-divider"></div>
          <p class="closed-note">
            <i class="fa-regular fa-envelope"></i>
            Questions? Reach us at <a href="mailto:hello@codelaunch.io">hello@codelaunch.io</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#register {
  padding: 100px 0;
  background: var(--light);
}
.closed-wrap {
  display: flex;
  justify-content: center;
}
.closed-card {
  max-width: 520px; width: 100%;
  background: var(--white); border: 1px solid var(--border);
  border-radius: var(--radius); box-shadow: var(--shadow-md);
  padding: 60px 48px; text-align: center;
}
.closed-icon-wrap {
  width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 24px;
  background: rgba(26, 46, 74, 0.07); border: 2px solid rgba(26, 46, 74, 0.12);
  display: flex; align-items: center; justify-content: center;
}
.closed-icon-wrap i { font-size: 1.8rem; color: var(--navy); }
.closed-title {
  font-family: 'Playfair Display', serif; font-size: 1.75rem;
  font-weight: 700; color: var(--navy); margin-bottom: 14px;
}
.closed-sub {
  font-size: 0.95rem; color: var(--muted); line-height: 1.8; margin-bottom: 32px;
}
.closed-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
.closed-note { font-size: 0.82rem; color: var(--muted); }
.closed-note i { margin-right: 6px; }
.closed-note a { color: var(--red); font-weight: 600; }

@media (max-width: 580px) {
  .closed-card { padding: 40px 24px; }
}
</style>
