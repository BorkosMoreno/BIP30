const DRIVE_FOLDER = 'https://drive.google.com/drive/folders/1j1mc0ej0CczV-ngkyqP5nkx_-kTx5x7n'

export default {
  name: 'Documentos',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-folder2-open"></i>Documentos del proyecto</h2>

      <!-- Acceso carpeta Drive -->
      <div class="card-solar mb-4" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB)">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <h6 class="fw-bold mb-1" style="color:var(--solar-primary)">
              <i class="bi bi-google me-2"></i>Carpeta Google Drive · BIP30 Solar
            </h6>
            <p class="text-muted mb-0" style="font-size:.82rem">Todos los documentos originales en la carpeta compartida. Botón verde = abre el PDF directamente.</p>
          </div>
          <a :href="driveFolder" target="_blank" class="btn btn-primary fw-bold btn-sm">
            <i class="bi bi-box-arrow-up-right me-1"></i>Abrir carpeta en Drive
          </a>
        </div>
      </div>

      <!-- Lista de categorías -->
      <div class="row g-3">
        <div v-for="cat in categorias" :key="cat.titulo" class="col-md-6">
          <div class="card-solar">
            <h5 class="fw-bold mb-3" style="color:var(--solar-primary)">{{ cat.emoji }} {{ cat.titulo }}</h5>
            <div v-for="doc in cat.docs" :key="doc.nombre"
                 class="d-flex align-items-center justify-content-between p-2 rounded mb-2"
                 style="background:#F8F9FA">
              <div class="d-flex align-items-center gap-2 flex-grow-1" style="min-width:0">
                <i :class="'bi ' + doc.icono + ' fs-5 flex-shrink-0'" :style="'color:' + doc.color"></i>
                <div style="min-width:0">
                  <div style="font-size:.84rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ doc.nombre }}</div>
                  <div class="text-muted" style="font-size:.74rem">{{ doc.desc }}</div>
                </div>
              </div>
              <div class="d-flex align-items-center gap-1 flex-shrink-0 ms-2">
                <a :href="'https://drive.google.com/file/d/' + doc.id + '/view'"
                   target="_blank"
                   class="btn btn-sm btn-success ms-1"
                   style="border-radius:8px;font-size:.73rem;white-space:nowrap">
                  <i class="bi bi-file-earmark-pdf me-1"></i>PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  data() {
    return {
      driveFolder: DRIVE_FOLDER,
      categorias: [
        {
          emoji: '📊', titulo: 'Presupuestos de instaladoras',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'E4e · Propuesta 213,70 kWp',      desc: 'Efficiency for Energy · Con tasas y permisos', id: '1rjkpJLHUo3Mrxg-wib_0cKFVn2sRiECf' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presupuesto 147,5 kWp',     desc: '184.332 € · Sin desembolso inicial · Financiado IBI+ahorro', id: '1WTelF8Jp0-FegBVkgv1yrqLGa7Ge7BqR' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presupuesto 267 kWp',       desc: 'SolarEdge · 486 módulos · Simulación técnica completa', id: '1ZtwQXTNysQxb6LD5XPDBVsI9E9YjhS4o' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presentación SolarEdge',    desc: 'Presentación técnica Madrid 2025', id: '1fXdd4TskqEftuoCXvGu3LRoDFXPhuocR' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Presupuesto 130 kWp',   desc: '93.209 € · 260 paneles · Amortización 5 años', id: '1MGE6Wzhz-jEslSOp_eat18N8HIwthPo8' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Simulación 130 kWp',    desc: 'Estudio energético detallado · 130 kWp', id: '1sOAAWdXj4bYrvcAKBjErbe3_TA1Xq89t' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Presupuesto 65 kWp',    desc: '48.766 € · 130 paneles · Amortización 6 años', id: '19S0V7lBE52lDo6GzmZy_KvkWIbHIiXvt' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Simulación 65 kWp',     desc: 'Estudio energético detallado · 65 kWp', id: '1BCqd7rsnFjnCOrcL9SgXD33F4x5fmpwT' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 52,50 kWp',  desc: '53.566 € · 100 paneles · Para 50 vecinos · 223 €/año', id: '1w9fJi12ufT4l4bEE5pjwOCC871OefRp-' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 111,30 kWp', desc: '106.916 € · 212 paneles · 321 €/año por vecino', id: '1rTg82vpa-6ECykOsDKALSW4WLATxlkRj' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 213,68 kWp', desc: '189.516 € · 407 paneles Longi · Llave en mano', id: '1hSJ-vmamHOEb6CE7l7GCuiywzbaEfGcM' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Informe técnico-jurídico', desc: 'Análisis técnico y legal de la propuesta Besana', id: '1JxTyFzw4rslDCmstQDJvPZfKQZv6bCLU' },
          ],
        },
        {
          emoji: '📋', titulo: 'Documentos de la comunidad',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'FAQ · Preguntas Frecuentes',        desc: 'Respuestas a las dudas más habituales sobre el proyecto', id: '1xz1LsSzdkb9WJgKBOMoidf6ShI7EOqQD' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'Nota a vecinos (abril 2026)',        desc: 'Resumen del estado del proyecto y próximos pasos', id: '1sAFsj7Ha9HEiIB8t5tAKPEBmKEyJbeRj' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'Recogida de firmas V2',             desc: 'Formulario de consentimiento para la instalación', id: '1A0rPo3B5PzXD_5qvWbfrdrKpicv_07P_' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1565C0', nombre: 'Pseudoconvocatoria (may 2026)',     desc: 'Información previa al orden del día oficial de la junta', id: '1pQ-5gogjJ-k_j6O1RgQTvibV0-bRFOk9' },
          ],
        },
        {
          emoji: '⚖️', titulo: 'Garantía cubierta · Acciones legales',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Informe jurídico · Solar y garantía', desc: 'Informe legal sobre compatibilidad instalación solar con garantía', id: '1l_6l_lqalUnTQ_UhVDv_KZNk87-8uZyc' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Contrato impermeabilización (2024)', desc: 'Equipo Impe · Obra cubiertas · Cláusula de garantía 10 años', id: '1nT7yPtz4AO7qQfAWILFjj2qWCVZVq-2Y' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Burofax a Equipo Impe (may 2026)',   desc: 'Requerimiento formal de respuesta sobre compatibilidad solar', id: '14pyiw3bO8oxaRSwG7M8oTXCnAPjOsNKI' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Correo a Equipo Impe (abr 2026)',    desc: 'Primera solicitud de asesoramiento técnico', id: '1RieWuueoD2OsXAIIeExdg_oBZEdSUxyL' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Correo a Equipo Impe (may 2026)',    desc: 'Segunda comunicación antes del burofax', id: '1pf1AI_yONFS2YGeVbVVmonRPUw6ch8NY' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Correo presidente/admin (may 2026)', desc: 'Solicitud de transparencia y contrato completo para la junta', id: '1sz6UTgJ5ALu_woGvoAFQIiPH01b8xVHd' },
          ],
        },
        {
          emoji: '📰', titulo: 'Información y prensa',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'Sobre autoconsumo solar y bulos',   desc: 'Artículo informativo sobre desinformación en energía solar (may 2026)', id: '1iUtfeyOQudTqaO4ktypyFEo1VbG3PH2w' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'El País · Autoconsumo colectivo',   desc: '"La unión hace la fuerza energética en las comunidades de vecinos"', id: '1h9aVDe8NAy9Z83NZ6Zb3KTL3Lr-K4KPh' },
          ],
        },
      ],
    }
  },
}
