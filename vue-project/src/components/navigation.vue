<template>
    <nav class="flex items-center justify-between flex-wrap bg-black p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class="font-semibold text-xl tracking-tight"><router-link to="/">FOOT SOCCER </router-link></span>
  </div>
  <div class="block lg:hidden">
    <button  @click="menuIsClosed = !menuIsClosed" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full  flex-grow lg:flex lg:items-center lg:w-auto " :class="menuIsClosed ? 'hidden' : 'block'">
    <div class="text-sm lg:flex-grow">
      <h1 class="text-white">{{userStore.user}}</h1>
      <span  href="#responsive-header" v-for="lien in liens" :key="lien" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        <router-link v-if="userStore.user" :to="lien.lien" >{{lien.titre}}</router-link>
      </span>
      
    </div>
    <div>
      <a v-if="!userStore.user" href="/sign-in" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Se connecter</a>
    </div>
  </div>
</nav>

</template>

<script setup>
import {onUpdated, ref, watch} from 'vue'
import {useUserStore} from '../stores/user.js'
const menuIsClosed = ref(true)
const menu = ref(null)
const liens = [{titre : 'Réserver', lien: '/reserve'},{titre : 'Mon Compte', lien : '/mon_compte'}]

const userStore = useUserStore()
console.log(userStore.title)
watch(menuIsClosed,() => console.log('hello'))
</script>

<style>


</style>