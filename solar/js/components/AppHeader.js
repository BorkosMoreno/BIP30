export default {
  name: 'AppHeader',
  template: `
    <header class="app-header">
      <router-link to="/" class="brand">
        <i class="bi bi-sun-fill icon-sun"></i>
        <span>Energía Solar</span>
        <span class="community">· Indalecio Prieto 30, Madrid</span>
      </router-link>
      <div class="d-flex align-items-center gap-3">
        <span class="header-badge">
          <i class="bi bi-people-fill me-1"></i>Vecinos
        </span>
        <span class="text-white opacity-75 d-none d-md-block" style="font-size:.82rem">
          Proyecto compartido · 2025
        </span>
      </div>
    </header>
  `,
}
