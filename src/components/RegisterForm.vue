<template>
  <section id="register">
    <div class="container">
      <div class="reg-layout">
        <div class="reg-left reveal-l">
          <div class="tag">Register Now</div>
          <h2 class="section-title">Secure Your<br />Free Spot Today</h2>
          <p class="section-sub">
            Join hundreds of beginners already registered. Seats are strictly
            limited — register now to guarantee your place.
          </p>
          <div class="divider" style="margin-bottom: 36px"></div>
          <ul class="perks-list">
            <li class="perk-item" v-for="perk in perks" :key="perk.text">
              <div class="perk-icon"><i class="fa-solid fa-check"></i></div>
              <span
                >{{ perk.text
                }}<span class="perk-sub">{{ perk.sub }}</span></span
              >
            </li>
          </ul>
          <div class="reg-trust">
            <i class="fa-solid fa-shield-halved trust-icon"></i>
            <div class="trust-text">
              No credit card required. No spam, ever. Your information is safe
              with us.
            </div>
          </div>
        </div>

        <div class="reveal-r">
          <div class="form-card">
            <div class="form-card-header">
              <h3>Reserve Your Seat — All 3 Sessions</h3>
              <p>
                Apr 15, 22 &amp; 29, 2026 &nbsp;·&nbsp; 7:00 PM PHT
                &nbsp;·&nbsp; Live via Zoom
              </p>
            </div>
            <div class="spots-bar">
              <i class="fa-solid fa-triangle-exclamation"></i>
              Only {{ spotsRemaining }} spots remaining — seats are filling
              fast.
            </div>

            <div v-if="!submitted">
              <form class="form-body" @submit.prevent="handleSubmit" novalidate>
                <div class="form-row">
                  <div class="f-group">
                    <label>First Name <span class="req">*</span></label>
                    <input
                      type="text"
                      v-model="form.firstName"
                      :class="{ error: errors.firstName }"
                      placeholder="Juan"
                    />
                    <span class="f-error" v-if="errors.firstName"
                      >Required</span
                    >
                  </div>
                  <div class="f-group">
                    <label>Last Name <span class="req">*</span></label>
                    <input
                      type="text"
                      v-model="form.lastName"
                      :class="{ error: errors.lastName }"
                      placeholder="Dela Cruz"
                    />
                    <span class="f-error" v-if="errors.lastName">Required</span>
                  </div>
                </div>
                <div class="f-group">
                  <label>Email Address <span class="req">*</span></label>
                  <input
                    type="email"
                    v-model="form.email"
                    :class="{ error: errors.email }"
                    placeholder="juan@email.com"
                  />
                  <span class="f-error" v-if="errors.email"
                    >Valid email required</span
                  >
                </div>
                <div class="f-group">
                  <label
                    >Phone Number <span class="opt">(optional)</span></label
                  >
                  <input
                    type="tel"
                    v-model="form.phone"
                    placeholder="+63 9XX XXX XXXX"
                  />
                </div>
                <div class="f-group">
                  <label
                    >Your Experience Level <span class="req">*</span></label
                  >
                  <select v-model="form.level" :class="{ error: errors.level }">
                    <option value="" disabled>Select your level</option>
                    <option value="none">
                      Absolute Beginner — no experience at all
                    </option>
                    <option value="html">I know a little HTML</option>
                    <option value="htmlcss">
                      Comfortable with HTML &amp; CSS
                    </option>
                    <option value="js">I've touched JavaScript a bit</option>
                  </select>
                  <span class="f-error" v-if="errors.level"
                    >Please select a level</span
                  >
                </div>
                <div class="f-group">
                  <label>How did you hear about us?</label>
                  <select v-model="form.source">
                    <option value="" disabled>Select an option</option>
                    <option value="fb">Facebook</option>
                    <option value="ig">Instagram</option>
                    <option value="friend">Friend / Colleague</option>
                    <option value="google">Google Search</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <p class="api-error" v-if="apiError">{{ apiError }}</p>

                <button type="submit" class="btn-submit" :disabled="loading">
                  <i
                    class="fa-solid"
                    :class="loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'"
                  ></i>
                  {{ loading ? "Registering..." : "Register for Free" }}
                </button>
                <p class="form-note">
                  <i class="fa-solid fa-lock"></i>
                  Your information is safe. We never share or sell your data.
                </p>
              </form>
            </div>

            <div v-else class="success-state">
              <div class="success-icon-wrap">
                <i class="fa-solid fa-check"></i>
              </div>
              <h3>You're Registered!</h3>
              <p>
                Check your inbox — your confirmation and Zoom links for all 3
                sessions are on their way. Session 1 starts
                <strong>April 15, 2026 at 7:00 PM PHT.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";

const API_URL =
  "https://lzgjn24b0f.execute-api.ap-southeast-1.amazonaws.com/register";

const submitted = ref(false);
const loading = ref(false);
const apiError = ref("");
const spotsRemaining = ref(47);

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  level: "",
  source: "",
});
const errors = reactive({
  firstName: false,
  lastName: false,
  email: false,
  level: false,
});

const perks = [
  {
    text: "Live interactive session with a senior developer",
    sub: "Direct access to ask questions and follow along in real time",
  },
  {
    text: "Free downloadable code files & resource pack",
    sub: "Everything you need to continue learning after the session",
  },
  {
    text: "Digital certificate of attendance",
    sub: "Sent to your email within 24 hours of the live event",
  },
  {
    text: "7-day replay access to all 3 recordings",
    sub: "Watch at your own pace if you miss the live session",
  },
  {
    text: "Exclusive Q&A with the speaker post-session",
    sub: "Get your specific questions answered one-on-one",
  },
];

function validate() {
  errors.firstName = !form.firstName.trim();
  errors.lastName = !form.lastName.trim();
  errors.email =
    !form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  errors.level = !form.level;
  return !Object.values(errors).some(Boolean);
}

async function handleSubmit() {
  apiError.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });
    const data = await res.json();

    if (res.status === 409) {
      apiError.value = "This email is already registered.";
      return;
    }
    if (!res.ok) {
      apiError.value =
        data.message || "Something went wrong. Please try again.";
      return;
    }

    submitted.value = true;
    spotsRemaining.value--;
  } catch {
    apiError.value =
      "Network error. Please check your connection and try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
#register {
  padding: 100px 0;
  background: var(--light);
}
.reg-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: start;
}
.reg-left .section-sub {
  margin-bottom: 36px;
}

.perks-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.perk-item {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  font-size: 0.9rem;
  color: var(--navy);
  font-weight: 500;
}
.perk-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgba(217, 43, 58, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.perk-icon i {
  color: var(--red);
  font-size: 0.7rem;
}
.perk-sub {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 400;
  display: block;
  margin-top: 2px;
}
.reg-trust {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}
.trust-icon {
  color: var(--muted);
  font-size: 1rem;
}
.trust-text {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.5;
}

.form-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.form-card-header {
  background: var(--navy);
  padding: 28px 36px;
}
.form-card-header h3 {
  font-family: "Playfair Display", serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}
.form-card-header p {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}
.spots-bar {
  padding: 12px 36px;
  background: rgba(245, 158, 11, 0.08);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #92400e;
}
.spots-bar i {
  color: #f59e0b;
}

.form-body {
  padding: 32px 36px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.f-group {
  margin-bottom: 18px;
}
.f-group label {
  display: block;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--navy);
  margin-bottom: 7px;
  text-transform: uppercase;
}
.req {
  color: var(--red);
}
.opt {
  color: var(--muted);
  font-weight: 400;
  text-transform: none;
  font-size: 0.72rem;
}
.f-group input,
.f-group select {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  color: var(--navy);
  background: var(--white);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  outline: none;
}
.f-group input::placeholder {
  color: #b0b9c6;
}
.f-group input:focus,
.f-group select:focus {
  border-color: var(--navy);
  box-shadow: 0 0 0 3px rgba(26, 46, 74, 0.08);
}
.f-group input.error,
.f-group select.error {
  border-color: var(--red);
  box-shadow: 0 0 0 3px rgba(217, 43, 58, 0.1);
}
.f-group select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236b7a8d' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.f-error {
  font-size: 0.72rem;
  color: var(--red);
  font-weight: 600;
  margin-top: 4px;
  display: block;
}
.api-error {
  font-size: 0.82rem;
  color: var(--red);
  font-weight: 600;
  text-align: center;
  padding: 10px 14px;
  background: rgba(217, 43, 58, 0.07);
  border-radius: var(--radius);
  border: 1px solid rgba(217, 43, 58, 0.2);
  margin-bottom: 14px;
}

.btn-submit {
  width: 100%;
  padding: 15px;
  background: var(--red);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 6px 20px rgba(217, 43, 58, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;
}
.btn-submit:hover:not(:disabled) {
  background: var(--red-d);
  transform: translateY(-2px);
}
.btn-submit:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
.form-note {
  text-align: center;
  font-size: 0.74rem;
  color: var(--muted);
  margin-top: 14px;
  line-height: 1.6;
}
.form-note i {
  color: var(--muted);
}

.success-state {
  padding: 56px 36px;
  text-align: center;
}
.success-icon-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin: 0 auto 20px;
  background: rgba(16, 185, 129, 0.1);
  border: 2px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes popIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.success-icon-wrap i {
  font-size: 1.8rem;
  color: #10b981;
}
.success-state h3 {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 12px;
}
.success-state p {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 820px) {
  .reg-layout {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 580px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .form-body {
    padding: 24px;
  }
  .form-card-header {
    padding: 22px 24px;
  }
}
</style>
