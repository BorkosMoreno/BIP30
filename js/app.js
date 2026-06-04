import { createApp }    from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import AppHeader  from './components/AppHeader.js?v=3'
import AppSidebar from './components/AppSidebar.js?v=5'
import AppFooter  from './components/AppFooter.js?v=4'

import Reunion    from './views/Reunion.js?v=5'
import Inicio     from './views/Inicio.js?v=10'
import Beneficios from './views/Beneficios.js'
import Propuesta  from './views/Propuesta.js'
import Documentos from './views/Documentos.js?v=10'
import Contacto   from './views/Contacto.js?v=3'
import Videos     from './views/Videos.js?v=2'

// ── Router ────────────────────────────────────
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',            component: Reunion    },
    { path: '/proyecto',    component: Inicio     },
    { path: '/beneficios',  component: Beneficios },
    { path: '/propuesta',   component: Propuesta  },
    { path: '/documentos',  component: Documentos },
    { path: '/contacto',    component: Contacto   },
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
