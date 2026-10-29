export default {
  name: 'AppFooter',
  template: `
    <footer class="app-footer">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-sun-fill" style="color:var(--solar-secondary)"></i>
        <span>© {{ year }} BIP30 · Indalecio Prieto 30 · Madrid</span>
      </div>
      <div class="d-flex gap-3">
        <router-link to="/juntas" style="color:var(--solar-secondary);text-decoration:none">
          <i class="bi bi-calendar2-event me-1"></i>Juntas
        </router-link>
        <router-link to="/documentos" style="color:var(--solar-secondary);text-decoration:none">
          <i class="bi bi-file-earmark-text me-1"></i>Documentos
        </router-link>
      </div>
    </footer>
  `,
  data() { return { year: new Date().getFullYear() } },
}
