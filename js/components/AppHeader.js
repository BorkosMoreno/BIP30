import { appState } from '../state.js'

export default {
  name: 'AppHeader',
  setup() {
    return { appState }
  },
  template: `
    <header class="app-header">
      <!-- Hamburguesa (solo mobile/tablet) -->
      <button class="sidebar-toggle d-lg-none" @click="appState.sidebarOpen = !appState.sidebarOpen"
              :class="{ active: appState.sidebarOpen }"
              aria-label="Menú">
        <span></span><span></span><span></span>
      </button>

      <router-link to="/" class="brand">
        <i class="bi bi-sun-fill icon-sun"></i>
        <span>BIP30 · Solar</span>
        <span class="community">· Indalecio Prieto 30, Madrid</span>
      </router-link>
      <div class="d-flex align-items-center gap-3">
        <span class="text-white opacity-75 d-none d-md-block" style="font-size:.82rem">
          Información de la comunidad
        </span>
      </div>
    </header>
  `,
}
