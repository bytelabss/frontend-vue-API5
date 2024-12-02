import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VagasView from '@/views/VagasView.vue'
import CandidatosView from '@/views/CandidatosView.vue';
import AlarmesView from '@/views/AlarmesView.vue';
import AnaliseView from '@/views/AnaliseView.vue';
import CadastroUsuario from '@/views/CadastroUsuariosView.vue';
import LoginView from '@/views/LoginView.vue';
import CompartilharDashView from '@/views/CompartilharDashView.vue';
import Sair from '@/components/Sair.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/vagas',
      name: 'vagas',
      component: VagasView,
      meta: { requiresAuth: true },
    },
    {
      path: '/alarmes',
      name: 'alarmes',
      component: AlarmesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/candidatos',
      name: 'Candidatos',
      component: CandidatosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analise',
      name: 'Analise',
      component: AnaliseView,
      meta: { requiresAuth: true },
    }, 
    {
      path: '/cadastrousuario',
      name: 'CadastroUsuario',
      component: CadastroUsuario,
      meta: { requiresAuth: true },
    },
    {
      path: '/compartilharDash',
      name: 'CompartilharDash',
      component: CompartilharDashView,
      meta: { requiresAuth: true },
    },
    {
      path: '/sair',
      name: 'Sair',
      component: Sair,
      meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('authToken');
    console.log(token)
    if (!token) {
      // Se não houver token, redireciona para o login
      next({ name: 'login' });
    } else {
      // Se houver token, permite o acesso à rota
      console.log(localStorage.getItem('id'))
      next();
    }
  } else {
    // Se não for uma rota protegida, permite a navegação
    next();
  }
});

export default router
