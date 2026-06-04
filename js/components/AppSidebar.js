import { appState } from '../state.js'

export default {
  name: 'AppSidebar',
  setup() {
    return { appState }
  },
  methods: {
    cerrar() { appState.sidebarOpen = false },
  },
  template: `
    <div>
      <!-- Overlay oscuro (solo mobile cuando sidebar abierto) -->
      <div v-if="appState.sidebarOpen"
           class="sidebar-overlay d-lg-none"
           @click="cerrar()">
      </div>

      <nav class="app-sidebar" :class="{ 'sidebar-open': appState.sidebarOpen }">

        <!-- Botón cerrar (solo mobile) -->
        <div class="d-flex justify-content-end d-lg-none px-3 pt-2 pb-1">
          <button @click="cerrar()" class="btn btn-sm btn-close btn-close-white" aria-label="Cerrar menú"></button>
        </div>

        <p class="sidebar-section">Navegación</p>

        <router-link to="/" custom v-slot="{ isActive, navigate }">
          <a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']">
            <i class="bi bi-calendar-event-fill" style="color:var(--solar-secondary)"></i> <strong>Junta 4 Jun</strong>
          </a>
        </router-link>
        <router-link to="/proyecto" custom v-slot="{ isActive, navigate }">
          <a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']">
            <i class="bi bi-house-fill"></i> El proyecto
          </a>
        </router-link>
        <router-link to="/beneficios" custom v-slot="{ isActive, navigate }">
          <a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']">
            <i class="bi bi-lightning-fill"></i> Beneficios
          </a>
        </router-link>
        <router-link to="/propuesta" custom v-slot="{ isActive, navigate }">
          <a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']">
            <i class="bi bi-clipboard2-check-fill"></i> Propuestas
          </a>
        </router-link>
        <router-link to="/documentos" custom v-slot="{ isActive, navigate }">
          <a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']">
            <i class="bi bi-folder2-open"></i> Documentos
          </a>
        </router-link>
        <router-link to="/contacto" custom v-slot="{ isActive, navigate }">
          <a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']">
            <i class="bi bi-calendar2-check-fill"></i> La junta
          </a>
        </router-link>
        <router-link to="/videos" custom v-slot="{ isActive, navigate }">
          <a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']">
            <i class="bi bi-play-circle-fill"></i> Vídeos
          </a>
        </router-link>

        <hr class="sidebar-divider" />
        <p class="sidebar-section">Estado del proyecto</p>

        <div class="status-card" style="background:rgba(249,168,37,.15);border:1px solid rgba(249,168,37,.3)">
          <div class="status-label">Próxima cita</div>
          <div class="status-value" style="font-size:.9rem;color:#F9A825">📅 4 de junio · 19:00h</div>
          <div style="font-size:.7rem;color:#8a9bc0;margin-top:.2rem">Patio comunidad · Portales I-H</div>
        </div>

        <div class="status-card">
          <div class="status-label">Ahorro est. / kWp contratado</div>
          <div class="status-value">~214 €/año</div>
          <div style="font-size:.7rem;color:#8a9bc0">+400 € en ayudas el primer año</div>
        </div>

        <div class="status-card">
          <div class="status-label">Capacidad máxima cubierta</div>
          <div class="status-value">250–360 kWp</div>
          <div style="font-size:.7rem;color:#8a9bc0">400–600 paneles posibles</div>
        </div>

      </nav>
    </div>
  `,
}
