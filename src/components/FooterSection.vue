<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo">Code<span>Launch</span></span>
          <p>
            Empowering the next generation of web developers through accessible,
            practical, and expert-led education. Free resources. Real skills.
          </p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Curriculum</a></li>
            <li><a href="#">Instructor</a></li>
            <li><a href="#">Session Agenda</a></li>
            <li><a href="#">Register</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="#"
                ><i class="fa-regular fa-envelope"></i> hello@codelaunch.io</a
              >
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-facebook"></i> Facebook</a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-instagram"></i> Instagram</a>
            </li>
            <li>
              <a href="#"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 CodeLaunch. All rights reserved.</span>
        <span
          ><a href="#">Privacy Policy</a> &nbsp;&middot;&nbsp;
          <a href="#">Terms of Service</a></span
        >
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--navy);
  color: rgba(255, 255, 255, 0.65);
  padding: 60px 0 36px;
}
.footer-inner {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}
.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 60px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 32px;
}
.footer-logo {
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  display: block;
  margin-bottom: 14px;
}
.footer-logo span {
  color: var(--red);
}
.footer-brand p {
  font-size: 0.83rem;
  line-height: 1.8;
  max-width: 280px;
}
.footer-col h4 {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 18px;
}
.footer-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-col ul li a {
  font-size: 0.83rem;
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.footer-col ul li a:hover {
  color: var(--red);
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-bottom a {
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.2s;
}
.footer-bottom a:hover {
  color: #fff;
}

@media (max-width: 1020px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 820px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .footer-inner {
    padding: 0 24px;
  }
}
</style>
