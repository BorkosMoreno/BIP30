export default {
  name: 'AppFooter',
  template: `
    <footer class="app-footer">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-sun-fill" style="color:var(--solar-secondary)"></i>
        <span>© 2026 CP Bulevar Indalecio Prieto 30 · Madrid · Proyecto Energía Solar</span>
      </div>
      <div class="d-flex gap-3">
        <router-link to="/contacto" style="color:var(--solar-secondary);text-decoration:none">
          <i class="bi bi-envelope-fill me-1"></i>Contacto
        </router-link>
        <router-link to="/documentos" style="color:var(--solar-secondary);text-decoration:none">
          <i class="bi bi-file-earmark-text me-1"></i>Documentos
        </router-link>
      </div>
    </footer>
  `,
}
