import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/stores/app-store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: () => import('@/modules/auth/Login.vue') },
    {
      path: '/',
      name: 'home',
      component: () => import('@/shared/components/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/centros-medicos',
      name: 'centros_medicos',
      component: () => import('@/modules/centros-medicos/CentrosMedicos.vue'),
      meta: { requiresAuth: true },
    },
    // {
    //   path: '/consultas-medicas',
    //   name: 'ConsultasMedicas',
    //   component: () => import('@/modules/consultas-medicas/ConsultasMedicas.vue'),
    // },
    // {
    //   path: '/empleados',
    //   name: 'Empleados',
    //   component: () => import('@/modules/empleados/Empleados.vue'),
    // },
    // {
    //   path: '/especialidades',
    //   name: 'Especialidades',
    //   component: () => import('@/modules/especialidades/Especialidades.vue'),
    // },
    {
      path: '/medicos',
      name: 'medicos',
      component: () => import('@/modules/medicos/Medicos.vue'),
    },
    // {
    //   path: '/pacientes',
    //   name: 'Pacientes',
    //   component: () => import('@/modules/pacients/Pacients.vue'),
    // },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, _, next) => {
  const store = useAppStore(); // 👈 Inicializar el store dentro de beforeEach
  const { token } = store;

  if (to.meta.requiresAuth && token === '') {
    return next({ name: 'login' });
  }
  next();
});

export default router;
