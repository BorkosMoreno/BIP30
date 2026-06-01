export default {
  name: 'Beneficios',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-lightning-fill"></i>Beneficios del autoconsumo colectivo</h2>

      <div class="row g-3 mb-4">
        <div class="col-md-3 col-6">
          <div class="stat-card">
            <span class="stat-icon">💡</span>
            <div class="stat-value" style="color:var(--solar-secondary)">-30/40%</div>
            <div class="stat-label">Reducción factura eléctrica estimada</div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="stat-card">
            <span class="stat-icon">💶</span>
            <div class="stat-value">614 €</div>
            <div class="stat-label">Ahorro total 1er año (1 kWp con ayudas)</div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="stat-card">
            <span class="stat-icon">🌍</span>
            <div class="stat-value" style="color:var(--solar-accent)">97 T</div>
            <div class="stat-label">CO₂ evitado / año (instalación máxima)</div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="stat-card">
            <span class="stat-icon">📈</span>
            <div class="stat-value">22%</div>
            <div class="stat-label">TIR de la inversión (según E4e)</div>
          </div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-md-6">
          <div class="card-solar">
            <h5 class="section-title"><i class="bi bi-piggy-bank-fill"></i>Beneficios económicos</h5>
            <div v-for="b in economicos" :key="b.title" class="benefit-item">
              <div class="benefit-icon" :style="'background:' + b.bg">{{ b.emoji }}</div>
              <div>
                <div class="fw-semibold">{{ b.title }}</div>
                <div class="text-muted" style="font-size:.84rem">{{ b.desc }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card-solar">
            <h5 class="section-title" style="color:var(--solar-accent)"><i class="bi bi-tree-fill"></i>Beneficios medioambientales</h5>
            <div v-for="b in medioambientales" :key="b.title" class="benefit-item">
              <div class="benefit-icon" :style="'background:' + b.bg">{{ b.emoji }}</div>
              <div>
                <div class="fw-semibold">{{ b.title }}</div>
                <div class="text-muted" style="font-size:.84rem">{{ b.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cuadro resumen ahorro real -->
      <div class="card-solar mt-0">
        <h5 class="section-title"><i class="bi bi-bar-chart-fill"></i>Ahorro estimado según Besana (datos reales por escenario)</h5>
        <div class="row g-3">
          <div v-for="esc in escenarios" :key="esc.nombre" class="col-md-4">
            <div class="p-3 rounded-3 h-100" :style="'background:' + esc.bg">
              <div class="fw-bold mb-1">{{ esc.nombre }}</div>
              <div style="font-size:.8rem;color:#555" class="mb-2">{{ esc.desc }}</div>
              <div class="d-flex justify-content-between mb-1" style="font-size:.83rem">
                <span>Autoconsumo</span><span class="fw-bold text-success">{{ esc.autoconsumo }}</span>
              </div>
              <div class="d-flex justify-content-between mb-1" style="font-size:.83rem">
                <span>Excedentes</span><span class="fw-bold text-info">{{ esc.excedentes }}</span>
              </div>
              <div class="d-flex justify-content-between" style="font-size:.88rem">
                <span class="fw-bold">Total / vecino / año</span><span class="fw-bold text-success fs-6">{{ esc.total }}</span>
              </div>
              <div class="progress mt-2" style="height:6px;border-radius:6px">
                <div class="progress-bar bg-warning" :style="'width:' + esc.pct + '%'"></div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-muted mt-2 mb-0" style="font-size:.78rem">
          <i class="bi bi-info-circle me-1"></i>Datos extraídos de los presupuestos de Besana para BIP30. Adicionalmente, bonificación IBI ~200 €/año durante 5 años.
        </p>
      </div>
    </div>
  `,
  data() {
    return {
      economicos: [
        { emoji: '💡', bg: '#FFF9C4', title: 'Ahorro directo en factura eléctrica',   desc: '~214 €/año por cada kWp contratado. La energía solar se descuenta directamente del consumo.' },
        { emoji: '🏦', bg: '#E8F5E9', title: 'Recuperación de inversión en 2-6 años',  desc: 'Con ayudas fiscales (IBI + IRPF), la inversión se recupera en los primeros 2 años. Sin ayudas: 4-6 años.' },
        { emoji: '📊', bg: '#E3F2FD', title: 'TIR del 22% (según E4e)',               desc: 'Tasa interna de retorno muy superior a cualquier producto financiero tradicional.' },
        { emoji: '🏠', bg: '#F3E5F5', title: 'Mayor valor del inmueble',              desc: 'Los edificios con certificación energética alta tienen mayor valor de tasación.' },
      ],
      medioambientales: [
        { emoji: '🌱', bg: '#E8F5E9', title: 'Hasta 97,5 T CO₂ evitadas al año',      desc: 'Equivalente a plantar 4.479 árboles según simulación CEC con 267 kWp.' },
        { emoji: '☀️', bg: '#FFF9C4', title: 'Energía 100% renovable',                desc: '368 MWh anuales generados (escenario máximo CEC), energía limpia durante 25+ años.' },
        { emoji: '♻️', bg: '#E0F7FA', title: 'Paneles reciclables en un 95%',         desc: 'Los módulos Longi LR5 usados por Besana tienen garantía de potencia de 25 años.' },
        { emoji: '🔋', bg: '#FCE4EC', title: 'Independencia energética parcial',      desc: '80% de la energía generada se autoconsume directamente en el propio edificio.' },
      ],
      escenarios: [
        { nombre: '50 vecinos (52,5 kWp)', desc: 'Besana · Solo vecinos interesados', autoconsumo: '196 €/año', excedentes: '27 €/año', total: '223 €/año', pct: 55, bg: '#FFF8E1' },
        { nombre: '125 vecinos (213 kWp)', desc: 'Besana · Escenario alto participación', autoconsumo: '218 €/año', excedentes: '68 €/año', total: '286 €/año', pct: 70, bg: '#E8F5E9' },
        { nombre: '50 vecinos + ZZCC (111 kWp)', desc: 'Besana · Vecinos + zonas comunes', autoconsumo: '227 €/año', excedentes: '94 €/año', total: '321 €/año', pct: 80, bg: '#E3F2FD' },
      ],
    }
  },
}
