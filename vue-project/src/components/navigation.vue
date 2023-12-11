<template>
<div class="fixed w-screen z-10 top-0 left-0">
    <nav class="flex  items-center flex-wrap bg-black px-20 py-6 justify-between font-normal">
  <div class="flex items-center flex-shrink-0 text-white mr-6 ">
    <span class="font-semibold text-3xl text-red-500 tracking-tight"><router-link to="/">FOOT SOCCER. </router-link></span>
  </div>
  <div class="block lg:hidden">
    <button  @click="trigger" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div ref="menu" :class="menuIsClosed ? 'flex' : 'hidden'" class="text-sm lg:flex sm-nav-links lg-nav-links !important">
        <router-link to="/" class="cursor-pointer block lg:inline-block text-sm uppercase lg:mt-0 transition-all text-white hover:text-red-500">accueil</router-link>
        <a href="/#about" class="cursor-pointer block lg:inline-block text-sm uppercase lg:mt-0 transition-all text-white hover:text-red-500">a propos</a>
        <router-link to="/centres" class="cursor-pointer block lg:inline-block text-sm uppercase lg:mt-0 transition-all text-white hover:text-red-500">centres</router-link>
        <router-link to="/reservation/centre=null" class="cursor-pointer block lg:inline-block text-sm uppercase lg:mt-0 transition-all text-white hover:text-red-500">reservation</router-link>
        <a href="/#contact" class="cursor-pointer block lg:inline-block text-sm uppercase lg:mt-0 transition-all text-white hover:text-red-500">contact</a>  
     <div>
      <router-link v-if="!userStore.user" to="/login" class="text-red-500 text-xl hover:text-red-700"><i class="fa-solid fa-user fa-lg mr-3"></i>Connexion</router-link>
      <DropDown v-else title="Mon Compte" :options=options />    
    </div>
    </div>
</nav>
</div>
</template>

<script setup>
import DropDown from './DropDown.vue'
import {onUpdated, ref, watch} from 'vue'
import {useUserStore} from '../stores/user.js'
const menuIsClosed = ref(true)
const menu = ref(null)

addEventListener("resize",(e) => {
  if(window.innerWidth > 1024)
    menuIsClosed.value = val
})
let val = menuIsClosed.value
const userStore = useUserStore()
const isAdmin = ref(userStore.user?.role == 'admin')
const liens = [
  {titre : 'accueil', lien : '/'},
  {titre : 'a propos', lien : '#about'},
  {titre : 'centres', lien : '/centres'},
  {titre : 'reservation', lien : '/reservation/centre=null'},
  {titre : 'contact', lien : '#contact'},
  ]
const options = ref([
  {titre : 'mes Infos', lien : '/myAccount'},
  {titre : 'Déconnexion', lien : '/logout'},
])
console.log(userStore.user)
watch(menuIsClosed,() => {
  //menuIsClosed.value ? menu.value.style.display = 'flex' : menu.value.style.display = 'none'
} )

const trigger = () => {
  menuIsClosed.value = !menuIsClosed.value
  val = menuIsClosed.value
  console.log(val)
}

const deconnexion = () => {
  localStorage.clear()
  location.href = 'http://localhost:5173'
}
console.log(isAdmin.value)
if(isAdmin.value){
    options.value.push({titre : 'Tableau de bord',lien : '/dashboard'})
}
</script>

<style>


</style>