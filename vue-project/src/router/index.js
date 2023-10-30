import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import CreateAccount from '../views/CreateAccount.vue'
import ReservationView from '../views/ReservationView.vue'
import RecapView from '../views/RecapView.vue'
import MonCompte from '../views/MonCompte.vue'
import modifierCompteView from '../views/modifierCompteView.vue'
import VerifyCompte from '../views/VerifyCompte.vue'
import ResetPassword from '../views/ResetPassword.vue'
import SetNewPassword from '../views/SetNewPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component : Home
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component : SignIn
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component : ResetPassword
    },
    {
      path: '/setNewPassword/:id',
      name: 'setNewPassword',
      component : SetNewPassword,
      props : true
    },
    {
      path: '/user/create',
      name: 'createAccount',
      component : CreateAccount
    },
    {
      path: '/reserve',
      name: 'reservation',
      component : ReservationView,  
    },
    {
      path: '/reserve/recap',
      name: 'recap',
      component: RecapView,
      props: true
    },{
      path: '/mon_compte',
      name: 'monCompte',
      component: MonCompte,
    },{
      path: '/mon_compte/modifier',
      name: 'modifierCompteView',
      component: modifierCompteView,
    }, {
      path: '/user/verifyCompte/:id',
      name: 'VerifyCompte',
      component: VerifyCompte,
      props: true
    }
  ]
})

export default router
