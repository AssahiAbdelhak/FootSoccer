import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import CreateAccount from '../views/CreateAccount.vue'
import ReservationView from '../views/ReservationView.vue'
import Logout from '../views/Logout.vue'
import MonCompte from '../views/MonCompte.vue'
import Dashboard from '../views/Dashboard.vue'
import VerifyCompte from '../views/VerifyCompte.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Centres from '../views/Centres.vue'
import AddCentre from '../views/AddCentre.vue'
import ModifyCentre from '../views/ModifyCentre.vue'
import ModifyUser from '../views/ModifyUser.vue'
import Test from '../views/Test.vue'

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
      path: '/centres/add/',
      name: 'AddCentre',
      component : AddCentre
    },
    {
      path: '/centres/modify/:id',
      name: 'ModifyCenter',
      component : ModifyCentre,
      props: true
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
      path: '/users/modify/:id',
      name: 'ModifyUser',
      component : ModifyUser,
      props : true
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
      path: '/test',
      name: 'Test',
      component: Test,
    },{
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    }, {
      path: '/user/verifyCompte/:id',
      name: 'VerifyCompte',
      component: VerifyCompte,
      props: true
    }
  ]
})

export default router
