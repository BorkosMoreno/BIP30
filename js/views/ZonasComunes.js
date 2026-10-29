export default {
  name: 'ZonasComunes',
  template: `
    <div>
      <div class="detail-hero detail-hero-green"><span class="eyebrow">OPCIÓN COLECTIVA</span><h1>Proyecto solar para zonas comunes</h1><p>Una instalación comunitaria podría producir parte de la electricidad que consumen los servicios compartidos del edificio.</p></div>
      <div class="row g-3 mb-4"><div class="col-lg-7"><div class="card-solar h-100"><h2 class="section-title"><i class="bi bi-lightning-charge-fill"></i>¿Qué podría alimentar?</h2><div class="row g-3"><div v-for="consumo in consumos" :key="consumo.titulo" class="col-sm-6"><div class="question-card"><i :class="consumo.icono"></i><div><h3>{{ consumo.titulo }}</h3><p>{{ consumo.texto }}</p></div></div></div></div></div></div>
      <div class="col-lg-5"><div class="card-solar h-100"><h2 class="section-title"><i class="bi bi-diagram-3-fill"></i>Qué debe aclarar el estudio</h2><ul class="check-list"><li>Qué consumos y contadores pueden asociarse.</li><li>Cuánta producción se aprovecharía en cada horario.</li><li>Inversión, mantenimiento y reparto de costes.</li><li>Acuerdos comunitarios y permisos necesarios.</li></ul></div></div></div>
      <div class="detail-callout"><i class="bi bi-clock-history"></i><p class="mb-0"><strong>Situación:</strong> esta página describe una línea de estudio, no un acuerdo de instalación. Los presupuestos y ahorros publicados anteriormente deben revisarse antes de usarlos como referencia actual.</p></div>
      <div class="card-solar mt-4"><h2 class="section-title"><i class="bi bi-folder2-open"></i>Seguimiento y documentos</h2><p>Cuando se reciban propuestas actualizadas, aquí se podrán comparar alcance, producción prevista, coste total, ahorro estimado, garantías y mantenimiento.</p><div class="d-flex flex-wrap gap-2"><router-link to="/propuesta" class="btn btn-primary">Consultar propuestas existentes</router-link><router-link to="/documentos" class="btn btn-outline-primary">Abrir documentos</router-link><router-link to="/juntas" class="btn btn-outline-secondary">Ver juntas y acuerdos</router-link></div></div>
    </div>
  `,
  data() { return { consumos: [
    { icono: 'bi bi-elevator-fill', titulo: 'Ascensores', texto: 'Consumo eléctrico de los equipos de elevación.' },
    { icono: 'bi bi-lightbulb-fill', titulo: 'Iluminación', texto: 'Portales, escaleras y espacios compartidos.' },
    { icono: 'bi bi-p-circle-fill', titulo: 'Garaje', texto: 'Iluminación y otros equipos, según instalación.' },
    { icono: 'bi bi-gear-fill', titulo: 'Equipos comunes', texto: 'Bombas, ventilación y sistemas técnicos.' },
  ] } },
}
