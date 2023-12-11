import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/centres',
      name: 'Centres',
      component : () => import('../views/Centres.vue')
    },
    {
      path: '/centres/add/',
      name: 'AddCentre',
      component : () => import('../views/AddCentre.vue')
    },
    {
      path: '/centres/modify/:id',
      name: 'ModifyCenter',
      component : () => import('../views/ModifyCentre.vue'),
      props: true
    },
    {
      path: '/login',
      name: 'signIn',
      component : () => import('../views/SignIn.vue')
    },
    {
      path: '/register',
      name: 'createAccount',
      component : () => import('../views/CreateAccount.vue')
    },
    {
      path: '/users/modify/:id',
      name: 'ModifyUser',
      component : () => import('../views/ModifyUser.vue'),
      props : true
    },
    {
      path: '/logout',
      name: 'logout',
      component : () => import('../views/Logout.vue'),
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component : () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/resetpassword/:id',
      name: 'resetpassword',
      component : () => import('../views/ResetPassword.vue'),
      props : true
    },
    {
      path: '/reservation/:centre',
      name: 'reservation',
      component : () => import('../views/ReservationView.vue'),  
      props : true
    },
     {
      path: '/myAccount',
      name: 'monCompte',
      component: () => import('../views/MonCompte.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
    }, {
      path: '/user/verifyCompte/:id',
      name: 'VerifyCompte',
      component: () => import('../views/VerifyCompte.vue'),
      props: true
    }
  ]
})

export default router
