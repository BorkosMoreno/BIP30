// IDs privados cifrados con AES-256-GCM · misma clave que Reunión
const _enc = [
  'ElDmUNV7thykF+PVx5SNyYyALcNAWiLM2qoJWcvJcJUhAkcu60aiyW9UmHk0rqJG7Q==', // Nota a vecinos
  'EmKXZPZ+shbwftHI6oL6gI7iO+R5bhXFx4gvVt6bIpcUMudB3DAZirFKYf21MS6TPg==', // Recogida de firmas
  'Ek3zId9B9S7xb+Sn34ypsK/8FcRhYFX/4KIaetfaOPUSee24iPtpbrAAEhV0RlN5Jw==', // Contrato impe
  'Em7BdNRzsRWGadHXg+X9oLntK9plUiPkxLQaUbjiIoksWVTMRwbhwq+bjlJ3LHVLow==', // Acta final
  'EhfXb89msjaKFsToz4+chr+CFLpkXj/N2aAcSs7YW4wCadvecWckN0+4ItzMFHz+4Q==', // Burofax
  'EnHOc/Fk9DGqapnf3YWOuLHQHPpvbTjh9bsJRNL+bb4HG9b/cHmAYs+mUG+LqW/jwA==', // Correo abr
  'ElPBJ+dY3i2KYO3DnISIlK7XD9RmZQnc57Q7FuLDLYkSbYhLVspEfox34ICT/KwFpA==', // Correo may
  'ElDdIPNF5h7wb+fl8aqgto7aGMRaQw7e/9F9QrnTQ48vJ2VHVjmZWDM/G28pShlBfA==', // Correo presidente
]

async function _deriveKey(password) {
  const enc = new TextEncoder()
  const km  = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new Uint8Array([66,73,80,51,48,115,111,108,97,114,50,48,50,54,33,64]), iterations: 100000, hash: 'SHA-256' },
    km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
  )
}

async function _decrypt(key, b64) {
  const iv  = new Uint8Array([66,73,80,51,48,105,118,50,48,50,54,33])
  const buf = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
  const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, buf)
  return new TextDecoder().decode(dec)
}

export default {
  name: 'Documentos',
  template: `
    <div>

      <!-- Modal contraseña -->
      <div v-if="mostrarModal"
           style="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;display:flex;align-items:center;justify-content:center"
           @click.self="mostrarModal=false">
        <div class="card-solar" style="width:340px;max-width:92vw">
          <h5 class="fw-bold mb-1" style="color:var(--solar-primary)">
            <i class="bi bi-unlock-fill me-2"></i>Acceso a documentos privados
          </h5>
          <p class="text-muted mb-3" style="font-size:.84rem">Introduce la contraseña para ver los documentos con acceso restringido.</p>
          <input v-model="pwd" type="password" class="form-control mb-2" placeholder="Contraseña"
                 @keyup.enter="verificar" autofocus />
          <div v-if="error" class="text-danger mb-2" style="font-size:.82rem">
            <i class="bi bi-exclamation-triangle me-1"></i>Contraseña incorrecta
          </div>
          <div class="d-flex gap-2">
            <button @click="verificar" class="btn btn-primary btn-sm fw-bold flex-grow-1" :disabled="cargando">
              <span v-if="cargando"><i class="bi bi-hourglass-split me-1"></i>Verificando...</span>
              <span v-else><i class="bi bi-unlock me-1"></i>Acceder</span>
            </button>
            <button @click="mostrarModal=false" class="btn btn-outline-secondary btn-sm">Cancelar</button>
          </div>
        </div>
      </div>

      <h2 class="section-title"><i class="bi bi-folder2-open"></i>Documentos del proyecto</h2>

      <!-- Banner estado -->
      <div class="card-solar mb-4" :style="desbloqueado ? 'background:#E8F5E9' : 'background:#FFF8E1'">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <p class="mb-0" style="font-size:.83rem">
            <span v-if="!desbloqueado">
              <i class="bi bi-info-circle-fill text-warning me-2"></i>
              Los documentos marcados con <strong>🔒 Privado</strong> contienen datos personales. Introduce la contraseña para acceder a ellos.
            </span>
            <span v-else>
              <i class="bi bi-unlock-fill text-success me-2"></i>
              <strong>Documentos desbloqueados.</strong> Todos los PDFs están disponibles en esta sesión.
            </span>
          </p>
          <button v-if="!desbloqueado" @click="mostrarModal=true" class="btn btn-sm btn-outline-secondary fw-bold">
            <i class="bi bi-unlock me-1"></i>Desbloquear
          </button>
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
                <span v-if="doc.privado && !desbloqueado"
                      class="badge-tag bg-secondary text-white"
                      style="cursor:pointer" @click="mostrarModal=true"
                      title="Haz clic para desbloquear">
                  🔒 Privado
                </span>
                <a v-else
                   :href="doc.url || 'https://drive.google.com/file/d/' + doc.id + '/view'"
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
      mostrarModal: false,
      desbloqueado: false,
      cargando:     false,
      pwd:          '',
      error:        false,
      categorias: [
        {
          emoji: '📊', titulo: 'Presupuestos de instaladoras',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'E4e · Propuesta 213,70 kWp',        desc: 'Efficiency for Energy · Con tasas y permisos',               id: '1rjkpJLHUo3Mrxg-wib_0cKFVn2sRiECf' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presupuesto 147,5 kWp',       desc: '184.332 € · Sin desembolso inicial · Financiado IBI+ahorro', id: '1WTelF8Jp0-FegBVkgv1yrqLGa7Ge7BqR' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presupuesto 267 kWp',         desc: 'SolarEdge · 486 módulos · Simulación técnica completa',      id: '1ZtwQXTNysQxb6LD5XPDBVsI9E9YjhS4o' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presentación SolarEdge',      desc: 'Presentación técnica Madrid 2025',                          id: '1fXdd4TskqEftuoCXvGu3LRoDFXPhuocR' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Presupuesto 130 kWp',     desc: '93.209 € · 260 paneles · Amortización 5 años',             id: '1MGE6Wzhz-jEslSOp_eat18N8HIwthPo8' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Simulación 130 kWp',      desc: 'Estudio energético detallado · 130 kWp',                   id: '1sOAAWdXj4bYrvcAKBjErbe3_TA1Xq89t' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Presupuesto 65 kWp',      desc: '48.766 € · 130 paneles · Amortización 6 años',             id: '19S0V7lBE52lDo6GzmZy_KvkWIbHIiXvt' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Simulación 65 kWp',       desc: 'Estudio energético detallado · 65 kWp',                    id: '1BCqd7rsnFjnCOrcL9SgXD33F4x5fmpwT' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 52,50 kWp',    desc: '53.566 € · 100 paneles · Para 50 vecinos · 223 €/año',     id: '1w9fJi12ufT4l4bEE5pjwOCC871OefRp-' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 111,30 kWp',   desc: '106.916 € · 212 paneles · 321 €/año por vecino',           id: '1rTg82vpa-6ECykOsDKALSW4WLATxlkRj' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 213,68 kWp',   desc: '189.516 € · 407 paneles Longi · Llave en mano',            id: '1hSJ-vmamHOEb6CE7l7GCuiywzbaEfGcM' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Informe técnico-jurídico', desc: 'Análisis técnico y legal de la propuesta Besana',           id: '1JxTyFzw4rslDCmstQDJvPZfKQZv6bCLU' },
          ],
        },
        {
          emoji: '📋', titulo: 'Documentos de la comunidad',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'FAQ · Preguntas Frecuentes',    desc: 'Respuestas a las dudas más habituales sobre el proyecto',     id: '1xz1LsSzdkb9WJgKBOMoidf6ShI7EOqQD' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'Nota a vecinos (abril 2026)',   desc: 'Resumen del estado del proyecto y próximos pasos',            privado: true, id: '' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'Recogida de firmas V2',        desc: 'Formulario de consentimiento para la instalación',            privado: true, id: '' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1565C0', nombre: 'Pseudoconvocatoria (may 2026)', desc: 'Información previa al orden del día oficial de la junta',    id: '1pQ-5gogjJ-k_j6O1RgQTvibV0-bRFOk9' },
          ],
        },
        {
          emoji: '⚖️', titulo: 'Garantía cubierta · Acciones legales',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Informe jurídico · Solar y garantía',        desc: 'Informe legal sobre compatibilidad instalación solar con garantía', id: '1l_6l_lqalUnTQ_UhVDv_KZNk87-8uZyc' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Informe instalación · Alromar',               desc: 'Informe técnico de Alromar sobre la instalación fotovoltaica',     id: '1mvh9u3N3c5FKkJCOily2h_G3ow1RKTXu' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Contrato impermeabilización (2024)',          desc: 'Equipo Impe · Obra cubiertas · Cláusula de garantía 10 años',     privado: true, id: '' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Acta final de obra y recepción (feb 2025)',   desc: 'Firmada por ambas partes · Inicio garantía 10 años',               privado: true, id: '' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Burofax a Equipo Impe (may 2026)',            desc: 'Requerimiento formal de compatibilidad solar',                     privado: true, id: '' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Correo a Equipo Impe (abr 2026)',             desc: 'Primera solicitud de asesoramiento técnico',                      privado: true, id: '' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Correo a Equipo Impe (may 2026)',             desc: 'Segunda comunicación antes del burofax',                          privado: true, id: '' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Correo presidente/admin (may 2026)',          desc: 'Solicitud de transparencia y contrato completo para la junta',    privado: true, id: '' },
          ],
        },
        {
          emoji: '📰', titulo: 'Información y prensa',
          docs: [
            { icono: 'bi-file-earmark-pdf-fill', color: '#c62828', nombre: 'BOAM · Plan Rehabilita 2026 · Ayto. Madrid', desc: 'Boletín Oficial (pág. 24) · Apertura plazo subvenciones Plan Rehabilita 2026', url: 'https://sede.madrid.es/csvfiles/UnidadesDescentralizadas/UDCBOAM/Contenidos/Boletin/2026/Junio/Ficheros%20PDF/BOAM_10138_01062026133552712.pdf' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'Sobre autoconsumo solar y bulos',  desc: 'Artículo sobre desinformación en energía solar (may 2026)', id: '1iUtfeyOQudTqaO4ktypyFEo1VbG3PH2w' },
            { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'El País · Autoconsumo colectivo', desc: '"La unión hace la fuerza energética en las comunidades de vecinos"', id: '1h9aVDe8NAy9Z83NZ6Zb3KTL3Lr-K4KPh' },
          ],
        },
      ],
    }
  },
  methods: {
    async verificar() {
      this.cargando = true
      this.error    = false
      try {
        const key = await _deriveKey(this.pwd)
        const ids = await Promise.all(_enc.map(e => _decrypt(key, e)))
        // Asignar IDs descifrados a los docs privados en orden
        let i = 0
        for (const cat of this.categorias) {
          for (const doc of cat.docs) {
            if (doc.privado) { doc.id = ids[i++] }
          }
        }
        this.desbloqueado = true
        this.mostrarModal = false
        this.pwd = ''
      } catch {
        this.error = true
      } finally {
        this.cargando = false
      }
    },
  },
}
