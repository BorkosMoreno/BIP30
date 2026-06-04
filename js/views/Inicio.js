export default {
  name: 'Inicio',
  template: `
    <div>
      <!-- Hero -->
      <div class="hero-banner">
        <h1><i class="bi bi-sun-fill me-2" style="color:var(--solar-secondary)"></i>Instalación solar fotovoltaica</h1>
        <p>Comunidad de Propietarios <strong>Bulevar Indalecio Prieto, 30 · Madrid</strong>. 132 vecinos estudiamos juntos cómo generar nuestra propia energía limpia y reducir la factura eléctrica.</p>
        <div class="d-flex gap-2 flex-wrap">
          <router-link to="/propuesta" class="btn btn-warning btn-sm fw-bold">
            <i class="bi bi-clipboard2-check me-1"></i>Ver las propuestas
          </router-link>
          <router-link to="/contacto" class="btn btn-outline-light btn-sm">
            <i class="bi bi-calendar2-check me-1"></i>Junta 4 de junio
          </router-link>
        </div>
      </div>

      <!-- Stats reales -->
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <span class="stat-icon">🏠</span>
            <div class="stat-value">132</div>
            <div class="stat-label">Propietarios en la comunidad</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <span class="stat-icon">💶</span>
            <div class="stat-value">~214 €</div>
            <div class="stat-label">Ahorro factura / kWp / año</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <span class="stat-icon">⚡</span>
            <div class="stat-value">2 años</div>
            <div class="stat-label">Amortización con ayudas fiscales</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="stat-card">
            <span class="stat-icon">🌱</span>
            <div class="stat-value">97 T</div>
            <div class="stat-label">CO₂ evitado / año (máx. instalación)</div>
          </div>
        </div>
      </div>

      <!-- Vídeos -->
      <div class="card-solar mb-4">
        <h5 class="section-title"><i class="bi bi-play-circle-fill"></i>Vídeos informativos del proyecto</h5>
        <div class="row g-3">
          <div v-for="v in videos" :key="v.src" class="col-md-4">
            <div class="fw-semibold mb-2" style="font-size:.88rem;color:var(--solar-primary)">
              <i class="bi bi-play-fill me-1"></i>{{ v.titulo }}
            </div>
            <div style="position:relative;padding-bottom:56.25%;height:0;background:#111;border-radius:10px;overflow:hidden">
              <video controls style="position:absolute;top:0;left:0;width:100%;height:100%" preload="metadata">
                <source :src="v.src" type="video/mp4" />
              </video>
            </div>
            <p class="text-muted mt-2 mb-0" style="font-size:.78rem">{{ v.desc }}</p>
          </div>
        </div>
        <div class="text-end mt-3">
          <router-link to="/videos" style="font-size:.83rem;color:var(--solar-primary);text-decoration:none">
            <i class="bi bi-collection-play me-1"></i>Ver todos los vídeos →
          </router-link>
        </div>
      </div>

      <!-- Documentos destacados + acceso a docs -->
      <div class="card-solar mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-file-earmark-pdf-fill text-danger" style="font-size:2rem;flex-shrink:0"></i>
          <div>
            <div class="fw-bold" style="color:var(--solar-primary)">Documento informativo para los vecinos · Alromar</div>
            <div class="text-muted" style="font-size:.82rem">Informe técnico de Alromar sobre la instalación fotovoltaica en BIP30</div>
          </div>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <a href="https://drive.google.com/file/d/1mvh9u3N3c5FKkJCOily2h_G3ow1RKTXu/view"
             target="_blank" class="btn btn-sm btn-success fw-bold">
            <i class="bi bi-file-earmark-pdf me-1"></i>Abrir PDF
          </a>
          <router-link to="/documentos" class="btn btn-sm btn-outline-primary fw-bold">
            <i class="bi bi-folder2-open me-1"></i>Ver todos los documentos
          </router-link>
        </div>
      </div>

      <div class="card-solar mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-bank text-danger" style="font-size:2rem;flex-shrink:0"></i>
          <div>
            <div class="fw-bold" style="color:var(--solar-primary)">BOAM · Plan Rehabilita 2026 · Ayuntamiento de Madrid</div>
            <div class="text-muted" style="font-size:.82rem">Boletín Oficial (pág. 24) · Apertura del plazo para solicitar subvenciones Plan Rehabilita 2026</div>
          </div>
        </div>
        <a href="https://sede.madrid.es/csvfiles/UnidadesDescentralizadas/UDCBOAM/Contenidos/Boletin/2026/Junio/Ficheros%20PDF/BOAM_10138_01062026133552712.pdf"
           target="_blank" class="btn btn-sm btn-success fw-bold">
          <i class="bi bi-file-earmark-pdf me-1"></i>Abrir PDF
        </a>
      </div>

      <!-- Estado + Junta -->
      <div class="row g-3 mb-4">
        <div class="col-md-7">
          <div class="card-solar">
            <h5 class="section-title"><i class="bi bi-info-circle-fill"></i>¿En qué punto estamos?</h5>
            <p class="text-muted mb-3" style="font-size:.9rem">Los vecinos impulsores del proyecto han completado la consulta vecinal con resultados positivos y la propuesta ya está formalmente en el orden del día de la junta ordinaria.</p>
            <ul class="list-unstyled mb-0">
              <li v-for="paso in pasos" :key="paso.texto" class="mb-2">
                <i :class="paso.icono + ' me-2'"></i>{{ paso.texto }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card-solar" style="background:linear-gradient(135deg,#1a237e,#283593);color:#fff">
            <h5 class="fw-bold mb-2" style="color:#F9A825">
              <i class="bi bi-calendar-event-fill me-2"></i>Junta General Ordinaria
            </h5>
            <div class="mb-3">
              <div style="font-size:1.5rem;font-weight:800">4 de junio de 2026</div>
              <div style="font-size:.9rem;opacity:.85">19:00h (1ª conv.) · 19:30h (2ª conv.)</div>
              <div style="font-size:.85rem;opacity:.75;margin-top:.3rem">📍 Patio comunidad · Portales I-H</div>
            </div>
            <div class="mb-3 p-2 rounded" style="background:rgba(255,255,255,.1);font-size:.83rem">
              <div class="fw-bold mb-1" style="color:#F9A825">Puntos del orden del día:</div>
              <div class="mb-1">· <strong>Punto 3</strong>: Informe garantía obra cubierta</div>
              <div class="mb-1">· <strong>Punto 6</strong>: Autoconsumo particular (vecinos interesados) · <em>requiere 1/3</em></div>
              <div>· <strong>Punto 7</strong>: Zonas comunes (toda la comunidad) · <em>requiere 50%+1</em></div>
            </div>
            <div class="d-grid gap-2">
              <router-link to="/contacto" class="btn btn-warning fw-bold btn-sm">
                <i class="bi bi-calendar2-check me-1"></i>Ver detalles de la junta
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Imagen satelital -->
      <div class="card-solar">
        <h5 class="section-title"><i class="bi bi-geo-alt-fill"></i>Cubierta disponible · Vista satelital</h5>
        <p class="text-muted mb-3" style="font-size:.87rem">Vista aérea del Bulevar Indalecio Prieto 30 y su entorno. La cubierta plana del edificio tiene capacidad para entre 400 y 600 paneles (250–360 kWp).</p>
        <div style="border-radius:12px;overflow:hidden;max-height:420px;display:flex;align-items:center;justify-content:center;background:#000">
          <img src="img/satelite-bip30.png" alt="Vista satelital Bulevar Indalecio Prieto 30 Madrid"
               style="width:100%;height:420px;object-fit:cover;object-position:center" />
        </div>
        <div class="row g-2 mt-2">
          <div class="col-4 text-center p-2 rounded" style="background:#F8F9FA">
            <div class="fw-bold" style="color:var(--solar-primary)">400–600</div>
            <div class="text-muted" style="font-size:.75rem">Paneles posibles</div>
          </div>
          <div class="col-4 text-center p-2 rounded" style="background:#F8F9FA">
            <div class="fw-bold" style="color:var(--solar-primary)">250–360 kWp</div>
            <div class="text-muted" style="font-size:.75rem">Potencia máxima</div>
          </div>
          <div class="col-4 text-center p-2 rounded" style="background:#F8F9FA">
            <div class="fw-bold" style="color:var(--solar-primary)">≥ 2 kWp</div>
            <div class="text-muted" style="font-size:.75rem">Mín. por vecino (si todos)</div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      videos: [
        { titulo: 'Descifrando la garantía',            src: 'media/descifrando_la_garantia.mp4',           desc: 'Análisis de la cláusula de garantía del contrato de impermeabilización y por qué el sistema de lastre no la invalida.' },
        { titulo: 'Garantía y placas solares (resumen)', src: 'media/garantia_y_placas_solares_espress.mp4', desc: 'Versión abreviada del análisis sobre la compatibilidad entre la instalación solar y la garantía de la cubierta.' },
        { titulo: 'Proyecto Solar BIP30',               src: 'media/proyecto_solar_bip_30.mp4',             desc: 'Presentación general del proyecto de autoconsumo fotovoltaico para la Comunidad Bulevar Indalecio Prieto 30.' },
      ],
      pasos: [
        { icono: 'bi bi-check-circle-fill text-success', texto: 'Consulta vecinal realizada: 50 a favor de 79 consultados' },
        { icono: 'bi bi-check-circle-fill text-success', texto: '4 presupuestos técnicos recibidos de instaladoras cualificadas' },
        { icono: 'bi bi-check-circle-fill text-success', texto: 'Proyecto incluido en el orden del día de la Junta Ordinaria' },
        { icono: 'bi bi-hourglass-split text-warning',   texto: 'Junta General Ordinaria: 4 de junio 2026 · 19:00h' },
        { icono: 'bi bi-circle text-muted',              texto: 'Votación y elección de empresa instaladora' },
        { icono: 'bi bi-circle text-muted',              texto: 'Tramitación de licencias y subvenciones' },
        { icono: 'bi bi-circle text-muted',              texto: 'Instalación y puesta en marcha' },
      ],
    }
  },
}
