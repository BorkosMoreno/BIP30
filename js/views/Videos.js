export default {
  name: 'Videos',
  template: `
    <div>
      <h2 class="section-title"><i class="bi bi-play-circle-fill"></i>Vídeos del proyecto</h2>
      <p class="text-muted mb-4" style="font-size:.9rem">
        Colección completa de vídeos informativos sobre el proyecto solar de BIP30: análisis técnicos, aspectos jurídicos y divulgativos.
      </p>

      <div class="row g-4">
        <div v-for="v in videos" :key="v.src" class="col-md-6">
          <div class="card-solar h-100">
            <div style="position:relative;padding-bottom:56.25%;height:0;background:#111;border-radius:10px;overflow:hidden;margin-bottom:1rem">
              <video controls style="position:absolute;top:0;left:0;width:100%;height:100%" preload="metadata">
                <source :src="'media/' + v.src" type="video/mp4" />
              </video>
            </div>
            <h6 class="fw-bold mb-1" style="color:var(--solar-primary)">
              <i class="bi bi-play-fill me-1" style="color:var(--solar-secondary)"></i>{{ v.titulo }}
            </h6>
            <p class="text-muted mb-0" style="font-size:.82rem">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      videos: [
        {
          src:    'descifrando_la_garantia.mp4',
          titulo: 'Descifrando la garantía',
          desc:   'Análisis detallado de la cláusula de garantía del contrato de impermeabilización y por qué la instalación solar mediante sistema de lastre no la invalida.',
        },
        {
          src:    'analisis-juridico-garantias.mp4',
          titulo: 'Análisis jurídico y garantías',
          desc:   'Aspectos legales de la instalación fotovoltaica y su compatibilidad con la garantía de impermeabilización de la cubierta.',
        },
        {
          src:    'garantia_y_placas_solares_espress.mp4',
          titulo: 'Garantía y placas solares (resumen)',
          desc:   'Versión abreviada del análisis sobre la compatibilidad entre la instalación solar y la garantía de la cubierta.',
        },
        {
          src:    'paneles-solares.mp4',
          titulo: 'Paneles solares',
          desc:   'Introducción al autoconsumo fotovoltaico colectivo y cómo funciona en una comunidad de vecinos.',
        },
        {
          src:    'analisis-tecnico-solar.mp4',
          titulo: 'Análisis técnico solar',
          desc:   'Detalle técnico de la instalación: potencia, rendimiento, inversores y sistema de lastre.',
        },
        {
          src:    'instalacion-solar.mp4',
          titulo: 'Garantía e instalación solar',
          desc:   'Vídeo original sobre cómo funciona la instalación fotovoltaica mediante sistema de lastre y su compatibilidad con la membrana impermeabilizante.',
        },
      ],
    }
  },
}
