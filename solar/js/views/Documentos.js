export default {
  name: 'Documentos',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-folder2-open"></i>Documentos del proyecto</h2>

      <div class="row g-3">
        <div v-for="cat in categorias" :key="cat.titulo" class="col-md-6">
          <div class="card-solar">
            <h5 class="fw-bold mb-3" style="color:var(--solar-primary)">{{ cat.emoji }} {{ cat.titulo }}</h5>
            <div v-for="doc in cat.docs" :key="doc.nombre"
                 class="d-flex align-items-center justify-content-between p-2 rounded mb-2"
                 style="background:#F8F9FA">
              <div class="d-flex align-items-center gap-2">
                <i :class="'bi ' + doc.icono + ' fs-5'" :style="'color:' + doc.color"></i>
                <div>
                  <div style="font-size:.85rem;font-weight:600">{{ doc.nombre }}</div>
                  <div class="text-muted" style="font-size:.75rem">{{ doc.desc }}</div>
                </div>
              </div>
              <div class="d-flex align-items-center gap-1">
                <span class="badge-tag" :class="doc.badge">{{ doc.estado }}</span>
                <button v-if="doc.disponible"
                        class="btn btn-sm btn-outline-primary ms-2"
                        style="border-radius:8px;font-size:.74rem">
                  <i class="bi bi-download me-1"></i>Descargar
                </button>
                <button v-else class="btn btn-sm btn-outline-secondary ms-2" disabled
                        style="border-radius:8px;font-size:.74rem">
                  Próximamente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-solar mt-0">
        <h5 class="fw-bold mb-2" style="color:var(--solar-primary)">
          <i class="bi bi-lightbulb-fill text-warning me-2"></i>¿Necesitas más información?
        </h5>
        <p class="text-muted mb-3" style="font-size:.9rem">Si tienes alguna duda sobre la documentación, ponte en contacto con la comisión de seguimiento del proyecto.</p>
        <router-link to="/contacto" class="btn btn-primary btn-sm">
          <i class="bi bi-envelope-fill me-1"></i>Contactar con la comisión
        </router-link>
      </div>
    </div>
  `,
  data() {
    return {
      categorias: [
        {
          emoji: '📊', titulo: 'Estudio de viabilidad',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill',     color: '#e53935', nombre: 'Informe técnico de viabilidad',  desc: 'Estudio solar, sombras y producción estimada', estado: 'Disponible', badge: 'bg-success text-white',  disponible: true  },
            { icono: 'bi-file-earmark-excel-fill',   color: '#388E3C', nombre: 'Análisis económico comparativo', desc: 'ROI, TIR y flujo de caja a 25 años',           estado: 'Disponible', badge: 'bg-success text-white',  disponible: true  },
          ],
        },
        {
          emoji: '💼', titulo: 'Presupuestos',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'Presupuesto SolarTech Ibérica', desc: '24 kWp · Opción recomendada',  estado: 'Disponible', badge: 'bg-success text-white', disponible: true },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'Presupuesto EnerSol Andalucía', desc: '22 kWp · Opción alternativa',   estado: 'Disponible', badge: 'bg-success text-white', disponible: true },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'Presupuesto PhotoVerde SL',     desc: '24 kWp · Tercera opción',        estado: 'Disponible', badge: 'bg-success text-white', disponible: true },
          ],
        },
        {
          emoji: '⚖️', titulo: 'Marco legal',
          docs: [
            { icono: 'bi-file-earmark-text-fill', color: '#1565C0', nombre: 'Real Decreto 244/2019',       desc: 'Regulación autoconsumo eléctrico',            estado: 'Externo',   badge: 'bg-info text-dark',    disponible: true  },
            { icono: 'bi-file-earmark-text-fill', color: '#1565C0', nombre: 'Modelo acuerdo de comunidad', desc: 'Borrador acta para junta extraordinaria',     estado: 'Pendiente', badge: 'bg-warning text-dark',  disponible: false },
          ],
        },
        {
          emoji: '🏗️', titulo: 'Trámites y subvenciones',
          docs: [
            { icono: 'bi-file-earmark-richtext-fill', color: '#7B1FA2', nombre: 'Solicitud subvención Junta', desc: 'Ayudas PERTE y Plan Moves III',        estado: 'Pendiente', badge: 'bg-warning text-dark', disponible: false },
            { icono: 'bi-file-earmark-richtext-fill', color: '#7B1FA2', nombre: 'Licencia de obras menor',    desc: 'Tramitación municipal prevista',       estado: 'Pendiente', badge: 'bg-warning text-dark', disponible: false },
          ],
        },
      ],
    }
  },
}
