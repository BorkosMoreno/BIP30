export default {
  name: 'Propuesta',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-clipboard2-check-fill"></i>Propuestas de instalación</h2>

      <!-- Tabs tipo proyecto -->
      <div class="d-flex gap-2 mb-4 flex-wrap">
        <button @click="tipo='vecinos'" class="btn btn-sm fw-bold"
          :class="tipo==='vecinos' ? 'btn-primary' : 'btn-outline-primary'">
          <i class="bi bi-person-fill me-1"></i>Para vecinos interesados
          <span class="badge bg-warning text-dark ms-1">Punto 6 de la junta</span>
        </button>
        <button @click="tipo='comunes'" class="btn btn-sm fw-bold"
          :class="tipo==='comunes' ? 'btn-success' : 'btn-outline-success'">
          <i class="bi bi-building-fill me-1"></i>Zonas comunes del edificio
          <span class="badge bg-success text-white ms-1">Punto 7 de la junta</span>
        </button>
      </div>

      <!-- === VECINOS INTERESADOS === -->
      <div v-if="tipo==='vecinos'">
        <div class="card-solar mb-3" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB)">
          <h6 class="fw-bold mb-2" style="color:var(--solar-primary)"><i class="bi bi-info-circle-fill me-2"></i>¿En qué consiste?</h6>
          <p style="font-size:.88rem;margin:0">Cada vecino que quiera participar contrata una parte proporcional de la instalación fotovoltaica en la cubierta. La energía generada se descuenta directamente de su factura eléctrica. <strong>No es obligatorio para nadie.</strong> Cuantos más vecinos participen, mayor capacidad de instalación y menor coste por kWp.</p>
        </div>

        <!-- Comparativa presupuestos vecinos -->
        <div class="card-solar mb-4">
          <h5 class="section-title"><i class="bi bi-building-fill"></i>Comparativa de presupuestos recibidos</h5>
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>Empresa</th>
                  <th>Potencia</th>
                  <th>Total c/IVA</th>
                  <th>Por vecino (1 kWp)</th>
                  <th>Ahorro est./año</th>
                  <th>Amortización</th>
                  <th>Modelo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in presupuestosVecinos" :key="p.empresa">
                  <td class="fw-semibold">{{ p.empresa }}</td>
                  <td>{{ p.potencia }}</td>
                  <td>{{ p.total }}</td>
                  <td class="fw-bold">{{ p.porVecino }}</td>
                  <td class="text-success fw-bold">{{ p.ahorro }}</td>
                  <td>{{ p.amortizacion }}</td>
                  <td><span class="badge-tag" :class="p.badge">{{ p.modelo }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-muted mb-0" style="font-size:.8rem"><i class="bi bi-info-circle me-1"></i>Ahorro estimado según cálculos del FAQ vecinal y simulaciones de las propias instaladoras. Se añaden bonificación IBI (~200 €) y deducción IRPF (~200 €) el primer año.</p>
        </div>

        <!-- Ejemplo cálculo 1 kWp -->
        <div class="card-solar mb-4" style="background:linear-gradient(135deg,#FFF8E1,#FFF3CD)">
          <h5 class="fw-bold mb-3" style="color:#E65100"><i class="bi bi-calculator-fill me-2"></i>Ejemplo: inversión de 1 kWp (~1.000 €)</h5>
          <div class="row g-3">
            <div v-for="yr in ejemploAnual" :key="yr.año" class="col-md-3">
              <div class="text-center p-3 rounded-3" style="background:rgba(255,255,255,.7)">
                <div class="fw-bold" style="color:#E65100">{{ yr.año }}</div>
                <div style="font-size:1.2rem;font-weight:800;color:var(--solar-primary)">{{ yr.ahorro }}</div>
                <div class="text-muted" style="font-size:.75rem">{{ yr.detalle }}</div>
              </div>
            </div>
          </div>
          <div class="mt-3 p-2 rounded text-center" style="background:rgba(255,255,255,.7)">
            <span class="fw-bold" style="color:var(--solar-accent)">✅ En los primeros 2 años se recupera íntegramente la inversión de ~1.000 €</span>
            <span class="text-muted ms-2" style="font-size:.82rem">(incluyendo ayudas IBI + IRPF)</span>
          </div>
        </div>

        <!-- Ayudas fiscales -->
        <div class="card-solar">
          <h5 class="section-title"><i class="bi bi-piggy-bank-fill"></i>Ayudas y deducciones fiscales disponibles en 2026</h5>
          <div class="row g-3">
            <div v-for="a in ayudas" :key="a.nombre" class="col-md-4">
              <div class="p-3 rounded-3 h-100" :style="'background:' + a.bg">
                <div style="font-size:1.5rem">{{ a.emoji }}</div>
                <div class="fw-bold mt-1">{{ a.nombre }}</div>
                <div style="font-size:.83rem;color:#555" class="mt-1">{{ a.desc }}</div>
                <div class="fw-bold mt-2" :style="'color:' + a.color">{{ a.valor }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- === ZONAS COMUNES === -->
      <div v-if="tipo==='comunes'">
        <div class="card-solar mb-3" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9)">
          <h6 class="fw-bold mb-2" style="color:#1B5E20"><i class="bi bi-info-circle-fill me-2"></i>¿En qué consiste?</h6>
          <p style="font-size:.88rem;margin:0">La comunidad instala paneles solares para alimentar los consumos comunes del edificio: iluminación de portales, ascensores, garaje, cuarto de contadores... <strong>Todos los propietarios participan</strong> a través de la cuota de comunidad y todos se benefician de la reducción de gastos comunes.</p>
        </div>

        <div class="card-solar mb-4">
          <h5 class="section-title"><i class="bi bi-building-fill"></i>Presupuestos para zonas comunes</h5>
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>Empresa</th>
                  <th>Potencia ZZCC</th>
                  <th>Coste total</th>
                  <th>Por propietario</th>
                  <th>Ahorro anual comunidad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in presupuestosComunes" :key="p.empresa">
                  <td class="fw-semibold">{{ p.empresa }}</td>
                  <td>{{ p.potencia }}</td>
                  <td>{{ p.total }}</td>
                  <td class="fw-bold">{{ p.porPropietario }}</td>
                  <td class="text-success fw-bold">{{ p.ahorro }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card-solar">
          <h5 class="section-title"><i class="bi bi-lightning-charge-fill"></i>Consumos de zonas comunes que se cubren</h5>
          <div class="row g-3">
            <div v-for="c in consumos" :key="c.tipo" class="col-md-4">
              <div class="d-flex align-items-center gap-3 p-3 rounded-3" style="background:#F8F9FA">
                <span style="font-size:1.8rem">{{ c.emoji }}</span>
                <div>
                  <div class="fw-semibold">{{ c.tipo }}</div>
                  <div class="text-muted" style="font-size:.8rem">{{ c.desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  data() {
    return {
      tipo: 'vecinos',
      presupuestosVecinos: [
        { empresa: 'E4e (Efficiency for Energy)', potencia: '213,70 kWp', total: '233.634 €', porVecino: '1.093 €/kWp', ahorro: '214 €/año', amortizacion: '4,6 años', modelo: 'Pago directo', badge: 'bg-primary text-white' },
        { empresa: 'CEC Energía y Edificación',   potencia: '147,50 kWp', total: '184.332 €', porVecino: '~1.250 €/kWp', ahorro: '214 €/año', amortizacion: '0 € inicial', modelo: 'Sin desembolso', badge: 'bg-success text-white' },
        { empresa: 'Alromar (130 kWp)',            potencia: '130 kWp',    total: '93.209 €',  porVecino: '~717 €/kWp',  ahorro: '214 €/año', amortizacion: '5 años', modelo: 'Pago directo', badge: 'bg-info text-dark' },
        { empresa: 'Alromar (65 kWp)',             potencia: '65 kWp',     total: '48.766 €',  porVecino: '~750 €/kWp',  ahorro: '214 €/año', amortizacion: '6 años', modelo: 'Pago directo', badge: 'bg-info text-dark' },
        { empresa: 'Besana (50 vecinos)',           potencia: '52,50 kWp',  total: '53.566 €',  porVecino: '~1.071 €/kWp', ahorro: '223 €/año', amortizacion: '3 años',badge: 'bg-warning text-dark', modelo: 'Llave en mano' },
        { empresa: 'Besana (111 kWp)',              potencia: '111,30 kWp', total: '106.916 €', porVecino: '~1.818 €',     ahorro: '321 €/año', amortizacion: '3 años', badge: 'bg-warning text-dark', modelo: 'Llave en mano' },
        { empresa: 'Besana (213 kWp)',              potencia: '213,68 kWp', total: '189.516 €', porVecino: '~1.395 €',     ahorro: '286 €/año', amortizacion: '2 años', badge: 'bg-warning text-dark', modelo: 'Llave en mano' },
      ],
      presupuestosComunes: [
        { empresa: 'E4e',    potencia: '14,25 kWp', total: '15.579 €',  porPropietario: '~118 €', ahorro: '~2.977 €/año' },
        { empresa: 'Besana', potencia: '~15 kWp',   total: '15.161 €',  porPropietario: '121 €',  ahorro: '~2.500 €/año' },
        { empresa: 'Besana (111 kWp)', potencia: 'incluye ZZCC', total: '16.037 €', porPropietario: '128 €', ahorro: '~2.800 €/año' },
      ],
      consumos: [
        { emoji: '🛗', tipo: 'Ascensores',            desc: 'Mayor consumo de zonas comunes' },
        { emoji: '💡', tipo: 'Iluminación portales',  desc: 'Luces escaleras y entradas' },
        { emoji: '🅿️', tipo: 'Garaje',               desc: 'Iluminación y ventilación' },
        { emoji: '⚙️', tipo: 'Cuarto de contadores',  desc: 'Equipos técnicos y bombas' },
        { emoji: '🌳', tipo: 'Zonas ajardinadas',     desc: 'Riego y alumbrado exterior' },
        { emoji: '📡', tipo: 'Telecomunicaciones',    desc: 'Antenas y equipos comunes' },
      ],
      ejemploAnual: [
        { año: '2027', ahorro: '614,25 €', detalle: '214€ factura + 200€ IBI + 200€ IRPF' },
        { año: '2028', ahorro: '414,25 €', detalle: '214€ factura + 200€ IBI' },
        { año: '2029', ahorro: '414,25 €', detalle: '214€ factura + 200€ IBI' },
        { año: '2030+', ahorro: '214,25 €', detalle: 'Solo ahorro en factura (25 años)' },
      ],
      ayudas: [
        { emoji: '🏠', nombre: 'Bonificación IBI', desc: '50% del IBI durante 5 años por instalación de energía renovable en Madrid', valor: '~200 €/año durante 5 años', bg: '#E3F2FD', color: '#1565C0' },
        { emoji: '📋', nombre: 'Deducción IRPF',   desc: '20% de la inversión en la declaración de la renta por mejora eficiencia energética', valor: '~200 € el primer año', bg: '#E8F5E9', color: '#2E7D32' },
        { emoji: '💳', nombre: 'Financiación CEC', desc: 'CEC ofrece financiar el 100% con los propios ahorros generados, sin desembolso inicial', valor: '0 € inversión inicial', bg: '#FFF9C4', color: '#E65100' },
      ],
    }
  },
}
