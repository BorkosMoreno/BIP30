export default {
  name: 'GarantiaCubierta',
  template: `
    <div>
      <div class="detail-hero detail-hero-green warranty-hero">
        <span class="eyebrow">ACLARACIÓN DE LA ÚLTIMA JUNTA VECINAL</span>
        <h1>Placas solares y garantía de la cubierta</h1>
        <p>La instalación fotovoltaica, por sí misma, no anula la garantía de 10 años de la cubierta. La responsabilidad depende de si el desperfecto está relacionado con la instalación.</p>
      </div>

      <div class="warranty-summary"><i class="bi bi-shield-check"></i><div><strong>La garantía de la cubierta sigue vigente en las zonas no afectadas por la instalación.</strong><p>La presencia de placas no elimina la cobertura de la impermeabilización en el resto de la cubierta.</p></div></div>

      <div class="row g-3 mt-1">
        <div class="col-md-6"><article class="warranty-case installer-case">
          <span class="warranty-case-icon"><i class="bi bi-tools"></i></span><span class="eyebrow">SI EL DAÑO LO CAUSA EL MONTAJE</span>
          <h2>Responde la empresa instaladora</h2>
          <p>Si durante la instalación se produce un desperfecto en la cubierta, corresponde a los instaladores hacerse cargo de repararlo mediante su seguro, según lo aclarado en la junta.</p>
        </article></div>
        <div class="col-md-6"><article class="warranty-case roof-case">
          <span class="warranty-case-icon"><i class="bi bi-house-check-fill"></i></span><span class="eyebrow">SI EL PROBLEMA ES INDEPENDIENTE</span>
          <h2>Se mantiene la garantía de 10 años</h2>
          <p>Si aparece un problema de cubierta en una zona no afectada por los trabajos de instalación, la garantía de 10 años permanece vigente y debe cubrirlo conforme a sus condiciones.</p>
        </article></div>
      </div>

      <section class="card-solar mt-4"><h2 class="section-title"><i class="bi bi-diagram-3-fill"></i>Dos responsabilidades distintas</h2><p>La garantía de impermeabilización cubre los problemas propios de la cubierta dentro de su plazo y alcance. La empresa solar y su seguro responden de los daños que puedan causar sus trabajos. Una cosa no cancela la otra: la instalación no supone renunciar a la garantía en las zonas que no haya afectado.</p>
        <div class="detail-callout"><i class="bi bi-info-circle-fill"></i><p class="mb-0">Esta explicación recoge la aclaración trasladada por la comunidad tras la última junta vecinal. Para un incidente concreto se documentará la zona afectada y se consultarán las condiciones de la garantía y la póliza de la empresa instaladora.</p></div>
        <div class="d-flex flex-wrap gap-2 mt-3"><router-link to="/documentos" class="btn btn-primary"><i class="bi bi-folder2-open me-1"></i>Consultar informes y documentos</router-link><router-link to="/proyecto" class="btn btn-outline-secondary">Volver al proyecto de la parcela</router-link></div>
      </section>
    </div>
  `,
}
