// IDs privados cifrados con AES-256-GCM. Sin la contraseña correcta son ilegibles.
const _enc = [
  'Ek3zId9B9S7xb+Sn34ypsK/8FcRhYFX/4KIaetfaOPUSee24iPtpbrAAEhV0RlN5Jw==',
  'Em7BdNRzsRWGadHXg+X9oLntK9plUiPkxLQaUbjiIoksWVTMRwbhwq+bjlJ3LHVLow==',
  'EhfXb89msjaKFsToz4+chr+CFLpkXj/N2aAcSs7YW4wCadvecWckN0+4ItzMFHz+4Q==',
  'ElDdIPNF5h7wb+fl8aqgto7aGMRaQw7e/9F9QrnTQ48vJ2VHVjmZWDM/G28pShlBfA==',
]

async function _deriveKey(password) {
  const enc = new TextEncoder()
  const km  = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new Uint8Array([66,73,80,51,48,115,111,108,97,114,50,48,50,54,33,64]), iterations: 100000, hash: 'SHA-256' },
    km,
    { name: 'AES-GCM', length: 256 }, false, ['decrypt']
  )
}

async function _decrypt(key, b64) {
  const iv  = new Uint8Array([66,73,80,51,48,105,118,50,48,50,54,33])
  const buf = Uint8Array.from(atob(b64), c => c.charCodeAt(0))
  const dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, buf)
  return new TextDecoder().decode(dec)
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
            <i class="bi bi-unlock-fill me-2"></i>Acceso a documentos
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

      <!-- Subtítulo puntos -->
      <h2 class="section-title mt-2"><i class="bi bi-list-ol"></i>Puntos del Orden del día destacados</h2>

      <div class="row g-3">

        <!-- Punto 3 -->
        <div class="col-12">
          <div class="card-solar" style="border-left:4px solid #E65100">
            <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
              <div class="d-flex align-items-center gap-2">
                <span class="fw-bold rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                      style="width:32px;height:32px;background:#E65100;font-size:.9rem">3</span>
                <h5 class="fw-bold mb-0" style="color:#E65100">Informe resultado trabajos y condiciones de garantía en obra de cubierta</h5>
              </div>
              <button v-if="!desbloqueado" @click="mostrarModal=true"
                      class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-unlock me-1"></i>Desbloquear docs privados
              </button>
              <span v-else class="badge bg-success text-white" style="font-size:.78rem">
                <i class="bi bi-unlock-fill me-1"></i>Documentos desbloqueados
              </span>
            </div>
            <div class="d-flex flex-column gap-2">
              <div v-for="doc in punto3" :key="doc.nombre"
                   class="d-flex align-items-center justify-content-between p-2 rounded" style="background:#F8F9FA">
                <div class="d-flex align-items-center gap-2" style="min-width:0">
                  <i :class="'bi ' + doc.icono + ' flex-shrink-0'" :style="'color:' + doc.color"></i>
                  <span style="font-size:.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ doc.nombre }}</span>
                </div>
                <span v-if="doc.privado && !desbloqueado"
                      class="badge-tag bg-secondary text-white ms-1" style="white-space:nowrap">🔒 Privado</span>
                <a v-else
                   :href="'https://drive.google.com/file/d/' + doc.id + '/view'"
                   target="_blank" class="btn btn-sm btn-success ms-1" style="border-radius:8px;font-size:.72rem;white-space:nowrap">
                  <i class="bi bi-file-earmark-pdf me-1"></i>PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Punto 6 -->
        <div class="col-12">
          <div class="card-solar" style="border-left:4px solid var(--solar-primary)">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="fw-bold rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style="width:32px;height:32px;background:var(--solar-primary);font-size:.9rem">6</span>
              <h5 class="fw-bold mb-0" style="color:var(--solar-primary)">Instalación fotovoltaica para autoconsumo particular de viviendas</h5>
            </div>
            <div class="d-flex flex-column gap-2">
              <div v-for="doc in punto6" :key="doc.nombre"
                   class="d-flex align-items-center justify-content-between p-2 rounded" style="background:#F8F9FA">
                <div class="d-flex align-items-center gap-2" style="min-width:0">
                  <i :class="'bi ' + doc.icono + ' flex-shrink-0'" :style="'color:' + doc.color"></i>
                  <span style="font-size:.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ doc.nombre }}</span>
                </div>
                <a :href="doc.url || 'https://drive.google.com/file/d/' + doc.id + '/view'"
                   target="_blank" class="btn btn-sm btn-success ms-1" style="border-radius:8px;font-size:.72rem;white-space:nowrap">
                  <i class="bi bi-file-earmark-pdf me-1"></i>PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Punto 7 -->
        <div class="col-12">
          <div class="card-solar" style="border-left:4px solid var(--solar-accent)">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="fw-bold rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style="width:32px;height:32px;background:var(--solar-accent);font-size:.9rem">7</span>
              <h5 class="fw-bold mb-0" style="color:var(--solar-accent)">Instalación de paneles solares para zonas comunes del edificio</h5>
            </div>
            <div class="d-flex flex-column gap-2">
              <div v-for="doc in punto7" :key="doc.nombre"
                   class="d-flex align-items-center justify-content-between p-2 rounded" style="background:#F8F9FA">
                <div class="d-flex align-items-center gap-2" style="min-width:0">
                  <i :class="'bi ' + doc.icono + ' flex-shrink-0'" :style="'color:' + doc.color"></i>
                  <span style="font-size:.82rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ doc.nombre }}</span>
                </div>
                <a :href="doc.url || 'https://drive.google.com/file/d/' + doc.id + '/view'"
                   target="_blank" class="btn btn-sm btn-success ms-1" style="border-radius:8px;font-size:.72rem;white-space:nowrap">
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
      videos: [
        { src: 'descifrando_la_garantia.mp4',           titulo: 'Descifrando la garantía'            },
        { src: 'garantia_y_placas_solares_espress.mp4', titulo: 'Garantía y placas solares (resumen)' },
        { src: 'proyecto_solar_bip_30.mp4',             titulo: 'Proyecto Solar BIP30'                },
      ],
      punto3: [
        { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Informe jurídico · Solar y garantía', id: '1l_6l_lqalUnTQ_UhVDv_KZNk87-8uZyc' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Informe instalación · Alromar',       id: '1mvh9u3N3c5FKkJCOily2h_G3ow1RKTXu'  },
        { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Contrato impermeabilización (2024)',   privado: true, id: '' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Acta final de obra (feb 2025)',        privado: true, id: '' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Burofax a Equipo Impe (may 2026)',     privado: true, id: '' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#7B1FA2', nombre: 'Correo presidente/admin (may 2026)',   privado: true, id: '' },
      ],
      punto6: [
        { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'FAQ · Preguntas Frecuentes',          id: '1xz1LsSzdkb9WJgKBOMoidf6ShI7EOqQD' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'E4e · Propuesta 213,70 kWp',          id: '1rjkpJLHUo3Mrxg-wib_0cKFVn2sRiECf' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presupuesto 147,5 kWp',         id: '1WTelF8Jp0-FegBVkgv1yrqLGa7Ge7BqR' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Presupuesto 130 kWp',       id: '1MGE6Wzhz-jEslSOp_eat18N8HIwthPo8' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Presupuesto 65 kWp',        id: '19S0V7lBE52lDo6GzmZy_KvkWIbHIiXvt' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 52,50 kWp',      id: '1w9fJi12ufT4l4bEE5pjwOCC871OefRp-' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 111,30 kWp',     id: '1rTg82vpa-6ECykOsDKALSW4WLATxlkRj' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 213,68 kWp',     id: '1hSJ-vmamHOEb6CE7l7GCuiywzbaEfGcM' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Informe técnico-jurídico',   id: '1JxTyFzw4rslDCmstQDJvPZfKQZv6bCLU' },
      ],
      punto7: [
        { icono: 'bi-file-earmark-pdf-fill', color: '#388E3C', nombre: 'FAQ · Preguntas Frecuentes',          id: '1xz1LsSzdkb9WJgKBOMoidf6ShI7EOqQD' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#e53935', nombre: 'CEC · Presupuesto 267 kWp',           id: '1ZtwQXTNysQxb6LD5XPDBVsI9E9YjhS4o' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Simulación 130 kWp',        id: '1sOAAWdXj4bYrvcAKBjErbe3_TA1Xq89t' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#1976D2', nombre: 'Alromar · Simulación 65 kWp',         id: '1BCqd7rsnFjnCOrcL9SgXD33F4x5fmpwT' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 111,30 kWp',     id: '1rTg82vpa-6ECykOsDKALSW4WLATxlkRj' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#F57F17', nombre: 'Besana · Presupuesto 213,68 kWp',     id: '1hSJ-vmamHOEb6CE7l7GCuiywzbaEfGcM' },
        { icono: 'bi-file-earmark-pdf-fill', color: '#c62828', nombre: 'BOAM · Plan Rehabilita 2026',         url: 'https://sede.madrid.es/csvfiles/UnidadesDescentralizadas/UDCBOAM/Contenidos/Boletin/2026/Junio/Ficheros%20PDF/BOAM_10138_01062026133552712.pdf' },
      ],
    }
  },
  methods: {
    async verificar() {
      this.cargando = true
      this.error    = false
      try {
        const key  = await _deriveKey(this.pwd)
        // Descifrar los 4 IDs privados — si la contraseña es incorrecta lanza excepción
        const ids  = await Promise.all(_enc.map(e => _decrypt(key, e)))
        // Asignar IDs descifrados a los documentos privados (índices 2-5 del punto3)
        const priv = this.punto3.filter(d => d.privado)
        priv.forEach((d, i) => { d.id = ids[i] })
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
