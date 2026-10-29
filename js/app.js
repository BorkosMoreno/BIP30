import { createApp }    from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import AppHeader  from './components/AppHeader.js?v=4'
import AppSidebar from './components/AppSidebar.js?v=7'
import AppFooter  from './components/AppFooter.js?v=5'

import Reunion    from './views/Reunion.js?v=12'
import Inicio     from './views/Inicio.js?v=11'
import Beneficios from './views/Beneficios.js'
import Propuesta  from './views/Propuesta.js'
import Documentos from './views/Documentos.js?v=10'
import Contacto   from './views/Contacto.js?v=4'
import Videos     from './views/Videos.js?v=3'
import ProyectoParcela from './views/ProyectoParcela.js'
import ZonasComunes from './views/ZonasComunes.js'
import AutoconsumoIndividual from './views/AutoconsumoIndividual.js'
import GarantiaCubierta from './views/GarantiaCubierta.js'

// ── Router ────────────────────────────────────
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',            component: Inicio     },
    { path: '/proyecto',    component: ProyectoParcela },
    { path: '/zonas-comunes', component: ZonasComunes },
    { path: '/autoconsumo-individual', component: AutoconsumoIndividual },
    { path: '/garantia-cubierta', component: GarantiaCubierta },
    { path: '/beneficios',  component: Beneficios },
    { path: '/propuesta',   component: Propuesta  },
    { path: '/documentos',  component: Documentos },
    { path: '/juntas',      component: Contacto   },
    { path: '/contacto',    redirect: '/juntas' },
    { path: '/reunion-2026', component: Reunion },
    { path: '/videos',      component: Videos     },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// ── App raíz ──────────────────────────────────
const App = {
  components: { AppHeader, AppSidebar, AppFooter },
  template: `
    <div class="app-shell">
      <app-header />
      <app-sidebar />
      <main class="app-main">
        <router-view />
      </main>
      <app-footer />
    </div>
  `,
}

createApp(App).use(router).mount('#app')
