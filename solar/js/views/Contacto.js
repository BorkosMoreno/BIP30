export default {
  name: 'Contacto',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-ballot-fill"></i>Contacto y votación</h2>

      <div class="row g-3">
        <!-- Formulario -->
        <div class="col-md-7">
          <div class="card-solar">
            <h5 class="fw-bold mb-1" style="color:var(--solar-primary)">Registra tu apoyo al proyecto</h5>
            <p class="text-muted mb-3" style="font-size:.87rem">Tu participación es fundamental para llegar al quórum necesario.</p>

            <div v-if="enviado" class="alert alert-success d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill fs-5"></i>
              <div><strong>¡Gracias, {{ form.nombre }}!</strong> Hemos registrado tu participación. Te contactaremos próximamente.</div>
            </div>

            <form v-else @submit.prevent="enviar">
              <div class="row g-3">
                <div class="col-sm-6">
                  <label class="form-label fw-semibold" style="font-size:.85rem">Nombre y apellidos *</label>
                  <input v-model="form.nombre" type="text" class="form-control" placeholder="Ej. Ana García López" required />
                </div>
                <div class="col-sm-6">
                  <label class="form-label fw-semibold" style="font-size:.85rem">Número de piso/puerta *</label>
                  <input v-model="form.piso" type="text" class="form-control" placeholder="Ej. 3ºB" required />
                </div>
                <div class="col-sm-6">
                  <label class="form-label fw-semibold" style="font-size:.85rem">Email</label>
                  <input v-model="form.email" type="email" class="form-control" placeholder="tucorreo@ejemplo.com" />
                </div>
                <div class="col-sm-6">
                  <label class="form-label fw-semibold" style="font-size:.85rem">Teléfono</label>
                  <input v-model="form.telefono" type="tel" class="form-control" placeholder="612 345 678" />
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" style="font-size:.85rem">¿Cuál es tu postura? *</label>
                  <div class="d-flex gap-2 flex-wrap">
                    <label v-for="op in opciones" :key="op.valor"
                           class="d-flex align-items-center gap-2 p-2 rounded border"
                           :class="form.voto === op.valor ? 'border-primary bg-primary bg-opacity-10' : 'border-light'"
                           style="cursor:pointer;flex:1;min-width:120px">
                      <input type="radio" v-model="form.voto" :value="op.valor" class="form-check-input" required />
                      <span style="font-size:.84rem">{{ op.emoji }} {{ op.label }}</span>
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" style="font-size:.85rem">Comentarios o preguntas</label>
                  <textarea v-model="form.comentario" class="form-control" rows="3" placeholder="¿Tienes alguna duda o sugerencia?"></textarea>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="privacidad" v-model="form.privacidad" required />
                    <label class="form-check-label text-muted" for="privacidad" style="font-size:.8rem">
                      Acepto que mis datos se usen exclusivamente para la gestión de este proyecto de la comunidad.
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary fw-bold w-100">
                    <i class="bi bi-send-fill me-1"></i>Enviar mi participación
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Info derecha -->
        <div class="col-md-5">
          <div class="card-solar mb-3">
            <h5 class="fw-bold mb-3" style="color:var(--solar-primary)">
              <i class="bi bi-people-fill me-2"></i>Comisión de seguimiento
            </h5>
            <div v-for="p in comision" :key="p.nombre" class="d-flex align-items-center gap-3 mb-3">
              <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                   :style="'width:42px;height:42px;background:' + p.color + ';flex-shrink:0;font-size:.85rem'">
                {{ p.iniciales }}
              </div>
              <div>
                <div class="fw-semibold" style="font-size:.88rem">{{ p.nombre }}</div>
                <div class="text-muted" style="font-size:.78rem">{{ p.rol }}</div>
                <div style="font-size:.78rem;color:var(--solar-primary)">{{ p.piso }}</div>
              </div>
            </div>
          </div>

          <div class="card-solar" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9)">
            <h6 class="fw-bold mb-3" style="color:#1B5E20">
              <i class="bi bi-bar-chart-fill me-2"></i>Resultado actual
            </h6>
            <div v-for="r in resultados" :key="r.label" class="mb-2">
              <div class="d-flex justify-content-between mb-1" style="font-size:.82rem">
                <span>{{ r.emoji }} {{ r.label }}</span>
                <span class="fw-bold">{{ r.n }} vecinos</span>
              </div>
              <div class="progress" style="height:8px;border-radius:6px">
                <div class="progress-bar" :class="r.color" :style="'width:' + r.pct + '%'"></div>
              </div>
            </div>
            <div class="text-muted mt-2" style="font-size:.76rem">Total de respuestas: 39 de 48 propietarios</div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      enviado: false,
      form: { nombre: '', piso: '', email: '', telefono: '', voto: '', comentario: '', privacidad: false },
      opciones: [
        { valor: 'afavor',      emoji: '👍', label: 'A favor'           },
        { valor: 'mas_info',    emoji: '🤔', label: 'Necesito más info' },
        { valor: 'en_contra',   emoji: '👎', label: 'En contra'         },
      ],
      comision: [
        { iniciales: 'MR', nombre: 'María Rodríguez', rol: 'Presidenta de comunidad', piso: '1ºA', color: '#1565C0' },
        { iniciales: 'JM', nombre: 'José Martínez',   rol: 'Vocal técnico',           piso: '4ºC', color: '#2E7D32' },
        { iniciales: 'LP', nombre: 'Laura Pérez',     rol: 'Secretaria',              piso: '2ºB', color: '#7B1FA2' },
      ],
      resultados: [
        { emoji: '👍', label: 'A favor',          n: 34, pct: 71, color: 'bg-success' },
        { emoji: '🤔', label: 'Necesita más info', n:  5, pct: 10, color: 'bg-warning' },
        { emoji: '👎', label: 'En contra',         n:  0, pct:  0, color: 'bg-danger'  },
      ],
    }
  },
  methods: {
    enviar() {
      this.enviado = true
    },
  },
}
