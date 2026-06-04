// IDs privados cifrados con AES-256-GCM
const _enc = [
  'EmzrIetY0myHb5zk17CFgbb3CfZAPij4h9kjc9b0WLAv4fuOS5aX3XPiTRarxJWNEA==',
  'EnLmRf4o1z63ccKn+7OJibbhLM5EQy/YhIt/TM7GRKs66vZ4sxNg/kKvgZ0l67wOYg==',
  'ElPoIN595Ri2QunAzKW5vajiFM9mXint7pEtTuKeZLYUAhkB1DBO+H8EQhZ5ETt75Q==',
  'EmSQTMEj0BKxRM+gzeujx7vED/JefSDD1LZ9d9focqET3YOkNjm2clZ2n0rbDMCrfg==',
  'EmKeQflz7hKkWfLxxImMm5SHb8FeZV7J44Q+R+jJRL0s9jhrvv6+Qgc7i3Jj2u4djA==',
  'Ehf/ctFiwBaKSuH6yZC4ya7SFfVZPD3Z4pQWTLnIcb86APXOLGPSyacbQn2ZYXzAXQ==',
]

async function _deriveKey(password) {
  const e = new TextEncoder()
  const km = await crypto.subtle.importKey('raw', e.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name:'PBKDF2', salt: new Uint8Array([66,73,80,51,48,115,111,108,97,114,50,48,50,54,33,64]), iterations:100000, hash:'SHA-256' },
    km, { name:'AES-GCM', length:256 }, false, ['decrypt']
  )
}
async function _decrypt(key, b64) {
  const iv  = new Uint8Array([66,73,80,51,48,105,118,50,48,50,54,33])
  const buf = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name:'AES-GCM', iv }, key, buf))
}

export default {
  name: 'Reunion',
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

      <!-- Título -->
      <h2 class="section-title"><i class="bi bi-calendar2-check-fill"></i>Junta Ordinaria de Vecinos</h2>

      <!-- Vídeos -->
      <div class="card-solar mb-4">
        <h5 class="section-title"><i class="bi bi-play-circle-fill"></i>Vídeos informativos</h5>
        <div class="row g-3">
          <div v-for="v in videos" :key="v.src" class="col-md-4">
            <div class="fw-semibold mb-2" style="font-size:.86rem;color:var(--solar-primary)">
              <i class="bi bi-play-fill me-1"></i>{{ v.titulo }}
            </div>
            <div style="position:relative;padding-bottom:56.25%;height:0;background:#111;border-radius:10px;overflow:hidden">
              <video controls style="position:absolute;top:0;left:0;width:100%;height:100%" preload="metadata">
                <source :src="'media/' + v.src" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      <!-- Subtítulo + desbloquear -->
      <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <h2 class="section-title mb-0"><i class="bi bi-folder2-open"></i>Documentos de la reunión</h2>
        <button v-if="!desbloqueado" @click="mostrarModal=true" class="btn btn-sm btn-outline-secondary">
          <i class="bi bi-unlock me-1"></i>Desbloquear privados
        </button>
        <span v-else class="badge bg-success text-white"><i class="bi bi-unlock-fill me-1"></i>Desbloqueado</span>
      </div>

      <!-- Grupos -->
      <div class="d-flex flex-column gap-3">
        <div v-for="grupo in grupos" :key="grupo.titulo" class="card-solar" :style="'border-left:4px solid ' + grupo.color">

          <!-- Cabecera del grupo -->
          <div class="d-flex align-items-center gap-2 mb-3 flex-wrap">
            <h5 class="fw-bold mb-0" :style="'color:' + grupo.color">{{ grupo.emoji }} {{ grupo.titulo }}</h5>
            <span v-if="grupo.punto" class="badge text-white fw-bold" :style="'background:' + grupo.color">
              Punto{{ grupo.punto.includes('y') ? 's' : '' }} {{ grupo.punto }} del orden del día
            </span>
          </div>

          <!-- Documentos con posibles divisores -->
          <div class="d-flex flex-column gap-2">
            <template v-for="doc in grupo.docs" :key="doc.nombre || doc.divider">

              <!-- Divisor con etiqueta -->
              <div v-if="doc.divider"
                   class="d-flex align-items-center gap-2 my-1">
                <hr style="flex:1;margin:0;border-color:#ddd" />
                <span style="font-size:.72rem;color:#999;white-space:nowrap;font-weight:600;text-transform:uppercase;letter-spacing:.06em">{{ doc.divider }}</span>
                <hr style="flex:1;margin:0;border-color:#ddd" />
              </div>

              <!-- Documento normal -->
              <div v-else
                   class="d-flex align-items-center justify-content-between p-2 rounded" style="background:#F8F9FA">
                <div class="d-flex align-items-center gap-2" style="min-width:0">
                  <i class="bi bi-file-earmark-pdf-fill flex-shrink-0" :style="'color:' + grupo.color"></i>
                  <span style="font-size:.83rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ doc.nombre }}</span>
                </div>
                <span v-if="doc.privado && !desbloqueado"
                      class="badge-tag bg-secondary text-white ms-1 flex-shrink-0"
                      style="cursor:pointer;white-space:nowrap" @click="mostrarModal=true">
                  🔒 Privado
                </span>
                <a v-else
                   :href="doc.url || 'https://drive.google.com/file/d/' + doc.id + '/view'"
                   target="_blank" class="btn btn-sm btn-success ms-1 flex-shrink-0"
                   style="border-radius:8px;font-size:.72rem;white-space:nowrap">
                  <i :class="doc.web ? 'bi bi-box-arrow-up-right' : 'bi bi-file-earmark-pdf'" class="me-1"></i>{{ doc.web ? 'Ver' : 'PDF' }}
                </a>
              </div>

            </template>
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
      videos: [
        { src: 'descifrando_la_garantia.mp4',           titulo: 'Descifrando la garantía'            },
        { src: 'garantia_y_placas_solares_espress.mp4', titulo: 'Garantía y placas solares (resumen)' },
        { src: 'proyecto_solar_bip_30.mp4',             titulo: 'Proyecto Solar BIP30'                },
      ],
      grupos: [
        {
          titulo: 'Documentos de la Junta', emoji: '📋', color: '#1565C0',
          docs: [
            { nombre: 'Convocatoria Ordinaria 4 junio 2026',    id: '1qkoURuAgC9mFbIkSITM6SiXRbkfyzL_1' },
            { nombre: 'Ley de Propiedad Horizontal 2025 (LPH)', id: '1BpRzF5Sp1Rm--xvZdowHxdTQFDXVnyNV' },
          ],
        },
        {
          titulo: 'Garantía de la Cubierta y Comunicaciones', emoji: '🏗️', color: '#E65100', punto: '3',
          docs: [
            // 301 · Contrato
            { nombre: 'Contrato impermeabilización (2024)', privado: true, id: '' },

            { divider: 'Correos' },
            { nombre: 'Correo a Equipo Impe (abr 2026)',             privado: true, id: '' },
            { nombre: 'Correo a Equipo Impe (may 2026)',             privado: true, id: '' },
            { nombre: 'Burofax a Equipo Impe (may 2026)',            privado: true, id: '' },
            { nombre: 'Correos pidiendo más datos al administrador', privado: true, id: '' },

            { divider: 'Informes' },
            { nombre: 'Informe de instalación · Alromar',                       id: '15n7fhqBK23mTpsDL1bWgx1BFEDifpHC4' },
            { nombre: 'Informe técnico y jurídico · Ingeniero',                 id: '1p4m0jERGGkE6LNP-Z3fLNvqVQ8bbOzzP' },
            { nombre: 'Informe jurídico · Instalación paneles y garantía',      id: '1dkt2FB-64KGKw1xOuDzEOxNjaO4BTNhe' },

            { divider: 'Otros' },
            { nombre: 'Pseudoconvocatoria (may 2026)',                           id: '1ZdKU01nN55Yl_nBenBLZs1D7VfU5yjtd' },
            { nombre: 'Sobre el autoconsumo solar, los bulos y la información', id: '1mzGa8zbIKS11W7xnntF0wIzcI70z3PUI' },
          ],
        },
        {
          titulo: 'Presupuestos de instalación', emoji: '📊', color: '#7B1FA2', punto: '6 y 7',
          docs: [
            { nombre: 'FAQ · Preguntas Frecuentes',           id: '1V2tdq0927iZSN61mhaEvBEGuU_dVKIYc' },
            { nombre: 'Cláusula del Miedo',                   id: '1-77Kx3-nebpXNKtv4d3dGy3JikUxtzOd' },
            { divider: 'E4e' },
            { nombre: 'E4e · Propuesta 213,70 kWp',           id: '17Fcagp0aZ86yX0lydxnxNVSdf_vCFSiI' },
            { divider: 'CEC' },
            { nombre: 'CEC · Presupuesto 147,5 kWp',          id: '1R1YjxIBCcDifVYOfPvhgVM0Pjo2VJMrv' },
            { nombre: 'CEC · Presupuesto 267 kWp',            id: '12HhmtBfIG4Mv-yIA2qloyPPwOFLjvoBW' },
            { nombre: 'CEC · Presentación SolarEdge',         id: '1bpKQL_nJrhJPTXR6uoegGAXOH3wxstu1' },
            { divider: 'Alromar' },
            { nombre: 'Alromar · Presupuesto 130 kWp',        id: '1oX9HDHPaRg6A-hhz6EQ2chvcZZlA0x27' },
            { nombre: 'Alromar · Simulación 130 kWp',         id: '1cJK7ShWCpYwamUX3cRe1OB_lKuccL6r8' },
            { nombre: 'Alromar · Presupuesto 65 kWp',         id: '1wppTAq5WDMBKTIwTtVaHEMqoxMaqgLLU' },
            { nombre: 'Alromar · Simulación 65 kWp',          id: '1KwlGp6lUVGeADWc0q7e5uUF6hMD8HdhM' },
            { divider: 'Besana' },
            { nombre: 'Besana · Presupuesto 52,50 kWp',       id: '1DPlMXHRWGDM7swt2TI31FxHGTXX80AM7' },
            { nombre: 'Besana · Presupuesto 111,30 kWp',      id: '1SbE4JNrRNgNbhRnMyisEpcvOL7KwFDu5' },
            { nombre: 'Besana · Presupuesto 213,68 kWp',      id: '1qYM9abbKtP3h9O33_auLdMze839wnRw4' },
          ],
        },
        {
          titulo: 'Actas y Documentos Anteriores', emoji: '📰', color: '#546E7A',
          docs: [
            { nombre: 'Convocatoria Ordinaria 13 mayo 2024',    id: '1K4iluWxGUT1Ak9RuDL87_r1zFv5vsKMR' },
            { nombre: 'Acta Ordinaria 13.05.2024 (firmada)',    privado: true, id: '' },
            { nombre: 'El País · La unión hace la fuerza energética', id: '1tuRuVTSkRkhbe4iPFjTdSj_u2miLZMYS' },
          ],
        },
        {
          titulo: 'Subvenciones y Ayudas', emoji: '💰', color: '#1B5E20',
          docs: [
            { nombre: 'BOAM · Plan Rehabilita 2026 · Ayuntamiento de Madrid (pág. 24)', url: 'https://sede.madrid.es/csvfiles/UnidadesDescentralizadas/UDCBOAM/Contenidos/Boletin/2026/Junio/Ficheros%20PDF/BOAM_10138_01062026133552712.pdf' },
            { nombre: 'Bonificación IBI · Instalación sistemas energía solar', web: true, url: 'https://agenciatributaria.madrid.es/portales/contribuyente/es/Impuestos-tasas-y-precios-publicos/Bienes-Inmuebles-IBI-/Exenciones-y-bonificaciones/Bonificacion-por-la-instalacion-de-sistemas-de-aprovechamiento-de-la-energia-solar-IBI-Informacion/?vgnextfmt=default&vgnextoid=d0ce35a0d1081810VgnVCM2000001f4a900aRCRD&vgnextchannel=82d5990d45a81810VgnVCM1000001d4a900aRCRD' },
            { nombre: 'Deducción IRPF · Obras de rehabilitación energética', web: true, url: 'https://sede.agenciatributaria.gob.es/Sede/vivienda-otros-inmuebles/deducciones-obras-mejora-eficiencia-energetica-viviendas/deduccion-obras-rehabilitacion-energetica/que-periodo-impositivo-puedes-aplicar-deduccion.html' },
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
        let i = 0
        for (const g of this.grupos) {
          for (const doc of g.docs) {
            if (doc.privado) doc.id = ids[i++]
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
