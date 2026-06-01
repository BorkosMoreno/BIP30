export default {
  name: 'Beneficios',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-lightning-fill"></i>Beneficios del autoconsumo colectivo</h2>

      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="stat-card">
            <span class="stat-icon">💡</span>
            <div class="stat-value" style="color:var(--solar-secondary)">-60%</div>
            <div class="stat-label">Reducción factura zonas comunes</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card">
            <span class="stat-icon">🌍</span>
            <div class="stat-value" style="color:var(--solar-accent)">8,4 T</div>
            <div class="stat-label">CO₂ evitado cada año</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card">
            <span class="stat-icon">📈</span>
            <div class="stat-value">+5%</div>
            <div class="stat-label">Valor del inmueble estimado</div>
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

      <div class="card-solar mt-0">
        <h5 class="section-title"><i class="bi bi-bar-chart-fill"></i>Ahorro estimado por concepto</h5>
        <div class="row g-3">
          <div v-for="item in ahorros" :key="item.concepto" class="col-md-4">
            <div class="p-3 rounded-3" style="background:#F8F9FA">
              <div class="d-flex justify-content-between mb-1" style="font-size:.85rem">
                <span class="fw-semibold">{{ item.concepto }}</span>
                <span class="text-success fw-bold">{{ item.ahorro }}</span>
              </div>
              <div class="progress" style="height:8px;border-radius:6px">
                <div class="progress-bar" :class="item.color" :style="'width:' + item.pct + '%'"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      economicos: [
        { emoji: '💡', bg: '#FFF9C4', title: 'Reducción de la factura eléctrica', desc: 'Las zonas comunes (ascensor, luces, garaje) se alimentarán directamente de la energía solar.' },
        { emoji: '🏦', bg: '#E8F5E9', title: 'Retorno de inversión en 6 años', desc: 'Con los precios actuales de la electricidad, el sistema se amortiza completamente en menos de 7 años.' },
        { emoji: '📊', bg: '#E3F2FD', title: 'Ingresos por excedentes', desc: 'La energía no consumida se vierte a red y genera compensación económica.' },
        { emoji: '🏠', bg: '#F3E5F5', title: 'Mayor valor del inmueble', desc: 'Los edificios con certificación energética alta tienen mayor valor en el mercado.' },
      ],
      medioambientales: [
        { emoji: '🌱', bg: '#E8F5E9', title: 'Reducción huella de carbono', desc: 'Cada kWh solar evita la emisión de ~0,25 kg de CO₂ a la atmósfera.' },
        { emoji: '☀️', bg: '#FFF9C4', title: 'Energía renovable 100%', desc: 'El sol proporciona energía limpia e inagotable durante la vida útil de las placas (25+ años).' },
        { emoji: '♻️', bg: '#E0F7FA', title: 'Economía circular', desc: 'Los paneles son reciclables en un 95% al final de su vida útil.' },
        { emoji: '🌡️', bg: '#FCE4EC', title: 'Menos dependencia de combustibles fósiles', desc: 'Contribuimos a la transición energética local.' },
      ],
      ahorros: [
        { concepto: 'Ascensor y luces',  ahorro: '~480 €/año', pct: 80, color: 'bg-warning' },
        { concepto: 'Garaje y accesos',  ahorro: '~360 €/año', pct: 60, color: 'bg-success' },
        { concepto: 'Cuarto contadores', ahorro: '~120 €/año', pct: 20, color: 'bg-info'    },
      ],
    }
  },
}
