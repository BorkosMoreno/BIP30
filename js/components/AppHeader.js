export default {
  name: 'AppHeader',
  template: `
    <header class="app-header">
      <router-link to="/" class="brand">
        <i class="bi bi-sun-fill icon-sun"></i>
        <span>BIP30 · Solar</span>
        <span class="community">· Indalecio Prieto 30, Madrid</span>
      </router-link>
      <div class="d-flex align-items-center gap-3">
        <span class="header-badge">
          <i class="bi bi-calendar-event-fill me-1"></i>Junta 4 Jun · 19:00h
        </span>
        <span class="text-white opacity-75 d-none d-md-block" style="font-size:.82rem">
          132 vecinos · Madrid 28032
        </span>
      </div>
    </header>
  `,
}
