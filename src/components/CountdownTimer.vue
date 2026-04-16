<template>
  <div class="concluded-badge">
    <i class="fa-solid fa-circle-check"></i>
    Event Concluded &mdash; All 3 Sessions Completed
  </div>
</template>

<style scoped>
.concluded-badge {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #6ee7b7;
  padding: 12px 24px; border-radius: 100px;
  font-size: 0.82rem; font-weight: 600; letter-spacing: 0.5px;
}
.concluded-badge i { color: #10b981; font-size: 1rem; }
</style>
