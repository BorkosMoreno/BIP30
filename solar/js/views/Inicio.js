export default {
  name: 'Inicio',
  template: `
    <div>
      <!-- Hero -->
      <div class="hero-banner">
        <h1><i class="bi bi-sun-fill me-2" style="color:var(--solar-secondary)"></i>Placas solares para nuestra comunidad</h1>
        <p>Reducimos la factura eléctrica de zonas comunes y generamos energía limpia para todos los vecinos. Un proyecto colectivo, sostenible y rentable.</p>
        <div class="d-flex gap-2 flex-wrap">
          <router-link to="/propuesta" class="btn btn-warning btn-sm fw-bold">
            <i class="bi bi-clipboard2-check me-1"></i>Ver la propuesta
          </router-link>
          <router-link to="/contacto" class="btn btn-outline-light btn-sm">
            <i class="bi bi-ballot me-1"></i>Participar en la votación
          </router-link>
        </div>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-4">
        <div v-for="s in stats" :key="s.label" class="col-6 col-md-3">
          <div class="stat-card">
            <span class="stat-icon">{{ s.icon }}</span>
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>

      <!-- Estado + Participa -->
      <div class="row g-3">
        <div class="col-md-7">
          <div class="card-solar">
            <h5 class="section-title"><i class="bi bi-info-circle-fill"></i>¿En qué punto estamos?</h5>
            <p class="text-muted mb-3" style="font-size:.9rem">La comunidad está estudiando la viabilidad de instalar un sistema fotovoltaico compartido en la cubierta del edificio.</p>
            <ul class="list-unstyled mb-0">
              <li v-for="paso in pasos" :key="paso.texto" class="mb-2">
                <i :class="paso.icono + ' me-2'"></i>{{ paso.texto }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card-solar" style="background:linear-gradient(135deg,#FFF8E1,#FFF3CD)">
            <h5 class="section-title" style="color:#E65100"><i class="bi bi-megaphone-fill"></i>Participa ahora</h5>
            <p style="font-size:.88rem">Necesitamos el apoyo de al menos el 75% de los propietarios para llevar el proyecto a la junta.</p>
            <div class="mb-3">
              <div class="d-flex justify-content-between mb-1" style="font-size:.82rem;font-weight:600">
                <span>Vecinos a favor</span><span>34 de 48</span>
              </div>
              <div class="progress" style="height:10px;border-radius:8px">
                <div class="progress-bar bg-warning" style="width:71%"></div>
              </div>
              <div class="text-muted mt-1" style="font-size:.75rem">Quórum necesario: 75% (36 vecinos)</div>
            </div>
            <router-link to="/contacto" class="btn btn-warning w-100 fw-bold">
              <i class="bi bi-hand-thumbs-up-fill me-1"></i>Mostrar mi apoyo
            </router-link>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      stats: [
        { icon: '☀️', value: '24 kWp',  label: 'Potencia instalada' },
        { icon: '💶', value: '1.200 €', label: 'Ahorro / vivienda / año' },
        { icon: '🌱', value: '8,4 T',   label: 'CO₂ evitado / año' },
        { icon: '⏱️', value: '6 años',  label: 'Retorno de inversión' },
      ],
      pasos: [
        { icono: 'bi bi-check-circle-fill text-success', texto: 'Estudio de viabilidad técnica completado' },
        { icono: 'bi bi-check-circle-fill text-success', texto: '3 presupuestos de instaladores solicitados' },
        { icono: 'bi bi-hourglass-split text-warning',   texto: 'Consulta vecinal en curso' },
        { icono: 'bi bi-circle text-muted',              texto: 'Votación en junta ordinaria' },
        { icono: 'bi bi-circle text-muted',              texto: 'Contratación e instalación' },
      ],
    }
  },
}
