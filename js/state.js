import { reactive } from 'vue'

// Estado global compartido entre componentes
export const appState = reactive({
  sidebarOpen: false,
})
