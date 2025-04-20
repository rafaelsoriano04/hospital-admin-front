import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app-store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const store = useAppStore()
        return store.token ? '/home' : '/login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/modules/auth/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/shared/components/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/centros-medicos',
      name: 'centros_medicos',
      component: () => import('@/modules/centros-medicos/CentrosMedicos.vue'),
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/consultas-medicas',
    //   name: 'ConsultasMedicas',
    //   component: () => import('@/modules/consultas-medicas/ConsultasMedicas.vue'),
    // },
     {
       path: '/empleados',
       name: 'empleados',
       component: () => import('@/modules/empleados/Empleados.vue'),
     },
    {
        path: '/especialidades',
       name: 'especialidades',
       component: () => import('@/modules/especialidades/Especialidades.vue'),
     },
    {
      path: '/medicos',
      name: 'medicos',
      component: () => import('@/modules/medicos/Medicos.vue')
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('@/modules/usuarios/Usuarios.vue')
    },
    // {
    //   path: '/pacientes',
    //   name: 'Pacientes',
    //   component: () => import('@/modules/pacients/Pacients.vue'),
    // },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, _, next) => {
  const store = useAppStore()
  const { token } = store

  if (to.meta.requiresAuth && token === '') {
    return next({ name: 'login' })
  }

  next()
})

export default router
