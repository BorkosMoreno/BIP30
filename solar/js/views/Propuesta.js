export default {
  name: 'Propuesta',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-clipboard2-check-fill"></i>Nuestra propuesta técnica</h2>

      <div class="row g-3 mb-4">
        <div class="col-md-8">
          <div class="card-solar">
            <h5 class="fw-bold mb-3" style="color:var(--solar-primary)">Especificaciones del sistema</h5>
            <table class="table table-sm">
              <tbody>
                <tr v-for="s in specs" :key="s.campo">
                  <td class="text-muted fw-semibold" style="width:50%">{{ s.campo }}</td>
                  <td class="fw-bold">{{ s.valor }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card-solar" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB)">
            <h6 class="fw-bold mb-3" style="color:var(--solar-primary)">Coste por vivienda</h6>
            <div class="mb-3">
              <div class="text-muted" style="font-size:.8rem">Inversión inicial</div>
              <div style="font-size:1.7rem;font-weight:800;color:var(--solar-primary)">1.850 €</div>
              <div class="text-muted" style="font-size:.75rem">pago único o financiado</div>
            </div>
            <div class="mb-3">
              <div class="text-muted" style="font-size:.8rem">Ahorro anual estimado</div>
              <div style="font-size:1.3rem;font-weight:700;color:var(--solar-accent)">1.200 €</div>
            </div>
            <hr/>
            <div class="text-muted" style="font-size:.8rem">Retorno de inversión</div>
            <div style="font-size:1rem;font-weight:700">≈ 6 años</div>
          </div>
        </div>
      </div>

      <!-- Comparativa -->
      <div class="card-solar mb-4">
        <h5 class="section-title"><i class="bi bi-building-fill"></i>Comparativa de instaladores</h5>
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Empresa</th>
                <th>Potencia</th>
                <th>Garantía</th>
                <th>Total</th>
                <th>Por vivienda</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in presupuestos" :key="p.empresa">
                <td class="fw-semibold">{{ p.empresa }}</td>
                <td>{{ p.potencia }}</td>
                <td>{{ p.garantia }}</td>
                <td>{{ p.total }}</td>
                <td>{{ p.vivienda }}</td>
                <td><span class="badge-tag" :class="p.badge">{{ p.estado }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-muted mb-0" style="font-size:.8rem"><i class="bi bi-info-circle me-1"></i>Calculado sobre 48 viviendas con reparto por cuota de participación.</p>
      </div>

      <!-- Timeline -->
      <div class="card-solar">
        <h5 class="section-title"><i class="bi bi-calendar3"></i>Plan de ejecución</h5>
        <div v-for="(fase, i) in fases" :key="i" class="timeline-item">
          <div class="timeline-dot" :style="'background:' + fase.bg + ';color:' + fase.color">{{ i + 1 }}</div>
          <div>
            <div class="fw-semibold">{{ fase.titulo }}</div>
            <div class="text-muted" style="font-size:.83rem">{{ fase.desc }}</div>
            <div class="mt-1">
              <span class="badge-tag" :class="fase.badge">{{ fase.estado }}</span>
              <span class="text-muted ms-2" style="font-size:.78rem">{{ fase.fecha }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      specs: [
        { campo: 'Tipo de sistema',          valor: 'Fotovoltaico autoconsumo colectivo' },
        { campo: 'Potencia instalada',        valor: '24 kWp' },
        { campo: 'Número de paneles',         valor: '48 paneles (500 W cada uno)' },
        { campo: 'Superficie necesaria',      valor: '~90 m² cubierta plana' },
        { campo: 'Producción anual estimada', valor: '33.600 kWh/año' },
        { campo: 'Tipo de inversores',        valor: 'String + microinversores (híbrido)' },
        { campo: 'Vida útil garantizada',     valor: '25 años (30% pérdida máx.)' },
        { campo: 'Modalidad',                 valor: 'Vertido cero + compensación excedentes' },
      ],
      presupuestos: [
        { empresa: 'SolarTech Ibérica',  potencia: '24 kWp', garantia: '25 años', total: '86.400 €', vivienda: '1.800 €', estado: 'Recomendado', badge: 'bg-success text-white'  },
        { empresa: 'EnerSol Andalucía',  potencia: '22 kWp', garantia: '20 años', total: '92.000 €', vivienda: '1.917 €', estado: 'Valorando',   badge: 'bg-warning text-dark'  },
        { empresa: 'PhotoVerde SL',      potencia: '24 kWp', garantia: '25 años', total: '98.500 €', vivienda: '2.052 €', estado: 'Descartado',  badge: 'bg-secondary text-white' },
      ],
      fases: [
        { titulo: 'Consulta y votación vecinal',        desc: 'Recogida de apoyos y junta extraordinaria.',                         estado: 'En curso',  fecha: 'Junio 2025',      bg: '#FFF9C4', color: '#E65100', badge: 'bg-warning text-dark'   },
        { titulo: 'Contratación del instalador',        desc: 'Firma de contrato y tramitación de subvenciones.',                   estado: 'Pendiente', fecha: 'Julio 2025',      bg: '#E3F2FD', color: '#1565C0', badge: 'bg-info text-dark'      },
        { titulo: 'Instalación',                        desc: 'Montaje de paneles, cableado e inversores. Duración: 2 semanas.',    estado: 'Pendiente', fecha: 'Agosto 2025',     bg: '#E8F5E9', color: '#2E7D32', badge: 'bg-secondary text-white' },
        { titulo: 'Puesta en marcha y legalización',    desc: 'Tramitación con la distribuidora y activación del sistema.',        estado: 'Pendiente', fecha: 'Septiembre 2025', bg: '#E8F5E9', color: '#2E7D32', badge: 'bg-secondary text-white' },
      ],
    }
  },
}
