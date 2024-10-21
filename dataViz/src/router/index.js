import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VagasView from '@/views/VagasView.vue'
import RelatoriosView from '@/views/RelatoriosView.vue'
import CandidatosView from '@/views/CandidatosView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/vagas',
      name: 'vagas',
      component: VagasView
    },
    {
      path: '/relatorios',
      name: 'relatorios',
      component: RelatoriosView
    },
    {
      path: '/candidatos',
      name: 'Candidatos',
      component: CandidatosView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
