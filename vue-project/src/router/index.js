import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import CreateAccount from '../views/CreateAccount.vue'
import ReservationView from '../views/ReservationView.vue'

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
      path: '/user/create',
      name: 'createAccount',
      component : CreateAccount
    },
    {
      path: '/reserve',
      name: 'reservation',
      component : ReservationView,  
    },
  ]
})

export default router
