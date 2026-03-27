import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView    from '../views/HomeView.vue'
import ModulesPage from '../views/ModulesPage.vue'
import ModuleDetail from '../views/ModuleDetail.vue'

const routes = [
  { path: '/',          name: 'home',    component: HomeView    },
  { path: '/modules',   name: 'modules', component: ModulesPage },
  { path: '/modules/:id', name: 'module-detail', component: ModuleDetail }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0 }
  }
})
