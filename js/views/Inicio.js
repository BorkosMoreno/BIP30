export default {
  name: 'Inicio',
  template: `
    <div class="home-page">
      <section class="hero-banner home-hero warranty-hero">
        <span class="hero-eyebrow"><i class="bi bi-shield-check me-2"></i>ACLARACIÓN IMPORTANTE · ÚLTIMA JUNTA VECINAL</span>
        <h1>La instalación solar no anula la garantía de 10 años de la cubierta</h1>
        <p>Si los instaladores causan un desperfecto, responden ellos y su seguro. En las zonas no afectadas, la garantía de la cubierta sigue vigente.</p>
        <div class="d-flex gap-2 flex-wrap">
          <router-link to="/garantia-cubierta" class="btn btn-warning fw-bold"><i class="bi bi-info-circle-fill me-1"></i>Leer la explicación</router-link>
          <router-link to="/proyecto" class="btn btn-outline-light">Conocer el proyecto solar</router-link>
        </div>
      </section>

      <section class="home-intro">
        <div>
          <span class="eyebrow">UNA GUÍA PARA LA COMUNIDAD</span>
          <h2>De la energía solar a las decisiones de BIP30</h2>
        </div>
        <p>La web reúne información general, el potencial estimado de nuestras cubiertas y las alternativas que pueden estudiarse. Las cifras de propuestas anteriores son orientativas: deben confirmarse con documentación vigente antes de tomar decisiones.</p>
      </section>

      <section class="card-solar home-benefits">
        <div class="home-section-heading">
          <div><span class="eyebrow">01 · POR QUÉ FOTOVOLTAICA</span><h2>Una energía que aprovechamos aquí</h2></div>
          <router-link to="/beneficios" class="text-link">Ver beneficios <i class="bi bi-arrow-right"></i></router-link>
        </div>
        <div class="row g-3">
          <div v-for="b in beneficios" :key="b.titulo" class="col-sm-6 col-xl-3">
            <article class="mini-benefit"><span class="mini-benefit-icon"><i :class="b.icono"></i></span><h3>{{ b.titulo }}</h3><p>{{ b.texto }}</p></article>
          </div>
        </div>
      </section>

      <section class="parcel-feature">
        <div class="parcel-image"><img src="img/satelite-bip30.png" alt="Vista aérea de la parcela de Bulevar Indalecio Prieto 30" /></div>
        <div class="parcel-copy">
          <span class="eyebrow">02 · NUESTRO EDIFICIO</span>
          <h2>¿Qué potencial solar tiene la parcela?</h2>
          <p>La cubierta permite estudiar una instalación compartida. Los análisis iniciales estimaban espacio para unos 400–600 módulos y una potencia aproximada de 250–360 kWp. Son cifras preliminares que dependen del diseño, las zonas útiles y la revisión técnica actual.</p>
          <router-link to="/proyecto" class="btn btn-primary">Ver el potencial de la parcela <i class="bi bi-arrow-right ms-1"></i></router-link>
        </div>
      </section>

      <section class="home-projects">
        <div class="home-section-heading">
          <div><span class="eyebrow">03 · 04 · DOS VÍAS DE ESTUDIO</span><h2>¿Dónde se podría utilizar la energía?</h2></div>
          <p>Son modalidades distintas y pueden analizarse por separado.</p>
        </div>
        <div class="row g-3">
          <div class="col-lg-6"><article class="project-card common-card">
            <span class="project-icon"><i class="bi bi-buildings-fill"></i></span><span class="eyebrow">PROYECTO COLECTIVO</span>
            <h3>Zonas comunes</h3><p>Estudiar la generación solar para consumos como ascensores, iluminación o garaje, con el objetivo de reducir el gasto eléctrico común.</p>
            <router-link to="/zonas-comunes" class="text-link">Explorar esta opción <i class="bi bi-arrow-right"></i></router-link>
          </article></div>
          <div class="col-lg-6"><article class="project-card individual-card">
            <span class="project-icon"><i class="bi bi-house-check-fill"></i></span><span class="eyebrow">PARTICIPACIÓN VOLUNTARIA</span>
            <h3>Autoconsumo individual</h3><p>Conocer cómo podrían participar las viviendas interesadas, qué energía se les asignaría y qué condiciones técnicas y económicas habría que confirmar.</p>
            <router-link to="/autoconsumo-individual" class="text-link">Explorar esta opción <i class="bi bi-arrow-right"></i></router-link>
          </article></div>
        </div>
      </section>

      <section class="home-next card-solar">
        <div><span class="eyebrow">INFORMACIÓN DE LA COMUNIDAD</span><h2>Propuestas, juntas y documentos</h2><p>Consulta los antecedentes disponibles y las convocatorias o acuerdos cuando se incorporen.</p></div>
        <div class="d-flex flex-wrap gap-2"><router-link to="/propuesta" class="btn btn-primary">Propuestas</router-link><router-link to="/juntas" class="btn btn-outline-primary">Juntas</router-link><router-link to="/documentos" class="btn btn-outline-secondary">Documentos</router-link></div>
      </section>
    </div>
  `,
  data() { return { beneficios: [
    { icono: 'bi bi-receipt-cutoff', titulo: 'Menor gasto eléctrico', texto: 'La energía solar puede reducir la electricidad que compramos de la red.' },
    { icono: 'bi bi-people-fill', titulo: 'Uso compartido', texto: 'La producción puede repartirse entre consumos comunes o viviendas participantes.' },
    { icono: 'bi bi-cloud-sun-fill', titulo: 'Menos emisiones', texto: 'Generar electricidad renovable cerca del punto de consumo reduce emisiones asociadas.' },
    { icono: 'bi bi-graph-up-arrow', titulo: 'Más previsibilidad', texto: 'Una parte de la energía puede producirse localmente durante la vida útil de la instalación.' },
  ] } },
}
