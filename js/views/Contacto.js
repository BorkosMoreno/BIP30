export default {
  name: 'Contacto',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-calendar2-check-fill"></i>La Junta · 4 de junio de 2026</h2>

      <!-- Banner junta -->
      <div class="hero-banner mb-4">
        <h1 style="font-size:1.5rem"><i class="bi bi-calendar-event-fill me-2" style="color:var(--solar-secondary)"></i>Junta General Ordinaria</h1>
        <p class="mb-2">La propuesta solar está formalmente incluida en el orden del día. <strong>Tu asistencia o tu voto delegado son fundamentales.</strong></p>
        <div class="d-flex gap-3 flex-wrap" style="font-size:.88rem">
          <span><i class="bi bi-clock-fill me-1" style="color:var(--solar-secondary)"></i>19:00h (1ª conv.) · 19:30h (2ª conv.)</span>
          <span><i class="bi bi-geo-alt-fill me-1" style="color:var(--solar-secondary)"></i>Patio comunidad · Portales I-H</span>
          <span><i class="bi bi-building me-1" style="color:var(--solar-secondary)"></i>Bulevar Indalecio Prieto 30 · Madrid</span>
        </div>
      </div>

      <div class="row g-3 mb-4">
        <!-- Puntos del orden del día -->
        <div class="col-md-7">
          <div class="card-solar">
            <h5 class="section-title"><i class="bi bi-list-ol"></i>Puntos del orden del día (solar)</h5>

            <!-- Punto 5 -->
            <div class="p-3 rounded-3 mb-3" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB)">
              <div class="d-flex align-items-start gap-2">
                <span class="fw-bold rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                      style="width:28px;height:28px;background:var(--solar-primary);font-size:.85rem">5</span>
                <div>
                  <div class="fw-bold" style="color:var(--solar-primary)">Autoconsumo particular de viviendas</div>
                  <div style="font-size:.83rem;color:#555;margin-top:.3rem">Información sobre los proyectos para la instalación de sistemas fotovoltaicos destinados al <strong>autoconsumo particular</strong> de las viviendas que así lo deseen.</div>
                  <div class="mt-2 d-flex gap-2 flex-wrap align-items-center">
                    <span class="badge-tag bg-primary text-white">Solo vecinos interesados</span>
                    <span class="p-1 px-2 rounded" style="background:rgba(21,101,192,.15);font-size:.76rem;color:var(--solar-primary)">
                      <i class="bi bi-info-circle me-1"></i>Requiere <strong>1/3</strong> de votos (asistentes + delegados)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Punto 6 -->
            <div class="p-3 rounded-3" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9)">
              <div class="d-flex align-items-start gap-2">
                <span class="fw-bold rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                      style="width:28px;height:28px;background:#2E7D32;font-size:.85rem">6</span>
                <div>
                  <div class="fw-bold" style="color:#1B5E20">Paneles solares para zonas comunes</div>
                  <div style="font-size:.83rem;color:#555;margin-top:.3rem">Deliberación y <strong>acuerdos</strong> sobre la instalación de paneles para el suministro eléctrico de las <strong>zonas comunes</strong> del edificio (portales, ascensores, garaje, etc.).</div>
                  <div class="mt-2 d-flex gap-2 flex-wrap align-items-center">
                    <span class="badge-tag bg-success text-white">Toda la comunidad · Vinculante</span>
                    <span class="p-1 px-2 rounded" style="background:rgba(46,125,50,.15);font-size:.76rem;color:#2E7D32">
                      <i class="bi bi-info-circle me-1"></i>Requiere <strong>mayoría simple (50%+1)</strong> de votos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cómo participar -->
        <div class="col-md-5">
          <div class="card-solar h-100">
            <h5 class="section-title"><i class="bi bi-person-check-fill"></i>¿Cómo participar?</h5>

            <div class="p-3 rounded-3 mb-3" style="background:#F0F7FF">
              <div class="d-flex align-items-start gap-3">
                <span style="font-size:1.8rem">🏃</span>
                <div>
                  <div class="fw-bold">Asiste a la junta</div>
                  <div style="font-size:.82rem;color:#555;margin-top:.2rem">La mejor forma de participar. Podrás votar y conocer de primera mano todos los detalles.</div>
                  <div class="mt-2 p-2 rounded" style="background:#1565C0;color:#fff;font-size:.8rem">
                    <strong>📅 4 de junio · 19:00h</strong><br/>Patio comunidad · Portales I-H
                  </div>
                </div>
              </div>
            </div>

            <div class="p-3 rounded-3" style="background:#FFF8E1">
              <div class="d-flex align-items-start gap-3">
                <span style="font-size:1.8rem">📝</span>
                <div>
                  <div class="fw-bold">¿No puedes asistir? Delega tu voto</div>
                  <div style="font-size:.82rem;color:#555;margin-top:.2rem">Según el <strong>Art. 15.1 LPH</strong>, puedes autorizar a otro propietario para que te represente.</div>
                  <div class="mt-2 p-2 rounded" style="background:rgba(0,0,0,.06);font-size:.78rem">
                    <strong>Modelo de delegación:</strong><br/>
                    <em>"Don/Dña. [nombre], propietario/a del piso [X], autorizo a [nombre], propietario/a del piso [Y], para que me represente en la Junta del 4 de junio de 2026."</em><br/>
                    <span style="color:#888;margin-top:.3rem;display:block">Firma, DNI y fecha. Entrégalo antes de la junta.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resultado consulta vecinal -->
      <div class="card-solar">
        <h5 class="section-title"><i class="bi bi-bar-chart-fill"></i>Resultado de la consulta vecinal previa</h5>
        <div class="row g-3 align-items-center">
          <div class="col-md-5">
            <div v-for="r in resultados" :key="r.label" class="mb-3">
              <div class="d-flex justify-content-between mb-1" style="font-size:.85rem">
                <span class="fw-semibold">{{ r.emoji }} {{ r.label }}</span>
                <span class="fw-bold">{{ r.n }} vecinos</span>
              </div>
              <div class="progress" style="height:10px;border-radius:6px">
                <div class="progress-bar" :class="r.color" :style="'width:' + r.pct + '%'"></div>
              </div>
            </div>
            <div class="text-muted" style="font-size:.78rem">Consulta informal previa a 79 de 132 propietarios</div>
          </div>
          <div class="col-md-4">
            <div class="text-center p-3 rounded-3 h-100" style="background:#E8F5E9">
              <div style="font-size:2.5rem;font-weight:800;color:var(--solar-accent)">50</div>
              <div class="fw-bold" style="color:var(--solar-accent)">Vecinos a favor</div>
              <div class="text-muted mt-1" style="font-size:.8rem">De 79 vecinos consultados hasta la fecha</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="p-3 rounded-3" style="background:#FFF3E0">
              <div class="fw-bold mb-2" style="color:#E65100;font-size:.88rem">
                <i class="bi bi-exclamation-triangle-fill me-1"></i>Tema a debatir: garantía cubierta
              </div>
              <div style="font-size:.8rem;color:#555">El administrador alertó de posible pérdida de garantía. Los promotores enviaron un <strong>burofax a Equipo Impe</strong> argumentando que el sistema de lastre no perfora la membrana. <strong>Sin respuesta tras 45 días.</strong> Se exigirá el contrato completo en la junta.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      resultados: [
        { emoji: '👍', label: 'A favor',           n: 50, pct: 63, color: 'bg-success' },
        { emoji: '⏳', label: 'Pendiente decidir',  n: 10, pct: 13, color: 'bg-warning' },
        { emoji: '👎', label: 'En contra',          n: 19, pct: 24, color: 'bg-danger'  },
      ],
    }
  },
}
