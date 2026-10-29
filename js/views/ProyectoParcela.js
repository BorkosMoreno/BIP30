export default {
  name: 'ProyectoParcela',
  template: `
    <div>
      <div class="detail-hero">
        <span class="eyebrow">EL PROYECTO · BIP30</span><h1>La energía solar en nuestra parcela</h1>
        <p>El punto de partida es estudiar qué superficie útil tenemos, qué instalación cabe y cómo encaja con las necesidades de la comunidad.</p>
      </div>
      <div class="row g-3 mb-4">
        <div class="col-md-7"><div class="card-solar h-100"><h2 class="section-title"><i class="bi bi-geo-alt-fill"></i>Una cubierta por estudiar</h2><p>Los materiales elaborados para BIP30 describían una cubierta plana con espacio potencial para una instalación fotovoltaica compartida. Una estimación inicial apuntaba a entre 400 y 600 paneles y 250–360 kWp, según la disposición.</p><p class="mb-0"><strong>Estas cifras no son un diseño aprobado.</strong> La superficie realmente aprovechable, las sombras, las cargas, la impermeabilización y las condiciones de conexión requieren una evaluación técnica actualizada.</p></div></div>
        <div class="col-md-5"><div class="parcel-detail-image"><img src="img/satelite-bip30.png" alt="Vista aérea de BIP30" /></div></div>
      </div>
      <div class="card-solar"><h2 class="section-title"><i class="bi bi-signpost-split-fill"></i>Qué hay que definir</h2><div class="row g-3"><div v-for="item in cuestiones" :key="item.titulo" class="col-md-6"><div class="question-card"><i :class="item.icono"></i><div><h3>{{ item.titulo }}</h3><p>{{ item.texto }}</p></div></div></div></div><router-link to="/garantia-cubierta" class="btn btn-outline-success mt-3"><i class="bi bi-shield-check me-1"></i>Ver aclaración sobre la garantía</router-link></div>
      <div class="detail-callout"><i class="bi bi-info-circle-fill"></i><p class="mb-0"><strong>Estado de la información:</strong> las capacidades y presupuestos publicados proceden de estudios anteriores. Se actualizarán cuando haya nueva revisión técnica o propuestas vigentes.</p></div>
      <div class="d-flex flex-wrap gap-2 mt-3"><router-link to="/zonas-comunes" class="btn btn-success">Proyecto para zonas comunes</router-link><router-link to="/autoconsumo-individual" class="btn btn-outline-primary">Autoconsumo individual</router-link></div>
    </div>
  `,
  data() { return { cuestiones: [
    { icono: 'bi bi-rulers', titulo: 'Superficie útil y diseño', texto: 'Confirmar zonas disponibles, sombras, pasillos de mantenimiento y configuración de los módulos.' },
    { icono: 'bi bi-shield-check', titulo: 'Garantía de la cubierta', texto: 'La última junta aclaró que instalar placas no anula la garantía de 10 años; los instaladores responden por daños que causen.' },
    { icono: 'bi bi-plug', titulo: 'Conexión y consumos', texto: 'Analizar instalaciones eléctricas, perfiles de consumo y posibles puntos de conexión.' },
    { icono: 'bi bi-file-earmark-text', titulo: 'Permisos y costes', texto: 'Identificar licencias, trámites, financiación, mantenimiento y condiciones contractuales.' },
  ] } },
}
