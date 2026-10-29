import { appState } from '../state.js'

export default {
  name: 'AppSidebar',
  setup() { return { appState } },
  methods: { cerrar() { appState.sidebarOpen = false } },
  template: `
    <div>
      <div v-if="appState.sidebarOpen" class="sidebar-overlay d-lg-none" @click="cerrar()"></div>
      <nav class="app-sidebar" :class="{ 'sidebar-open': appState.sidebarOpen }">
        <div class="d-flex justify-content-end d-lg-none px-3 pt-2 pb-1"><button @click="cerrar()" class="btn btn-sm btn-close btn-close-white" aria-label="Cerrar menú"></button></div>
        <p class="sidebar-section">Explora el proyecto</p>
        <router-link to="/" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-house-fill"></i> Inicio</a></router-link>
        <router-link to="/beneficios" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-sun-fill"></i> Energía fotovoltaica</a></router-link>
        <router-link to="/proyecto" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-geo-alt-fill"></i> Nuestra parcela</a></router-link>
        <router-link to="/zonas-comunes" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-buildings-fill"></i> Zonas comunes</a></router-link>
        <router-link to="/autoconsumo-individual" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-house-check-fill"></i> Autoconsumo individual</a></router-link>
        <router-link to="/garantia-cubierta" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-shield-check"></i> Garantía de la cubierta</a></router-link>
        <hr class="sidebar-divider" />
        <p class="sidebar-section">Seguimiento</p>
        <router-link to="/propuesta" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-clipboard2-check-fill"></i> Propuestas</a></router-link>
        <router-link to="/juntas" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-calendar2-event-fill"></i> Juntas y acuerdos</a></router-link>
        <router-link to="/documentos" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-folder2-open"></i> Documentos</a></router-link>
        <router-link to="/videos" custom v-slot="{ isActive, navigate }"><a @click="navigate(); cerrar()" :class="['nav-item', isActive ? 'active' : '']"><i class="bi bi-play-circle-fill"></i> Audiovisuales</a></router-link>
        <div class="sidebar-note"><i class="bi bi-info-circle-fill"></i><p>Las cifras y propuestas previas se identifican como estimaciones pendientes de actualización.</p></div>
      </nav>
    </div>
  `,
}
