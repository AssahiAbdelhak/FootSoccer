import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import CreateAccount from '../views/CreateAccount.vue'
import ReservationView from '../views/ReservationView.vue'
import Logout from '../views/Logout.vue'
import MonCompte from '../views/MonCompte.vue'
import modifierCompteView from '../views/modifierCompteView.vue'
import VerifyCompte from '../views/VerifyCompte.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Centres from '../views/Centres.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component : Home
    },
    {
      path: '/centres',
      name: 'Centres',
      component : Centres
    },
    {
      path: '/login',
      name: 'signIn',
      component : SignIn
    },
    {
      path: '/register',
      name: 'createAccount',
      component : CreateAccount
    },
    {
      path: '/logout',
      name: 'logout',
      component : Logout,
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component : ForgotPassword
    },
    {
      path: '/resetpassword/:id',
      name: 'resetpassword',
      component : ResetPassword,
      props : true
    },
    {
      path: '/reservation/:centre',
      name: 'reservation',
      component : ReservationView,  
      props : true
    },
     {
      path: '/myAccount',
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
