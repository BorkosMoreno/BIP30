export default {
  name: 'AppSidebar',
  template: `
    <nav class="app-sidebar">

      <p class="sidebar-section">Navegación</p>

      <router-link to="/"           custom v-slot="{ isActive, navigate }">
        <a @click="navigate" :class="['nav-item', isActive ? 'active' : '']">
          <i class="bi bi-house-fill"></i> Inicio
        </a>
      </router-link>

      <router-link to="/beneficios" custom v-slot="{ isActive, navigate }">
        <a @click="navigate" :class="['nav-item', isActive ? 'active' : '']">
          <i class="bi bi-lightning-fill"></i> Beneficios
        </a>
      </router-link>

      <router-link to="/propuesta"  custom v-slot="{ isActive, navigate }">
        <a @click="navigate" :class="['nav-item', isActive ? 'active' : '']">
          <i class="bi bi-clipboard2-check-fill"></i> Nuestra propuesta
        </a>
      </router-link>

      <router-link to="/documentos" custom v-slot="{ isActive, navigate }">
        <a @click="navigate" :class="['nav-item', isActive ? 'active' : '']">
          <i class="bi bi-folder2-open"></i> Documentos
        </a>
      </router-link>

      <router-link to="/contacto"   custom v-slot="{ isActive, navigate }">
        <a @click="navigate" :class="['nav-item', isActive ? 'active' : '']">
          <i class="bi bi-ballot-fill"></i> Contacto y votación
        </a>
      </router-link>

      <hr class="sidebar-divider" />

      <p class="sidebar-section">Estado del proyecto</p>

      <div class="status-card">
        <div class="status-label">Vecinos interesados</div>
        <div class="status-value">34 / 48</div>
        <div class="vote-bar-wrap mt-2">
          <div class="vote-bar-fill" style="width:71%"></div>
        </div>
        <div style="font-size:.7rem;color:#8a9bc0;margin-top:.3rem">71% del quórum necesario</div>
      </div>

      <div class="status-card">
        <div class="status-label">Fase actual</div>
        <div class="status-value" style="font-size:.88rem;color:#4fc3f7">📋 Consulta vecinal</div>
      </div>

      <div class="status-card">
        <div class="status-label">Ahorro estimado / año</div>
        <div class="status-value">~1.200 €</div>
        <div style="font-size:.7rem;color:#8a9bc0">por vivienda</div>
      </div>

    </nav>
  `,
}
